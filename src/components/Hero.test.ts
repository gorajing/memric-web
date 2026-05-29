import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Hero from './Hero.astro';

test('hero states the gap, the CTA, and shows the annotated record', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Hero);
  expect(html).toContain('no memory of its own judgment');
  expect(html).toContain('Institutional');
  expect(html).toContain('mailto:jin@memric.ai');
  expect(html).toContain('Get in touch');
  expect(html).toContain('PRI-0042');
  expect(html).toContain('Okafor');
  expect(html).toContain('Illustrative example');
});
