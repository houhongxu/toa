import { TooaContextType } from './types'

export const context: TooaContextType = {
  get url() {
    return this.tooaReq?.url
  },
  get body() {
    return this.tooaRes?.body
  },
  set body(body) {
    if (this.tooaRes) {
      this.tooaRes.body = body
    }
  },
}
