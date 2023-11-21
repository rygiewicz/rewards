import { createApiService } from './api';
import { createPointsService } from './points';
import { createTransactionsService } from './transactions';
import { transactionListResponseMock } from '../mocks/transactions';
import { monthlyPointsMock, pointListMock } from '../mocks/points';

const apiService = createApiService();
const transactionsService = createTransactionsService(apiService);
const pointsService = createPointsService(transactionsService);

describe('PointsService getPointsLatest3Months', () => {
  it('returns a list of transaction points when api response valid', async () => {
    const responseJson = JSON.stringify(transactionListResponseMock);
    const expectedJson = JSON.stringify(pointListMock);

    fetchMock.mockResponseOnce(responseJson);

    const result = await pointsService.getPointsLatest3Months();

    expect(JSON.stringify(result.data)).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });
});

describe('PointsService getMonthlyPointsLatest3Months', () => {
  it('returns a list of monthly points when api response valid', async () => {
    const responseJson = JSON.stringify(transactionListResponseMock);
    const expectedJson = JSON.stringify(monthlyPointsMock);

    fetchMock.mockResponseOnce(responseJson);

    const result = await pointsService.getMonthlyPointsLatest3Months();

    expect(JSON.stringify(result.data)).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });
});
