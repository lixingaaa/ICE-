const app = getApp()
const service = require('../../utils/service.js');

Page({
  data: {
    memberInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    curBannerIndex: 0,
    isGT800: false,
    userInfo: []
  },

  onLoad: function() {
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

  onShow: function() {
    let that = this;
    //判断是用户是否绑定了
    if (app.globalData.userInfo && app.globalData.userInfo != '') {
      that.setData({
        userInfo: userInfo
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoCallback = userInfo => {
        if (userInfo != '') {
          that.setData({
            userInfo: userInfo
          });
        }
      }
    }
  },


  // 获取用户信息
  getUserInfo(e) {
    let that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      },
      fail: function(error) {
        console.log(error);
      }
    });
  },

  // 获取当前显示的banner下标
  getCurBanner(e) {
    this.setData({
      curBannerIndex: e.detail.current
    })
  }
})