export function only(obj: Record<string, any>, keys: string | string[]) {
  obj = obj || {}

  let splitedKeys: string[]

  if (typeof keys === 'string') {
    // split(/ +/)处理连续空格
    splitedKeys = keys.split(/ +/)
  } else if (Array.isArray(keys)) {
    splitedKeys = keys
  } else {
    throw new Error('keys needs to be a string or an array of strings')
  }

  return splitedKeys.reduce<Record<string, any>>((pre, cur) => {
    if (obj[cur] === null || obj[cur] === undefined) {
      return pre
    }

    pre[cur] = obj[cur]

    return pre
  }, {})
}
