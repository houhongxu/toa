import { IncomingMessage, ServerResponse } from 'http';

type NoopType = () => void;
type TooaMiddlewareType = (context: TooaContextType, next?: () => Promise<any>) => void;
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

export type { NoopType, TooaContextType, TooaMiddlewareType, TooaOptionsType, TooaRequestType, TooaResponseType };
