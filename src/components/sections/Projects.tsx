import { useEffect, useRef } from 'react';
import { formatIndex, getVisibleProjects } from '../../utils/sort';
import { ExternalLink, ProjectImage, Tags } from '../ui/Primitives';
import { assetUrl, externalUrl } from '../../utils/links';
import { usePreferences } from '../Preferences';
import { getProjects, getSiteText } from '../../utils/i18n';
import { projectLabels } from '../../content/projectLabels';
import type { Project } from '../../types/content';

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const { language } = usePreferences();
  const labels = projectLabels[language];
  const siteText = getSiteText(language);
  const details = useRef<HTMLDetailsElement>(null);
  const anchor = `project-${project.id}`;
  useEffect(() => {
    const reveal = () => {
      if (window.location.hash === `#${anchor}` && details.current) {
        details.current.open = true;
        document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
      }
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, [anchor]);
  return <article className="project-case" id={anchor} aria-labelledby={`${anchor}-title`}>
    <div className="project-case-index" aria-hidden="true">{formatIndex(index)}</div>
    <div className="project-case-body">
      <p className="project-case-kicker">{labels.caseStudy}</p>
      <h3 id={`${anchor}-title`}>{project.title}</h3>
      <p className="project-case-intro">{project.shortDescription}</p>
      <div className="project-case-context"><h4>{labels.challenge}</h4><p>{project.description}</p></div>
      {project.id === 'erp-ecommerce' && <figure className="project-case-diagram">
        <figcaption>{labels.scope}</figcaption>
        <div className="project-case-systems"><strong>ERP</strong><span aria-hidden="true">↔</span><strong>{labels.commerce}</strong></div>
        <p>{labels.exchange}</p>
        {project.concepts?.length ? <Tags items={project.concepts} /> : null}
      </figure>}
      <details className="project-case-details" ref={details}>
        <summary>{labels.contribution}<span className="project-case-toggle" aria-hidden="true" /></summary>
        {project.responsibilities.length > 0 && <ul className="project-case-work">{project.responsibilities.filter(Boolean).map(line => <li key={line}>{line}</li>)}</ul>}
        <ProjectImage src={project.image} title={project.title} />
        {project.id !== 'erp-ecommerce' && project.concepts?.length ? <><h4>{siteText.concepts}</h4><Tags items={project.concepts} /></> : null}
      </details>
      <div className="project-case-technologies"><h4>{labels.technologies}</h4><Tags items={project.technologies} /></div>
      <div className="project-case-links">
        <a href={`#${anchor}`} onClick={() => { if (details.current) details.current.open = true; }}>{labels.permalink}<span aria-hidden="true"> ↗</span></a>
        {externalUrl(project.github) && <ExternalLink href={project.github}>{siteText.github}</ExternalLink>}
        {externalUrl(project.demo) && <ExternalLink href={project.demo}>{siteText.demo}</ExternalLink>}
      </div>
    </div>
  </article>;
}

export function Projects() {
  const { language } = usePreferences();
  return <div className="project-case-list">
    <link rel="stylesheet" href={assetUrl('/project-case.css')!} />
    {getVisibleProjects(getProjects(language)).map((project, index) => <ProjectCase key={project.id} project={project} index={index} />)}
  </div>;
}
