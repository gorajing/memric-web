import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Engagement from './Engagement.astro';

test('engagement shows the Meridian proof run and 9-section report', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Engagement);
  expect(html).toContain('Decision Memory Audit');
  expect(html).toContain('Decision Memory Report');
  expect(html).toContain('Meridian proof run');
  expect(html).toContain('/meridian-report/');
  expect(html).toContain('Open sample report');
  expect(html).toContain('12 demo documents');
  expect(html).toContain('Typed judgment records');
  expect(html).toContain('Prediction calibration');
  expect(html).toContain('Report');
});
