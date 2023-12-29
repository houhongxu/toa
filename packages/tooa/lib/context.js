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

// src/context.ts
var context_exports = {};
__export(context_exports, {
  context: () => context
});
module.exports = __toCommonJS(context_exports);
var context = {
  get url() {
    var _a;
    return (_a = this.tooaReq) == null ? void 0 : _a.url;
  },
  set url(url) {
    if (this.tooaReq) {
      this.tooaReq.url = url;
    }
  },
  get body() {
    var _a;
    return (_a = this.tooaRes) == null ? void 0 : _a.body;
  },
  set body(body) {
    if (this.tooaRes) {
      this.tooaRes.body = body;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  context
});
