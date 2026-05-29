import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from './Nav.astro';

test('nav renders the wordmark and section anchors', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Nav);
  expect(html).toContain('MEMRIC');
  expect(html).toContain('href="#approach"');
  expect(html).toContain('href="#contact"');
  expect(html).toContain('href="#surfaces"');
});
