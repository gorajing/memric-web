import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Hero from './Hero.astro';

test('hero states the ledger thesis, CTAs, and typed decision records', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Hero);
  expect(html).toContain('forgets every judgment');
  expect(html).toContain('Institutional');
  expect(html).toContain('mailto:jin@memric.ai');
  expect(html).toContain('Get in touch');
  expect(html).toContain('/meridian-report/');
  expect(html).toContain('View sample report');
  expect(html).toContain('https://github.com/gorajing/memric');
  expect(html).toContain('data-evidence-panel');
  expect(html).toContain('data-ledger-trigger="prediction"');
  expect(html).toContain('source trace active');
  expect(html).toContain('PRI-0042');
  expect(html).toContain('Okafor');
  expect(html).toContain('Decision Ledger');
  expect(html).toContain('Illustrative Meridian example');
});
