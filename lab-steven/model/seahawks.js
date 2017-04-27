'use strict';

const debug = require('debug')('#http:seahawk');
const uuid = require('uuid/v4');

module.exports = function(name, pos, round){
  if(!name || !pos || !round) throw new Error('name and position required');
  this.id = uuid();
  this.name = name;
  this.pos = pos;
  this.round = round;
};
