import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Header } from '../src/components/layout/Header';
import { Hero } from '../src/components/sections/Hero';
import { Projects } from '../src/components/sections/Projects';
import { Terminal } from '../src/components/sections/Terminal';
import { siteConfig } from '../src/content';
import { getNavigation } from '../src/utils/selectors';

test('menu disclosure references a named navigation landmark and starts collapsed', () => {
  const markup = renderToStaticMarkup(createElement(Header));
  const disclosure = markup.match(/<button\b[^>]*aria-controls="([^"]+)"[^>]*>/);
  assert(disclosure, 'The menu needs a native button associated with its navigation');
  assert(disclosure[0].includes('aria-expanded="false"'));
  const navigation = markup.match(new RegExp(`<nav\\b[^>]*id="${disclosure[1]}"[^>]*>`));
  assert(navigation?.[0].match(/aria-label="[^"]+"/), 'Navigation must have an accessible name');
});

test('hero and header fragment links target a visible section or the page top', () => {
  const available = new Set(['top', 'main', ...getNavigation(siteConfig).map(item => item.id)]);
  for (const Component of [Header, Hero]) {
    const markup = renderToStaticMarkup(createElement(Component));
    for (const [, fragment] of markup.matchAll(/href="#([^"]*)"/g)) {
      assert(available.has(fragment), `Broken or empty fragment: #${fragment}`);
    }
  }
});

test('terminal exposes a labelled input, native submit and polite output log', () => {
  const markup = renderToStaticMarkup(createElement(Terminal));
  const input = markup.match(/<input\b[^>]*id="([^"]+)"[^>]*>/);
  assert(input, 'Terminal input needs a stable label target');
  assert(markup.includes(`for="${input[1]}"`));
  assert.match(markup, /role="log"[^>]*aria-live="polite"/);
  assert.match(markup, /<button\b[^>]*type="submit"/);
});

test('project links never render empty or script URLs and protect new browsing contexts', () => {
  const markup = renderToStaticMarkup(createElement(Projects));
  for (const [anchor] of markup.matchAll(/<a\b[^>]*>/g)) {
    assert(!/href="(?:|#|javascript:[^"]*)"/i.test(anchor));
    if (anchor.includes('target="_blank"')) assert.match(anchor, /rel="[^"]*noopener/);
  }
});
