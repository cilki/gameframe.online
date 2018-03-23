
/**
 * A common, shared file for
 * reducing code duplication for
 * normailzr schemas
 */

import { schema } from 'normalizr';

const developersSchema = new schema.Entity('developers', {}, {
  idAttribute: 'developer_id',
});
const articlesSchema = new schema.Entity('articles', {}, {
  idAttribute: 'article_id',
});
const gamesSchema = new schema.Entity('games', {}, {
  idAttribute: 'game_id',
});

const games = new schema.Entity(
  'games',
  {
    articles: [articlesSchema],
    developers: [developersSchema],
  },
  {
    idAttribute: 'game_id',
  },
);
const developers = new schema.Entity(
  'developers',
  {
    articles: [articlesSchema],
    games: [gamesSchema],
  },
  {
    idAttribute: 'developer_id',
  },
);
const articles = new schema.Entity(
  'articles',
  {
    developers: [developersSchema],
    games: [gamesSchema],
  },
  {
    idAttribute: 'article_id',
  },
);

export {
  developersSchema,
  articlesSchema,
  gamesSchema,

  games,
  developers,
  articles,
};
