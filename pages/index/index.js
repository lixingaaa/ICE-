const app = getApp()
const service = require('../../utils/service.js');

Page({
  data: {
    encryptedData: '',
    memberInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    curBannerIndex: 0,
    isGT800: false
  },

  onLoad: function () {
    console.log(service)
    let that = this;

    // 获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        if (res.screenHeight >= 800) {
          that.setData({
            isGT800: true
          })
        }
      },
    })
  },

  // 获取用户信息
  getUserInfo(e){
    console.log(e)
    let encryptedData = e.detail.encryptedData;
    if (encryptedData) {
      app.globalData.encryptedData = encryptedData;
      this.setData({
        encryptedData: encryptedData
      })
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  // 获取当前显示的banner下标
  getCurBanner(e) {
    this.setData({
      curBannerIndex: e.detail.current
    })
  }
})
