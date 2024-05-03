import _isEmpty from "lodash/isEmpty";

interface AnyObject {
  [key: string]: any
}

export const areAllPropertiesEmpty = (obj: AnyObject): boolean => {
  for (const key in obj) {
    if (!_isEmpty(obj[key])) {
      return false
    }
  }
  return true
}
