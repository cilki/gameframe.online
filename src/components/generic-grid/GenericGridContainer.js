
/**
 * Contains functions that create a container for
 * a generic grid page
 */

import { connect } from 'react-redux';

import { createFetchModels, createPredicate, resetPage } from './GenericGridActions';
import createSelectors from './GenericGridSelectors';
import { setToggleState } from '../Actions';

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
    getSortType,
    getSortAttribute,
    getToggleState,
  } = createSelectors(modelName);

  function mapStateToProps(state, props) {
    return {
      requested: getRequested(state),
      error: getError(state),
      models: getModelsByPage(state, props),
      currentPage: getCurrentPage(state, props),
      totalPages: getTotalPages(state),
      filters: getFilters(state),
      sortType: getSortType(state),
      sortAttribute: getSortAttribute(state),
      toggleState: getToggleState(state),
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
  function mapDispatchToProps(dispatch, props) {
    return {
      fetchModels: (page, filters, toggleState, sort, override) => dispatch(fetchFunction(page, filters, toggleState, sort, override)),
      resetPage: (totalPages, push, filters, sort) => {
        const page = resetPage(window.location ? window.location.search : null, totalPages, push);
        if (page) dispatch(fetchFunction(page, filters, sort, true));
      },
      onToggle: currentState => dispatch(setToggleState(modelName, !currentState)),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(presenter);
}

export default createContainer;
