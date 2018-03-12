
/**
 * Contatiner HOC for GameCard
 */

import { connect } from 'react-redux';

import GameCard from './GameCard';
import { fetchDeveloper as fetchDeveloperAction } from '../developer/DeveloperActions';
import { makeGetDeveloperName } from '../game/GameSelectors';

/**
 * @description - Takes the given state and uses selectors to retrieve
 * specific state for the component
 * @param {Object} state
 * @param {Object} props
 * @returns {Function}
 */
function mapStateToProps() {
  const gameDeveloperNameSelector = makeGetDeveloperName();
  return (state, props) => {
    return {
      developerName: gameDeveloperNameSelector(
        state,
        // the selector expects the prop to be in id, not developer
        { id: props.developer ? props.developer : -1 },
      ),
      ...props,
    };
  };
}

/**
 * @description - Takes the dispatch function and maps it to props functions
 * that allows the presenter to dispatch actions
 * @param {Function} dispatch
 * @param {Object} props
 * @returns {Object}
 */
function mapDispatchToProps(dispatch, props) {
  return {
    fetchDeveloper: () => dispatch(fetchDeveloperAction(props.developer)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
