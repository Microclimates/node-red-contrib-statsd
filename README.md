# Time-series output through StatsD for node-red topics

The [Node-Red](http://nodered.org/) project is a visual tool for wiring the Internet of Things.

This package is a contribution to the Node-Red project for sending numeric flow data to
a [StatsD server](https://github.com/etsy/statsd) for easy but powerful stats aggregation.

![](https://raw.githubusercontent.com/microclimates/node-red-contrib-statsd/master/img/example-flow.png)

## Installation

1. Install Node.js
    - [Windows / OSX / Linux](https://nodejs.org/en/download/)
    - [Raspberry Pi](http://nodered.org/docs/hardware/raspberrypi.html)
    - [BeagleBone Black](http://nodered.org/docs/hardware/beagleboneblack.html)
1. Install Node-RED: `npm install -g node-red`
1. Install Statsd package
    1. `mkdir -p ~/.node-red/node_modules`
    1. `npm install --prefix ~/.node-red node-red-contrib-statsd` 

## Usage

1. `node-red`
1. Open [http://localhost:1880](http://localhost:1880)

## Updating

1. Update Node-RED: `npm update -g node-red`
1. Update Statsd package
    1. `npm update --prefix ~/.node-red node-red-contrib-statsd`

## History

- 0.0.1 : Initial Release

## License

MIT License. See [LICENSE.txt](https://raw.githubusercontent.com/microclimates/node-red-contrib-statsd/master/LICENSE.txt) for more details.
