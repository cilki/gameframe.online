
/**
 * Selectors for the state tree for Articles.js
 */

 /**
  * @description - Input selector for the articles
  * 'requested' state
  * @param {Map} state
  * @returns {Boolean}
  */
function getArticlesRequested(state){
    return state.articles.articlesRequested;
}

 /**
  * @description - Input selector for the articles
  * @param {Map} state
  * @returns {Boolean}
  */
function getArticles(state){
    const articles = state.articles.articles.toJS();
    return articles;
}

/**
 * @description - Trivial selector for finding the 
 * error state of the articles
 * @param {Map} state
 * @returns {String|null}
 */
function getArticlesError(state) {
    return state.articles.articlesError;
}

export { //eslint-disable-line
    getArticlesRequested,
    getArticles,
    getArticlesError,
};
