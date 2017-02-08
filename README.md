# Time-series output through StatsD for node-red topics

The [Node-Red](http://nodered.org/) project is a visual tool for wiring the Internet of Things.

This package is Node-Red contribution for sending flows to a
[StatsD server](https://github.com/etsy/statsd).

Here's an example flow that places the output of an MQTT topic into a StatsD server:

![](https://raw.githubusercontent.com/microclimates/node-red-contrib-statsd/master/img/example-flow.png)

## Prerequisites

1. A StatsD server running in your network.
1. Node.js installed
    - [Windows / OSX / Linux](https://nodejs.org/en/download/)
    - [Raspberry Pi](http://nodered.org/docs/hardware/raspberrypi.html)
    - [BeagleBone Black](http://nodered.org/docs/hardware/beagleboneblack.html)

## Installation

1. Install Node-RED: `npm install -g node-red`
1. Install Statsd package
    1. `mkdir -p ~/.node-red/node_modules`
    1. `npm install --prefix ~/.node-red node-red-contrib-statsd` 

## Usage

1. `node-red`
1. Open [http://localhost:1880](http://localhost:1880)
1. Add an input or function node that produces a numeric payload (an MQTT input topic works well)
1. Add the statsd node, and connect it to the flow above
1. Add configuration parameters:

![](https://raw.githubusercontent.com/microclimates/node-red-contrib-statsd/master/img/config.png)

## Updating

1. Update Node-RED: `npm update -g node-red`
1. Update Statsd package
    1. `npm update --prefix ~/.node-red node-red-contrib-statsd`

## License

MIT License. See [LICENSE.txt](https://raw.githubusercontent.com/microclimates/node-red-contrib-statsd/master/LICENSE.txt) for more details.
