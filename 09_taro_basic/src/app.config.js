export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/discover/index',
    'pages/profile/index',
    'pages/product/index',
    'pages/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#999",
    selectedColor: "#1296db",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/tab/home.png",
        selectedIconPath: "./assets/tab/home-active.png"
      },
      {
        pagePath: "pages/discover/index",
        text: "发现",
        iconPath: "./assets/tab/discover.png",
        selectedIconPath: "./assets/tab/discover-active.png"
      },
      {
        pagePath: "pages/profile/index",
        text: "我的",
        iconPath: "./assets/tab/profile.png",
        selectedIconPath: "./assets/tab/profile-active.png"
      }
    ]
  }
})
