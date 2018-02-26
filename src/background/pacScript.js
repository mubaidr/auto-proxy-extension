function getProxyById(proxies, id) {
  const proxy = proxies.filter(p => p.id === id)[0]

  return proxy.id === 'direct'
    ? `'DIRECT'`
    : `'${proxy.protocol} ${proxy.address}:${proxy.port}'`
}

module.exports.pacScriptData = preferences => {
  const { domainProxyList, proxies, defaultProxy } = preferences
  const domains = Object.keys(domainProxyList)
  let func = 'function FindProxyForURL(url, host) {\n'

  domains.forEach(domain => {
    func += `if(url.indexOf('${domain}') > -1)\n`
    func += `return ${getProxyById(proxies, domainProxyList[domain])};\n`
  })

  func += `return ${getProxyById(proxies, defaultProxy)};\n`
  func += '}\n'

  console.log(func)

  return func
}
