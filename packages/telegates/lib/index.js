"use strict";

// src/index.js
module.exports = Delegator;
function Delegator(proto, target) {
  if (!(this instanceof Delegator))
    return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}
Delegator.auto = function(proto, targetProto, targetProp) {
  var delegator = Delegator(proto, targetProp);
  var properties = Object.getOwnPropertyNames(targetProto);
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    var descriptor = Object.getOwnPropertyDescriptor(targetProto, property);
    if (descriptor.get) {
      delegator.getter(property);
    }
    if (descriptor.set) {
      delegator.setter(property);
    }
    if (descriptor.hasOwnProperty("value")) {
      var value = descriptor.value;
      if (value instanceof Function) {
        delegator.method(property);
      } else {
        delegator.getter(property);
      }
      if (descriptor.writable) {
        delegator.setter(property);
      }
    }
  }
};
Delegator.prototype.method = function(name) {
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);
  proto[name] = function() {
    return this[target][name].apply(this[target], arguments);
  };
  return this;
};
Delegator.prototype.access = function(name) {
  return this.getter(name).setter(name);
};
Delegator.prototype.getter = function(name) {
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);
  proto.__defineGetter__(name, function() {
    return this[target][name];
  });
  return this;
};
Delegator.prototype.setter = function(name) {
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);
  proto.__defineSetter__(name, function(val) {
    return this[target][name] = val;
  });
  return this;
};
Delegator.prototype.fluent = function(name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);
  proto[name] = function(val) {
    if ("undefined" != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };
  return this;
};
