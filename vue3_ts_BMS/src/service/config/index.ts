// 1、区分开发环境和生产环境 书写两个环境，用到哪个环境就用哪个环境即可
// 缺陷：过分依赖于人为的修改
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.com:8000'
// export const TIME_OUT = 10000

// 2、逻辑判断，判断当前环境 ~ 对不同的类型进行判断操作
// vite默认提供的环境变量
// console.log(import.meta.env.MODE) // 判断环境类型
// console.log(import.meta.env.DEV) // 是否为开发环境
// console.log(import.meta.env.PROD) // 是否为生产环境
// console.log(import.meta.env.SSR) // 是否是服务端渲染（server side render）

// let BASE_URL = ''
// if (import.meta.env.MODE === 'production') {
//   BASE_URL = 'http://coderwhy.prod:8000'
// } else {
//   BASE_URL = 'http://coderwhy.dev:8000'
// }

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://123.207.32.32:5000'
}

// console.log(BASE_URL) // http://coderwhy.dev:8000

// 3、通过创建dotenv(.env)文件直接创建变量
// console.log(import.meta.env.VITE_NAME) // dev

export const TIME_OUT = 10000
export { BASE_URL }
