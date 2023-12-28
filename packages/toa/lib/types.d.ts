import { IncomingMessage, ServerResponse } from 'http';

type NoopType = () => void;
type MiddlewareType = (req: IncomingMessage, res: ServerResponse, next: () => Promise<any>) => void;
interface OptionsType {
    compose?: any;
}

export type { MiddlewareType, NoopType, OptionsType };
