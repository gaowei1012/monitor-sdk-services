export function getRandom(n) {
  var num = ''
  for (var i = 0; i < n; i++) {
    num += Math.floor(Math.random() * 10)
  }
  return num
}

export function createNonceStr() {
  return Math.random().toString(36).substr(2, 15)
}

export function createTimeStamp() {
  return new Date().getTime() / 1000 + ''
}

export function rawData(args) {
  let keys = Object.keys(args)
  keys = keys.sort()
  let newArgs = {}
  keys.forEach((key) => {
    newArgs[key] = args[key]
  })
  let string = ''
  for (let k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}
