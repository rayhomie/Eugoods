# 西柚美物小程序技术开发方案

## 运行图片

![1](https://personal-financ.oss-cn-chengdu.aliyuncs.com/cdn/西柚美物/5.gif)

![2](https://personal-financ.oss-cn-chengdu.aliyuncs.com/cdn/西柚美物/4.gif)

![3](https://personal-financ.oss-cn-chengdu.aliyuncs.com/cdn/西柚美物/3.gif)

![4](https://personal-financ.oss-cn-chengdu.aliyuncs.com/cdn/西柚美物/1.gif)

![5](https://personal-financ.oss-cn-chengdu.aliyuncs.com/cdn/西柚美物/2.gif)

## ***\*引言\****

编写目的

为让西南石油大学的提供好物、闲置物品等信息交换、线下交易平台

背景

小程序名称：西柚美物

简称：柚物

团队名字：RM-F

术语定义及说明

以“西柚”为logo，暗指服务对象是西南石油大学；以“柚物”为简称，谐音优物，象征好物、美物、是优质的平台

## ***\*设计概述\****

任务和目标

需求概述

  实现闲置物品、好物的对外发布，他人看中后可以预定，预定后会向卖家和买家发送各自的联系方式，进行线下直接交易。

运行环境概述

操作系统：基于微信小程序系统

数据库系统：微信云数据库

后台服务器：微信云开发提供的云服务器

条件与限制

  由于使用的是微信云开发

## ***\*系统详细需求设计\****

详细需求分析

首次打开小程序弹窗轮播引导图

首页展示发布的所有好物，需要瀑布流展示

分类按钮实现7种好物分类

点赞收藏功能，可以在我的信息中查看

好物详情页面，可进行订购下单，下单后获取商品信息、商品联系人信息等微信订阅推送

发布根据表单，以及设定的要求进行用户发布，发布成功之后，收到微信的订阅消息推送

微信授权登录

查看发布的好物信息

查看订购的好物信息

查看售出的好物信息

查看收藏想要的好物信息

使用指南查看、指导用户使用小程序

关于我们团队的介绍

详细系统运行环境及限制条件分析接口需求分析

使用微信方可运行

## ***\*小程序\*******\*详细设计\****

界面详细设计

整体界面设计

淡蓝色为基础颜色

深灰色为大致的字体颜色

部分引用vantUI库组件

Logo设计

西柚作为logo的图案，因为欲基于在西南石油大学的校园运营

2.小程序端相应功能大致对应模块展示

– 活动图片轮播

• swiperCpn组件

– 分类查看物品

• Tab-control组件

– 分类查找物品

• tabControlClick函数

– 搜索查找物品

• onSearch函数

– 搜索框的下滑隐藏

• onPageScroll函数

– 预订物品

• buy函数

– 对喜欢的物品进行预订，需要留下任意联系方式方便双方进行线下交易，预订成功后会发送联系方式给 双方

• purchase函数

– 收藏物品/取消收藏

• Star函数/CancelStar函数

• 发布

– 商品名字

• good_name:string

– 分类

• good_category:array

– 价格

• good_price:float

– 详细描述

• good_descirbe:string

– 联系方式

• good_phone:int

– 商品图片

• img_path:array

– 图片上传处理

• handleUpload函数

– 发布提交表单以及表单验证

• handlePublish函数

• 我的

– 微信授权登录

• getUserInfo函数

• wx.getSetting函数，用于是否获取授权状态

– 我的发布：可以随时下架商品

• detailsPage函数，打开详情页面

• cancel函数，下架商品

– 我被订的：可以查看买家的联系方式（也可在微信消息内查看）

• cancelSalegood函数，取消正在预订状态的订单

– 我的预订：可以查看买家的联系方式（也可在微信消息内查看）

• cancelBoughtgood函数，取消预订的订单

– 我想要的：收藏多个物品方便买家货比三家

• zan函数，取消收藏状态

– 使用指南：小程序的详细操作

– 关于我们：团队介绍以及我们的联系方式

• aboutOpen函数，关于我们，弹窗状态打开

• aboutClose函数，关于我们，弹窗状态关闭

3.云函数接口

| 函数名                      | 函数功能                                     | 参数                                                   | 返回值               |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------ | -------------------- |
| AddBuyGoods                 | 添加购买的物品到person表的goods_bought字段中 | _id                                                    | stats                |
| addGoodBoughtPhone          | 添加预订者的联系方式                         | _id,bought_phone                                       | stats                |
| CancelSendMessage           | 发送取消预定的消息                           | goodname,openid                                        | stats                |
| cancelStar                  | 取消收藏                                     | _id                                                    | stats                |
| deleteGood                  | 删除商品                                     | _id                                                    | stats                |
| firstLoginPushSchool        | 第一次登录需要学校                           | school_name                                            | stats                |
| detailsPageFindById         | 获取商品详情                                 | _id                                                    | goods                |
| firstPushPersonInfo         | 保存用户信息到数据库                         | openid，nickName，gender，city，avatarUrl，school_name | stats                |
| getAllGoods                 | 获取所有商品                                 | Null                                                   | goods                |
| getGoodsBySchool            | 根据学校筛选物品                             | school_name                                            | goods                |
| getMyBoughtGoods            | 获取我购买的商品                             | Null                                                   | GetMyBoughtgoods     |
| getMyStar                   | 获取我收藏的物品                             | _id                                                    | goods                |
| getOpenid                   | 获取我的openid，appid，unionid               | Null                                                   | Openid,appid,unionid |
| publishTemplateMessage      | 点击发布时发送模板消息给用户                 | good_name                                              | stats                |
| queryStar                   | 查询我的收藏                                 | Null                                                   | star_goods_id        |
| queryWhoBuy                 | 查询谁买的物品                               | _id                                                    | openid               |
| search                      | 搜索物品                                     | serch                                                  | goods                |
| sellerCancelFindBoughtPhone | 卖家取消订单查询是谁订购的                   | _id                                                    | Openid               |
| sendSellerMessage           | 发送给卖家商品被订购的消息                   | Goodname,phone,vx,qq                                   | stats                |
| starGoods                   | 收藏物品                                     | _id                                                    | stats                |
| templateMessage             | 发送模板消息给买家提示卖家的信息             | Goodname,phone,vx,qq                                   | Stats                |
| updateCancelBuyGood         | 更新商品被取消购买的状态                     | _id                                                    | stats                |
| updateGoodsStatus           | 更新商品上架状态                             | _id                                                    | stats                |
| getMyPublishGoods           | 获取我发布的物品                             | openid                                                 | goods                |
| getMySaleGoods              | 获取我已售卖的物品                           | openid                                                 | goods                |

## ***\*数据库设计\****

#### **goods**

| 字段名         | 类型    | 注释                 | 键   |
| -------------- | ------- | -------------------- | ---- |
| _id            | string  | 唯一标识商品         | 主键 |
| _openid        | string  | 发布者的openid       |      |
| bought_phone   | array   | 发布者留下的联系方式 |      |
| goods_category | string  | 商品分类             |      |
| goods_describe | string  | 商品描述             |      |
| goods_image    | array   | 商品图片链接         |      |
| goods_name     | string  | 商品名字             |      |
| goods_phone    | array   | 发布者留下的联系方式 |      |
| goods_price    | number  | 商品价格             |      |
| goods_status   | boolean | 商品状态(是否下架    |      |

 

#### **person**

| 字段名       | 类型   | 注释           | 键   |
| ------------ | ------ | -------------- | ---- |
| _id          | string | 系统自动生成id |      |
| _openid      | string | 用户openid     | 主键 |
| avatarUrl    | string | 用户头像链接   |      |
| city         | string | 用户所在城市   |      |
| gender       | number | 用户性别1男0女 |      |
| goods_bought | array  | 用户购买的物品 |      |
| nickName     | string | 用户昵称       |      |
| school_name  | string | 学校名字       |      |

 
