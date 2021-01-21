/**
 * @param fn {function} 被截流函数
 * @param delay {number} 延迟时间/ms
 * @param immediate {boolean} 是否先执行一次，默认先执行一次
 */
export default function throttle(fn, delay, immediate = true) {
  let last = 0;
  if (immediate) fn();
  return (...rest) => {
    const current = new Date();
    if (current - last > delay) {
      fn(rest);
      last = current;
    }
  };
}
