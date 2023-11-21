export function createTransactionsService(apiService) {
  const service = {};

  service.getTransactions = (filters) => {
    const params = new URLSearchParams(filters);

    return apiService.get(`/transactions?${params}`);
  };

  service.getTransactionsLatest3Months = async () => {
    const now = service.getCurrentDate();
    const dateFrom = getFirstDayOfMonth(now.getFullYear(), now.getMonth() - 2);
    const dateTo = getLastDayOfMonth(now.getFullYear(), now.getMonth());

    const response = await service.getTransactions({ date_from: dateFrom, date_to: dateTo });

    return response;
  };

  service.getCurrentDate = () => {
    return new Date();
  };

  return service;
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1, 12).toISOString().slice(0, 10);
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0, 12).toISOString().slice(0, 10);
}
