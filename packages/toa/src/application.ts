import Emitter from 'events' // node模块
import http, { IncomingMessage, ServerResponse } from 'http' // node模块
import { NoopType, MiddlewareType, OptionsType } from './types'
import koa from 'koa'
import { Next } from 'koa'

import compose from 'toa-compose'

const k = new koa()
k.use((c, n) => {})

export default class Application extends Emitter {
  middlewareStack: MiddlewareType[]
  compose: any

  // context: BaseContext & ContextT
  // request: BaseRequest
  // response: BaseResponse

  constructor(options?: OptionsType) {
    super()

    options = options || {}

    this.middlewareStack = [] // 中间件
    this.compose = options.compose || compose

    // this.context = Object.create(context) // 赋值 context.js
    // this.request = Object.create(request) // 赋值 request.js
    // this.response = Object.create(response) // 赋值 response.js
  }

  listen(port?: number, listeningListener?: NoopType) {
    const server = http.createServer(this.callback())
    // 在listen之前已经生成洋葱模型中间件了，所以运行时无法添加中间件
    return server.listen(port, listeningListener)
  }

  use(middleware: MiddlewareType) {
    if (typeof middleware !== 'function')
      throw new TypeError('middleware must be a function!')

    this.middlewareStack.push(middleware)

    return this
  }

  callback() {
    const fn = this.compose(this.middlewareStack)

    return fn
  }
}
