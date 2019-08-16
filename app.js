const service = require('utils/service.js');

App({

  // 小程序启动生命周期
  onLaunch: function() {
    let that = this;
    // 检查登录状态
    that.checkLoginStatus();
  },

  // 检查本地 storage 中是否有登录态标识
  checkLoginStatus: function() {
    let that = this;
    let loginFlag = wx.getStorageSync('loginFlag');
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function() {
          // 直接从Storage中获取用户信息
          let userStorageInfo = wx.getStorageSync('userInfo');
          if (userStorageInfo) {
            that.globalData.userInfo = JSON.parse(userStorageInfo);
            //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoCallback) {
              that.userInfoCallback(JSON.parse(userStorageInfo))
            }
          } 
        },
        // session_key 过期
        fail: function() {
          // session_key过期
          that.doLogin();
        }
      });
    } else {
      // 无登录态
      that.doLogin();
    }
  },

  // 登录动作
  doLogin: function(callback = () => {}) {
    let that = this;
    wx.login({
      success: function(loginRes) {
        if (loginRes.code) {
          // 请求服务端的登录接口
          service.getUserInfoByCodePromise(loginRes.code).then(res => {
            console.log(res)
            that.globalData.userInfo = res.data.data;
            wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
            wx.setStorageSync('loginFlag', true);
            //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoCallback) {
              that.userInfoCallback(res.data.data)
            }
          }, err => {
            if (err.data.code == 2102) {
              that.globalData.code = loginRes.code
            }
          })
        } else {
          // 获取 code 失败
          that.showInfo('登录失败');
          console.log('调用wx.login获取code失败');
        }
      },
      fail: function(error) {
        // 调用 wx.login 接口失败
        that.showInfo('接口调用失败');
        console.log(error);
      }
    });
  },

  // 检查用户信息授权设置
  checkUserInfoPermission: function(callback = () => {}) {
    let that = this;
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {}
      },
      fail: function(error) {
        console.log(error);
      }
    });
  },

  // 获取用户登录标示 供全局调用
  getLoginFlag: function() {
    return wx.getStorageSync('loginFlag');
  },

  // 封装 wx.showToast 方法
  showInfo: function(info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },
  globalData: {
    userInfo: '',
    code: ''
  }
})