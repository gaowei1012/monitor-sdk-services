import code from 'svg-captcha'

export function getCreateCode() {
  return code.create({
    size: 4,
    ignoreChars: '0o1iIl',
    noise: 3,
    color: true,
    background: '#fff',
    fontSize: 60
  })
}
