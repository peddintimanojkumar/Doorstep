/**
 * mockResponse
 * Resolves `data` after a short delay so loading states behave the way
 * they will against a real network. Delete usages as endpoints go live.
 */
export function mockResponse(data, delayMs = 250) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}
