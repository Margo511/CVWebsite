import { formatExperienceDate } from '../../utils/dates';
import { sortExperiences } from '../../utils/sort';
import { Tags } from '../ui/Primitives';
import { usePreferences } from '../Preferences';
import { getExperiences } from '../../utils/i18n';
import { experienceAreaResponsibilities, experienceSystemsText } from '../../content/experienceSystems';
import './experience-systems.css';

export function Experience() {
  const { language } = usePreferences();
  const text = experienceSystemsText[language];
  return <ol className="career-timeline">{sortExperiences(getExperiences(language)).map(item =>
    <li className={`career-entry${item.current ? ' is-current' : ''}`} key={item.id}>
      <article aria-labelledby={`career-${item.id}`}>
        <div className="career-meta"><p>{formatExperienceDate(item, language)}</p><span>{item.current ? text.current : text.previous}</span></div>
        <div className="career-content">
          <p className="career-company">{item.company}</p>
          <h3 id={`career-${item.id}`}>{item.role}</h3>
          {item.location && <p className="career-location">{item.location}</p>}
          <p className="career-description">{item.description}</p>
          {item.id === 'precognis' ? <div className="career-areas">{experienceAreaResponsibilities.map((indices, index) =>
            <details key={text.areas[index]}><summary>{text.areas[index]}</summary><ul>{indices.map(i => item.responsibilities[i] && <li key={i}>{item.responsibilities[i]}</li>)}</ul></details>
          )}</div> : item.responsibilities.length > 0 && <details className="career-previous-details"><summary>{text.details}</summary><ul>{item.responsibilities.filter(Boolean).map(line => <li key={line}>{line}</li>)}</ul></details>}
          <Tags items={item.technologies} />
        </div>
      </article>
    </li>
  )}</ol>;
}
