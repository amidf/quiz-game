const routes = [
  {
    name: 'Home',
    path: '/',
    component: require('./../components/Home.vue').default
  },
  {
    name: 'Settings',
    path: '/settings',
    component: require('./../components/Settings.vue').default
  },
  {
    name: 'Game',
    path: '/game',
    component: require('./../components/Game.vue').default
  },
  {
    name: 'End',
    path: '/end',
    component: require('./../components/End.vue').default
  }
]

export default routes
