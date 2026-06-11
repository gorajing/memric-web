import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Footer from './Footer.astro';

test('footer closes with the audit CTA, sample report, and memory signals', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Footer);
  expect(html).toContain('next memo argue');
  expect(html).toContain('/meridian-report/');
  expect(html).toContain('https://github.com/gorajing/memric');
  expect(html).toContain('mailto:jin@memric.ai');
  expect(html).toContain('Memric%20Decision%20Memory%20Audit');
  expect(html).toContain('prediction');
  expect(html).toContain('contradiction');
});
