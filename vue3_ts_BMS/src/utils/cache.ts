enum CacheType {
  Local,
  Session
}
// 通过类来进行封装：因为类可以将所有方法聚集在一起
class Cache {
  // 成员属性storage
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type == CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

// 导出内容大于2个的话，不能用默认导出
export {
  localCache,
  sessionCache
}
