import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Engagement from './Engagement.astro';

test('engagement describes the audit and shows the 9-section report', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Engagement);
  expect(html).toContain('Decision Memory Audit');
  expect(html).toContain('Decision Memory Report');
  expect(html).toContain('Prediction calibration');
  expect(html).toContain('Intake');
  expect(html).toContain('Report');
});
