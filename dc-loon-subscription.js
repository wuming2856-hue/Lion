[Rewrite]
# 规则1：修改 accountSum 值
^https?:\/\/api\.gdianchou\.com\/(app\/user\/userInfo|app\/account\/detail\/balance|app\/account\/detail\/balance\/sum) url response-body ("accountSum"\s*:\s*)\d+(\.\d+)? "$11120315.70"

# 规则2：修改 usableSum 值  
^https?:\/\/api\.gdianchou\.com\/(app\/user\/userInfo|app\/account\/detail\/balance|app\/account\/detail\/balance\/sum) url response-body ("usableSum"\s*:\s*)\d+(\.\d+)? "$1900315.70"

[MitM]
hostname = api.gdianchou.com