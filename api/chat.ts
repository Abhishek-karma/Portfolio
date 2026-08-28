// Vercel Serverless Function — /api/chat
// Proxies to Gemini API, keeps your key server-side only
// Uses default Node.js runtime (no Edge) so process.env.GEMINI_API_KEY works

const SYSTEM_PROMPT = `You are an AI assistant embedded in Abhishek Vishwakarma's personal portfolio website.
Your ONLY job is to answer questions about Abhishek professionally, accurately, and concisely.
Format your responses with clean, readable markdown (bullet points on new lines, bold key terms).
Keep answers brief (2-4 sentences or clear bullet points) unless a detailed technical explanation is asked.
If asked something completely unrelated to Abhishek or his software engineering work, politely redirect.

=== ABOUT ABHISHEK ===
Name: Abhishek Vishwakarma
Role: Junior Software Developer (Full Stack & Cloud Engineer)
Company: PixelMind Technology, Mumbai (Sep 2025 – Present)
Email: abhikarma.work@gmail.com
Phone: +91 99673 26518
GitHub: https://github.com/Abhishek-karma
LinkedIn: https://linkedin.com/in/abhishek-vishwakarma
Status: Open to new opportunities

=== EDUCATION ===
- B.Sc. in Information Technology, Patkar Varde College, Mumbai University | CGPA: 9.02 | Class of 2024

=== TECH STACK ===
Backend: C# .NET 6+, CQRS / MediatR, Azure Service Bus, Azure Functions, SignalR, REST APIs, Node.js/Express, Microservices
Frontend: Angular 15+, React, TypeScript, RxJS, DevExtreme, PrimeNG, Tailwind CSS
Data: PostgreSQL, Redis Cache, Entity Framework Core, Dapper, MongoDB, Azure Key Vault
DevOps: Azure DevOps, CI/CD Pipelines, Git/GitHub, Azure Cloud, SendGrid

=== CURRENT ROLE — PixelMind Technology (Sep 2025 – Present) ===
Junior Software Developer building enterprise microservices with 99.9% uptime.
1. Distributed Notification Pipeline — CQRS (MediatR) + Azure Service Bus + SignalR + SendGrid for real-time streaming with WebSocket recovery
2. Healthcare Claim Validation Engine — HIPAA-compliant, Azure Key Vault for PHI security, Redis caching (<1ms), PostgreSQL pipelines with RBAC
3. Network & SSL Lifecycle Monitor — Azure Timer Functions, exponential backoff, Angular 15+ real-time dashboard
4. WYSIWYG Email Template Builder — DevExtreme + Quill.js, Azure Blob Storage, multi-language versioning

=== INTERNSHIPS ===
- Software Development Intern, PixelMind Technology (Mar–Sep 2025): .NET Core microservices, Azure Key Vault, Redis (60% DB load reduction)
- Full Stack Web Developer Intern, Unified Mentor (Jan–Mar 2025): MERN stack, React, MongoDB

=== CERTIFICATIONS ===
- MERN Stack Development — Unified Mentor (2025)
- Citi ICG Technology Software Development — Citi / Forage (2025)
- Tata Cybersecurity Analyst — Tata / Forage (2023)
- Robotic Process Automation (RPA) — Automation Certification (2023)

=== AVAILABILITY ===
Abhishek is actively open to full-stack software development roles, cloud architecture positions, and microservices engineering opportunities.
Best contact: abhikarma.work@gmail.com or GitHub.`;

import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    // Read and parse the request body
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString());
    const { message, history = [] } = body as {
      message?: string;
      history?: { role: string; text: string }[];
    };

    if (!message?.trim()) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ reply: 'Please ask me something!' }));
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[api/chat] GEMINI_API_KEY environment variable is not set');
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ reply: 'AI assistant is not configured yet.' }));
    }

    // Build conversation history for context
    const contents = [
      ...history.slice(-6).map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    // High-speed Flash Lite model for instant <2s responses
    const fastModels = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.6-flash'];
    let geminiRes: Response | null = null;
    let chosenModel = fastModels[0];

    for (const model of fastModels) {
      try {
        chosenModel = model;
        geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents,
              generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.5,
                topP: 0.9,
              },
              safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              ],
            }),
          }
        );

        if (geminiRes.ok) break;
      } catch (e) {
        console.warn(`[api/chat] Model ${model} failed, trying next fallback...`, e);
      }
    }

    if (!geminiRes || !geminiRes.ok) {
      console.error('[api/chat] All Gemini models failed');
      res.writeHead(502, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        reply: "I'm having trouble connecting right now. Please email abhikarma.work@gmail.com directly.",
      }));
    }

    const data = await geminiRes.json() as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
      error?: { message?: string };
    };

    if (data.error) {
      console.error('[api/chat] Gemini API error:', data.error.message ?? 'Unknown error');
      res.writeHead(502, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        reply: "I'm having trouble connecting right now. Please email abhikarma.work@gmail.com directly.",
      }));
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      ?? "I couldn't generate a response. Please try again.";

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ reply }));
  } catch (err) {
    console.error('[api/chat] Unexpected error:', err instanceof Error ? err.message : err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      reply: "Something went wrong. Please reach out at abhikarma.work@gmail.com",
    }));
  }
}
