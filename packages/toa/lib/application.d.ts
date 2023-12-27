import Emitter from 'events';
import http from 'http';
import { MiddlewareType, OptionsType, NoopType } from './types.js';

declare class Application extends Emitter {
    middlewares: Array<MiddlewareType>;
    constructor(options?: OptionsType);
    listen(port: number, callback: NoopType): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    use(middleware: MiddlewareType): this;
}

export { Application as default };
