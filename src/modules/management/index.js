const Metadata  = () => import('./metadata/Metadata')

export default {
  menu () {
    return {
      text: '元数据管理',
      icon: 'tag',
      link: '/'
    }
  },
  route: {
    component: Metadata
  }
}