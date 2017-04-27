'use strict';

const debug = require('debug')('#http:router');
const parseUrl = require('./parse-url');
const parseJson = require('./parse-json');

const Router = module.exports = function() {
  debug('#router');
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback){
  debug('#GET');
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  debug('#POST');
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  debug('#PUT');
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  debug('#DELETE');
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  debug('#routes');
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
      .then(() => {
        if(typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('route not valid');
        res.end();
      })
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('bad request');
          res.end();
        });
  };
};
