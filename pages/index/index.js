//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    config:{
      type:'line',
      color:'blue',
      width:5
    },
    nav:[{
      id:0,
      title:'画笔',
      type:'pen',
      check:false
    },{
      id:1,
      title:'直线',
      type:'line',
      check:true
    },{
      id:2,
      title:'矩形',
      type:'rect',
      check:false
    },{
      id:3,
      title:'橡皮',
      type:'eraser',
      check:false
    },{
      id:4,
      title:'颜色',
      type:'color',
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
 
    var index=e.currentTarget.dataset.id;
    var config=this.data.config;

    this.data.nav.forEach(function(el,i) {
      if(i == index){
        el.check=true;
        config.type=el.type;
      }else{
        el.check=false;
      }
    });
    this.setData({
      nav:this.data.nav,
      config
    });

  },
  touchStart: function (e) {
    this.data.start = e.changedTouches[0];

  },
  touchMove: function (e) {
    var config=this.data.config;
    var p = wx.createCanvasContext('myCanvas');
    var end = e.changedTouches[0];

    if(config.type=='pen' || config.type=='eraser'){

      if(config.type=='eraser'){
        config.color='#ffffff';
      }
      p.moveTo(this.data.start.x, this.data.start.y);
      p.lineTo(end.x,end.y);
      p.setStrokeStyle(config.color);
      p.setLineCap('round');
      p.setLineWidth(config.width);
      p.stroke();
      p.draw(true);
      this.data.start=end; 

    }else if(config.type=='line'){
      console.log(1)
    }else if(false){
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

    }else{

    }
    
    this.setData({
      canInfo:this.data.canInfo
    })
    // this.data.config.color='blue';
    // p.setFillStyle(this.data.config.color);
    // p.fillRect(this.start.x, this.start.y, end.x - this.start.x, end.y - this.start.y);
    // p.draw()
  },
  touchEnd: function (e) {
    var config=this.data.config;
    var p = wx.createCanvasContext('myCanvas');
    var end = e.changedTouches[0];

    if(config.type=='pen'){

    }else if(config.type=='line'){

      p.moveTo(this.data.start.x,this.data.start.y);
      p.lineTo(end.x,end.y);
      p.setLineWidth(config.width);
      p.stroke();
      p.draw(true);

    }else if(false){
      var end = e.changedTouches[0];
      
      p.fillRect(this.start.x,this.start.y,this.data.canInfo.width,this.data.canInfo.height)
      p.draw(true);
      // p.save();
      // this.data.config.color='blue';
      // p.setFillStyle(this.data.config.color);
      // p.fillRect(this.start.x, this.start.y, end.x - this.start.x, end.y - this.start.y);
      // p.draw(true)

    }else{

    }
  },
  clear(){
    var p = wx.createCanvasContext('myCanvas');
    console.log(p)
    p.clearRect(0,0,900,908);
    p.draw()
  },
  addWidth(){
    var config=this.data.config;
    if(config.width <50){
      config.width++;
      this.setData({
        config
      });
      
    }else{
      wx.showToast({
        title: '太大了',
        icon: 'success',
        duration: 2000
      });
    }
  },
  reduWidth(){
    var config=this.data.config;

    if(config.width > 1){
      config.width--;
      this.setData({
        config
      });
    }else{
      wx.showToast({
        title: '至少为1',
        icon: 'success',
        duration: 2000
      });
    }
  },
  onLoad: function () {
    
  },
  onReady: function (e) {

  }
})