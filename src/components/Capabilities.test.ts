import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Capabilities from './Capabilities.astro';

test('capabilities renders all four artifacts with their key content', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Capabilities);
  expect(html).toContain('Calibration, per author');
  expect(html).toContain('S. Reyes');
  expect(html).toContain('D. Park');
  expect(html).toContain('retired 2026-Q1');
  expect(html).toContain('+14 months early');
  expect(html).toContain('active contradiction');
  expect(html).toContain('PRI-0051');
});
