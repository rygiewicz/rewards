import { createApiService } from './api';

const apiService = createApiService();

describe('ApiService get', () => {
  it('returns error and data attributes', async () => {
    const result = await apiService.get('/some-path');

    expect(result.data).toBeDefined();
    expect(result.error).toBeDefined();
  });

  it('returns correct error and data when request is rejected', async () => {
    const expectedCode = apiService.defaultErrorCode;
    const expectedMessage = 'abcd1234';

    fetch.mockRejectOnce(new Error(expectedMessage));

    const result = await apiService.get('/some-path');

    expect(result.data).toEqual(null);
    expect(result.error.code).toEqual(expectedCode);
    expect(result.error.message).toEqual(expectedMessage);
  });

  it('returns correct error and data when request is aborted', async () => {
    const expectedCode = apiService.defaultErrorCode;
    const expectedMessage = apiService.defaultErrorMessage;

    fetch.mockAbortOnce();

    const result = await apiService.get('/some-path');

    expect(result.data).toEqual(null);
    expect(result.error.code).toEqual(expectedCode);
    expect(result.error.message).toEqual(expectedMessage);
  });

  it('allows aborting a request', async () => {
    const expectedCode = apiService.defaultErrorCode;
    const expectedMessage = apiService.defaultErrorMessage;

    fetch.mockResponseOnce(delayedResponse('{}'));

    const abortController = new AbortController();
    const promise = apiService.get('/some-path', { signal: abortController.signal });
    abortController.abort();

    const result = await promise;

    expect(result.data).toEqual(null);
    expect(result.error.code).toEqual(expectedCode);
    expect(result.error.message).toEqual(expectedMessage);
  });

  it('returns correct error and data when http error', async () => {
    const expectedCode = 500;
    const expectedMessage = apiService.defaultErrorMessage;

    fetchMock.mockResponseOnce('', {
      status: expectedCode,
    });

    const result = await apiService.get('/some-path');

    expect(result.data).toEqual(null);
    expect(result.error.code).toEqual(expectedCode);
    expect(result.error.message).toEqual(expectedMessage);
  });

  it('returns correct error and data when json error', async () => {
    const expectedCode = apiService.defaultErrorCode;

    fetchMock.mockResponseOnce('@@@');

    const result = await apiService.get('/some-path');

    expect(result.data).toEqual(null);
    expect(result.error.code).toEqual(expectedCode);
    expect(typeof result.error.message).toEqual('string');
  });

  it('returns correct error and data when success', async () => {
    const expectedJson = JSON.stringify({ name: 'John', age: 55 });

    fetchMock.mockResponseOnce(expectedJson);

    const result = await apiService.get('/some-path');

    expect(JSON.stringify(result.data)).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });
});

describe('ApiService createErrorResponse', () => {
  it('parses falsy fetch error correctly', () => {
    const expectedCode = apiService.defaultErrorCode;
    const expectedMessage = apiService.defaultErrorMessage;
    const response = apiService.createErrorResponse(null);

    expect(response.data).toEqual(null);
    expect(response.error.code).toEqual(expectedCode);
    expect(response.error.message).toEqual(expectedMessage);
  });

  it('parses basic fetch error correctly', () => {
    const expectedCode = apiService.defaultErrorCode;
    const expectedMessage = 'abcd1234';
    const response = apiService.createErrorResponse(new Error(expectedMessage));

    expect(response.data).toEqual(null);
    expect(response.error.code).toEqual(expectedCode);
    expect(response.error.message).toEqual(expectedMessage);
  });
});
