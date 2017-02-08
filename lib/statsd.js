/**
* The MIT License
* 
* Copyright (c) 2016-2017, Microclimates Inc. https://www.microclimates.com
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to
* deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
* sell copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
**/

module.exports = function(RED) {
  "use strict";
  var StatsD = require("node-statsd");

  function StatsdNode(config) {
    var node = this;

    var verboseLog = function (msg){
      if (RED.settings.verbose) {
        node.log(msg);
      }
    }.bind(node)

    var getMetricName = function (msg){
      var defaultName = (msg && msg.topic) ? msg.topic.replace(/\//g,'.') : '';
      return config.metric_name || defaultName;
    }.bind(node)

    // Create the node
    RED.nodes.createNode(node,config);

    // Connect to the statsd server
    var connectClient = function() {
      var opts = {
        host: config.statsd_host || 'localhost',
        port: config.statsd_port || 8125,
        prefix: config.metric_prefix,
        suffix: config.metric_suffix
      };
      config.statsd_server = opts.host + ':' + opts.port;
      verboseLog("Connecting to statsd at " + opts.host + ':' + opts.port);
      node.client = new StatsD(opts);

      node.client.socket.on('error', function(error) {
        node.status({fill:"red",shape:"ring",text:"error"});
        node.error("Statsd client error: ", error);
      });

      node.status({fill:"green",shape:"dot",text:config.statsd_server});

    }.bind(node);
    connectClient();

    node.on('input', function(msg) {
      var value = +msg.payload;
      if (isNaN(value)) {
        return;
      }
      var metricType = config.metric_type || 'gauge';
      node.metricName = getMetricName(msg);
      node.client[metricType](node.metricName, value, function(err) {
        if (err) {
          node.status({fill:"red",shape:"ring",text:"error"});
          node.error("Statsd client error: ", err);
          return;
        }
        node.status({fill:"green",shape:"dot",text:config.statsd_server});
      })
    });

    node.on("close", function(done) {
      verboseLog("Destroying a statsd node");
      done();
    });
  }

  RED.nodes.registerType("statsd", StatsdNode);

}
