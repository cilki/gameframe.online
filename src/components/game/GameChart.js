
/**
 * A GameChart for rendering the D3 charts for a game
 */

import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

import { select } from 'd3-selection';
import {
  scaleTime,
  scaleLinear,
  rangeRound,
} from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { extent } from 'd3-array';
import { line as Line, curveMonotoneX } from 'd3-shape';

/**
 * @description - Creates and returns a LineChart created using D3
 * @param {Object} props
 * @returns {React.Component}
 */
class GameChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };

    this.svgRef = null;
    this.graphWidth = -1;
    this.graphHeight = -1;
    this.margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50, 
    };
  }

  setSvgRef = svg => {
    this.svgRef = svg;
  };

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3() {
    if (this.svgRef) {
      const { width, height } = this.state;

      this.graphWidth = width - this.margin.left - this.margin.right;
      this.graphHeight = height - this.margin.top - this.margin.bottom;

      select(this.svgRef)
        .attr('width', Math.round(width))
        .attr('height', Math.round(height));
    }

    // we want the time to be from now until a month ago
    const now = new Date();
    const past = new Date();
    past.setTime(now.getTime() - 2592 * 1000000);

    const x = scaleTime()
      .domain([past, now])
      .rangeRound([0, this.graphWidth]);
    const y = scaleLinear()
      .rangeRound([this.graphHeight, 0]);

    if (this.g) {
      this.g.remove();
    }

    const data = this.parseData();
    y.domain(extent(data, d => d.number));

    this.g = select(this.svgRef).append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.g.append('g')
      .attr('transform', `translate(0,${this.graphHeight})`)
      .call(axisBottom(x));

    this.g.append('g')
      .call(axisLeft(y));

    const line = Line()
      .x(d => x(d.date))
      .y(d => y(d.number))
      .curve(curveMonotoneX);

    this.g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  /**
   * @description - Returns data that D3 can parse out and make into a shape.
   * @TODO: This should probably be in a memoized selector, so that we don't
   * calculate this multiple times
   */
  parseData() {
    const stats = [];
    const { videos } = this.props;
    if (!videos || !videos.length) {
      return stats;
    }
    const now = new Date();
    videos.forEach((video) => {
      const date = new Date(video.timestamp);

      // make sure we're not collecting videos more than a month
      if (now.getTime() - date.getTime() > 2592 * 1000000) {
        return;
      }

      const value = stats.find(stat => stat.date.getFullYear() === date.getFullYear() &&
        stat.date.getMonth() === date.getMonth() && stat.date.getDate() === date.getDate());
      if (value) {
        value.number += 1;
      }
      else {
        stats.push({
          date,
          number: 1,
        });
      }
    });

    return stats
      .sort((first, next) => {
        return Number(first.date.getTime() > next.date.getTime()) - Number(first.date.getTime() < next.date.getTime());
      });
  }

  render() {
    return(
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({
            width: contentRect.bounds.width,
            height: contentRect.bounds.height,
          })
        }}
      >
        {({ measureRef }) =>
          <div
            ref={measureRef}
            style={{
              width:'100%',
              flex: 1,
              maxHeight: '100%',
            }}
          >
            <svg ref={this.setSvgRef} />
          </div>
        }
      </Measure>
    );
  }
}

GameChart.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    // This should be a date
    timestamp: PropTypes.string.isRequired,
  })),
};

GameChart.defaultProps = {
  videos: [],
};

export default GameChart;
