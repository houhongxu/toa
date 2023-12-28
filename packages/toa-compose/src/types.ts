import { IncomingMessage, ServerResponse } from 'http'

export type MiddlewareType = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => Promise<any>,
) => void
