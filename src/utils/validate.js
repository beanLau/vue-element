/**
 * 正整数(不包含0)
 */
export function positiveIntegerValidater(rule, value, callback, msg) {
  if (/^[1-9]*[1-9][0-9]*$/.test(value)) {
    callback();
  } else {
    callback(new Error(msg || "请输入大于0的整数"));
  }
}
/**
 * 正整数(包含0)
 */
export function positiveIntegerValidater2(rule, value, callback, msg) {
  if (/^[0-9]*[1-9][0-9]*$/.test(value)) {
    callback();
  } else {
    callback(new Error(msg || "请输入正整数"));
  }
}
/**
 * 整数 包含0和负数
 */
export function integerValidater(rule, value, callback, msg) {
  if (/^-?[0-9]*[1-9][0-9]*$/.test(value)) {
    callback();
  } else {
    callback(new Error(msg || "请输入整数"));
  }
}

/**
 * 手机号验证
 */
export function phoneValidater(rule, value, callback, msg) {
  if (/^1[0-9][0-9]\d{8}$/.test(value)) {
    callback();
  } else {
    callback(new Error(msg || "手机号格式错误"));
  }
}
