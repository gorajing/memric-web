import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import PageRail from './PageRail.astro';

test('page rail renders section anchors and active-state hooks', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(PageRail);
  expect(html).toContain('aria-label="Page sections"');
  expect(html).toContain('data-page-rail');
  expect(html).toContain('data-rail-target="ledger"');
  expect(html).toContain('href="#proof"');
  expect(html).toContain('href="#contact"');
  expect(html).toContain('page-rail-dot');
});
