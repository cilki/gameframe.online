
/**
 * Simple component for containing cards for our grid
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { LinkContainer } from 'react-router-bootstrap';
import { Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

import Styles from './GridStyles';
import GridSelect from '../grid-select';
import GridSort from '../grid-sort';

import '../../../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';

/**
 * @description - Convience function for a single
 * pagination item
 * @param {Object} props
 * @param {Boolean} props.disabled
 * @param {String} props.label
 * @param {Number} props.page
 * @param {String} props.prefix
 * @returns {React.Component}
 */
function GridPaginationItem({
  disabled,
  page,
  prefix,
  label,
}) {
  const content = (<Pagination.Item disabled={disabled}>{label || page}</Pagination.Item>);
  return (
    disabled ? content : <LinkContainer to={`/${prefix}?page=${page}`}>{content}</LinkContainer>
  );
}

GridPaginationItem.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  prefix: PropTypes.string.isRequired,
};

GridPaginationItem.defaultProps = {
  disabled: false,
  label: null,
};

/**
 * @description - Creates and returns the proper pagination
 * component for the given page number
 * @param {Object} props
 * @param {Number} props.currentPage
 * @param {Number} props.totalPages
 * @returns {React.Component}
 */
function GridPagination({
  currentPage,
  totalPages,
  prefix,
}) {
  if (totalPages <= 0) {
    return React.createElement(Pagination);
  }

  return React.createElement(
    Pagination,
    {},
    <GridPaginationItem style={{ color: 'red' }} disabled={currentPage <= 1} {...{ prefix, page: 1, label: '⇐' }} />,
    <GridPaginationItem style={{ color: 'green' }} disabled={currentPage <= 1} {...{ prefix, page: currentPage - 1, label: '←' }} />,

    currentPage > 3 && <GridPaginationItem {...{ prefix, page: 1 }} />,
    currentPage > 4 && <GridPaginationItem {...{ prefix, page: 2 }} />,

    currentPage > 5 && <Pagination.Ellipsis />,
    currentPage >= 3 && <GridPaginationItem {...{ prefix, page: currentPage - 2 }} />,
    currentPage >= 2 && <GridPaginationItem {...{ prefix, page: currentPage - 1 }} />,

    <Pagination.Item active>{currentPage}</Pagination.Item>,

    currentPage <= totalPages - 1 && <GridPaginationItem {...{ prefix, page: currentPage + 1 }} />,
    currentPage <= totalPages - 2 && <GridPaginationItem {...{ prefix, page: currentPage + 2 }} />,

    currentPage < totalPages - 4 && <Pagination.Ellipsis />,

    currentPage <= totalPages - 4 && <GridPaginationItem {...{ prefix, page: totalPages - 1 }} />,
    currentPage <= totalPages - 3 && <GridPaginationItem {...{ prefix, page: totalPages }} />,

    <GridPaginationItem disabled={currentPage >= totalPages} {...{ prefix, page: currentPage + 1, label: '→' }} />,
    <GridPaginationItem disabled={currentPage >= totalPages} {...{ prefix, page: totalPages, label: '⇒' }} />,
  );
}

GridPagination.propTypes = {
  currentPage: PropTypes.number,
  prefix: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,

  onToggle: PropTypes.func.isRequired,
};

GridPagination.defaultProps = {
  currentPage: 1,
};

/**
 * @description - Creates and returns a Grid component for
 * displaying cards
 * @param {Object} props
 * @param {Array} props.children
 * @returns {React.Component}
 */
function Grid(props) {
  const { children, prefix, ...rest } = props;

  const filterToggleTooltip = (
    <Tooltip id="filterToggleTooltip">
      Switch between matching at least one filter or all filters
    </Tooltip>
  );

  return (
    <div>
      <div style={[Styles.topCluster]}>
        <div style={[Styles.sortContainer]}>
          <GridSort model={prefix} />
        </div>
        <div style={[Styles.gridPaginationContainer]}>
          <GridPagination prefix={prefix} {...rest} />
        </div>
        <div style={[Styles.filterContainer]}>
          <h4>Include&nbsp;</h4>
          <div style={[Styles.filterSelectContainer]}>
            <GridSelect model={prefix} />
          </div>
          <div style={[Styles.toggleContainer]}>
            <OverlayTrigger placement="bottom" overlay={filterToggleTooltip}>
              <Toggle
                onClick={() => props.onToggle(props.toggleState)}
                offstyle="danger"
                on={<h6>AND</h6>}
                off={<h6>OR</h6>}
                size="xs"
                active={props.toggleState}
              />
            </OverlayTrigger>
          </div>
        </div>
      </div>
      <div style={[Styles.grid]}>
        {children}
        {/* <div style={[Styles.endSpacer]} /> */}
      </div>
      <div style={[Styles.topCluster]}>
        <div style={[Styles.gridPaginationContainer]}>
          <GridPagination prefix={prefix} {...rest} />
        </div>
      </div>
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  currentPage: PropTypes.number,
  prefix: PropTypes.string.isRequired,
  toggleState: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,

  onToggle: PropTypes.func.isRequired,
};

Grid.defaultProps = {
  currentPage: 1,
};

export default Radium(Grid);
