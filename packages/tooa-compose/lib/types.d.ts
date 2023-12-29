import { IncomingMessage, ServerResponse } from 'http';

type TooaMiddlewareType = (context: TooaContextType, next?: () => Promise<any>) => void;
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

export type { TooaContextType, TooaMiddlewareType, TooaRequestType, TooaResponseType };
