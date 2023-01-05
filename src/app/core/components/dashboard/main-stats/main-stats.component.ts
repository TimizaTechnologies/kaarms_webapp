import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';
import { SimpleDataModel } from '../models/charts.model';
import { CoreService } from '../services/core.service';

export interface StackedChart {
  one: number;
  two: number;
  three: number;
  date: string;
  type: string;
}

export interface LineChart {
  date: string;
  value: number;
}

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.css'],
})
export class MainStatsComponent implements OnInit, AfterViewInit {
  stackedData = stackedChart;
  lineData = lineChart;

  // @Input("barData") private data: SimpleDataModel[];
  private data: SimpleDataModel[];
  // @Input("title") public title;
  public title;
  public chartId;
  private highestValue: string;
  private svg;
  private margin = 100;
  private width = 750 - this.margin * 2;
  private height = 600 - this.margin * 2;

  constructor(private d3: CoreService) {
    this.chartId = this.d3.generateId(5);
  }

  ngOnInit(): void {
    // determining highest value
    let highestCurrentValue = 0;
    const tableLength = this.data.length;
    this.data.forEach((data, i) => {
      const barValue = Number(data.value);
      if (barValue > highestCurrentValue) {
        highestCurrentValue = barValue;
      }
      if (tableLength == i + 1) {
        this.highestValue = highestCurrentValue.toString();
      }
    });

    this.data = this.DATA;
    this.title = 'Framework';
  }

  public DATA: SimpleDataModel[] = [
    { name: 'abc-1', value: '200', color: '#9954E6' },
    { name: 'abc-2', value: '100', color: '#63adfeb3' },
    { name: 'abc-3', value: '500', color: '#533a84' },
    { name: 'abc-4', value: '300', color: '#dd8050c4' },
    { name: 'abc-5', value: '50', color: '#BF60C4' },
  ];

  ngAfterViewInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = this.d3.d3
      .select('div#chart')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )

      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Creating X-axis band scale
    const x = this.d3.d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    // Drawing X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.d3.d3.axisBottom(x))
      .selectAll('text')
      // .attr('transform', 'translate(-10, 0)rotate(-45)')
      // .style('text-anchor', 'end')
      .style('font-size', '14px');

    // Creaate Y-axis band scale
    const y = this.d3.d3
      .scaleLinear()
      .domain([0, Number(this.highestValue) + 50])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg
      .append('g')
      .call(this.d3.d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '14px');

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d =>
        y(d.value) < this.height ? this.height - y(d.value) : this.height
      ) // this.height
      .attr('fill', d => d.color);

    this.svg
      .selectAll('text.bar')
      .data(data)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#70747a')
      .attr('x', d => x(d.name) + 18)
      .attr('y', d => y(d.value) - 5)
      .text(d => Math.round(d.value * 100) / 100);
  }
}

@Component({
  selector: 'app-bar-stacked',
  templateUrl: './bar-chart.html',
})
export class StackedChartComponent implements OnInit {
  @Input() data: StackedChart[];
  @Input() lineData: LineChart[];

  private w = 600;
  private h = 400;
  private divH = 375;
  private halfLength: number;
  private margin = { top: 10, right: 50, bottom: 80, left: 50 };
  private width = this.w - this.margin.left - this.margin.right;
  private height = this.h - this.margin.top - this.margin.bottom;

  private x0: any;
  private y0: any;
  private svg: any;
  private g: any;
  private stack: any;
  private chart: any;
  private layersBarArea: any;
  private layersBar: any;
  private x0Axis: any;
  private y0Axis: any;
  private legend: any;
  private legendItems: any;
  private tooltip: any;
  private stackedSeries: any;
  private layersDivs: any;
  private layersBlockArea: any;
  private valueline: any;
  private lineArea: any;
  private keys = ['one', 'two', 'three'];

  private colors = ['blue', 'green', 'yellow'];

  constructor(private container: ElementRef) {}

  ngOnInit() {
    this.stack = d3.stack().keys(this.keys);

    this.initScales();
    this.initSvg();
    this.drawAxis();
    this.createStack(this.data);
  }

  /////////////// initScales

  private initScales() {
    this.x0 = d3.scaleBand().rangeRound([0, this.width]).padding(0.05);

    this.y0 = d3.scaleLinear().range([this.height, 0]);
  }

  /////////////// initSvg

  private initSvg() {
    this.tooltip = d3
      .select('body')
      .append('div')
      .classed('chart-tooltip', true)
      .style('display', 'none');

    this.svg = d3
      .select(this.container.nativeElement)
      .select('.chart-container')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('class', 'chart')
      .attr('viewBox', '0 0 600 400');

    this.chart = this.svg
      .append('g')
      .classed('chart-contents', true)
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    this.layersBlockArea = this.chart.append('g').classed('blocks', true);

    this.layersBarArea = this.chart.append('g').classed('layers', true);

    this.lineArea = this.chart.append('g').classed('line', true);
  }

  /////////////// drawAxis

  private drawAxis() {
    this.x0Axis = this.chart
      .append('g')
      .classed('x-axis', true)
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x0));

    this.y0Axis = this.chart.append('g').classed('y0-axis', true);
  }

  /////////////// createStack

  private createStack(stackData: any) {
    this.stackedSeries = this.stack(stackData);
    this.drawChart(this.stackedSeries);
  }

  /////////////// drawChart

  private drawChart(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this.layersBar = this.layersBarArea
      .selectAll('.layer')
      .append('rect')
      .data(data)
      .enter()
      .append('g')
      .classed('layer', true)
      .style('fill', (d: any, i: any) => {
        return this.colors[i];
      });

    this.x0.domain(
      this.data.map((d: any) => {
        return d.date;
      })
    );

    this.chart.select('.x-axis').call(d3.axisBottom(this.x0));

    this.y0.domain([
      0,
      d3.max(this.lineData, function (d) {
        return d.value;
      }),
    ]);

    this.chart.select('.y0-axis').call(d3.axisLeft(this.y0));

    const bars = this.layersBar
      .selectAll('rect')
      .data((d: any) => {
        return d;
      })
      .enter()
      .append('rect')

      .attr('y', (d: any) => {
        //return this.y0(d[1])
        return this.y0(0);
      })

      .attr('width', this.x0.bandwidth() * 0.95 * 0.5)

      .attr('x', (d: any, i: any) => {
        return this.x0(d.data.date) + (i % 2) * 0.525 * this.x0.bandwidth();
      })

      .attr('height', 0);

    bars
      .transition()
      .ease(d3.easeCubic)
      .duration(1000)
      .attr('height', (d: any, i: any) => {
        return this.y0(d[0]) - this.y0(d[1]);
      })
      .attr('y', (d: any) => {
        return this.y0(d[1]);
      });

    bars
      .on('mouseover', () => {
        d3.select('.chart-tooltip').style('display', null);
      })
      .on('mouseout', () => {
        d3.select('.chart-tooltip').style('display', 'none');
      })
      .on('mousemove', (d: any) => {
        let html = '';
        that.keys.forEach(function (k) {
          html += k + ': ' + d.data[k] + '<br/>';
        });
        d3.select('.chart-tooltip')
          //.style("left", d3.event.pageX + 15 + "px")
          //.style("top", d3.event.pageY - 25 + "px")
          .html(html.trim());
      });
  }

  /////////////// drawDivs

  private drawDivs(stackData: any) {
    this.layersDivs = this.layersBlockArea
      .selectAll('rect')
      .data(stackData)
      .enter()
      .append('rect')
      .classed('block', true)
      .attr('width', this.x0.bandwidth())
      .attr('height', this.divH)

      .attr('transform', (d: any, i: any) => {
        const x = this.x0(d.date) + (i % 2) * 1 * this.x0.bandwidth();
        return 'translate(' + x + ',' + 0 + ')';
      })

      .style('fill', (d: any, i: any) => {
        if (i % 4) {
          return '#fff';
        } else {
          return '#e5e5e5';
        }
      });
  }

  /////////////// drawBarTitle

  private drawBarTitle(data: any) {
    this.chart
      .append('g')
      .attr('transform', 'translate(' + 10 + ',' + (this.height + 10) + ')')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d: any, i: any) => {
        const x = this.x0(d.date) + (i % 2) * 0.525 * this.x0.bandwidth();
        return (
          'translate(' + (x + this.x0.bandwidth() * 0.95 * 0.25) + ',' + 0 + ')'
        );
      })

      .append('text')
      .text((d: any, i: any) => {
        return d.type;
      })
      .attr('dy', '-0.5em')
      .classed('trend-type', true)
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)');
  }
}

const stackedChart: StackedChart[] = [
  {
    date: 'Jan',
    type: 'Left',
    one: 14,
    two: 287,
    three: 147,
  },
  {
    date: 'Jan',
    type: 'Right',
    one: 545,
    two: 27,
    three: 487,
  },
  {
    date: 'Feb',
    type: 'Left',
    one: 143,
    two: 288,
    three: 424,
  },
  {
    date: 'Feb',
    type: 'Right',
    one: 191,
    two: 209,
    three: 345,
  },
  {
    date: 'Mar',
    type: 'Left',
    one: 148,
    two: 27,
    three: 147,
  },
  {
    date: 'Mar',
    type: 'Right',
    one: 386,
    two: 286,
    three: 287,
  },
  {
    date: 'Apr',
    type: 'Left',
    one: 13,
    two: 286,
    three: 424,
  },
  {
    date: 'Apr',
    type: 'Right',
    one: 121,
    two: 209,
    three: 345,
  },
  {
    date: 'May',
    type: 'Left',
    one: 145,
    two: 287,
    three: 647,
  },
  {
    date: 'May',
    type: 'Right',
    one: 556,
    two: 27,
    three: 87,
  },
  {
    date: 'June',
    type: 'Left',
    one: 143,
    two: 28,
    three: 424,
  },
  {
    date: 'June',
    type: 'Right',
    one: 121,
    two: 209,
    three: 345,
  },
  {
    date: 'July',
    type: 'Left',
    one: 148,
    two: 287,
    three: 147,
  },
  {
    date: 'July',
    type: 'Right',
    one: 56,
    two: 687,
    three: 387,
  },
  {
    date: 'Aug',
    type: 'Left',
    one: 143,
    two: 28,
    three: 424,
  },
  {
    date: 'Aug',
    type: 'Right',
    one: 121,
    two: 209,
    three: 345,
  },
  {
    date: 'Sept',
    type: 'Left',
    one: 121,
    two: 209,
    three: 345,
  },
  {
    date: 'Sept',
    type: 'Right',
    one: 148,
    two: 287,
    three: 147,
  },
  {
    date: 'Oct',
    type: 'Left',
    one: 386,
    two: 287,
    three: 487,
  },
  {
    date: 'Oct',
    type: 'Right',
    one: 143,
    two: 285,
    three: 42,
  },
  {
    date: 'Nov',
    type: 'Left',
    one: 11,
    two: 269,
    three: 145,
  },
  {
    date: 'Nov',
    type: 'Right',
    one: 186,
    two: 287,
    three: 487,
  },
  {
    date: 'Dec',
    type: 'Left',
    one: 10,
    two: 266,
    three: 44,
  },
  {
    date: 'Dec',
    type: 'Right',
    one: 128,
    two: 203,
    three: 35,
  },
];

const lineChart: LineChart[] = [
  {
    date: 'Jan',
    value: 1507,
  },
  {
    date: 'Feb',
    value: 1600,
  },
  {
    date: 'Mar',
    value: 1281,
  },
  {
    date: 'Apr',
    value: 1398,
  },
  {
    date: 'May',
    value: 1749,
  },
  {
    date: 'June',
    value: 1270,
  },
  {
    date: 'July',
    value: 1712,
  },
  {
    date: 'Aug',
    value: 1270,
  },
  {
    date: 'Sept',
    value: 1715,
  },
  {
    date: 'Oct',
    value: 1630,
  },
  {
    date: 'Nov',
    value: 1385,
  },
  {
    date: 'Dec',
    value: 686,
  },
];
