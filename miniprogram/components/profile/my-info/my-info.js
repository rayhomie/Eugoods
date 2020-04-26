// components/my-info/my-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    university:["西南石油大学","四川大学","电子科技大学","西南财经大学","西南交通大学","四川农业大学","成都理工大学",
    " 成都中医药大学","西南民族大学", "成都信息工程大学","西南科技大学","成都体育学院","西华师范大学","西华大学","西南医科大学"],
    school:"",
    showSelectSchool:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange(e){
      const val = e.detail.value
      this.setData({
        school:this.data.university[val]
      })
      // console.log(this.data.university[val])
      
    },
    decide(){
      this.triggerEvent('decide',{showSelectSchool:this.data.showSelectSchool,school:this.data.school})
    }
  }
})
