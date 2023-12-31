import { TooaContextType, TooaMiddlewareType } from './types'

/**
 * 将node中间件处理为支持洋葱模型的格式
 */
export function compose(middlewareStack: TooaMiddlewareType[]) {
  if (!Array.isArray(middlewareStack))
    throw new TypeError('Middleware stack must be an array!')
  for (const middleware of middlewareStack) {
    if (typeof middleware !== 'function')
      throw new TypeError('Middleware must be composed of functions!')
  }

  // 返回一个函数接收ctx
  return (ctx: TooaContextType) => {
    // 指向前一个中间件
    let index = -1

    // 执行中间件的函数
    function dispatch(i: number): Promise<any> {
      // 如果index不是前一个中间件，说明中间件中调用了多次next函数
      if (i <= index) {
        return Promise.reject(new Error('next() call more than once!'))
      }
      // 此时index指向当前中间件
      index = i
      let middleware = middlewareStack[i]

      // 当执行完最后一个中间件时，返回空promise
      if (i === middlewareStack.length) {
        return Promise.resolve()
      }

      // 返回一个已经完成的promise
      try {
        // 异步执行当前中间件，等待返回值后返回，next函数就是执行下一个中间件的函数
        return Promise.resolve(middleware(ctx, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    // 从第一个中间件开始执行
    return dispatch(0)
  }
}
