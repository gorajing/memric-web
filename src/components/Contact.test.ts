import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Contact from './Contact.astro';

test('contact has the mailto, GitHub link, and corpus-led CTA', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Contact);
  expect(html).toContain('mailto:jin@memric.ai');
  expect(html).toContain('subject=Memric%20Decision%20Memory%20Audit');
  expect(html).toContain('Audit intake packet');
  expect(html).toContain('Start audit brief');
  expect(html).toContain('Inspect sample');
  expect(html).toContain('https://github.com/gorajing/memric');
  expect(html).toContain('representative corpus');
  expect(html).toContain('Week 4');
  expect(html).toContain('build the ledger');
});
