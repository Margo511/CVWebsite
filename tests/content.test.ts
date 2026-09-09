import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as content from '../src/content';
import { Experience as ExperienceSection } from '../src/components/sections/Experience';
import { Projects } from '../src/components/sections/Projects';
import { Hero } from '../src/components/sections/Hero';
import { Certifications } from '../src/components/sections/ContentSections';
import { Header } from '../src/components/layout/Header';
import { ProjectImage } from '../src/components/ui/Primitives';
import { formatDate, formatExperienceDate, isMonth } from '../src/utils/dates';
import { assetUrl, externalUrl, getSocialLinks } from '../src/utils/links';
import { getCurrentExperiences, getNavigation, getSectionVisibility } from '../src/utils/selectors';
import { formatIndex, getVisibleProjects, sortExperiences } from '../src/utils/sort';
import { runCommand } from '../src/utils/terminal';
import type { Experience, Project, SiteConfig } from '../src/types/content';

const render = (component: Parameters<typeof createElement>[0]) => renderToStaticMarkup(createElement(component));

test('a change of employer updates timeline, current summary and terminal from one array', () => {
  const original = [...content.experiences];
  const previous: Experience = { ...original[0], current: false, endDate: '2028-02' };
  const next: Experience = { ...previous, id: 'next-company', company: 'Next Company Fixture', role: 'Next Role', startDate: '2028-03', endDate: null, current: true };
  try {
    content.experiences.splice(0, content.experiences.length, previous, ...original.slice(1), next);
    assert.equal(getCurrentExperiences()[0].company, next.company);
    const timeline = render(ExperienceSection);
    assert(timeline.indexOf(next.company) < timeline.indexOf(previous.company));
    assert(timeline.includes(formatExperienceDate(previous)));
    const hero = render(Hero);
    assert(hero.includes(next.company));
    assert(!hero.includes(previous.company));
    const terminal = runCommand('experience');
    assert(terminal.indexOf(next.company) < terminal.indexOf(previous.company));
    assert(terminal.includes(formatExperienceDate(next)));
  } finally { content.experiences.splice(0, content.experiences.length, ...original); }
});

test('manual ordering takes precedence without mutating the original array', () => {
  const source = content.experiences.map((item, index) => ({ ...item, order: index === 1 ? 0 : undefined }));
  assert.equal(sortExperiences(source)[0].id, source[1].id);
  assert.equal(source[0].id, content.experiences[0].id);
  const chronological = source.map(item => ({ ...item, current: false, order: undefined }));
  assert.equal(sortExperiences(chronological.reverse())[0].startDate, '2024-07');
});

test('hidden projects disappear from markup and terminal; numbering ignores hidden entries', () => {
  const original = [...content.projects];
  const hidden: Project = { ...original[0], id: 'secret-fixture', title: 'Hidden fixture', visible: false, order: -1 };
  const next: Project = { ...original[0], id: 'next-project', title: 'Visible fixture', visible: true, image: null, github: null, demo: null };
  try {
    content.projects.push(hidden, next);
    const markup = render(Projects);
    assert(!markup.includes(hidden.title));
    assert(!runCommand('projects').includes(hidden.title));
    assert(markup.includes(next.title));
    assert(markup.includes('>02</div>'));
    assert(!markup.includes('>03</div>'));
    assert(!markup.includes('<img'));
    assert(!markup.includes('href=""'));
    assert.equal(getVisibleProjects(content.projects).length, 2);
    assert.equal(formatIndex(9), '10');
  } finally { content.projects.splice(0, content.projects.length, ...original); }
});

test('flags and missing data remove matching menu entries and sections', () => {
  const flags = ['showAbout', 'showExperience', 'showSystems', 'showProjects', 'showSkills', 'showEducation', 'showCertifications', 'showTerminal', 'showContact'] as const;
  const config: SiteConfig = { ...content.siteConfig };
  flags.forEach(flag => { config[flag] = false; });
  assert.deepEqual(getNavigation(config), []);
  assert(Object.values(getSectionVisibility(config)).every(value => !value));
  assert.equal(getSectionVisibility().certifications, false);
  assert.equal(getSectionVisibility().contact, false);
  const before = content.siteConfig.showTerminal;
  try {
    content.siteConfig.showTerminal = false;
    assert(!render(Header).includes('href="#terminal"'));
  } finally { content.siteConfig.showTerminal = before; }
});

test('adding a certification reveals it automatically without a component change', () => {
  const item = { name: 'Certification fixture', issuer: 'Issuer fixture', date: '2028-06', credentialUrl: null };
  try {
    content.certifications.push(item);
    assert.equal(getSectionVisibility().certifications, true);
    assert(getNavigation().some(item => item.id === 'certifications'));
    assert(render(Certifications).includes(item.name));
  } finally { content.certifications.pop(); }
});

test('dates reject malformed months and unknown education end is not current', () => {
  assert(!isMonth('2024-13'));
  assert(!isMonth('...'));
  assert.equal(formatDate(null), '');
  assert.equal(formatDate('2024-07', 'es', 'long'), 'Julio 2024');
  assert.equal(formatDate('2024-07', 'en', 'short'), 'Jul 2024');
  assert(!formatExperienceDate(content.education[0]).includes(content.siteText.current));
});

test('optional and unsafe URLs produce no dead controls; root assets are base-aware', () => {
  assert.equal(externalUrl('javascript:alert(1)'), null);
  assert.equal(externalUrl(''), null);
  assert.equal(assetUrl('//example.com/x'), null);
  assert.equal(assetUrl('/../x'), null);
  assert.equal(assetUrl('/projects/example.webp'), '/projects/example.webp');
  assert.deepEqual(getSocialLinks({ github: '', email: 'invalid' }), []);
  assert.equal(getSocialLinks({ email: 'test@example.com' })[0].href, 'mailto:test@example.com');
  assert.equal(renderToStaticMarkup(createElement(ProjectImage, { src: null, title: 'Fixture' })), '');
});

test('terminal reads current profile, new skill categories and education directly', () => {
  const headline = content.profile.headline;
  try {
    content.profile.headline = 'Updated headline fixture';
    content.skillGroups.push({ id: 'cloud-fixture', title: 'Cloud fixture', skills: ['Docker fixture'] });
    assert(runCommand('whoami').includes(content.profile.headline));
    assert(runCommand('skills').includes('Docker fixture'));
    assert(runCommand('education').includes(content.education[0].institution));
    assert.equal(runCommand('clear'), '');
    assert.equal(runCommand('unknown'), content.siteText.terminal.unknown);
  } finally { content.profile.headline = headline; content.skillGroups.pop(); }
});
