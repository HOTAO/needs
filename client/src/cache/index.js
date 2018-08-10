import WebStorageCache from 'web-storage-cache'

const KEYS = {
  token: 'ak',
  userInfo: 'userInfo'
}

class CacheClass {
  constructor(type) {
    this.storage = new WebStorageCache({ storage: type })
  }

  get(key) {
    this.hasKey(key)
    return this.storage.get(key)
  }

  set(key, value, exp) {
    this.hasKey(key)
    this.storage.set(key, value, exp ? { exp } : null)
  }

  delete(key) {
    this.hasKey(key)
    this.storage.delete(key)
  }

  hasKey(key) {
    if (!key || !KEYS.hasOwnProperty(key)) {
      throw new Error('请传入正确的key')
    }
  }
}

const lsCache = new CacheClass('localStorage')
const ssCache = new CacheClass('sessionStorage')

export default {
  lsCache,
  ssCache
}
