import { IncomingMessage, ServerResponse } from 'http';

type MiddlewareType = (req: IncomingMessage, res: ServerResponse, next: () => Promise<any>) => void;

export type { MiddlewareType };
