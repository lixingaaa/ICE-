const app = getApp()
const service = require('../../utils/service.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 输入手机号
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取验证码
  getVfCode() {
    let phone = this.data.phone;
    console.log(typeof(phone))
    // service.getVfCodePromise(phone).then(res => {
    //   console.log(res)
    // })
  },

  // 登录
  loginIn() {
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res.code)
          wx.getUserInfo({
            withCredentials: true,
            success: function(info) {
              service.getEncryptionUserInfoPromise(info.encryptedData, info.iv, res.code).then(res => {
                console.log(res)
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})