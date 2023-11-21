import {
  invalidTransactionListResponseMock,
  emptyTransactionListMock,
  transactionListMock,
  transactionListResponseMock,
} from '../mocks/transactions';
import { createApiService } from './api';
import { createTransactionsService } from './transactions';

const apiService = createApiService();
const transactionsService = createTransactionsService(apiService);

describe('TransactionsService getTransactionsLatest3Months', () => {
  it('calls the api with correct params', async () => {
    jest.spyOn(transactionsService, 'getCurrentDate').mockImplementation(() => {
      return new Date(2008, 8, 8);
    });

    const expectedFrom = '2008-07-01';
    const expectedTo = '2008-09-30';

    fetchMock.mockResponseOnce('');

    await transactionsService.getTransactionsLatest3Months();

    expect(fetch.mock.calls.length).toEqual(1);

    const url = fetch.mock.calls[0][0];
    const search = new URLSearchParams(url.split('?').pop());

    expect(search.get('date_from')).toEqual(expectedFrom);
    expect(search.get('date_to')).toEqual(expectedTo);
  });

  it('returns a list of transactions when api response valid', async () => {
    const responseJson = transactionListResponseMock;
    const expectedJson = transactionListMock;

    fetchMock.mockResponseOnce(JSON.stringify(responseJson));

    const result = await transactionsService.getTransactionsLatest3Months();

    expect(result.data).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });

  it('returns an empty list of transactions when api response invalid', async () => {
    const responseJson = invalidTransactionListResponseMock;
    const expectedJson = emptyTransactionListMock;

    fetchMock.mockResponseOnce(JSON.stringify(responseJson));

    const result = await transactionsService.getTransactionsLatest3Months();

    expect(result.data).toEqual(expectedJson);
    expect(result.error).toEqual(null);
  });
});
