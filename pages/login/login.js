const app = getApp();
const service = require('../../utils/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 微信手机号快捷登陆
  getPhoneNumber(e) {
    console.log(e)
    let that = this;
    let phone = e.detail;
    let code = app.globalData.code;
    wx.getUserInfo({
      withCredentials: true,
      success(info) {
        console.log(info)
        service.getEncryptionUserInfoPromise(info.encryptedData, info.iv, code).then(wxInfo => {
          return service.wxLoginPromise(phone.encryptedData, phone.iv, wxInfo.data.data.openid, code)
        }).then(res => {
          console.log(res)
          that.globalData.userInfo = res.data.data;
          wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
          wx.setStorageSync('loginFlag', true);
          if (that.userInfoCallback) {
            that.userInfoCallback(res.data.data)
          }
          wx.navigateBack({
            delta: 1
          })
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})