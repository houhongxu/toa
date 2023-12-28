import { IncomingMessage, ServerResponse } from 'http';
import { MiddlewareType } from './types.js';

/**
 * 将node中间件处理为支持洋葱模型的格式
 */
declare function compose(middlewareStack: MiddlewareType[]): (req: IncomingMessage, res: ServerResponse) => void;

export { compose as default };
