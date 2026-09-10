import { siteConfig } from '../../content';
import { assetUrl } from '../../utils/links';
import { getCurrentExperiences, getSectionVisibility } from '../../utils/selectors';
import { usePreferences } from '../Preferences';
import { getExperiences, getProfile, getSiteText } from '../../utils/i18n';
import { heroText } from '../../content/hero';
import { formatExperienceDate } from '../../utils/dates';

export function Hero() {
  const { language } = usePreferences();
  const profile = getProfile(language);
  const siteText = getSiteText(language);
  const text = heroText[language];
  const visible = getSectionVisibility();
  const current = getCurrentExperiences(getExperiences(language));
  const cv = assetUrl(siteConfig.cvPath);
  return <section className="hero editorial-hero" aria-labelledby="hero-title">
    <p className="editorial-location">{profile.location}</p>
    <h1 id="hero-title" className="editorial-name">{profile.name}</h1>
    <div className="editorial-role"><p>{profile.headline}</p><ul aria-label={language === 'es' ? 'Especialidades' : 'Specializations'}>{profile.specialization.map(item => <li key={item}>{item}</li>)}</ul></div>
    <div className="hero-bottom">
      <div><p className="hero-description">{text.description}</p><div className="hero-actions">
        {visible.projects && <a className="button primary" href="#projects">{text.project}<span aria-hidden="true">↗</span></a>}
        {cv && <a className="button" href={cv} download>{siteText.downloadCv}<span aria-hidden="true">↓</span></a>}
        {visible.contact && <a className="text-link" href="#contact">{siteText.contactCta} ↗</a>}
      </div></div>
      {visible.experience && current.length > 0 && <div className="hero-aside">
        {current.map(item => <p className="current-position" key={item.id}><span>{siteText.currentlyAt}</span><a href="#experience">{item.company} <span aria-hidden="true">↗</span></a><small>{item.role}</small><small>{formatExperienceDate(item, language)}</small></p>)}
      </div>}
    </div>
  </section>;
}
