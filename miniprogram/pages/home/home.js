// miniprogram/pages/home/home.js
Page({
  //分类控制器
  tabControlClick(event){ 
    this.data.popup = false
    this.setData({
      popup: this.data.popup
    })
   // console.log(event.detail)
    if(event.detail.index==2){
      this.setData({
        loadingshow:true
      })
      wx.cloud.callFunction({
        name:'getGoodsByCondition',
        data:{
          goodsSchool:'西南石油大学',//暂时传入固定的
          goodsCategory:'clothes'
        },
        success:res=>{
         
         // console.log(res.result.list)
          this.setData({
            goods:[],
            displayLeft:[],//goods里面有show：flase
            displayRight:[],//goods里面有show：flase
            star_list:[]
          })
          this.setData({
            goods:res.result.list
          })
        // console.log(this.data.goods)
        //变量goods对象获取index值
        for(var i=0;i<this.data.goods.length;i++){       
         if(i%2==0){
          this.setData({
            displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
          })
         }else{
          this.setData({
            displayRight:this.data.displayRight.concat(this.data.goods[i]),       
          })
         }
        }
        //注入show;false
        for(var i=0;i<this.data.displayLeft.length;i++){  
          this.data.displayLeft[i].show=false
          this.setData({
            displayLeft:this.data.displayLeft
          })
          //console.log(this.data.displayLeft)
        }//注入show;false
        for(var i=0;i<this.data.displayRight.length;i++){  
          this.data.displayRight[i].show=false
          this.setData({
            displayRight:this.data.displayRight
          })
        }
        this.setData({
          loadingshow:false
        })
        //console.log(this.data.goods)
        console.log(this.data.displayLeft)
        console.log(this.data.displayRight)
  
         //查询收藏状态左
       wx.cloud.callFunction({
        name:'queryStar',
        success:res=>{
         // console.log(res.result.list)
          const list=res.result.list
          wx.cloud.callFunction({
            name:"getOpenid",
            success:res=>{
              //console.log(res.result.openid)
              for(var i=0;i<list.length;i++){
                if(res.result.openid==list[i]._openid){
                  this.setData({
                    star_list:list[i].goods_list
                  })}}
                 // console.log(this.data.star_list)
                  for(var a=0;a<this.data.star_list.length;a++){
                    for(var b=0;b<this.data.displayLeft.length;b++){
                      if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                        this.data.displayLeft[b].show=true
                        this.setData({
                          displayLeft:this.data.displayLeft
                        })
                      }    
                    }
                  }
                  //console.log(this.data.displayLeft)
            }
          })
        }
       })
       //查询收藏状态右
       wx.cloud.callFunction({
        name:'queryStar',
        success:res=>{
         // console.log(res.result.list)
          const list=res.result.list
          wx.cloud.callFunction({
            name:"getOpenid",
            success:res=>{
              //console.log(res.result.openid)
              for(var i=0;i<list.length;i++){
                if(res.result.openid==list[i]._openid){
                  this.setData({
                    star_list:list[i].goods_list
                  })}}
                // console.log(this.data.star_list)
                  for(var a=0;a<this.data.star_list.length;a++){
                    for(var b=0;b<this.data.displayRight.length;b++){
                      if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                        this.data.displayRight[b].show=true
                        this.setData({
                          displayRight:this.data.displayRight
                        })
                      }    
                    }
                  }
                  //console.log(this.data.displayLeft)
            }
          })
        }
       })}})}
       if(event.detail.index==1){
        this.setData({
          loadingshow:true
        })
        wx.cloud.callFunction({
          name:'getGoodsByCondition',
          data:{
            goodsSchool:'西南石油大学',//暂时传入固定的
            goodsCategory:'book'
          },
          success:res=>{
           
            //console.log(res.result.list)
            this.setData({
              goods:[],
              displayLeft:[],//goods里面有show：flase
              displayRight:[],//goods里面有show：flase
              star_list:[]
            })
            this.setData({
              goods:res.result.list
            })
          // console.log(this.data.goods)
          //变量goods对象获取index值
          for(var i=0;i<this.data.goods.length;i++){       
           if(i%2==0){
            this.setData({
              displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
            })
           }else{
            this.setData({
              displayRight:this.data.displayRight.concat(this.data.goods[i]),       
            })
           }
          }
          //注入show;false
          for(var i=0;i<this.data.displayLeft.length;i++){  
            this.data.displayLeft[i].show=false
            this.setData({
              displayLeft:this.data.displayLeft
            })
            //console.log(this.data.displayLeft)
          }//注入show;false
          for(var i=0;i<this.data.displayRight.length;i++){  
            this.data.displayRight[i].show=false
            this.setData({
              displayRight:this.data.displayRight
            })
          }
          this.setData({
            loadingshow:false
          })
          //console.log(this.data.goods)
         // console.log(this.data.displayLeft)
          //console.log(this.data.displayRight)
    
           //查询收藏状态左
         wx.cloud.callFunction({
          name:'queryStar',
          success:res=>{
           // console.log(res.result.list)
            const list=res.result.list
            wx.cloud.callFunction({
              name:"getOpenid",
              success:res=>{
                //console.log(res.result.openid)
                for(var i=0;i<list.length;i++){
                  if(res.result.openid==list[i]._openid){
                    this.setData({
                      star_list:list[i].goods_list
                    })}}
                   // console.log(this.data.star_list)
                    for(var a=0;a<this.data.star_list.length;a++){
                      for(var b=0;b<this.data.displayLeft.length;b++){
                        if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                          this.data.displayLeft[b].show=true
                          this.setData({
                            displayLeft:this.data.displayLeft
                          })
                        }    
                      }
                    }
                    //console.log(this.data.displayLeft)
              }
            })
          }
         })
         //查询收藏状态右
         wx.cloud.callFunction({
          name:'queryStar',
          success:res=>{
           // console.log(res.result.list)
            const list=res.result.list
            wx.cloud.callFunction({
              name:"getOpenid",
              success:res=>{
                //console.log(res.result.openid)
                for(var i=0;i<list.length;i++){
                  if(res.result.openid==list[i]._openid){
                    this.setData({
                      star_list:list[i].goods_list
                    })}}
                  // console.log(this.data.star_list)
                    for(var a=0;a<this.data.star_list.length;a++){
                      for(var b=0;b<this.data.displayRight.length;b++){
                        if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                          this.data.displayRight[b].show=true
                          this.setData({
                            displayRight:this.data.displayRight
                          })
                        }    
                      }
                    }
                    //console.log(this.data.displayLeft)
              }
            })
          }
         })}})} if(event.detail.index==5){
          this.setData({
            loadingshow:true
          })
          wx.cloud.callFunction({
            name:'getGoodsByCondition',
            data:{
              goodsSchool:'西南石油大学',//暂时传入固定的
              goodsCategory:'digital'
            },
            success:res=>{
             
              //console.log(res.result.list)
              this.setData({
                goods:[],
                displayLeft:[],//goods里面有show：flase
                displayRight:[],//goods里面有show：flase
                star_list:[]
              })
              this.setData({
                goods:res.result.list
              })
            // console.log(this.data.goods)
            //变量goods对象获取index值
            for(var i=0;i<this.data.goods.length;i++){       
             if(i%2==0){
              this.setData({
                displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
              })
             }else{
              this.setData({
                displayRight:this.data.displayRight.concat(this.data.goods[i]),       
              })
             }
            }
            //注入show;false
            for(var i=0;i<this.data.displayLeft.length;i++){  
              this.data.displayLeft[i].show=false
              this.setData({
                displayLeft:this.data.displayLeft
              })
              //console.log(this.data.displayLeft)
            }//注入show;false
            for(var i=0;i<this.data.displayRight.length;i++){  
              this.data.displayRight[i].show=false
              this.setData({
                displayRight:this.data.displayRight
              })
            }
            this.setData({
              loadingshow:false
            })
            //console.log(this.data.goods)
           // console.log(this.data.displayLeft)
            //console.log(this.data.displayRight)
      
             //查询收藏状态左
           wx.cloud.callFunction({
            name:'queryStar',
            success:res=>{
             // console.log(res.result.list)
              const list=res.result.list
              wx.cloud.callFunction({
                name:"getOpenid",
                success:res=>{
                  //console.log(res.result.openid)
                  for(var i=0;i<list.length;i++){
                    if(res.result.openid==list[i]._openid){
                      this.setData({
                        star_list:list[i].goods_list
                      })}}
                     // console.log(this.data.star_list)
                      for(var a=0;a<this.data.star_list.length;a++){
                        for(var b=0;b<this.data.displayLeft.length;b++){
                          if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                            this.data.displayLeft[b].show=true
                            this.setData({
                              displayLeft:this.data.displayLeft
                            })
                          }    
                        }
                      }
                      //console.log(this.data.displayLeft)
                }
              })
            }
           })
           //查询收藏状态右
           wx.cloud.callFunction({
            name:'queryStar',
            success:res=>{
             // console.log(res.result.list)
              const list=res.result.list
              wx.cloud.callFunction({
                name:"getOpenid",
                success:res=>{
                  //console.log(res.result.openid)
                  for(var i=0;i<list.length;i++){
                    if(res.result.openid==list[i]._openid){
                      this.setData({
                        star_list:list[i].goods_list
                      })}}
                    // console.log(this.data.star_list)
                      for(var a=0;a<this.data.star_list.length;a++){
                        for(var b=0;b<this.data.displayRight.length;b++){
                          if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                            this.data.displayRight[b].show=true
                            this.setData({
                              displayRight:this.data.displayRight
                            })
                          }    
                        }
                      }
                      //console.log(this.data.displayLeft)
                }
              })
            }
           })}})} if(event.detail.index==3){
            this.setData({
              loadingshow:true
            })
            wx.cloud.callFunction({
              name:'getGoodsByCondition',
              data:{
                goodsSchool:'西南石油大学',//暂时传入固定的
                goodsCategory:'ornaments'
              },
              success:res=>{
               
                //console.log(res.result.list)
                this.setData({
                  goods:[],
                  displayLeft:[],//goods里面有show：flase
                  displayRight:[],//goods里面有show：flase
                  star_list:[]
                })
                this.setData({
                  goods:res.result.list
                })
              // console.log(this.data.goods)
              //变量goods对象获取index值
              for(var i=0;i<this.data.goods.length;i++){       
               if(i%2==0){
                this.setData({
                  displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
                })
               }else{
                this.setData({
                  displayRight:this.data.displayRight.concat(this.data.goods[i]),       
                })
               }
              }
              //注入show;false
              for(var i=0;i<this.data.displayLeft.length;i++){  
                this.data.displayLeft[i].show=false
                this.setData({
                  displayLeft:this.data.displayLeft
                })
                //console.log(this.data.displayLeft)
              }//注入show;false
              for(var i=0;i<this.data.displayRight.length;i++){  
                this.data.displayRight[i].show=false
                this.setData({
                  displayRight:this.data.displayRight
                })
              }
              this.setData({
                loadingshow:false
              })
              //console.log(this.data.goods)
             // console.log(this.data.displayLeft)
              //console.log(this.data.displayRight)
        
               //查询收藏状态左
             wx.cloud.callFunction({
              name:'queryStar',
              success:res=>{
               // console.log(res.result.list)
                const list=res.result.list
                wx.cloud.callFunction({
                  name:"getOpenid",
                  success:res=>{
                    //console.log(res.result.openid)
                    for(var i=0;i<list.length;i++){
                      if(res.result.openid==list[i]._openid){
                        this.setData({
                          star_list:list[i].goods_list
                        })}}
                       // console.log(this.data.star_list)
                        for(var a=0;a<this.data.star_list.length;a++){
                          for(var b=0;b<this.data.displayLeft.length;b++){
                            if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                              this.data.displayLeft[b].show=true
                              this.setData({
                                displayLeft:this.data.displayLeft
                              })
                            }    
                          }
                        }
                        //console.log(this.data.displayLeft)
                  }
                })
              }
             })
             //查询收藏状态右
             wx.cloud.callFunction({
              name:'queryStar',
              success:res=>{
               // console.log(res.result.list)
                const list=res.result.list
                wx.cloud.callFunction({
                  name:"getOpenid",
                  success:res=>{
                    //console.log(res.result.openid)
                    for(var i=0;i<list.length;i++){
                      if(res.result.openid==list[i]._openid){
                        this.setData({
                          star_list:list[i].goods_list
                        })}}
                      // console.log(this.data.star_list)
                        for(var a=0;a<this.data.star_list.length;a++){
                          for(var b=0;b<this.data.displayRight.length;b++){
                            if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                              this.data.displayRight[b].show=true
                              this.setData({
                                displayRight:this.data.displayRight
                              })
                            }    
                          }
                        }
                        //console.log(this.data.displayLeft)
                  }
                })
              }
             })}})} if(event.detail.index==4){
              this.setData({
                loadingshow:true
              })
              wx.cloud.callFunction({
                name:'getGoodsByCondition',
                data:{
                  goodsSchool:'西南石油大学',//暂时传入固定的
                  goodsCategory:'food'
                },
                success:res=>{
                
                 // console.log(res.result.list)
                  this.setData({
                    goods:[],
                    displayLeft:[],//goods里面有show：flase
                    displayRight:[],//goods里面有show：flase
                    star_list:[]
                  })
                  this.setData({
                    goods:res.result.list
                  })
                // console.log(this.data.goods)
                //变量goods对象获取index值
                for(var i=0;i<this.data.goods.length;i++){       
                 if(i%2==0){
                  this.setData({
                    displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
                  })
                 }else{
                  this.setData({
                    displayRight:this.data.displayRight.concat(this.data.goods[i]),       
                  })
                 }
                }
                //注入show;false
                for(var i=0;i<this.data.displayLeft.length;i++){  
                  this.data.displayLeft[i].show=false
                  this.setData({
                    displayLeft:this.data.displayLeft
                  })
                  //console.log(this.data.displayLeft)
                }//注入show;false
                for(var i=0;i<this.data.displayRight.length;i++){  
                  this.data.displayRight[i].show=false
                  this.setData({
                    displayRight:this.data.displayRight
                  })
                }
                this.setData({
                  loadingshow:false
                })
                //console.log(this.data.goods)
               // console.log(this.data.displayLeft)
                //console.log(this.data.displayRight)
          
                 //查询收藏状态左
               wx.cloud.callFunction({
                name:'queryStar',
                success:res=>{
                 // console.log(res.result.list)
                  const list=res.result.list
                  wx.cloud.callFunction({
                    name:"getOpenid",
                    success:res=>{
                      //console.log(res.result.openid)
                      for(var i=0;i<list.length;i++){
                        if(res.result.openid==list[i]._openid){
                          this.setData({
                            star_list:list[i].goods_list
                          })}}
                         // console.log(this.data.star_list)
                          for(var a=0;a<this.data.star_list.length;a++){
                            for(var b=0;b<this.data.displayLeft.length;b++){
                              if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                                this.data.displayLeft[b].show=true
                                this.setData({
                                  displayLeft:this.data.displayLeft
                                })
                              }    
                            }
                          }
                          //console.log(this.data.displayLeft)
                    }
                  })
                }
               })
               //查询收藏状态右
               wx.cloud.callFunction({
                name:'queryStar',
                success:res=>{
                 // console.log(res.result.list)
                  const list=res.result.list
                  wx.cloud.callFunction({
                    name:"getOpenid",
                    success:res=>{
                      //console.log(res.result.openid)
                      for(var i=0;i<list.length;i++){
                        if(res.result.openid==list[i]._openid){
                          this.setData({
                            star_list:list[i].goods_list
                          })}}
                        // console.log(this.data.star_list)
                          for(var a=0;a<this.data.star_list.length;a++){
                            for(var b=0;b<this.data.displayRight.length;b++){
                              if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                                this.data.displayRight[b].show=true
                                this.setData({
                                  displayRight:this.data.displayRight
                                })
                              }    
                            }
                          }
                          //console.log(this.data.displayLeft)
                    }
                  })
                }
               })}})} if(event.detail.index==6){
                this.setData({
                  loadingshow:true
                })
                wx.cloud.callFunction({
                  name:'getGoodsByCondition',
                  data:{
                    goodsSchool:'西南石油大学',//暂时传入固定的
                    goodsCategory:'ohter'//数据库打错了
                  },
                  success:res=>{
                 
                   // console.log(res.result.list)
                    this.setData({
                      goods:[],
                      displayLeft:[],//goods里面有show：flase
                      displayRight:[],//goods里面有show：flase
                      star_list:[]
                    })
                    this.setData({
                      goods:res.result.list
                    })
                  // console.log(this.data.goods)
                  //变量goods对象获取index值
                  for(var i=0;i<this.data.goods.length;i++){       
                   if(i%2==0){
                    this.setData({
                      displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
                    })
                   }else{
                    this.setData({
                      displayRight:this.data.displayRight.concat(this.data.goods[i]),       
                    })
                   }
                  }
                  //注入show;false
                  for(var i=0;i<this.data.displayLeft.length;i++){  
                    this.data.displayLeft[i].show=false
                    this.setData({
                      displayLeft:this.data.displayLeft
                    })
                    //console.log(this.data.displayLeft)
                  }//注入show;false
                  for(var i=0;i<this.data.displayRight.length;i++){  
                    this.data.displayRight[i].show=false
                    this.setData({
                      displayRight:this.data.displayRight
                    })
                  }
                  this.setData({
                    loadingshow:false
                  })
                  //console.log(this.data.goods)
                 // console.log(this.data.displayLeft)
                  //console.log(this.data.displayRight)
            
                   //查询收藏状态左
                 wx.cloud.callFunction({
                  name:'queryStar',
                  success:res=>{
                   // console.log(res.result.list)
                    const list=res.result.list
                    wx.cloud.callFunction({
                      name:"getOpenid",
                      success:res=>{
                        //console.log(res.result.openid)
                        for(var i=0;i<list.length;i++){
                          if(res.result.openid==list[i]._openid){
                            this.setData({
                              star_list:list[i].goods_list
                            })}}
                           // console.log(this.data.star_list)
                            for(var a=0;a<this.data.star_list.length;a++){
                              for(var b=0;b<this.data.displayLeft.length;b++){
                                if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                                  this.data.displayLeft[b].show=true
                                  this.setData({
                                    displayLeft:this.data.displayLeft
                                  })
                                }    
                              }
                            }
                            //console.log(this.data.displayLeft)
                      }
                    })
                  }
                 })
                 //查询收藏状态右
                 wx.cloud.callFunction({
                  name:'queryStar',
                  success:res=>{
                   // console.log(res.result.list)
                    const list=res.result.list
                    wx.cloud.callFunction({
                      name:"getOpenid",
                      success:res=>{
                        //console.log(res.result.openid)
                        for(var i=0;i<list.length;i++){
                          if(res.result.openid==list[i]._openid){
                            this.setData({
                              star_list:list[i].goods_list
                            })}}
                          // console.log(this.data.star_list)
                            for(var a=0;a<this.data.star_list.length;a++){
                              for(var b=0;b<this.data.displayRight.length;b++){
                                if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                                  this.data.displayRight[b].show=true
                                  this.setData({
                                    displayRight:this.data.displayRight
                                  })
                                }    
                              }
                            }
                            //console.log(this.data.displayLeft)
                      }
                    })
                  }
                 })}})}if(event.detail.index==0){
                  this.setData({
                    loadingshow:true
                  })
                  wx.cloud.callFunction({
                    name:"getGoodsBySchool",
                    data:{
                      school_name:'西南石油大学'
                    },
                    complete: res => {
                    
                     // console.log( res)
                     this.setData({
                      goods:[],
                      displayLeft:[],//goods里面有show：flase
                      displayRight:[],//goods里面有show：flase
                      star_list:[]
                     })
                     this.setData({
                       goods:res.result.list
                     })
                   // console.log(this.data.goods)
                   //变量goods对象获取index值
                   for(var i=0;i<this.data.goods.length;i++){       
                    if(i%2==0){
                     this.setData({
                       displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
                     })
                    }else{
                     this.setData({
                       displayRight:this.data.displayRight.concat(this.data.goods[i]),       
                     })
                    }
                   }
                   //注入show;false
                   for(var i=0;i<this.data.displayLeft.length;i++){  
                     this.data.displayLeft[i].show=false
                     this.setData({
                       displayLeft:this.data.displayLeft
                     })
                     //console.log(this.data.displayLeft)
                   }//注入show;false
                   for(var i=0;i<this.data.displayRight.length;i++){  
                     this.data.displayRight[i].show=false
                     this.setData({
                       displayRight:this.data.displayRight
                     })
                   }
                   this.setData({
                    loadingshow:false
                  })
                   //console.log(this.data.goods)
                  // console.log(this.data.displayLeft)
                   //console.log(this.data.displayRight)
             
                    //查询收藏状态左
                  wx.cloud.callFunction({
                   name:'queryStar',
                   success:res=>{
                    // console.log(res.result.list)
                     const list=res.result.list
                     wx.cloud.callFunction({
                       name:"getOpenid",
                       success:res=>{
                         //console.log(res.result.openid)
                         for(var i=0;i<list.length;i++){
                           if(res.result.openid==list[i]._openid){
                             this.setData({
                               star_list:list[i].goods_list
                             })}}
                            // console.log(this.data.star_list)
                             for(var a=0;a<this.data.star_list.length;a++){
                               for(var b=0;b<this.data.displayLeft.length;b++){
                                 if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                                   this.data.displayLeft[b].show=true
                                   this.setData({
                                     displayLeft:this.data.displayLeft
                                   })
                                 }    
                               }
                             }
                            //console.log(this.data.displayLeft)
                       }
                     })
                   }
                  })
                  //查询收藏状态右
                  wx.cloud.callFunction({
                   name:'queryStar',
                   success:res=>{
                    // console.log(res.result.list)
                     const list=res.result.list
                     wx.cloud.callFunction({
                       name:"getOpenid",
                       success:res=>{
                         //console.log(res.result.openid)
                         for(var i=0;i<list.length;i++){
                           if(res.result.openid==list[i]._openid){
                             this.setData({
                               star_list:list[i].goods_list
                             })}}
                           // console.log(this.data.star_list)
                             for(var a=0;a<this.data.star_list.length;a++){
                               for(var b=0;b<this.data.displayRight.length;b++){
                                 if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                                   this.data.displayRight[b].show=true
                                   this.setData({
                                     displayRight:this.data.displayRight
                                   })
                                 }    
                               }
                             }
                             //console.log(this.data.displayLeft)
                       }
                     })
                   }
                  })
             
             
             
                  }
                  })
                  
                 }

  },
  //动态收藏按钮
  zan: function (e) {
    if(App.globalData!=undefined){
    const vm = this;
  //  console.log(e.currentTarget.dataset)
    const _index = e.currentTarget.dataset.index;
    let _msg = [...vm.data.displayRight]; // msg的引用（深拷贝）
   
    _msg[_index]['show'] = !vm.data.displayRight[_index]['show'];
   vm.setData({
      displayRight: _msg
    })
    // console.log(_msg[_index]['show'])
   if(_msg[_index]['show']==true){
    wx.cloud.callFunction({
        name:"starGoods",
           data:{
             _id:e.currentTarget.dataset.goodid
         }
       })
    }else{
      wx.cloud.callFunction({
        name:"cancelStar",
        data:{
          _id:e.target.dataset.goodid
        }
      })
    }
    }else{
      wx.showToast({
        title:'请登录后再试',
        icon:'none'
      })
    }
    
  },
   zan1: function (e) {
     if(App.globalData!=undefined){
    const vm = this;
    const _index = e.currentTarget.dataset.index;  
    let _msg = [...vm.data.displayLeft]; // msg的引用
    _msg[_index]['show'] = !vm.data.displayLeft[_index]['show'];
    vm.setData({
      displayLeft: _msg
    })
    if(_msg[_index]['show']==true){
      wx.cloud.callFunction({
          name:"starGoods",
             data:{
               _id:e.currentTarget.dataset.goodid
           }
         })
      }else{
        wx.cloud.callFunction({
          name:"cancelStar",
          data:{
            _id:e.target.dataset.goodid
          }
        })
      }
    }else{
      wx.showToast({
        title:'请登录后再试',
        icon:'none'
      })
    }
   },
   detailsPage(e){
    //console.log(e.currentTarget.dataset.goodid)
   // console.log(e.currentTarget.dataset.publisherinfo)
    wx.navigateTo({
      url:"../home/detailsPage/detailsPage",
      events:{
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        }
      },
      success: (res)=> {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: e.currentTarget.dataset.goodid,
          publisherinfo:e.currentTarget.dataset.publisherinfo
        })
      }
    })
   },
   // 打开popup
  openPopup(event) {
   // console.log(event)
    this.data.popup = true
    this.setData({
      popup: this.data.popup,
      guide:''
    })
     
  },
  // 关闭popup
  closePopup() {
    this.data.popup = false
    this.setData({
      popup: this.data.popup
    })
  },
  onPageScroll(e) {
    this.setData({
      guide:''
    })
    this.data.location.push(e.scrollTop)
    this.data.location.shift()
    //console.log(this.data.location)
     let relativeLocation=this.data.location[0]-this.data.location[1]
    //console.log(relativeLocation)
    if (relativeLocation<=-10) {
      this.setData({
        showSearch: false
      })
    } else if(relativeLocation>3) {
      this.setData({
        showSearch: true
      })
    }
  },
  onSearch(e){
    this.setData({
      search:e.detail
    })
    if(this.data.search!=''){
    this.setData({
      loadingshow:true
    })
    wx.cloud.callFunction({
      name:'search',
      data:{
        search:this.data.search
      }
    }).then(res=>{
      //console.log(res.result.list)
        
       // console.log(res)
       this.setData({
         goods:res.result.list
       })
     // console.log(this.data.goods)
      this.setData({
        displayLeft:[],
        displayRight:[]
      })
     //变量goods对象获取index值
     for(var i=0;i<this.data.goods.length;i++){       
      if(i%2==0){
       this.setData({
         displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
       })
      }else{
       this.setData({
         displayRight:this.data.displayRight.concat(this.data.goods[i]),       
       })
      }
     }
     //注入show;false
     for(var i=0;i<this.data.displayLeft.length;i++){  
       this.data.displayLeft[i].show=false
       this.setData({
         displayLeft:this.data.displayLeft
       })
     }//注入show;false
     for(var i=0;i<this.data.displayRight.length;i++){  
       this.data.displayRight[i].show=false
       this.setData({
         displayRight:this.data.displayRight
       })


     }
     wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
       // console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })}}
               // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  for(var b=0;b<this.data.displayLeft.length;b++){
                    if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                      this.data.displayLeft[b].show=true
                      this.setData({
                        displayLeft:this.data.displayLeft
                      })
                    }    
                  }
                }
                //console.log(this.data.displayLeft)
          }
        })
        //查询收藏状态右
     wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
       // console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            this.setData({
              loadingshow:false
            })
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })}}
              // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  for(var b=0;b<this.data.displayRight.length;b++){
                    if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                      this.data.displayRight[b].show=true
                      this.setData({
                        displayRight:this.data.displayRight
                      })
                    }    
                  }
                }
                //console.log(this.data.displayLeft)
          }
        })
      }
     })



      }
     })
     
 
    
      
    })}else{
      wx.cloud.callFunction({
        name:"getGoodsBySchool",
        data:{
          school_name:'西南石油大学'
        },
        complete: res => {
         this.setData({
           loadingshow:false
         })
         // console.log( res)
         this.setData({
           goods:res.result.list
         })
       // console.log(this.data.goods)
       //变量goods对象获取index值
       for(var i=0;i<this.data.goods.length;i++){       
        if(i%2==0){
         this.setData({
           displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
         })
        }else{
         this.setData({
           displayRight:this.data.displayRight.concat(this.data.goods[i]),       
         })
        }
       }
       //注入show;false
       for(var i=0;i<this.data.displayLeft.length;i++){  
         this.data.displayLeft[i].show=false
         this.setData({
           displayLeft:this.data.displayLeft
         })
         //console.log(this.data.displayLeft)
       }//注入show;false
       for(var i=0;i<this.data.displayRight.length;i++){  
         this.data.displayRight[i].show=false
         this.setData({
           displayRight:this.data.displayRight
         })
       }
       //console.log(this.data.goods)
      // console.log(this.data.displayLeft)
       //console.log(this.data.displayRight)
 
        //查询收藏状态左
      wx.cloud.callFunction({
       name:'queryStar',
       success:res=>{
        // console.log(res.result.list)
         const list=res.result.list
         wx.cloud.callFunction({
           name:"getOpenid",
           success:res=>{
             //console.log(res.result.openid)
             for(var i=0;i<list.length;i++){
               if(res.result.openid==list[i]._openid){
                 this.setData({
                   star_list:list[i].goods_list
                 })}}
                // console.log(this.data.star_list)
                 for(var a=0;a<this.data.star_list.length;a++){
                   for(var b=0;b<this.data.displayLeft.length;b++){
                     if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                       this.data.displayLeft[b].show=true
                       this.setData({
                         displayLeft:this.data.displayLeft
                       })
                     }    
                   }
                 }
                 //console.log(this.data.displayLeft)
           }
         })
       }
      })
      //查询收藏状态右
      wx.cloud.callFunction({
       name:'queryStar',
       success:res=>{
        // console.log(res.result.list)
         const list=res.result.list
         wx.cloud.callFunction({
           name:"getOpenid",
           success:res=>{
             //console.log(res.result.openid)
             for(var i=0;i<list.length;i++){
               if(res.result.openid==list[i]._openid){
                 this.setData({
                   star_list:list[i].goods_list
                 })}}
               // console.log(this.data.star_list)
                 for(var a=0;a<this.data.star_list.length;a++){
                   for(var b=0;b<this.data.displayRight.length;b++){
                     if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                       this.data.displayRight[b].show=true
                       this.setData({
                         displayRight:this.data.displayRight
                       })
                     }    
                   }
                 }
                 //console.log(this.data.displayLeft)
           }
         })
       }
      })
 
 
 
      }
      })
    }
  },
   
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    displayLeft:[],//goods里面有show：flase
    displayRight:[],//goods里面有show：flase
    star_list:[],
    loadingshow:true,
    popup: false,
    location: [0, 0],
    showSearch: true,
    search:'',
    guide:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     wx.cloud.callFunction({
       name:"getGoodsBySchool",
       data:{
         school_name:'西南石油大学'
       },
       complete: res => {
        this.setData({
          loadingshow:false
        })
        // console.log( res)
        this.setData({
          goods:res.result.list
        })
      // console.log(this.data.goods)
      //变量goods对象获取index值
      for(var i=0;i<this.data.goods.length;i++){       
       if(i%2==0){
        this.setData({
          displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
        })
       }else{
        this.setData({
          displayRight:this.data.displayRight.concat(this.data.goods[i]),       
        })
       }
      }
      //注入show;false
      for(var i=0;i<this.data.displayLeft.length;i++){  
        this.data.displayLeft[i].show=false
        this.setData({
          displayLeft:this.data.displayLeft
        })
        //console.log(this.data.displayLeft)
      }//注入show;false
      for(var i=0;i<this.data.displayRight.length;i++){  
        this.data.displayRight[i].show=false
        this.setData({
          displayRight:this.data.displayRight
        })
      }
      //console.log(this.data.goods)
     // console.log(this.data.displayLeft)
      //console.log(this.data.displayRight)

       //查询收藏状态左
     wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
       // console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })}}
               // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  for(var b=0;b<this.data.displayLeft.length;b++){
                    if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                      this.data.displayLeft[b].show=true
                      this.setData({
                        displayLeft:this.data.displayLeft
                      })
                    }    
                  }
                }
                //console.log(this.data.displayLeft)
          }
        })
      }
     })
     //查询收藏状态右
     wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
       // console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })}}
              // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  for(var b=0;b<this.data.displayRight.length;b++){
                    if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                      this.data.displayRight[b].show=true
                      this.setData({
                        displayRight:this.data.displayRight
                      })
                    }    
                  }
                }
                //console.log(this.data.displayLeft)
          }
        })
      }
     })



     }
     })
     if(App.globalData==undefined){
      this.setData({
        guide:'guide'
      })
     }

    
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
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
    this.setData({
      loadingshow:true
    })
    wx.cloud.callFunction({
      name:"getGoodsBySchool",
      data:{
        school_name:'西南石油大学'
      },
      complete: res => {
        this.setData({
          loadingshow:false
        })
       // console.log(res)
       this.setData({
         goods:res.result.list
       })
     // console.log(this.data.goods)
      this.setData({
        displayLeft:[],
        displayRight:[]
      })
     //变量goods对象获取index值
     for(var i=0;i<this.data.goods.length;i++){       
      if(i%2==0){
       this.setData({
         displayLeft:this.data.displayLeft.concat(this.data.goods[i]),
       })
      }else{
       this.setData({
         displayRight:this.data.displayRight.concat(this.data.goods[i]),       
       })
      }
     }
     //注入show;false
     for(var i=0;i<this.data.displayLeft.length;i++){  
       this.data.displayLeft[i].show=false
       this.setData({
         displayLeft:this.data.displayLeft
       })
     }//注入show;false
     for(var i=0;i<this.data.displayRight.length;i++){  
       this.data.displayRight[i].show=false
       this.setData({
         displayRight:this.data.displayRight
       })


     }
     wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
       // console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })}}
               // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  for(var b=0;b<this.data.displayLeft.length;b++){
                    if(this.data.star_list[a]._id==this.data.displayLeft[b]._id){
                      this.data.displayLeft[b].show=true
                      this.setData({
                        displayLeft:this.data.displayLeft
                      })
                    }    
                  }
                }
                //console.log(this.data.displayLeft)
          }
        })
        //查询收藏状态右
     wx.cloud.callFunction({
      name:'queryStar',
      success:res=>{
       // console.log(res.result.list)
        const list=res.result.list
        wx.cloud.callFunction({
          name:"getOpenid",
          success:res=>{
            //console.log(res.result.openid)
            for(var i=0;i<list.length;i++){
              if(res.result.openid==list[i]._openid){
                this.setData({
                  star_list:list[i].goods_list
                })}}
              // console.log(this.data.star_list)
                for(var a=0;a<this.data.star_list.length;a++){
                  for(var b=0;b<this.data.displayRight.length;b++){
                    if(this.data.star_list[a]._id==this.data.displayRight[b]._id){
                      this.data.displayRight[b].show=true
                      this.setData({
                        displayRight:this.data.displayRight
                      })
                    }    
                  }
                }
                //console.log(this.data.displayLeft)
          }
        })
      }
     })



      }
     })
     
     wx.stopPullDownRefresh();
    // console.log(this.data.goods)
   // console.log(this.data.displayLeft)
     //console.log(this.data.displayRight)
    }
    })
      
 
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