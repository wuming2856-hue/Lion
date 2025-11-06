// modify-gdianchou-response.js
// 将 accountSum -> 1120315.70, usableSum -> 900315.70
// 适用于：
// http://api.gdianchou.com/app/user/userInfo
// http://api.gdianchou.com/app/account/detail/balance
// http://api.gdianchou.com/app/account/detail/balance/sum

let body = $response && $response.body ? $response.body : null;
if (!body) {
  $done({});
}

try {
  // 尝试解析为 JSON
  let obj = JSON.parse(body);

  // 如果在顶层存在字段，则替换
  if (obj && typeof obj === "object") {
    // 有些接口可能把数据嵌在 data 或 result 下，尝试处理几种常见结构
    const setValues = (target) => {
      if (!target || typeof target !== "object") return;
      if (Object.prototype.hasOwnProperty.call(target, "accountSum")) {
        target.accountSum = 1120315.70;
      }
      if (Object.prototype.hasOwnProperty.call(target, "usableSum")) {
        target.usableSum = 900315.70;
      }
    };

    // 直接顶层
    setValues(obj);

    // 常见的 data/result 结构
    if (obj.data) setValues(obj.data);
    if (obj.result) setValues(obj.result);

    // 递归浅查找（只遍历第一层对象属性，避免深递归耗时）
    for (let k in obj) {
      if (obj.hasOwnProperty(k) && typeof obj[k] === "object" && obj[k] !== null) {
        setValues(obj[k]);
      }
    }
  }

  body = JSON.stringify(obj);
  $done({ body });
} catch (err) {
  // 如果不是 JSON（比如是文本/HTML），用正则替换数值字符串（谨慎）
  try {
    let newBody = body.replace(/"accountSum"\s*:\s*[\d\.,-]+/g, `"accountSum": 1120315.70`)
                      .replace(/"usableSum"\s*:\s*[\d\.,-]+/g, `"usableSum": 900315.70`);
    $done({ body: newBody });
  } catch (e) {
    // 最后兜底：不修改，直接放行
    $done({});
  }
}