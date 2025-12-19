import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Todo List worker', () => {
	it('responds with Todo List HTML (unit style)', async () => {
		const request = new Request('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		const text = await response.text();
		expect(text).toContain('Stunning Todo List');
		expect(response.headers.get('content-type')).toContain('text/html');
	});

	it('responds with Todo List HTML (integration style)', async () => {
		const response = await SELF.fetch('http://example.com');
		const text = await response.text();
		expect(text).toContain('Stunning Todo List');
		expect(response.headers.get('content-type')).toContain('text/html');
	});
});
