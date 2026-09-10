import { useEffect, useRef, useState } from 'react';
import { systemConnections } from '../../content';
import { usePreferences } from '../Preferences';
import { getSiteText, getSystems } from '../../utils/i18n';

export function Systems() {
  const { language } = usePreferences();
  const siteText = getSiteText(language);
  const systems = getSystems(language);
  const diagram = useRef<HTMLDivElement>(null);
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const ordered = [...systems].sort((a, b) => Number(Boolean(b.central)) - Number(Boolean(a.central)));
  const connections = systemConnections.filter(([from, to]) => systems.some(node => node.id === from) && systems.some(node => node.id === to));
  // Measure the responsive CSS grid so any number of nodes, and long content,
  // can grow naturally. The SVG uses the same real positions at every width.
  useEffect(() => {
    const measure = () => {
      const rect = diagram.current?.getBoundingClientRect();
      if (!rect) return;
      const next = Object.fromEntries([...nodes.current].map(([id, element]) => {
        const node = element.getBoundingClientRect();
        return [id, { x: node.left - rect.left + node.width / 2, y: node.top - rect.top + node.height / 2 }];
      }));
      setPositions(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    if (diagram.current) observer.observe(diagram.current);
    nodes.current.forEach(node => observer.observe(node));
    measure();
    return () => observer.disconnect();
  }, [language]);
  return <div className="systems-wrap">
    <div className="systems-diagram" ref={diagram}>
      <svg className="system-lines" aria-hidden="true">
        {connections.map(([from, to], index) => positions[from] && positions[to] ? <line key={index} x1={positions[from].x} y1={positions[from].y} x2={positions[to].x} y2={positions[to].y} /> : null)}
      </svg>
      {ordered.map(node => <div key={node.id} ref={element => { if (element) nodes.current.set(node.id, element); else nodes.current.delete(node.id); }} className={`system-node${node.central ? ' central-node' : ''}`}><h3>{node.label}</h3>{node.description && <p>{node.description}</p>}</div>)}
    </div>
    {connections.length > 0 && <details className="connections"><summary>{siteText.connections}</summary><ul>{connections.map(([from, to], index) => <li key={index}>{systems.find(node => node.id === from)?.label} <span aria-hidden="true">↔</span> {systems.find(node => node.id === to)?.label}</li>)}</ul></details>}
  </div>;
}
