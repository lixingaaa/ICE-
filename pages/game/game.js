var ctx = wx.createCanvasContext('game');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iceCreamList: [], // 冰淇淋列表
    basin: {
      x: 0,
      y: 0
    }, // 盆的初始信息
    integral: 0, // 积分
    deviceInfo: {}, // 设备信息
    touchstartX: 0, // 手指触摸开始时X轴的坐标
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    // 获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          deviceInfo: res,
          basin: {
            x: (res.windowWidth - 60) / 2,
            y: res.windowHeight - 80
          }
        })
      },
      complete: function() {
        that.initialize();
        that.playGame()
      }
    })
  },

  // 开始游戏
  playGame() {
    let that = this;
    let time = this.data.time;

    // 绘制盆
    this.drawBasin()

    // 冰淇淋生成速度
    let timer1 = setInterval(function () {
      if (that.data.time < 60) {
        let iceCreamList = that.data.iceCreamList;
        iceCreamList.push(...that.createIcecream());
        that.setData({
          iceCreamList: iceCreamList
        })
      } else {
        clearInterval(timer1);
      }
    }, 500)

    // 下落速度
    let timer2 = setInterval(function () {
      if (that.data.time < 60) {
        that.drawCanvas(that.iceCreamDrop(that.data.iceCreamList))
      } else {
        clearInterval(timer2);
      }
      console.log(that.data.iceCreamList)
    }, 5);

    // 时间
    let timer3 = setInterval(function () {
      if (that.data.time < 60) {
        that.setData({
          time: that.data.time + 1
        })
      } else {
        clearInterval(timer3);
      }
    }, 1000)
  },

  // 初始化游戏
  initialize() {
    let that = this;
    let deviceInfo = this.data.deviceInfo;

    // 初始化数据
    this.setData({
      iceCreamList: [],
      basin: {
        x: (deviceInfo.windowWidth - 60) / 2,
        y: deviceInfo.windowHeight - 80
      },
      integral: 0,
      touchstartX: 0,
      time: 0
    })

    // 重新开始游戏
    that.playGame();
  },

  // 随机位置生成冰淇淋
  createIcecream() {
    let iceCreamList = [];
    for (var i = 0; i < 3; i++) {
      iceCreamList.push({
        x: Math.floor(Math.random() * (325 - 50 + 1)) + 50,
        y: Math.floor(Math.random() * (30 + 1)) + 30,
        type: "冰淇淋",
        image: '../../images/ice.png',
        integral: 1,
        size: [20, 20]
      });
    }
    return iceCreamList;
  },

  // 冰激凌掉落
  iceCreamDrop(list) {
    let that = this;
    let basin = this.data.basin; // 盆的位置
    let deviceInfo = this.data.deviceInfo;
    for(var i = 0; i < list.length; i++) {
      if (list[i].y > deviceInfo.windowHeight - 82) {
        list.splice(i, 1);
      } else if (list[i].x >= (basin.x - 20) && list[i].x <= (basin.x + 60) && list[i].y >= (deviceInfo.windowHeight - 100) && list[i].y <= (deviceInfo.windowHeight - 80)) {
        that.setData({
          integral: that.data.integral + list[i].integral
        });
        list.splice(i, 1);
      } else {
        list[i].y += 1;
      }
    }
    return list;
  },

  // 画图
  drawCanvas(list) {
    // 绘制冰激凌
    for (var i = 0; i < list.length; i++) {
      ctx.drawImage(list[i].image, list[i].x, list[i].y, list[i].size[0], list[i].size[1]);
    }
    // 初始化盆
    this.drawBasin();
    ctx.draw();
  },

  // 绘制盆
  drawBasin() {
    // 获取盆坐标
    let basin = this.data.basin;
    ctx.drawImage('../../images/basin.png', basin.x, basin.y, 60, 30);
    ctx.draw;
  },

  // 手指触摸开始
  touchstart(e) {
    console.log('手指触摸开始')
    console.log(e)
    this.setData({
      touchstartX: e.changedTouches[0].x
    })
  },

  // 手指触摸后移动
  touchmove(e) {
    let basin = this.data.basin; // 获取当前盆坐标
    let deviceInfo = this.data.deviceInfo;
    console.log(deviceInfo.windowWidth)
    let touchstartX = this.data.touchstartX; // 手指触摸开始的坐标
    let touchmoveX = e.changedTouches[0].x; // 手指移动后的坐标
    let diff = touchmoveX - touchstartX;
    if (diff < 0) {
      this.setData({
        touchstartX: touchmoveX,
        basin: {
          x: basin.x - Math.abs(diff) < 50 ? 50 : basin.x - Math.abs(diff),
          y: basin.y
        }
      })
    } else if (diff > 0) {
      this.setData({
        touchstartX: touchmoveX,
        basin: {
          x: (basin.x + Math.abs(diff)) > deviceInfo.windowWidth-110 ? deviceInfo.windowWidth-110 : basin.x + Math.abs(diff),
          y: basin.y
        }
      })
    }
  },

  // 手指触摸动作结束
  touchend(e) {
    console.log('手指触摸动作结束')
    console.log(e)
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