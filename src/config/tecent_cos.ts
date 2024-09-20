let cosHost: string = ''
if (process.env.NODE_ENV === 'dev') {
  cosHost = '127.0.0.1:4003'
} else {
  cosHost = '127.0.0.1:4003'
}
export default {
  smsTemplate: {
    OTP: '2001226' //短信验证码模板， TemplateParamSet: ["验证码", "有效时长"]
  },
  cosHost: cosHost
}
