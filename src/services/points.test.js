import { createApiService } from './api';
import { createPointsService } from './points';
import { createTransactionsService } from './transactions';
import {
  emptyTransactionListMock,
  invalidTransactionListResponseMock,
  transactionListResponseMock,
} from '../mocks/transactions';
import { emptyMonthlyPointsMock, monthlyPointsMock, pointListMock } from '../mocks/points';

const apiService = createApiService();
const transactionsService = createTransactionsService(apiService);
const pointsService = createPointsService(transactionsService);

describe('PointsService getPointsLatest3Months', () => {
  it('returns a list of transaction points when api response valid', async () => {
    const responseJson = transactionListResponseMock;
    const expectedJson = pointListMock;

    fetchMock.mockResponseOnce(JSON.stringify(responseJson));

    const result = await pointsService.getPointsLatest3Months();

    expect(result.data).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });

  it('returns an empty list of transaction points when api response invalid', async () => {
    const responseJson = invalidTransactionListResponseMock;
    const expectedJson = emptyTransactionListMock;

    fetchMock.mockResponseOnce(JSON.stringify(responseJson));

    const result = await pointsService.getPointsLatest3Months();

    expect(result.data).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });
});

describe('PointsService getMonthlyPointsLatest3Months', () => {
  it('returns a list of monthly points when api response valid', async () => {
    const responseJson = transactionListResponseMock;
    const expectedJson = monthlyPointsMock;

    fetchMock.mockResponseOnce(JSON.stringify(responseJson));

    const result = await pointsService.getMonthlyPointsLatest3Months();

    expect(result.data).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });

  it('returns an empty list of monthly points when api response invalid', async () => {
    const responseJson = invalidTransactionListResponseMock;
    const expectedJson = emptyMonthlyPointsMock;

    fetchMock.mockResponseOnce(JSON.stringify(responseJson));

    const result = await pointsService.getMonthlyPointsLatest3Months();

    expect(result.data).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });
});
