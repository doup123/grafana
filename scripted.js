/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */

'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// Setup some variables
var dashboard;

// All url parameters are available via the ARGS object
var ARGS;

// Intialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
};

// Set a title
dashboard.title = 'Scripted dash';

// Set default time
// time can be overriden in the url using from/to parameters, but this is
// handled automatically in grafana core during dashboard initialization
dashboard.time = {
  from: "now-6h",
  to: "now"
};

var rows = 1;
var seriesName = 'ServiceID';
var serviceID='100';
var source='192.168.100.2';
var dest='192.168.100.1';

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.name)) {
  seriesName = ARGS.name;
}

if(!_.isUndefined(ARGS.serviceID)) {
  serviceID = ARGS.serviceID;
}




for (var i = 0; i < rows; i++) {

  dashboard.rows.push({
    title: 'Scripted Graph ' + serviceID,
    height: '300px',
    panels: [
        {
            title: serviceID,
            type: 'graph',
            targets: [
                {
                    policy: 'default',
                    dsType: 'influxdb',
                    resultFormat: 'time_series',
                    tags: [
                        {
                            key: 'ServiceID',
                            operator: '=',
                            value: 'Service100'
                        },
                        {
                            condition: 'AND',
                            key: 'Source',
                            operator: '=',
                            value: '192.168.100.1'
                        },
                        {
                            condition: 'AND',
                            key: 'Destination',
                            operator: '=',
                            value: '192.168.100.2'
                        }
                    ],
                    groupBy: [
                        {
                            type: 'time',
                            params: [
                                '$__interval'
                            ]
                        },
                        {
                            type: 'fill',
                            params: [
                                'null'
                            ]
                        }
                    ],
                    select: [
                        [
                            {
                                type: 'field',
                                params: [
                                    'Delay_avg'
                                ]
                            },
                            {
                                type: 'last',
                                params: []
                            }
                        ],
                        [
                            {
                                type: 'field',
                                params: [
                                    'Delay_max'
                                ]
                            },
                            {
                                type: 'last',
                                params: []
                            }
                        ],
                        [
                            {
                                type: 'field',
                                params: [
                                    'Delay_min'
                                ]
                            },
                            {
                                type: 'last',
                                params: []
                            }
                        ]
                    ],
                    refId: 'A',
                    measurement: 'ServiceList'
                }
            ],
            datasource: 'influxdb',
            renderer: 'flot',
            yaxes: [
                {
                    label: null,
                    show: true,
                    logBase: 1,
                    min: null,
                    max: null,
                    format: 'short'
                },
                {
                    label: null,
                    show: true,
                    logBase: 1,
                    min: null,
                    max: null,
                    format: 'short'
                }
            ],
            xaxis: {
                show: true,
                mode: 'time',
                name: null,
                values: []
            },
            lines: true,
            fill: 1,
            linewidth: 1,
            points: false,
            pointradius: 5,
            bars: false,
            stack: false,
            percentage: false,
            legend: {
                show: true,
                values: false,
                min: false,
                max: false,
                current: false,
                total: false,
                avg: false
            },
            nullPointMode: 'null',
            steppedLine: false,
            tooltip: {
                value_type: 'individual',
                shared: true,
                sort: 0
            },
            timeFrom: null,
            timeShift: null,
            aliasColors: {},
            seriesOverrides: [],
            thresholds: []
        }]
  });

}
return dashboard;

