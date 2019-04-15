import { num2String } from './index';

/**
 * moment的部分方法简易实现，替换moment包（过大）
 * @param baseStamp Int 基础时间戳，不传入时默认使用当前时间戳
 */
export default class Moment {
  constructor(baseStamp) {
    this.base = parseInt(baseStamp, 10) || new Date().getTime();
    this.baseDate = new Date(this.base);
  }

  /**
   * 对时间戳格式化String类型的时间，目前识别YYYY | MM | DD | hh | mm | ss (分别代表年月日时分秒)
   * @param formatter 需要的时间字符串样式，如'YYYY-MM-DD hh:mm:ss'
   * @param timeStamp 需要转化的毫秒时间戳，默认为当前时间戳
   */
  format(formatter, timeStamp = this.base) {
    const timeDate = new Date(timeStamp);
    return formatter
      .replace('YYYY', timeDate.getFullYear())
      .replace('MM', num2String(timeDate.getMonth() + 1))
      .replace('DD', num2String(timeDate.getDate()))
      .replace('hh', num2String(timeDate.getHours()))
      .replace('mm', num2String(timeDate.getMinutes()))
      .replace('ss', num2String(timeDate.getSeconds()));
  }

  /**
   * 在当前时间的基础上增减一定的时间单位
   * @param num 加减数字
   * @param unit 时间单位
   * @param formatter 返回时间的样式，默认为毫秒时间戳，也可自定义字符串样式
   */
  add(num, unit, formatter = 'u') {
    let gap;
    const numGap = parseInt(num, 10);
    switch (unit) {
      case 's':
        gap = numGap * 1000;
        break;
      case 'm':
        gap = numGap * 60000;
        break;
      case 'h':
        gap = numGap * 24 * 60000;
        break;
      default:
        throw new Error('Moment Error: add函数时间单位不支持');
    }
    gap = gap.toFixed(0);
    if (formatter !== 'u') {
      return this.format(formatter, this.base + gap);
    }
    return this.base + gap;
  }
}
