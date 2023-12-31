/*
 * @Author: zhanghan 1599252137@qq.com
 * @Date: 2023-06-13 17:04:33
 * @LastEditors: zhanghan 1599252137@qq.com
 * @LastEditTime: 2023-06-30 15:48:38
 * @FilePath: \fkoad:\Web\vue-acg\src\permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  const hasToken = getToken();
  const userInfo = store.getters.userInfo;
    NProgress.start();
    if (to.path === `/fontend` && !hasToken) {
      next();
      NProgress.done();
      return;
    }

    if (hasToken) {
      if (!userInfo) {
        try {
          await store.dispatch('user/getUserInfo', hasToken);
          next();
        } catch (error) {
          next({path: `/fontend`});
          console.dir(error);
        }
      } else {
        next();
      }
      NProgress.done();
    } else {
      next({path: `/fontend`});
      NProgress.done();
    }








  /* if (to.path === `/fontend`) {
    next();
    NProgress.done();
    return;
  }

  console.log('--hasToken');
  console.log(hasToken);
  if (hasToken) {
    console.log(`------hasToken------`);
    next();
    NProgress.done();
  } else {
    //next();
    console.log('------no token-------');
    
    next({path: `/fontend`});
    NProgress.done();
  } */
  
  
  /* 

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken();
  if

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next()
          //next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } */
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
