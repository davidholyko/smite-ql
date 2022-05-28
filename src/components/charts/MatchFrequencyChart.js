import * as d3 from 'd3';
import entries from 'lodash/entries';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { smiteConnector } from '../../api';
import { toMatchFrequencyFormat } from '../../helpers';

import './MatchFrequencyChart.css';

// inspired by https://github.com/vinnyoodles/reddit-heatmap

const NUMBER_OF_COLORS = 6;
const CELL_SIZE = 14;

function createHeatMap(data, startYear, endYear) {
  const width = 900;
  const height = 110;
  const dx = 35;
  const gridClass = 'js-date-grid day';
  const formatColor = d3
    .scaleQuantize()
    .domain([0, data.maxCount])
    .range(
      d3.range(NUMBER_OF_COLORS).map((data) => {
        return `color-${data}`;
      }),
    );

  const heatmapSvg = d3
    .select('.js-heatmap')
    .selectAll('svg.heatmap')
    .enter()
    .append('svg')
    .data(d3.range(startYear, endYear))
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Add a grid for each day between the date range.
  const dates = Object.keys(data.dates);
  const rect = heatmapSvg.append('g').attr('transform', `translate(${dx},0)`);

  // create a tooltip
  const toolTip = d3
    .select('#match-frequency-chart')
    .append('div')
    .attr('class', 'tooltip')
    .style('display', 'block')
    .style('position', 'absolute')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '1px')
    .style('border-radius', '3px')
    .style('padding', '10px');

  function onMouseOver(event) {
    const titleInfo = event.target.getAttribute('title');

    if (titleInfo) {
      toolTip.style('display', 'block');
      return;
    }
  }

  function onMouseLeave(event) {
    const titleInfo = event.target.getAttribute('title');

    if (!titleInfo) {
      toolTip.style('display', 'none');
      return;
    }
  }

  function onMouseMove(event) {
    const [xPosition, yPosition] = [event.pageX, event.pageY];
    const titleInfo = event.target.getAttribute('title');

    if (!titleInfo) {
      return;
    }

    const text = entries(JSON.parse(titleInfo))
      .map(([key, value]) => `${key}: ${value}`)
      .join('<br>');

    toolTip
      .html(text) //
      .style('left', `${xPosition - 50}px`)
      .style('top', `${yPosition - 120}px`);
  }

  // Add year label.
  rect
    .append('text')
    .attr('transform', `translate(-9,${CELL_SIZE * 3.5})rotate(-90)`)
    .style('text-anchor', 'middle')
    .text((day) => day);

  // Add day squares
  rect
    .selectAll('.day')
    // The heatmap will contain all the days in that year.
    // TODO: get last 365 days instead of Jan 1st to Dec 31st
    .data((day) => d3.timeDays(new Date(day, 0, 1), new Date(day + 1, 0, 1)))
    .enter()
    .append('rect')
    .attr('class', gridClass)
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('x', (data) => d3.timeFormat('%U')(data) * CELL_SIZE)
    .attr('y', (data) => data.getDay() * CELL_SIZE)
    .attr('data-toggle', 'tooltip')
    .datum(d3.timeFormat('%Y-%m-%d'))
    .attr('title', (day) => {
      // Add the grid data as a title attribute to render as a tooltip.
      return JSON.stringify(data.dates[day]);
    })
    .attr('date', (day) => day)
    // Add the colors to the grids.
    .filter((day) => dates.indexOf(day) > -1)
    .attr('class', (d) => `${gridClass} ${formatColor(data.dates[d].difference)}`);

  // add on hover events to the heatmap
  d3.select('.js-heatmap') //
    .on('mouseover', onMouseOver)
    .on('mousemove', onMouseMove)
    .on('mouseleave', onMouseLeave);

  // Render x axis to show months
  d3.select('.js-months')
    .selectAll('svg.months')
    .enter()
    .append('svg')
    .data([1])
    .enter()
    .append('svg')
    .attr('width', 800)
    .attr('height', 20)
    .append('g')
    .attr('transform', 'translate(-33, 10)')
    .selectAll('.month')
    .data(() => d3.range(12))
    .enter()
    .append('text')
    .attr('x', (data) => data * (4.5 * CELL_SIZE) + dx)
    .attr('y', 5)
    .text((data) => d3.timeFormat('%b')(new Date(0, data + 1, 0)));

  // Render the grid color legend.
  d3.select('.js-legend')
    .selectAll('svg.legend')
    .enter()
    .append('svg')
    .data([1])
    .enter()
    .append('svg')
    .attr('width', 800)
    .attr('height', 20)
    .append('g')
    .attr('transform', 'translate(595,0)')
    .selectAll('.legend-grid')
    .data(() => d3.range(7))
    .enter()
    .append('rect')
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('x', (data) => data * CELL_SIZE + dx)
    .attr('class', (data) => `day color-${data - 1}`);
}

export const MatchFrequencyChart = () => {
  const { playerId } = useParams();

  const fetchData = async () => {
    const parsedMatches = await smiteConnector.getMatches(playerId);
    const dates = toMatchFrequencyFormat(parsedMatches);

    createHeatMap({ maxCount: 5, dates }, 2022, 2023);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="match-frequency-chart-container"
      // key={Math.random()}
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: '30px',
      }}
    >
      <div className="js-months"></div>
      <div id="match-frequency-chart" className="js-heatmap"></div>
      <div className="js-legend"></div>
    </div>
  );
};
