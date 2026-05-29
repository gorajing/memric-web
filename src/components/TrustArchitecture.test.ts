import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import TrustArchitecture from './TrustArchitecture.astro';

test('trust section shows lineage edges and the local-deployment claim', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(TrustArchitecture);
  expect(html).toContain('SUPERSEDES');
  expect(html).toContain('RETIRES');
  expect(html).toContain('lineage');
  expect(html).toContain('your environment');
});
