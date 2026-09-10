import { formatIndex, getVisibleProjects } from '../../utils/sort';
import { ExternalLink, ProjectImage, Tags } from '../ui/Primitives';
import { externalUrl } from '../../utils/links';
import { usePreferences } from '../Preferences';
import { getProjects, getSiteText } from '../../utils/i18n';

export function Projects() {
  const { language } = usePreferences();
  const projects = getProjects(language);
  const siteText = getSiteText(language);
  return <div className="project-list">{getVisibleProjects(projects).map((project, index) => <article className="project" key={project.id}>
    <div className="project-number" aria-hidden="true">{formatIndex(index)}</div>
    <div className="project-content"><div className="project-heading"><h3>{project.title}</h3>{project.featured && <span className="featured">{siteText.featured}</span>}</div>
      <p className="muted project-intro">{project.shortDescription}</p>
      <ProjectImage src={project.image} title={project.title} />
      <Tags items={project.technologies} />
      {(project.description || project.responsibilities.length > 0 || project.concepts?.length) ? <details>
        <summary>{siteText.details}<span aria-hidden="true">+</span></summary>
        {project.description && <p className="muted">{project.description}</p>}
        {project.responsibilities.length > 0 && <><h4>{siteText.responsibilities}</h4><ul className="responsibilities">{project.responsibilities.filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}</ul></>}
        {project.concepts?.length ? <><h4>{siteText.concepts}</h4><Tags items={project.concepts} /></> : null}
      </details> : null}
      {(externalUrl(project.github) || externalUrl(project.demo)) && <div className="project-links"><ExternalLink href={project.github}>{siteText.github}</ExternalLink><ExternalLink href={project.demo}>{siteText.demo}</ExternalLink></div>}
    </div>
  </article>)}</div>;
}
