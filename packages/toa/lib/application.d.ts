import Emitter from 'events';
import http from 'http';
import { MiddlewareType, OptionsType, NoopType } from './types.js';

declare class Application extends Emitter {
    middlewareStack: MiddlewareType[];
    compose: any;
    constructor(options?: OptionsType);
    listen(port?: number, listeningListener?: NoopType): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    use(middleware: MiddlewareType): this;
    callback(): any;
}

export { Application as default };
