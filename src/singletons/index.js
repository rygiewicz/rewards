import { adaptTransactionList } from '../adapters/transactions';
import { transactionListResponseMock } from '../mocks/transactions';
import { createApiService } from '../services/api';
import { createPointsService } from '../services/points';
import { createTransactionsService } from '../services/transactions';

const apiService = createApiService();

export const transactionsService = createTransactionsService(apiService);
export const pointsService = createPointsService(transactionsService);

// mocks

transactionsService.getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        error: null,
        data: adaptTransactionList(transactionListResponseMock),
      });
    }, 2000);
  });
};
