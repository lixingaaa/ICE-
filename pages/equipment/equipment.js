// 引入高德地图API
var amapFile = require('../../utils/amap-wx.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      iconPath: "../../images/icon_point.png",
      id: 0,
      latitude: 30.43472,
      longitude: 114.88005,
      width: 20,
      height: 20
    },{
      iconPath: "../../images/icon_point.png",
      id: 1,
      latitude: 30.44596,
      longitude: 114.88019,
      width: 20,
      height: 20
    },{
      iconPath: "../../images/icon_point.png",
      id: 2,
      latitude: 30.46596,
      longitude: 114.88019,
      width: 20,
      height: 20
    }],
    curmarkers: 0
  },

  onLoad: function () {
    let that = this
    // 获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },

  // 选择标记点
  markertap(e){
    console.log(e)
    this.setData({
      curmarkers: e.markerId
    })
  },

  // 打开地图
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
        })
      }
    })
  }
})