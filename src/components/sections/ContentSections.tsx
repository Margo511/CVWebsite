import { certifications, socialLinks } from '../../content';
import { formatDate, formatExperienceDate } from '../../utils/dates';
import { getSocialLinks } from '../../utils/links';
import { sortByOrder } from '../../utils/sort';
import { ExternalLink } from '../ui/Primitives';
import { usePreferences } from '../Preferences';
import { getEducation, getSiteText } from '../../utils/i18n';
import { getAppliedSkillGroups, supportingText } from '../../content/supporting-sections';

if (typeof document !== 'undefined') void import('./supporting-sections.css');

export function About() {
  const { language } = usePreferences();
  return <div className="about-copy supporting-about">{supportingText[language].about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>;
}
export function Skills() {
  const { language } = usePreferences();
  return <div className="applied-skills">{getAppliedSkillGroups(language).map(group => <div className="applied-skill-group" key={group.id}><h3>{group.title}</h3><dl>{group.skills.map(skill => <div key={skill.technology}><dt>{skill.technology}</dt><dd>{skill.use}</dd></div>)}</dl></div>)}</div>;
}
export function Education() {
  const { language } = usePreferences();
  const education = getEducation(language);
  return <div>{sortByOrder(education, (a, b) => b.startDate.localeCompare(a.startDate)).map(item => <article className="education-row" key={item.id}><p className="date">{!item.endDate ? `${supportingText[language].started} · ${formatDate(item.startDate, language)}` : formatExperienceDate(item, language)}</p><div><h3>{item.title}</h3><p>{item.institution}</p>{item.location && <p className="muted">{item.location}</p>}{item.description && <p className="muted">{item.description}</p>}</div></article>)}</div>;
}
export function Certifications() {
  const { language } = usePreferences();
  const siteText = getSiteText(language);
  return <div>{[...certifications].sort((a, b) => b.date.localeCompare(a.date)).map((item, index) => <article className="education-row" key={`${item.name}-${index}`}><p className="date">{formatDate(item.date, language)}</p><div><h3>{item.name}</h3><p className="muted">{item.issuer}</p><ExternalLink href={item.credentialUrl}>{siteText.credential}</ExternalLink></div></article>)}</div>;
}
export function Contact() {
  const { language } = usePreferences();
  const links = getSocialLinks(socialLinks);
  if (!links.length) return null;
  return <div className="contact-body"><p>{supportingText[language].contact}</p><div className="contact-links">{links.map(link => <a key={link.name} href={link.href} {...(link.name === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{link.label}<span aria-hidden="true">↗</span></a>)}</div></div>;
}
