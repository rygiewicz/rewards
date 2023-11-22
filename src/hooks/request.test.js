import { renderHook, waitFor } from '@testing-library/react';
import { useRequest } from './request';
import { createApiService } from '../services/api';

const apiService = createApiService();

describe('useRequest', () => {
  it('returns initial values for data, error and loading', async () => {
    fetch.mockResponseOnce(delayedResponse('{}'));

    const fetchFn = () => apiService.get('/test-request');
    const { result } = renderHook(() => useRequest(fetchFn));
    const { data, error, loading } = result.current;

    expect(data).toEqual(null);
    expect(error).toEqual(null);
    expect(loading).toEqual(true);
  });

  it('returns data', async () => {
    const expectedJson = { name: 'John', age: 55 };

    fetch.mockResponseOnce(JSON.stringify(expectedJson));

    const fetchFn = () => apiService.get('/test-request');
    const { result } = renderHook(() => useRequest(fetchFn));

    await waitFor(() => {
      const { data, error, loading } = result.current;

      expect(data).toEqual(expectedJson);
      expect(error).toEqual(null);
      expect(loading).toEqual(false);
    });
  });

  it('initially returns loading true and then false', async () => {
    fetch.mockResponseOnce('{}');

    const fetchFn = () => apiService.get('/test-request');
    const { result } = renderHook(() => useRequest(fetchFn));
    const { loading } = result.current;

    expect(loading).toEqual(true);

    await waitFor(() => {
      const { loading } = result.current;

      expect(loading).toEqual(false);
    });
  });

  it('returns an error', async () => {
    const expectedCode = apiService.defaultErrorCode;
    const expectedMessage = apiService.defaultErrorMessage;

    fetch.mockRejectOnce(new Error(expectedMessage));

    const fetchFn = () => apiService.get('/test-request');
    const { result } = renderHook(() => useRequest(fetchFn));

    await waitFor(() => {
      const { error } = result.current;

      expect(error.code).toEqual(expectedCode);
      expect(error.message).toEqual(expectedMessage);
    });
  });

  it('allows to retry', async () => {
    fetch.mockResponse(delayedResponse('{}'));

    const fetchFn = jest.fn().mockImplementation(() => apiService.get('/test-request'));
    const { result } = renderHook(() => useRequest(fetchFn));

    expect(fetchFn).toHaveBeenCalledTimes(1);

    const { retry } = result.current;

    retry();

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});
