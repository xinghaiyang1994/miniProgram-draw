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
      title:'画笔',
      check:true
    },{
      title:'直线',
      check:false
    },{
      title:'矩形',
      check:false
    },{
      title:'橡皮',
      check:false
    },{
      title:'颜色',
      check:false
    }],
    canInfo:{
      top:'0',
      left:'0',
      width:'100',
      height:'100'
    }
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
    // var p = wx.createCanvasContext('myCanvas');
    // p.setLineCap('round')
    // p.moveTo(this.start.x, this.start.y);
    // p.lineTo(end.x,end.y)
    // p.stroke();
    // p.draw(true);
    // this.start=end; 


    this.data.canInfo.top=this.start.y;
    this.data.canInfo.left=this.start.x;
    this.data.canInfo.width=end.x-this.start.x;
    this.data.canInfo.height=end.y-this.start.y;
    
    this.setData({
      canInfo:this.data.canInfo
    })
    // this.data.canvasConf.color='blue';
    // p.setFillStyle(this.data.canvasConf.color);
    // p.fillRect(this.start.x, this.start.y, end.x - this.start.x, end.y - this.start.y);
    // p.draw()
  },
  touchEnd: function (e) {
    var end = e.changedTouches[0];
    var p = wx.createCanvasContext('myCanvas');
    
    p.fillRect(this.start.x,this.start.y,this.data.canInfo.width,this.data.canInfo.height)
    p.draw(true);
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