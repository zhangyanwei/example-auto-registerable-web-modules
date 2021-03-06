const Code  = () => import('./Code')

export default {
  menu () {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve({
          text: '编号管理',
          icon: 'code',
          link: '/'
        });
      }, 3000);
    });
  },
  route: {
    component: Code
  }
}