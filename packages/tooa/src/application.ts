import Emitter from 'events' // node模块
import http, { IncomingMessage, ServerResponse } from 'http' // node模块
import {
  NoopType,
  TooaMiddlewareType,
  TooaOptionsType,
  TooaContextType,
  TooaRequestType,
  TooaResponseType,
} from './types'
import koa from 'koa'
import compose from 'tooa-compose'
import { context } from './context'
import { request } from './request'
import { response } from './response'

const k = new koa()

export class Application extends Emitter {
  middlewareStack: TooaMiddlewareType[]
  compose: any

  context: TooaContextType
  request: TooaRequestType
  response: TooaResponseType

  constructor(options?: TooaOptionsType) {
    super()

    options = options || {}

    this.middlewareStack = [] // 中间件
    this.compose = options.compose || compose

    this.context = Object.create(context) // 赋值 context.js
    this.request = Object.create(request) // 赋值 request.js
    this.response = Object.create(response) // 赋值 response.js
  }

  listen(port?: number, listeningListener?: NoopType) {
    const server = http.createServer(this.callback())
    // 在listen之前已经生成洋葱模型中间件了，所以运行时无法添加中间件
    return server.listen(port, listeningListener)
  }

  use(middleware: TooaMiddlewareType) {
    if (typeof middleware !== 'function')
      throw new TypeError('middleware must be a function!')

    this.middlewareStack.push(middleware)

    return this
  }

  // 将node数据转为ctx
  callback() {
    const fn = this.compose(this.middlewareStack)

    return async (req: IncomingMessage, res: ServerResponse) => {
      const context = this.createContext(req, res)

      await fn(context)

      if (context.tooaRes && context.tooaRes.res) {
        context.tooaRes.res.writeHead(200)
        context.tooaRes.res.end(context.body)
      }
    }
  }

  createContext(req: IncomingMessage, res: ServerResponse) {
    const context = Object.create(this.context) as TooaContextType
    const request = (context.tooaReq = Object.create(
      this.request,
    ) as TooaRequestType)
    const response = (context.tooaRes = Object.create(
      this.response,
    ) as TooaResponseType)

    context.req = request.req = response.req = req
    context.res = request.res = response.res = res

    return context
  }
}
