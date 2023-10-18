// 定义了一个枚举类型 CacheType，包括两个值：Local 和 Session，用于表示不同类型的缓存，即本地缓存和会话缓存。
enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage
  // 一个类的定义，用于创建缓存管理对象。它接受一个 type 参数，表示缓存的类型，可以是 CacheType.Local 或 CacheType.Session。
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  // 这个方法用于设置缓存。它接受一个 key 参数表示缓存的键和一个 value 参数表示缓存的值。
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  // 这个方法用于获取缓存。它接受一个 key 参数表示要获取的缓存键。它从缓存中检索对应键的值，并将其解析为 JSON 对象后返回。
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  // 这个方法用于移除缓存。它接受一个 key 参数表示要移除的缓存键，并从缓存中删除对应的键值对。
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  // 这个方法用于清空整个缓存。它会清空缓存中的所有键值对。
  clear() {
    this.storage.clear()
  }
}
// 这两行代码分别创建了名为 localCache 和 sessionCache 的 Cache 类的实例对象，分别用于管理本地缓存和会话缓存。
const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)
// 总之，这段代码封装了一个通用的缓存管理类 Cache，允许在不同的缓存存储中存储、获取和删除数据。
// 根据构造函数传入的参数，它可以选择使用本地缓存或会话缓存，以满足不同的应用需求。
// 然后，通过创建实例对象 localCache 和 sessionCache，可以轻松管理不同类型的缓存数据
export { localCache, sessionCache }
