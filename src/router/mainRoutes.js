import shopEdit from '@/views/main/shop/shopEdit'
import newsList from '@/views/main/news/newsList'
import menusList from '@/views/main/menus/menusList'
import orderList from '@/views/main/order/orderList'
// import main from '@/views/main/main'
import branchList from '@/views/main/branch/branchList'
import userInfo from '@/views/main/userInfo/userInfo'
import orderSet from '@/views/main/orderSet/orderSet'
import orderEval from '@/views/main/orderEval/orderEval'
import reserveOrder from '@/views/main/reserveOrder/reserveOrder'
import orderBuy from '@/views/main/orderBuy/orderBuy'
import paySuccess from '@/views/main/paySuccess/paySuccess'
import userSet from '@/views/main/userSet/userSet'
import pay from '@/views/main/pay/pay'
export default [
    // {
    //   path: '/main',
    //   name: 'main',
    //   component: main,
    // },
    {
      path: '/shopEdit',
      name: 'shopEdit',
      component: shopEdit
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: newsList
    }, 
     {
      path: '/menusList',
      name: 'menusList',
      component: menusList
    }, 
     {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    } ,
    {
      path: '/branchList',
      name: 'branchList',
      component: branchList
    } ,
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    } ,  
    {
      path: '/orderSet',
      name: 'orderSet',
      component: orderSet
    } ,     
    {
      path: '/orderEval',
      name: 'orderEval',
      component: orderEval
    } ,
    {
      path: '/reserveOrder',
      name: 'reserveOrder',
      component: reserveOrder
    } ,
    {
      path: '/orderBuy',
      name: 'orderBuy',
      component: orderBuy
    } ,
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    } ,
    {
      path: '/userSet',
      name: 'userSet',
      component: userSet
    } ,  
    {
      path: '/pay',
      name: 'pay',
      component: pay
    } 
]