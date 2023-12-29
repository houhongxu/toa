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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/application.ts
var import_events = __toESM(require("events"));
var import_http = __toESM(require("http"));
var import_tooa_compose = __toESM(require("tooa-compose"));

// src/context.ts
var context = {
  get url() {
    var _a;
    return (_a = this.tooaReq) == null ? void 0 : _a.url;
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

// src/request.ts
var request = {
  get url() {
    var _a;
    return (_a = this.req) == null ? void 0 : _a.url;
  }
};

// src/response.ts
var response = {
  body: void 0
};

// src/application.ts
var Application = class extends import_events.default {
  constructor(options) {
    super();
    options = options || {};
    this.middlewareStack = [];
    this.compose = options.compose || import_tooa_compose.default;
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  listen(port, listeningListener) {
    const server = import_http.default.createServer(this.callback());
    return server.listen(port, listeningListener);
  }
  use(middleware) {
    if (typeof middleware !== "function")
      throw new TypeError("middleware must be a function!");
    this.middlewareStack.push(middleware);
    return this;
  }
  // 将node数据转为ctx
  callback() {
    const fn = this.compose(this.middlewareStack);
    return (req, res) => __async(this, null, function* () {
      const context2 = this.createContext(req, res);
      try {
        yield fn(context2);
        if (context2.tooaRes && context2.tooaRes.res) {
          context2.tooaRes.res.writeHead(200);
          context2.tooaRes.res.end(context2.body);
        }
      } catch (error) {
        console.error("<=== Server Error ===>");
        this.emit("error", error, context2);
      }
    });
  }
  createContext(req, res) {
    const context2 = Object.create(this.context);
    const request2 = context2.tooaReq = Object.create(
      this.request
    );
    const response2 = context2.tooaRes = Object.create(
      this.response
    );
    context2.req = request2.req = response2.req = req;
    context2.res = request2.res = response2.res = res;
    return context2;
  }
};

// src/index.ts
var src_default = Application;
