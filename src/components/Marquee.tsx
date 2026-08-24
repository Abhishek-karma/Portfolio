import { Braces, Cloud, Share2, Component, Database, RadioTower, Layers, Code2, Hexagon, Atom } from 'lucide-react';

const items = [
  { label: '.NET 6+',       Icon: Braces },
  { label: 'Azure Cloud',   Icon: Cloud },
  { label: 'CQRS / MediatR', Icon: Share2 },
  { label: 'Angular 15+',   Icon: Component },
  { label: 'PostgreSQL',    Icon: Database },
  { label: 'SignalR',       Icon: RadioTower },
  { label: 'Redis Cache',   Icon: Layers },
  { label: 'TypeScript',    Icon: Code2 },
  { label: 'Node.js',       Icon: Hexagon },
  { label: 'React',         Icon: Atom },
];
const marqueeItems = [...items, ...items];

export default function MarqueeSection() {
  return (
    <div className="marquee-wrap py-8 border-y border-border bg-surface overflow-hidden">
      <div className="marquee-track">
        {marqueeItems.map((item, i) => (
          <div key={i}
            className="flex items-center gap-2.5 whitespace-nowrap text-muted text-sm font-medium
                       transition-colors duration-300 hover:text-accent cursor-default">
            <item.Icon size={17} strokeWidth={1.75} className="opacity-70 shrink-0" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
