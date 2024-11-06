function objectToQuerystring(
  params: Record<string, string | number | boolean | null | undefined>
) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params?.[key] || "")}`)
    .join("&");
}

function mockedRequest<T>(mockResponse: T, delay = 2000) {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(mockResponse);
    }, delay);
  });
}

function createFetchInterceptor() {
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    const [resource, config] = args;

    // Renew token here
    // If not renewable, redirect to login

    return await originalFetch(resource, config);
  };
}

export { objectToQuerystring, mockedRequest, createFetchInterceptor };
