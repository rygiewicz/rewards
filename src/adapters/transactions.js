export function adaptTransactionList(data) {
  data = data || {};

  const result = {
    transactions: [],
  };

  if (!Array.isArray(data)) {
    return result;
  }

  data.forEach((item) => {
    item = item || {};

    const date = new Date(item.date);

    if (!date.getTime()) {
      return;
    }

    const day = date.toISOString().slice(0, 10);
    const amount = item.amount;

    if (typeof amount !== 'string') {
      return;
    }

    result.transactions.push({
      day,
      amount,
    });
  });

  return result;
}
