
/**
 * Contains functions that create a container for
 * a generic grid page
 */

import { connect } from 'react-redux';

import { createFetchModels, createPredicate } from './GenericGridActions';
import createSelectors from './GenericGridSelectors';

/**
 * @description - Returns a connected component of a generic grid
 */
function createContainer(
  presenter,
  schema,
  pathname,
  modelName,
  {
    requestAction,
    responseAction,
    setPageAction,
    setTotalPageAction,
  },
  secondaryModels,
) {
  const {
    getRequested,
    getError,
    getModelsByPage,
    getCurrentPage,
    getTotalPages,
    getFilters,
  } = createSelectors(modelName);

  function mapStateToProps(state, props) {
    return {
      requested: getRequested(state),
      error: getError(state),
      models: getModelsByPage(state, props),
      currentPage: getCurrentPage(state, props),
      totalPages: getTotalPages(state),
      filters: getFilters(state),
    };
  }

  const fetchPredicate = createPredicate(getModelsByPage);
  const fetchFunction = createFetchModels(
    fetchPredicate,
    schema,
    pathname,
    modelName,
    {
      requestAction,
      responseAction,
      setPageAction,
      setTotalPageAction,
    },
    secondaryModels,
  );
  function mapDispatchToProps(dispatch) {
    return {
      fetchModels: (page, filters, override) => dispatch(fetchFunction(page, filters, override)),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(presenter);
}

export default createContainer;
