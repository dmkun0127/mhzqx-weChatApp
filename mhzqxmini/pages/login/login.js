// client/pages/login.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAdmin: false
  },

  onLoad: function () {
    getApp().watch((value) => {
      this.setData({
        isAdmin: value
      })
    })
    var that = this
    app.getOpenId().then(function (res) {
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    })
  },
  joinPage: function (e) {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: '../menu/menu'
      })
    }
  },
  openOrder: function() {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  openadmin: function () {
    wx.navigateTo({
      url: '../severmenu/severmenu'
    })
  },
})