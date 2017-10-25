import login from '@/views/login/login'
import register from '@/views/login/register'
import forgot from '@/views/login/forgot'
import active from '@/views/login/active'
import backMobile from '@/views/login/backMobile'
import backEmail from '@/views/login/backEmail'
import emailConfirm from '@/views/login/emailConfirm'
import emailPrompt from '@/views/login/emailPrompt'
export default [
  {
      path: '/',
      name: 'login',
      component: login
  },
  {
      path: '/login',
      name: 'login',
      component: login
  },
  {
      path: '/register',
      name: 'register',
      component: register
  },
  {
      path: '/forgot',
      name: 'forgot',
      component: forgot
  },
  {
      path: '/e_mail_confirm',
      name: 'e_mail_confirm',
      component: active
  },
  {
      path: '/backMobile',
      name: 'backMobile',
      component: backMobile
  }, 
  {
      path: '/backEmail',
      name: 'backEmail',
      component: backEmail
  },
  {
      path: '/e_mail_getback_pwd',
      name: 'e_mail_getback_pwd',
      component: emailConfirm
  }, 
  {
      path: '/emailPrompt',
      name: 'emailPrompt',
      component: emailPrompt
  },             
]