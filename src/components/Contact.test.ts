import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Contact from './Contact.astro';

test('contact has the mailto and the one quiet line', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Contact);
  expect(html).toContain('mailto:jin@memric.ai');
  expect(html).toContain('decades of decisions');
});
