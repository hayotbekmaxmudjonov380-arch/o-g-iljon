import assert from 'node:assert/strict';
import { parseGeminiError } from './aiErrorUtils';

// 1. Billing / free-tier unavailable 403 JSON payload
{
  const raw = JSON.stringify({
    error: {
      code: 403,
      message:
        'The Gemini API free tier is not available for this project. To use the Gemini API, please set up billing to upgrade to the paid tier at https://aistudio.google.com/billing.',
      status: 'PERMISSION_DENIED',
    },
  });
  const parsed = parseGeminiError(new Error(raw));
  assert.equal(parsed.httpStatus, 403);
  assert.equal(parsed.code, 'BILLING_REQUIRED');
  assert.equal(parsed.retryable, false);
  assert.ok(parsed.userMessage.includes('Settings > Secrets'));
  assert.ok(!parsed.userMessage.includes('{'));
}

// 2. Generic 403 permission denied
{
  const raw =
    'ApiError: {"error":{"code":403,"message":"Request had insufficient authentication scopes.","status":"PERMISSION_DENIED"}}';
  const parsed = parseGeminiError(new Error(raw));
  assert.equal(parsed.httpStatus, 403);
  assert.equal(parsed.code, 'PERMISSION_DENIED');
  assert.equal(parsed.retryable, false);
}

// 3. Invalid API key 400
{
  const parsed = parseGeminiError({
    status: 400,
    message: '{"error":{"code":400,"message":"API key not valid. Please pass a valid API key.","status":"INVALID_ARGUMENT"}}',
  });
  assert.equal(parsed.httpStatus, 400);
  assert.equal(parsed.code, 'API_KEY_INVALID');
  assert.equal(parsed.retryable, false);
}

// 4. Quota exceeded 429 is retryable
{
  const parsed = parseGeminiError({
    status: 429,
    message: '{"error":{"code":429,"message":"Resource exhausted","status":"RESOURCE_EXHAUSTED"}}',
  });
  assert.equal(parsed.httpStatus, 429);
  assert.equal(parsed.code, 'QUOTA_EXCEEDED');
  assert.equal(parsed.retryable, true);
}

// 5. Model not found 404
{
  const parsed = parseGeminiError({
    status: 404,
    message: '{"error":{"code":404,"message":"Model not found","status":"NOT_FOUND"}}',
  });
  assert.equal(parsed.httpStatus, 404);
  assert.equal(parsed.code, 'MODEL_NOT_FOUND');
  assert.equal(parsed.retryable, false);
}

// 6. Transient 503
{
  const parsed = parseGeminiError({
    status: 503,
    message: 'Service temporarily overloaded',
  });
  assert.equal(parsed.httpStatus, 503);
  assert.equal(parsed.code, 'TRANSIENT_ERROR');
  assert.equal(parsed.retryable, true);
}

console.log('aiErrorUtils tests passed');
