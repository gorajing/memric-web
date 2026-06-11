import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from './Nav.astro';

test('nav renders the wordmark and section anchors', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Nav);
  expect(html).toContain('Memric');
  expect(html).toContain('href="#proof"');
  expect(html).toContain('href="#audit"');
  expect(html).toContain('href="#contact"');
  expect(html).toContain('href="#surfaces"');
  expect(html).toContain('href="/meridian-report/"');
  expect(html).toContain('data-section-target="proof"');
  expect(html).toContain('nav-progress');
  expect(html).toContain('--nav-progress');
});
