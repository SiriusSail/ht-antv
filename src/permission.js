import router from './router';

// const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  var token = window.location.search.split('?cas-token=')[1]; //获取url中"?"符后的字串
  sessionStorage.setItem('token', token)
  next();
});

router.afterEach(() => {
});
