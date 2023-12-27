import { IncomingMessage, ServerResponse } from 'http';

type NoopType = () => void;
type MiddlewareType = (req: IncomingMessage, res: ServerResponse) => void;
interface OptionsType {
}

export type { MiddlewareType, NoopType, OptionsType };
