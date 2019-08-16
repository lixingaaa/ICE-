/**
 * 小程序基础配置文件
 * 访问的URL链接
 */
let host = "http://192.168.1.160:8091"; // 测试环境
// let host = "http://192.168.1.155:8091"; // 本地环境
let config = {

  // 通过code查询会员信息
  getUserInfoByCode: host + '/api/user/member/first',

  // 解析加密的用户信息查询会员信息
  getEncryptionUserInfo: host + '/api/user/member/getWeixinUser',


  // 手机发送验证码
  getVerificationCode: host + '/api/user/member/verificationCode',

  // 手机号注册
  phoneLogin: host + '/api/user/member/phoneLogin',

  // 微信快捷注册
  wxLogin: host + '/api/user/member/weixinLogin',
}

module.exports = config