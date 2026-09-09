import { certifications, education, profile, siteText, skillGroups, socialLinks } from '../../content';
import { formatDate, formatExperienceDate } from '../../utils/dates';
import { getSocialLinks } from '../../utils/links';
import { sortByOrder } from '../../utils/sort';
import { ExternalLink, Tags } from '../ui/Primitives';

export function About() {
  return <div className="about-copy">{profile.about.filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}
export function Skills() {
  return <div className="skill-groups">{skillGroups.filter(group => group.skills.length).map(group => <div className="skill-group" key={group.id}><h3>{group.title}</h3><Tags items={group.skills} /></div>)}</div>;
}
export function Education() {
  return <div>{sortByOrder(education, (a, b) => b.startDate.localeCompare(a.startDate)).map(item => <article className="education-row" key={item.id}><p className="date">{formatExperienceDate(item)}</p><div><h3>{item.title}</h3><p>{item.institution}</p>{item.location && <p className="muted">{item.location}</p>}{item.description && <p className="muted">{item.description}</p>}</div></article>)}</div>;
}
export function Certifications() {
  return <div>{[...certifications].sort((a, b) => b.date.localeCompare(a.date)).map((item, index) => <article className="education-row" key={`${item.name}-${index}`}><p className="date">{formatDate(item.date)}</p><div><h3>{item.name}</h3><p className="muted">{item.issuer}</p><ExternalLink href={item.credentialUrl}>{siteText.credential}</ExternalLink></div></article>)}</div>;
}
export function Contact() {
  return <div className="contact-body"><p>{siteText.contactDescription}</p><div className="contact-links">{getSocialLinks(socialLinks).map(link => <a key={link.name} href={link.href} {...(link.name === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{link.label}<span aria-hidden="true">↗</span></a>)}</div></div>;
}
