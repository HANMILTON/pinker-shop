export const mainSide =  [{
  header: '餐厅设置',
  isOpen: false,
  icon: 'fa-tasks',
  subPage:[{
    title: '餐厅介绍',
    path: 'shopEdit',    
    active: false
  }, {
    title: '分店设置',
    path: 'branchList',  
    active: false  
  }, {
    title: '预约设置',
    path: 'orderSet',  
    active: false  
  }, {
    title: '套餐列表',
    path: 'menusList',   
    active: false 
  }, {
    title: '营销中心',
    path: 'userInfo',   
    active: false 
  }, {
    title: '设置中心',
    path: 'userSet',   
    active: false 
  },]
},{
  header: '消息频道',
  isOpen: false,
  icon: 'fa-commenting-o',
  subPage:[{
    title: '动态发布',
    path: 'newsList',   
    active: false 
  },{
    title: '订单评论',
    path: 'orderEval',   
    active: false 
  }]
},{
  header: '订单列表',
  isOpen: false,
  icon: 'fa-table',
  subPage:[{
    title: '套餐订单',
    path: 'orderList',    
    active: false
  }, {
    title: '预约订单',
    path: 'reserveOrder',    
    active: false
  }, {
    title: '买单订单',
    path: 'orderBuy',    
    active: false
  }]
}]

