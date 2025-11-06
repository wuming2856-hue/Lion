// dc_modify.js
// Loon remote script to modify response body values for account sums
(function() {
  try {
    const body = $response && $response.body ? $response.body : "";
    const modified = body
      .replace(/"accountSum"\s*:\s*\d+(\.\d+)?/g, '"accountSum":1120315.70')
      .replace(/"usableSum"\s*:\s*\d+(\.\d+)?/g, '"usableSum":900315.70');
    $done({ body: modified });
  } catch (e) {
    $done({ body: $response.body });
  }
})();
