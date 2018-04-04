/** 
 * A list of default filtering options
 */

const gameFilters = [
    {
      label: 'Genres',
      value: 'genres',
      path: 'genre',
      options: [],
      type: 'array',
      subfilterId: 'name',
    },
    {
      label: 'Platform',
      value: 'platforms',
      path: 'platform',
      options: [],
      type: 'array',
      subfilterId: 'name',
    },
    {
      label: 'Developer',
      value: 'developers',
      path: 'developer',
      options: [],
      type: 'array',
      subfilterId: 'name',
    },
    {
      label: 'Price',
      value: 'price',
      options: [
        { label: 'Free', value: 0, },
        { label: 'Less than $5.00', value: 500, },
        { label: 'Less than $10.00', value: 1000, },
        { label: 'Less than $15.00', value: 1500, },
        { label: 'Less than $20.00', value: 2000, },
        { label: 'Less than $25.00', value: 2500, },
        { label: 'Less than $30.00', value: 3000, },
        { label: 'Less than $40.00', value: 4000, },
        { label: 'Less than $50.00', value: 5000, },
        { label: 'Less than $60.00', value: 6000, },
      ],
      type: 'number',
      op: 'leq',
    },
    {
      label: 'Release',
      value: 'release',
      options: [
        { label: 'Less than 1 year old', value: 1, },
        { label: 'Less than 3 years old', value: 3, },
        { label: 'Less than 5 years old', value: 5, },
        { label: 'Less than 8 years old', value: 8, },
        { label: 'Less than 10 years old', value: 10, },
      ],
      type: 'date',
      op: 'geq',
    },
    {
      label: 'Metacritic',
      value: 'metacritic',
      options: [
        { label: 'Score greater than 50', value: 50, },
        { label: 'Score greater than 60', value: 60, },
        { label: 'Score greater than 70', value: 70, },
        { label: 'Score greater than 80', value: 80, },
        { label: 'Score greater than 90', value: 90, },
      ],
      type: 'number',
      op: 'geq',
    },
];

const developerFilters = [
  {
    label: 'Established',
    value: 'foundation',
    options: [
      { label: 'Less than a year ago', value: 1, },
      { label: 'Less than 5 years ago', value: 5, },
      { label: 'Less than 8 years ago', value: 8, },
      { label: 'Less than 10 years ago', value: 10, },
      { label: 'Less than 20 years ago', value: 20, },
    ],
    type: 'date',
    op: 'geq',
  },
  {
    label: 'Country',
    value: 'country',
    url: 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.json',
    options: [],
    type: 'number',
    op: 'eq',
    subfilterId: 'country-code',
    subfilterLabel: 'name',
  },
  {
    label: 'Games Made',
    value: 'game_count',
    options: [
      { label: 'At least 1 game', value: 1, },
      { label: 'At least 2 games', value: 2, },
      { label: 'At least 5 games', value: 5, },
      { label: 'At least 10 games', value: 10, },
      { label: 'At least 20 games', value: 20, },
      { label: 'At least 100 games', value: 100, },
    ],
    op: 'geq',
    type: 'number',
  }
];

const articleFilters = [
  {
    label: 'Developers Referenced',
    value: 'developer_count',
    options: [
      { label: 'At least 1', value: 1, },
      { label: 'At least 2', value: 2, },
      { label: 'At least 5', value: 5, },
      { label: 'At least 10', value: 10, },
    ],
    op: 'geq',
    type: 'number',
  },
  {
    label: 'Games Referenced',
    value: 'game_count',
    options: [
      { label: 'At least 1 game', value: 1, },
      { label: 'At least 2 games', value: 2, },
      { label: 'At least 5 games', value: 5, },
      { label: 'At least 10 games', value: 10, },
    ],
    op: 'geq',
    type: 'number',
  },
];

export {
  gameFilters,
  developerFilters,
  articleFilters,
};
