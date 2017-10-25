import {
  pkFetch
} from './pkFetch'
// console.log(pkFetch)
const publicServer = `${window.config.server}/public`
export default {
  getUserInfo() {
  	// console.log(`${publicServer}/get_login_user_info`)
    return pkFetch.get(`${publicServer}/get_login_user_info`)
      .then(res => res)
  },
  imgUpload(img_base64_encode){
    return pkFetch.post(`${publicServer}/img_upload`,{
    	img_base64_encode
    })
      .then(res => res)
  },
  imgUpload2(uploadObj){
    return pkFetch.post(`${publicServer}/img_upload_2`,uploadObj)
      .then(res => res)
  },  
   getCitySub(level,parent_id){
    return pkFetch.post(`${publicServer}/get_city_sub`, {
      level,
      parent_id
    })
    .then(res => res)
  },
  getCityTop(){
    return pkFetch.get(`${publicServer}/get_city_top`)
      .then(res => res)
  },

}