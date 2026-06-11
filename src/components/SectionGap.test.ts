import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import SectionGap from './SectionGap.astro';

test('gap section contrasts preserved artifacts with typed memory', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(SectionGap);
  expect(html).toContain('Search finds the memo');
  expect(html).toContain('Before / preserved artifacts');
  expect(html).toContain('After / typed memory');
  expect(html).toContain('State fingerprint');
  expect(html).toContain('data-state-panel');
  expect(html).toContain('data-state-source="dissent"');
  expect(html).toContain('J. Okafor');
  expect(html).toContain('Retirement');
});
