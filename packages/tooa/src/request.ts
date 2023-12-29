import { TooaRequestType } from './types'

export const request: TooaRequestType = {
  get url() {
    return this.req?.url
  },
}
