export const transactionListResponseMock = [
  {
    date: '2023-11-30T00:00:00.000Z',
    amount: '87',
  },
  {
    date: '2023-09-18T00:00:00.000Z',
    amount: '55',
  },
  {
    date: '2023-09-11T00:00:00.000Z',
    amount: '22',
  },
  {
    date: '2023-09-22T00:00:00.000Z',
    amount: '78',
  },
  {
    date: '2023-09-29T00:00:00.000Z',
    amount: '122',
  },
  {
    date: '2023-10-01T00:00:00.000Z',
    amount: '300',
  },
  {
    date: '2023-10-10T00:00:00.000Z',
    amount: '99',
  },
  {
    date: '2023-10-15T00:00:00.000Z',
    amount: '50',
  },
  {
    date: '2023-10-24T00:00:00.000Z',
    amount: '711',
  },
  {
    date: '2023-11-02T00:00:00.000Z',
    amount: '60',
  },
  {
    date: '2023-10-19T00:00:00.000Z',
    amount: '450',
  },
  {
    date: '2023-11-09T00:00:00.000Z',
    amount: '77',
  },
  {
    date: '2023-11-13T00:00:00.000Z',
    amount: '532',
  },
  {
    date: '2023-11-21T00:00:00.000Z',
    amount: '156',
  },
  {
    date: '2023-11-25T00:00:00.000Z',
    amount: '206',
  },
  {
    date: '2023-11-26T00:00:00.000Z',
    amount: '7',
  },
];

export const invalidTransactionListResponseMock = [
  {
    date: 'last Monday',
    amount: 700,
  },
  {
    date: false,
    amount: -9,
  },
  {
    date: 77,
    amount: null,
  },
];

export const transactionListMock = {
  transactions: [
    {
      day: '2023-09-11',
      amount: '22',
    },
    {
      day: '2023-09-18',
      amount: '55',
    },
    {
      day: '2023-09-22',
      amount: '78',
    },
    {
      day: '2023-09-29',
      amount: '122',
    },
    {
      day: '2023-10-01',
      amount: '300',
    },
    {
      day: '2023-10-10',
      amount: '99',
    },
    {
      day: '2023-10-15',
      amount: '50',
    },
    {
      day: '2023-10-19',
      amount: '450',
    },
    {
      day: '2023-10-24',
      amount: '711',
    },
    {
      day: '2023-11-02',
      amount: '60',
    },
    {
      day: '2023-11-09',
      amount: '77',
    },
    {
      day: '2023-11-13',
      amount: '532',
    },
    {
      day: '2023-11-21',
      amount: '156',
    },
    {
      day: '2023-11-25',
      amount: '206',
    },
    {
      day: '2023-11-26',
      amount: '7',
    },
    {
      day: '2023-11-30',
      amount: '87',
    },
  ],
};

export const emptyTransactionListMock = {
  transactions: [],
};
