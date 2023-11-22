import { createApiService } from '../services/api';
import { createPointsService } from '../services/points';
import { createTransactionsService } from '../services/transactions';

const apiService = createApiService();

export const transactionsService = createTransactionsService(apiService);
export const pointsService = createPointsService(transactionsService);
