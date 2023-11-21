import { renderHook } from '@testing-library/react';
import { useRequest } from './request';
import { createApiService } from '../services/api';

const apiService = createApiService();

describe('useRequest', () => {
  it('should return the initial values for data, error and loading', async () => {
    fetch.mockResponseOnce(delayedResponse('{}'));

    const fetchFn = () => apiService.get('/test-request');
    const { result } = renderHook(() => useRequest(fetchFn));
    const { data, error, loading } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(loading).toBe(true);
  });
});
