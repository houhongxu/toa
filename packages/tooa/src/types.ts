import { IncomingMessage, ServerResponse } from 'http'

export type NoopType = () => void

export type TooaNextType = () => Promise<any>

export type TooaMiddlewareType = (
  context: TooaContextType,
  next: TooaNextType,
) => void

export interface TooaOptionsType {
  compose?: any
}

export interface TooaContextType {
  req?: IncomingMessage
  res?: ServerResponse
  tooaReq?: TooaRequestType
  tooaRes?: TooaResponseType
  url?: string
  body?: string
}

export interface TooaRequestType {
  req?: IncomingMessage
  res?: ServerResponse
  url?: string
}

export interface TooaResponseType {
  req?: IncomingMessage
  res?: ServerResponse
  body?: string
}
