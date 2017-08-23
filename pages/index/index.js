//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    url:'https://www.baidu.com/img/bd_logo1.png',
    motto: 'Hello World',
    userInfo: {},
    config:{
      type:'line',
      rectType:'fillRect',
      color:'black',
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
      check:false
    },{
      id:2,
      title:'矩形',
      type:'rect',
      check:true
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
      isShow:false,
      top:'0',
      left:'0',
      width:'0',
      height:'0'
    },
    color:[{
      id:0,
      value:'black',
      check:true
    },{
      id:1,
      value:'red',
      check:false
    },{
      id:2,
      value:'blue',
      check:false
    },{
      id:3,
      value:'yellow',
      check:false
    },{
      id:4,
      value:'green',
      check:false
    },{
      id:5,
      value:'aqua',
      check:false
    }],
    rect:[{
      id:0,
      type:'fillRect',
      check:true
    },{
      id:1,
      type:'strokeRect',
      check:false
    }]
  },
  chooseNav(e){
 
    var index=e.currentTarget.dataset.id;
    var config=this.data.config;

    this.data.nav.forEach(function(el,i) {
      if(el.id == index){
        el.check=true;
        if(el.type != 'color'){
          config.type=el.type;
        }
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

    var config=this.data.config;
    var canInfo=this.data.canInfo;
    this.data.start = e.changedTouches[0];
    
    if(config.type == 'rect'){   
      canInfo.isShow=true;
      this.setData({
        canInfo
      });
    }

  },
  touchMove: function (e) {

    var config=this.data.config;
    var p = wx.createCanvasContext('myCanvas');
    var end = e.changedTouches[0];
    var canInfo=this.data.canInfo;
    var start=this.data.start;

    if(config.type=='pen' || config.type=='eraser'){

      if(config.type=='eraser'){
        config.color='#ffffff';
      }
      p.moveTo(start.x, start.y);
      p.lineTo(end.x,end.y);
      p.setStrokeStyle(config.color);
      p.setLineCap('round');
      p.setLineWidth(config.width);
      p.stroke();
      p.draw(true);
      start=end; 

      this.setData({
        canInfo,
        start
      });

    }else if(config.type=='line'){
      console.log('line')
    }else if(config.type=='rect'){
      
      canInfo.width=Math.abs(end.x-start.x);
      canInfo.height=Math.abs(end.y-start.y);

      if(end.x > start.x){
        canInfo.left=start.x;
      }else{ 
        canInfo.left=start.x - canInfo.width;
      }

      if(end.y > start.y){
        canInfo.top=start.y;
      }else{
        canInfo.top=start.y - canInfo.height;
      }

      this.setData({
        canInfo
      });
    }else{

    }
    
    
  
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
      p.setStrokeStyle(config.color);
      p.stroke();
      p.draw(true);

    }else if(config.type=='rect'){

      var canInfo=this.data.canInfo;
      var start=this.data.start;
      
      if(config.rectType == 'fillRect'){
        p.setFillStyle(config.color);
        p.fillRect(canInfo.left,canInfo.top,canInfo.width,canInfo.height);
      }else{
        p.setStrokeStyle(config.color);
        p.strokeRect(canInfo.left,canInfo.top,canInfo.width,canInfo.height)
      }
     
      p.draw(true);
      canInfo.isShow=false;
    
      this.setData({
        canInfo
      });

    }else{

    }
  },
  clear(){
    var p = wx.createCanvasContext('myCanvas');

    p.setFillStyle('white');
    p.fillRect(0,0,900,908);
    p.draw(true)
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
  chooseColor(e){
    var id=e.currentTarget.dataset.id;
    var color=this.data.color;
    var config=this.data.config;

    color.forEach((el)=>{
      if(el.id == id){
        el.check=true;
        config.color=el.value;
      }else{
        el.check=false;
      }
    });
    console.log(config.color)
    this.setData({
      color,
      config
    });
  },
  saveImg(){
    
    wx.showModal({
      title: '下载图片',
      content: '是否需要保存所绘图片?',
      success: function(res) {
        if (res.confirm) {
          
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: 'myCanvas',
            success: function(res) {
            
              wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: function(res) {
                  var savedFilePath = res.savedFilePath;
                  
                  wx.saveImageToPhotosAlbum({
                    filePath:savedFilePath,
                    success(){
                      console.log('ok')
                    }
                  });
      
                }
              });
      
            } 
          });

        }
      }
    })


  
  
   
  },
  chooseRect(e){
    var id=e.currentTarget.dataset.id;
    var rect=this.data.rect;
    var config=this.data.config;

    rect.forEach(function(el,i){
      if(el.id == id){
        el.check=true;
        config.rectType=el.type;
      }else{
        el.check=false;
      }
    });

    this.setData({
      rect,
      config
    });

  },
  onLoad: function () {
    
  },
  onReady: function (e) {
    this.clear();
    
  }
})