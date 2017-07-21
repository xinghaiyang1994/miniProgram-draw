//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canvasConf:{
      color:'blue'
    },
    nav:[{
      title:'形状',
      check:false
    },{
      title:'形状',
      check:true
    }]
  },
  chooseNav(e){
    var index=e.currentTarget.id;
    this.data.nav.forEach(function(el,i) {
      if(i == index){
        el.check=true;
      }else{
        el.check=false;
      }
    });
    this.setData({
      nav:this.data.nav
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  touchStart: function (e) {
    this.start = e.changedTouches[0];
  },
  touchMove: function (e) {
    var end = e.changedTouches[0];
    var p = wx.createCanvasContext('myCanvas');
    p.setLineCap('round')
    p.moveTo(this.start.x, this.start.y);
    p.lineTo(end.x,end.y)
    p.stroke();
    p.draw(true);
    this.start=end;
    // this.data.canvasConf.color='blue';
    // p.setFillStyle(this.data.canvasConf.color);
    // p.fillRect(this.start.x, this.start.y, end.x - this.start.x, end.y - this.start.y);
    // p.draw()
  },
  touchEnd: function (e) {
    // var end = e.changedTouches[0];
    // var p = wx.createCanvasContext('myCanvas');
    
    // p.save();
    // this.data.canvasConf.color='blue';
    // p.setFillStyle(this.data.canvasConf.color);
    // p.fillRect(this.start.x, this.start.y, end.x - this.start.x, end.y - this.start.y);
    // p.draw(true)
  },
  clear(){
    var p = wx.createCanvasContext('myCanvas');
    console.log(p)
    p.clearRect(0,0,900,908);
    p.draw()
  },
  onLoad: function () {
    
  },
  onReady: function (e) {

  }
})