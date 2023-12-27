import type { IncomingMessage, ServerResponse } from 'http'

export type NoopType = () => void

export type MiddlewareType = (req: IncomingMessage, res: ServerResponse) => void

export interface OptionsType {}
