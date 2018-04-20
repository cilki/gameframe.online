/**
 * Container for the GroupMember component.
 */

import { connect } from 'react-redux';

import GroupMember from './GroupMember';
import { makeGetContributor } from './GroupMemberSelectors';
import { fetchGroupMemberStats } from './GroupMemberActions';

/**
 * @description - Maps the state tree to the props of the component.
 * @returns {Function}
 */
function mapStateToProps() {
  const contributorSelector = makeGetContributor();
  /**
   * This function will be called at each instantiation of
   * this component.
   */
  return (state, props) => {
    return { ...contributorSelector(state, props) };
  };
}

/**
 * @description - Maps the dispatch function to the props of the
 * component, allowing the presenter to call actions.
 * @param {Function} dispatch
 * @param {Object} props
 */
function mapDispatchToProps(dispatch, props) {
  return {
    fetchStats: () => dispatch(fetchGroupMemberStats(props.login)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMember);
export {
  mapDispatchToProps,
  mapStateToProps,
};
