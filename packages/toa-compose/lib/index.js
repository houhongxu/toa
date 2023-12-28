"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => compose
});
module.exports = __toCommonJS(src_exports);
function compose(middlewareStack) {
  if (!Array.isArray(middlewareStack))
    throw new TypeError("Middleware stack must be an array!");
  for (const middleware of middlewareStack) {
    if (typeof middleware !== "function")
      throw new TypeError("Middleware must be composed of functions!");
  }
  return (req, res) => {
    let index = -1;
    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error("next() call more than once!"));
      }
      index = i;
      const middleware = middlewareStack[i];
      if (i >= middlewareStack.length) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(middleware(req, res, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    dispatch(0);
  };
}
