// dc_rewrite.js - 用于修改点筹API响应数据
const url = $request.url;
const isTargetAPI = /api\.gdianchou\.com\/app\/(user\/userInfo|account\/detail\/balance|account\/detail\/balance\/sum)/.test(url);

if (isTargetAPI && $response.body) {
    let body = $response.body;
    let modified = false;
    
    console.log(`开始处理请求: ${url}`);
    console.log(`原始响应: ${body}`);
    
    // 替换 accountSum
    const accountSumRegex = /"accountSum"\s*:\s*[\d.]+/g;
    if (accountSumRegex.test(body)) {
        body = body.replace(accountSumRegex, '"accountSum":1120315.70');
        modified = true;
        console.log('已修改 accountSum');
    }
    
    // 替换 usableSum
    const usableSumRegex = /"usableSum"\s*:\s*[\d.]+/g;
    if (usableSumRegex.test(body)) {
        body = body.replace(usableSumRegex, '"usableSum":900315.70');
        modified = true;
        console.log('已修改 usableSum');
    }
    
    if (modified) {
        console.log(`修改后响应: ${body}`);
        $done({body});
    } else {
        console.log('未找到需要修改的字段');
        $done({});
    }
} else {
    console.log('非目标API或没有响应体，跳过处理');
    $done({});
}
