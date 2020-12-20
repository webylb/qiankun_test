import store from './store'

const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue',
    // container: '#subapp-viewport', //子应用挂载得div
    // prop: {
    //   routerBase: 'sub-vue' // 下发路由给子应用, 子应用根据该值去定义qiankun环境下的路由
    // }
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react',
    // container: '#subapp-viewport',
    // props: {
    //   routerBase: '/sub-react'
    // }
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport',
    props: {
      routerBase: item.activeRule,
      getGlobalState: store.getGlobalState
    }
  }
})

export default apps