import { IncomingMessage, ServerResponse } from 'http';

type TooaNextType = () => Promise<any>;
type TooaMiddlewareType = (context: TooaContextType, next: TooaNextType) => void;
interface TooaContextType {
    req?: IncomingMessage;
    res?: ServerResponse;
    tooaReq?: TooaRequestType;
    tooaRes?: TooaResponseType;
    body?: string;
    url?: string;
}
interface TooaRequestType {
    req?: IncomingMessage;
    url?: string;
}
interface TooaResponseType {
    res?: ServerResponse;
    body?: string;
}

/**
 * 将node中间件处理为支持洋葱模型的格式
 */
declare function compose(middlewareStack: TooaMiddlewareType[]): (ctx: TooaContextType) => Promise<any>;

export { type TooaContextType, type TooaMiddlewareType, type TooaNextType, type TooaRequestType, type TooaResponseType, compose as default };
