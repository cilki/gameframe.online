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
      op: 'less than',
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
      op: 'greater than',
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
      op: 'greater than',
    },
];

export {
  gameFilters,
};
