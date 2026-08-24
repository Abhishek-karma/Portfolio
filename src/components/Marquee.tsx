const items = [
  { label: '.NET 6+',      icon: '⚙️' },
  { label: 'Azure Cloud',  icon: '☁️' },
  { label: 'CQRS/MediatR', icon: '🔀' },
  { label: 'Angular 15+',  icon: '🅰' },
  { label: 'PostgreSQL',   icon: '🐘' },
  { label: 'SignalR',      icon: '⚡' },
  { label: 'Redis Cache',  icon: '🔴' },
  { label: 'TypeScript',   icon: '🔷' },
  { label: 'Node.js',      icon: '🟩' },
  { label: 'React',        icon: '⚛️' },
];
const marqueeItems = [...items, ...items];

export default function MarqueeSection() {
  return (
    <div className="marquee-wrap py-8 border-y border-border bg-surface overflow-hidden">
      <div className="marquee-track">
        {marqueeItems.map((item, i) => (
          <div key={i}
            className="flex items-center gap-3 whitespace-nowrap text-muted text-sm font-medium
                       transition-colors duration-300 hover:text-accent cursor-default">
            <span className="text-base opacity-60">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
