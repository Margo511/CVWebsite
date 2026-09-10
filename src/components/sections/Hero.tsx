import { siteConfig } from '../../content';
import { assetUrl } from '../../utils/links';
import { getCurrentExperiences, getSectionVisibility } from '../../utils/selectors';
import { usePreferences } from '../Preferences';
import { getExperiences, getProfile, getSiteText } from '../../utils/i18n';

export function Hero() {
  const { language } = usePreferences();
  const profile = getProfile(language);
  const siteText = getSiteText(language);
  const visible = getSectionVisibility();
  const current = getCurrentExperiences(getExperiences(language));
  const cv = assetUrl(siteConfig.cvPath);
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-kicker"><span>{siteText.portfolio}</span><span>{profile.location}</span></div>
    <p className="hero-name">{profile.name}</p>
    <h1 id="hero-title">{profile.headline}<span className="accent">.</span></h1>
    <div className="hero-bottom">
      <div><p className="hero-description">{profile.shortDescription}</p><div className="hero-actions">
        {visible.projects && <a className="button primary" href="#projects">{siteText.viewProjects}<span aria-hidden="true">↗</span></a>}
        {cv && <a className="button" href={cv} download>{siteText.downloadCv}<span aria-hidden="true">↓</span></a>}
        {visible.contact && <a className="text-link" href="#contact">{siteText.contactCta} ↗</a>}
      </div></div>
      <div className="hero-aside"><ul className="specializations">{profile.specialization.map(item => <li key={item}>{item}</li>)}</ul>
        {visible.experience && current.map(item => <p className="current-position" key={item.id}><span>{siteText.currentlyAt}</span><a href="#experience">{item.company} ↗</a><small>{item.role}</small></p>)}
      </div>
    </div>
  </section>;
}
