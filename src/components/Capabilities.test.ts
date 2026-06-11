import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Capabilities from './Capabilities.astro';

test('capabilities renders all four artifacts with their key content', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Capabilities);
  expect(html).toContain("CIO's actual fear");
  expect(html).toContain('Decision cockpit');
  expect(html).toContain('data-question-cockpit');
  expect(html).toContain('aria-orientation="vertical"');
  expect(html).toContain('tabindex="-1"');
  expect(html).toContain('data-question-trigger="dissent"');
  expect(html).toContain('Which partners are calibrated?');
  expect(html).toContain('Which beliefs quietly expired?');
  expect(html).toContain('Who was right before consensus moved?');
  expect(html).toContain('Are we repeating an old mistake?');
  expect(html).toContain('S. Reyes');
  expect(html).toContain('D. Park');
  expect(html).toContain('retired 2026-Q1');
  expect(html).toContain('+14 months early');
  expect(html).toContain('active contradiction');
  expect(html).toContain('PRI-0051');
});
