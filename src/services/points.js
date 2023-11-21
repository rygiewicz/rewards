import { adaptMonthlyPointList, adaptTransactionPointList } from '../adapters/points';

export function createPointsService(transactionsService) {
  const service = {};

  service.getPointsLatest3Months = async () => {
    const response = await transactionsService.getTransactionsLatest3Months();

    return {
      ...response,
      data: adaptTransactionPointList(response.data),
    };
  };

  service.getMonthlyPointsLatest3Months = async () => {
    const response = await service.getPointsLatest3Months();

    return {
      ...response,
      data: adaptMonthlyPointList(response.data),
    };
  };

  return service;
}
