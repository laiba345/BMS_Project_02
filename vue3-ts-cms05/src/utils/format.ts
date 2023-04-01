import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// 直接将其导出了，export，后续直接在别的组件中可以尝试直接进行调用操作
export function formatUTC(
  // 类型的操作()
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  // 地理：在原来的基础上，加上8个小时；北京时间是支持东八区的
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
