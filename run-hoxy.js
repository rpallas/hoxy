/*
 * Web debugging proxy server.
 * Generated by Hoxy.
 * http://greim.github.io/hoxy/
 * https://github.com/greim/hoxy
 * Copyright (c) <year> by First Last <email>
 * See "license.txt" for more info.
 */

var Util = require('util');
var hoxy = require('hoxy');
var parseArgs = require('minimist');
var _ = require('lodash-node');
var config = _.extend({port:8080},require('./hoxy.json'));

require('colors');

var welcome = [
  '#    #  ####  #    # #     #',
  '#    # #    #  #  #   #   # ',
  '#    # #    #   ##     # #  ',
  '###### #    #   ##      #   ',
  '#    # #    #  #  #     #   ',
  '#    #  ####  #    #    #   '
].join('\n');
Util.puts(welcome.rainbow.dim);

// CLI args override hoxy.json properties
var args = parseArgs(process.argv.slice(2));
_.forIn(args, function(val, key){
  if (val !== 'none'){
    if (key === 'upstream-proxy'){
      key = 'upstreamProxy';
    }
    config[key] = val;
  }
});

// create a proxy server
var proxy = new hoxy.Proxy(config);
proxy.log('error warn', process.stderr);
proxy.log('info', process.stdout);
proxy.listen(config.port);

// intercept requests
proxy.intercept({
  phase: 'request'
}, function(req, resp) {

});

proxy.intercept({
  phase: 'response',
  contentType: /utf\-8/i,
  as: 'string'
}, function(req, resp){
  console.log(resp.string);
});
