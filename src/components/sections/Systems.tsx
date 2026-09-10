import { useId, useState } from 'react';
import { usePreferences } from '../Preferences';
import { experienceSystemsText } from '../../content/experienceSystems';
import './experience-systems.css';

export function Systems() {
  const { language } = usePreferences();
  const text = experienceSystemsText[language];
  const [selected, setSelected] = useState(0);
  const id = useId();
  const stage = text.stages[selected];
  return <div className="integration-flow">
    <p className="flow-label">{text.illustration}</p>
    <h3>{text.title}</h3>
    <p className="flow-note">{text.note}</p>
    <div className="flow-context"><strong>ERP</strong><span><span aria-hidden="true">↔ </span>{text.data}<span aria-hidden="true"> ↔</span></span><strong>E-commerce</strong></div>
    <p className="flow-help" id={`${id}-help`}>{text.help}</p>
    <ol className="flow-stages" aria-label={text.explore} aria-describedby={`${id}-help`}>
      {text.stages.map((item, index) => <li key={index}>
        <button type="button" aria-pressed={selected === index} aria-controls={`${id}-detail`} onClick={() => setSelected(index)}>
          <span className="flow-step-number" aria-hidden="true">0{index + 1}</span>
          <span><strong>{item.title}</strong><span className="flow-step-summary">{item.summary}</span></span>
        </button>
      </li>)}
    </ol>
    <div className="flow-detail" id={`${id}-detail`} role="region" aria-label={text.explore} aria-live="polite" aria-atomic="true">
      <h4>{stage.title}</h4><p>{stage.description}</p>
    </div>
    <details className="flow-transcript"><summary>{text.full}</summary><ol>{text.stages.map(item => <li key={item.title}><strong>{item.title}.</strong> {item.description}</li>)}</ol></details>
  </div>;
}
