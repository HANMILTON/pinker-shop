import {
  pkFetch
} from './pkFetch'
// console.log(pkFetch)
const payServer = `${window.config.server}/pay`
export default {
  getPayInfo(pay_list_id){
    return pkFetch.post(`${payServer}/alipay_web_initiate`,{
      pay_list_id
    })
    .then(res => res)
  }
}