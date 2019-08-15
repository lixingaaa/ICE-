const wxRequest = require('wxRequest.js')
const config = require("config.js");

// 通过code查询会员信息
function getUserInfoByCodePromise(code) {
  let getUserInfoByCodeUrl = config.getUserInfoByCode;
  let data = {
    "code": code
  }
  return wxRequest.wxPromise('GET', getUserInfoByCodeUrl, data);
} 

// 解析加密的用户信息查询会员信息
function getEncryptionUserInfoPromise(encryptedData, iv, code) {
  let getEncryptionUserInfoUrl = config.getEncryptionUserInfo
  let data = {
    "encryptedData": encryptedData,
    "iv": iv,
    "code": code
  }
  return wxRequest.wxPromise('POST', getEncryptionUserInfoUrl, data);
}

// 手机发送验证码
function getVfCodePromise(phone) {
  let getVfCodeUrl = config.getVerificationCode;
  let data = {
    "phone": phone
  }
  return wxRequest.wxPromise('GET', getVfCodeUrl, data);
}

// 创建会员账号
function setUserMemberPromise(phone, userInfo, verificationCode) {
  let createUserUrl = config.createUserMember;
  let data = {
    "phone": phone,
    "userInfo": userInfo,
    "verificationCode": verificationCode
  }
  return wxRequest.wxPromise("POST", createUserMemberUrl, data);
}

// 微信快捷注册
function wxLoginPromise(encryptedData, iv, openId, code) {
  let wxLoginUrl = config.wxLogin;
  let data = {
    encryptedData: encryptedData,
    iv: iv,
    openId: openId,
    code: code
  }
  return wxRequest.wxPromise("POST", wxLoginUrl, data);
}

module.exports = {
  getUserInfoByCodePromise: getUserInfoByCodePromise,
  getEncryptionUserInfoPromise: getEncryptionUserInfoPromise,
  getVfCodePromise: getVfCodePromise,
  setUserMemberPromise: setUserMemberPromise,
  wxLoginPromise: wxLoginPromise
}