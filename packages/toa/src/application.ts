import Emitter from 'events' // node模块
import http from 'http' // node模块
import { NoopType, MiddlewareType, OptionsType } from './types'

export default class Application extends Emitter {
  // env: string
  middlewares: Array<MiddlewareType>
  // context: BaseContext & ContextT
  // request: BaseRequest
  // response: BaseResponse

  constructor(options?: OptionsType) {
    super()
    options = options || {}
    // this.env = options.env || process.env.NODE_ENV || 'development' // 环境变量
    // this.compose = options.compose || compose
    this.middlewares = [] // 中间件
    // this.context = Object.create(context) // 赋值 context.js
    // this.request = Object.create(request) // 赋值 request.js
    // this.response = Object.create(response) // 赋值 response.js
  }

  listen(port: number, callback: NoopType) {
    const server = http.createServer((req, res) => {
      for (let i = 0; i < this.middlewares.length; i++) {
        this.middlewares[i](req, res)
      }
    })

    return server.listen(port, callback)
  }

  use(middleware: MiddlewareType) {
    if (typeof middleware !== 'function')
      throw new TypeError('middleware must be a function!')

    this.middlewares.push(middleware)

    return this
  }
}
