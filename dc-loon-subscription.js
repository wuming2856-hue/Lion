if (typeof $response !== 'undefined') {
    let body = $response.body;
    
    // 替换 accountSum
    body = body.replace(/"accountSum"\s*:\s*[\d.]+/g, '"accountSum":1120315.70');
    
    // 替换 usableSum  
    body = body.replace(/"usableSum"\s*:\s*[\d.]+/g, '"usableSum":900315.70');
    
    $done({body});
} else {
    $done({});
}