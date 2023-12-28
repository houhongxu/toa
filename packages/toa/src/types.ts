import { IncomingMessage, ServerResponse } from 'http'

export type NoopType = () => void

export type MiddlewareType = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => Promise<any>,
) => void

export interface OptionsType {
  compose?: any
}
