import { experiences } from '../../content';
import { formatExperienceDate } from '../../utils/dates';
import { sortExperiences } from '../../utils/sort';
import { Tags } from '../ui/Primitives';

export function Experience() {
  return <div className="timeline">{sortExperiences(experiences).map(item => <article className={`experience-row${item.current ? ' current' : ''}`} key={item.id}>
    <div className="experience-meta"><p className="date">{formatExperienceDate(item)}</p>{item.location && <p className="muted">{item.location}</p>}</div>
    <div className="experience-body"><h3>{item.role}</h3><p className="company">{item.company}</p><p className="muted">{item.description}</p>
      {item.responsibilities.length > 0 && <ul className="responsibilities">{item.responsibilities.filter(Boolean).map((line, index) => <li key={index}>{line}</li>)}</ul>}
      <Tags items={item.technologies} />
    </div>
  </article>)}</div>;
}
