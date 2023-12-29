import Emitter from 'events';
import http, { IncomingMessage, ServerResponse } from 'http';

type NoopType = () => void;
type TooaNextType = () => Promise<any>;
type TooaMiddlewareType = (context: TooaContextType, next: TooaNextType) => void;
interface TooaOptionsType {
    compose?: any;
}
interface TooaContextType {
    req?: IncomingMessage;
    res?: ServerResponse;
    tooaReq?: TooaRequestType;
    tooaRes?: TooaResponseType;
    url?: string;
    body?: string;
}
interface TooaRequestType {
    req?: IncomingMessage;
    res?: ServerResponse;
    url?: string;
}
interface TooaResponseType {
    req?: IncomingMessage;
    res?: ServerResponse;
    body?: string;
}

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

export { type NoopType, type TooaContextType, type TooaMiddlewareType, type TooaNextType, type TooaOptionsType, type TooaRequestType, type TooaResponseType, Application as default };
