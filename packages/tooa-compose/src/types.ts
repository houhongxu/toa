import { IncomingMessage, ServerResponse } from 'http'

export type TooaNextType = () => Promise<any>

export type TooaMiddlewareType = (
  context: TooaContextType,
  next: TooaNextType,
) => void

export interface TooaContextType {
  req?: IncomingMessage
  res?: ServerResponse
  tooaReq?: TooaRequestType
  tooaRes?: TooaResponseType
  body?: string
  url?: string
}

export interface TooaRequestType {
  req?: IncomingMessage
  url?: string
}

export interface TooaResponseType {
  res?: ServerResponse
  body?: string
}
