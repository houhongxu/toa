import Emitter from 'events';
import http, { IncomingMessage, ServerResponse } from 'http';
import { TooaMiddlewareType, TooaContextType, TooaRequestType, TooaResponseType, TooaOptionsType, NoopType } from './types.js';

declare class Application extends Emitter {
    middlewareStack: TooaMiddlewareType[];
    compose: any;
    context: TooaContextType;
    request: TooaRequestType;
    response: TooaResponseType;
    constructor(options?: TooaOptionsType);
    listen(port?: number, listeningListener?: NoopType): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    use(middleware: TooaMiddlewareType): this;
    callback(): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
    createContext(req: IncomingMessage, res: ServerResponse): TooaContextType;
}

export { Application as default };
