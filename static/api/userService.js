import {
  pkFetch
} from './pkFetch'
const userServer = `${window.config.server}/user`
export default {
  // 登录接口
  login(loginObj) {
    return pkFetch.post(`${userServer}/login_submit`, loginObj)
      .then(res => res)
  },
  //用户信息接口
  getUserLoginInfo(){
    return pkFetch.post(`${userServer}/get_login_user_row`)
      .then(res => res)
  },
  // 注册接口
  register(registerObj){
    return pkFetch.post(`${userServer}/register_submit`, registerObj)
      .then(res => res)
  },
  //实时请求是否已经注册
  registerNameCheck(checkObj){
    return pkFetch.post(`${userServer}/register_name_check`, checkObj)
      .then(res => res)
  },
  // 注册界面发短信
  sendMessage(mobile){
    return pkFetch.post(`${userServer}/mobile_sms`, {
      mobile
    })
      .then(res => res)
  },
  mailSendAgain(e_mail){
    return pkFetch.post(`${userServer}/mail_send_again`, {
      e_mail
    })
      .then(res => res)
  },
  //已完成认证
  emailHasChecked(e_mail){
    return pkFetch.post(`${userServer}/mail_has_validated_check`, {
      e_mail
    })
      .then(res => res)
  },
  checkEmail(checkObj){
    return pkFetch.post(`${userServer}/e_mail_confirm_check`, checkObj)
      .then(res => res)
  },
  getUserInfo(){
    return pkFetch.get(`${userServer}/get_validate_row`)
      .then(res => res)    
  },
  apply(applyObj){
    return pkFetch.post(`${userServer}/validate_submit`,applyObj)
      .then(res => res) 
  },
  getCategoryList(){
    return pkFetch.get(`${userServer}/get_shop_category_top`)
      .then(res => res)
  },
  logout(){
    return pkFetch.get(`${userServer}/logout`)
      .then(res => res)
  },
  smsValidate(mobile){
    return pkFetch.post(`${userServer}/mobile_sms_validate`, {
      mobile
    })
    .then(res => res)
  },
  // 获取商家二级分类
  getShopCategorySub(parent_id){
    return pkFetch.post(`${userServer}/get_shop_category_sub`, {
      parent_id
    })
    .then(res => res)
  },
   // 推荐菜列表
   shopRecommendList(){
    return pkFetch.get(`${userServer}/shop_recommend_list`)
      .then(res => res)
   },
   shopRecommendSubmit(recommend_list){
    return pkFetch.post(`${userServer}/shop_recommend_submit`,{
      recommend_list: JSON.stringify(recommend_list)
    })
      .then(res => res)
   },
   shopRecommendDelete(recommend_id){
        return pkFetch.post(`${userServer}/shop_recommend_delete`,{recommend_id})
      .then(res => res)
   },
   // 商家信息提交
   shopDetailSubmit(updateObj){
      return pkFetch.post(`${userServer}/shop_detail_submit`,updateObj)
      .then(res => res)
   },
   // 商家上下线
   shopDetailSwitchOnline(is_online){
      return pkFetch.post(`${userServer}/shop_detail_switch_online`,{is_online})
      .then(res => res)
   },
  getDetailRow(){
      return pkFetch.get(`${userServer}/get_detail_row`)
      .then(res => res)
  },
  // 获取消息列表
  getNewsList(searchObj){
    return pkFetch.post(`${userServer}/get_news_list`,searchObj)
    .then(res => res)  
  },
  // 消息提交接口
  newsSubmit(newsObj){
    return pkFetch.post(`${userServer}/news_submit`,newsObj)
    .then(res => res)  
  },
  // 消息上线接口
  newsSwitchOnline(news_id,is_online){
    return pkFetch.post(`${userServer}/news_switch_online`,{
      news_id,
      is_online
    })
    .then(res => res)
  }, 
  // 删除消息接口
  newsDelete(news_id){
    return pkFetch.post(`${userServer}/news_delete`,{
      news_id
    })
    .then(res => res)
  },
  //置顶消息接口
  setNewsTop(news_id){
    return pkFetch.post(`${userServer}/news_top_act`,{
      news_id
    })
    .then(res => res) 
  },
  // 找回密码判断用户是否已经注册
  checkRegister(user_name){
    return pkFetch.post(`${userServer}/getback_pwd_username_check`,{
      user_name
    })
    .then(res => res)
  },
  // 找回密码：给手机发送验证码
  getbackPwdSendSms(mobile){
    return pkFetch.post(`${userServer}/getback_pwd_send_sms`,{
      mobile
    })
    .then(res => res)
  },
  // 按照手机号、验证码、新密码 重置用户的密码
  getbackPwdByMobile(userObj){
    return pkFetch.post(`${userServer}/getback_pwd_by_mobile`,userObj)
    .then(res => res)
  },
  // 密码找回 发送邮件
  getbackPwdSendMail(e_mail){
    return pkFetch.post(`${userServer}/getback_pwd_send_mail`,{
      e_mail
    })
    .then(res => res)
  },
  // 邮件密码找回 修改密码提交
  getbackPwdByEmail(userObj){
    return pkFetch.post(`${userServer}/getback_pwd_e_mail_submit`,userObj)
    .then(res => res)
  },
  // 邮件密码找回 邮件验证网址
  getbackPwdEmailCheck(checkObj){
    return pkFetch.post(`${userServer}/getback_pwd_e_mail_check`,checkObj)
    .then(res => res)
  },
  //套餐列表 + 每个套餐下的菜单列表
  getMenuList(searchObj){
    return pkFetch.post(`${userServer}/get_set_list`,searchObj)
    .then(res => res)
  },
  //套餐的新增与修改
  munuSubmit(menuObj){
    return pkFetch.post(`${userServer}/set_submit`,menuObj)
    .then(res => res)
  },
  //某个套餐的信息 + 该套餐下的菜单信息
  getMenuRow(set_id){
    return pkFetch.post(`${userServer}/get_set_row`,{
      set_id
    })
    .then(res => res)
  },
  //套餐的删除
  menuDelete(set_id){
    return pkFetch.post(`${userServer}/set_delete`,{
      set_id
    })
    .then(res => res)
  },
  //套餐上下线
  menuOnline(set_id,is_online){
    return pkFetch.post(`${userServer}/set_is_online`,{
      set_id,
      is_online
    })
    .then(res => res)
  },
  // 新增菜（一次性提交多行）
  addFood(set_id,item_arr){
    return pkFetch.post(`${userServer}/item_add_all`,{
      set_id,
      item_arr: JSON.stringify(item_arr)
    })
    .then(res => res)
  },
  // 更新菜
  updataFood(updataObj){
    return pkFetch.post(`${userServer}/item_modify`,updataObj)
    .then(res => res)
  },
  //删除菜
  deleteFood(item_id){
    return pkFetch.post(`${userServer}/item_delete`,{
      item_id
    })
    .then(res => res)
  },
  //获取订单列表
  getOrderList(searchObj){
    return pkFetch.post(`${userServer}/shop_order_list`,searchObj)
    .then(res => res)
  },
  //按照 find 码 查询订单
  findSearch(find_code){
    return pkFetch.post(`${userServer}/find_code_search`,{find_code})
    .then(res => res)
  },
  //确认消费
  confirmConsumption(order_id){
    return pkFetch.post(`${userServer}/confirm_consumption`,{order_id})
    .then(res => res)
  },
  // 获取分店列表
  getBranchList(){
    return pkFetch.get(`${userServer}/shop_branch_list`)
    .then(res => res)
  },
  //新增分店、编辑分店
  shopBranchSubmit(branchObj){
    return pkFetch.post(`${userServer}/shop_branch_submit`,branchObj)
    .then(res => res)
  },
  //删除分店
  branchDelete(shop_branch_id){
    return pkFetch.post(`${userServer}/shop_branch_delete`,{shop_branch_id})
    .then(res => res)
  },
  // 分店指定管理员
  shopBranchAdminSubmit(adminObj){
    return pkFetch.post(`${userServer}/shop_branch_admin_submit`,adminObj)
    .then(res => res)
  },
  //订单评价详情
  orderCommentList(searchObj){
    return pkFetch.post(`${userServer}/order_comment_list`,searchObj)
    .then(res => res)
  },
  //支付模拟订单
  payOrder(payObj){
    return pkFetch.post(`${userServer}/pay_list_add`,payObj)
    .then(res => res)
  },
  //获取当前用户预约设置信息
  reserveSettingGet(){
    return pkFetch.post(`${userServer}/reserve_setting_get`)
    .then(res => res)
  },
  //设置预约某条选项的删除
  reserveSettingDelete(reserve_setting_id){
    return pkFetch.post(`${userServer}/reserve_setting_delete`,{
      reserve_setting_id
    })
    .then(res => res)
  },
  //提交预约设置（新建与重新提交）
  reserveSettingSubmit(front_money_normal,front_money_room,items){
    return pkFetch.post(`${userServer}/reserve_setting_submit`,{
      front_money_normal,front_money_room,items
    })
    .then(res => res)
  },
  //预约列表
  reserveOrderList(searchObj){
    return pkFetch.post(`${userServer}/reserve_order_list`,searchObj)
    .then(res => res)
  },
   reserveStatusAct(actObj){
    return pkFetch.post(`${userServer}/reserve_status_act`,actObj)
    .then(res => res)
   },
   //买单订单
   getBuyList(searchObj){
    return pkFetch.post(`${userServer}/get_maidan_list`,searchObj)
    .then(res => res)
   },
   //支付宝支付成功“跳转”网址，按照 pay_number 获取一行信息
   getOrderInfo(pay_number){
    return pkFetch.post(`${userServer}/get_pay_list_row_by_pay_number`,{
      pay_number
    })
    .then(res => res)
   },
   userSetOnline(is_online_maidan,is_online_reserve){
    return pkFetch.post(`${userServer}/is_online_set_maidan_reserve`,{
      is_online_maidan,is_online_reserve
    })
    .then(res => res)
   },
   pushBannerList(){
    return pkFetch.post(`${userServer}/push_list_banner`)
    .then(res => res)
   },
   getPushList(searchObj){
    return pkFetch.post(`${userServer}/push_list`,searchObj)
    .then(res => res)
   }
}