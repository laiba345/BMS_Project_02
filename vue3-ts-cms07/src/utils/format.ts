import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
// 总的来说，这段代码的作用是提供一个函数 formatUTC，用于将传入的 UTC 时间字符串转换为本地时间，并以指定格式进行格式化。
export function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
