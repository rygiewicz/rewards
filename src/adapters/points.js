export function adaptTransactionPointList(data) {
  // assumes data is product of adaptTransactionList

  return {
    transactions: data.transactions.map((item) => {
      return {
        day: item.day,
        amount: item.amount,
        points: calculatePoints(item.amount),
      };
    }),
  };
}

export function adaptMonthlyPointList(data) {
  // assumes data is product of adaptTransactionPointList
  // assumes transactions are sorted by day

  const result = {
    transactions: [],
    totalPoints: 0,
  };

  let currentMonth = null;
  let currentPoints = 0;
  let totalPoints = 0;

  data.transactions.forEach((item, index) => {
    const isLast = index === data.transactions.length - 1;
    const month = item.day.slice(0, 7);

    if (!currentMonth) {
      currentMonth = month;
    }

    if (month !== currentMonth) {
      result.transactions.push({
        month: currentMonth,
        points: currentPoints,
      });

      currentMonth = month;
      currentPoints = 0;
    }

    currentPoints += item.points;
    totalPoints += item.points;

    if (isLast) {
      result.transactions.push({
        month: currentMonth,
        points: currentPoints,
      });
    }
  });

  result.totalPoints = totalPoints;

  return result;
}

function calculatePoints(amount) {
  amount = parseInt(amount) || 0;

  if (amount < 51) {
    return 0;
  }

  if (amount < 101) {
    return amount - 50;
  }

  return 50 + 2 * (amount - 100);
}
