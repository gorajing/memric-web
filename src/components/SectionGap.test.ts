import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import SectionGap from './SectionGap.astro';

test('gap section states the problem and shows un-indexed artifacts', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(SectionGap);
  expect(html).toContain('perfect records');
  expect(html).toContain('no memory');
  expect(html).toContain('un-indexed');
});
