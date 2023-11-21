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

  sortByDay(result.transactions);

  return result;
}

function sortByDay(transactions) {
  transactions.sort((a, b) => {
    if (a.day > b.day) {
      return 1;
    }

    if (b.day > a.day) {
      return -1;
    }

    return 0;
  });
}
