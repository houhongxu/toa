"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/application.ts
var application_exports = {};
__export(application_exports, {
  default: () => Application
});
module.exports = __toCommonJS(application_exports);
var import_events = __toESM(require("events"));
var import_http = __toESM(require("http"));
var Application = class extends import_events.default {
  // context: BaseContext & ContextT
  // request: BaseRequest
  // response: BaseResponse
  constructor(options) {
    super();
    options = options || {};
    this.middlewares = [];
  }
  listen(port, callback) {
    const server = import_http.default.createServer((req, res) => {
      for (let i = 0; i < this.middlewares.length; i++) {
        this.middlewares[i](req, res);
      }
    });
    return server.listen(port, callback);
  }
  use(middleware) {
    if (typeof middleware !== "function")
      throw new TypeError("middleware must be a function!");
    this.middlewares.push(middleware);
    return this;
  }
};
