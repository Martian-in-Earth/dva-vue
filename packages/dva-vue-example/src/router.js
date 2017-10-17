import { dynamic, connect } from 'dva-vue'
const toFirUpper = word => word.replace(/(\w)\w+$/, (word, letter) => word.replace(letter, letter.toUpperCase()))
export default function RouterConfig ({
  history,
  app
}) {
  const asyncComponent = (modelUrl, comptUrl) => dynamic({
    app,
    models: () => [new Promise(resolve => require.ensure([], () => {
      resolve(require(`./models/${modelUrl}`).default)
    }, 'router'))],
    component: () => new Promise(resolve => require.ensure([], () => {
      let compt = require(`./routes/${(comptUrl || toFirUpper(modelUrl))}.vue`).default
      resolve(compt.connect ? connect(state => ({ [`${modelUrl}`]: state[`${modelUrl}`] }))(compt) : compt)
    }, 'router'))
  })
  return [{
    path: '/',
    component: asyncComponent('index')
  }, {
    path: '/share',
    component: asyncComponent('share'),
    children: [
      {
        path: 'profile',
        components: {
          default: asyncComponent('profile'),
          a: asyncComponent('posts')
        }
      },
      {
        path: 'posts',
        component: asyncComponent('posts')
      }
    ]
  }]
}
