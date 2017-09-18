import pathToRegexp from 'path-to-regexp'
export const Link = history => Vue => {
  Vue.component('dva-link', {
    props: {
      tag: {
        default: 'a'
      },
      to: {
        require: true,
        type: String
      },
      replace: {
        type: Boolean,
        default: false
      }
    },
    render (h) {
      return h(this.tag, {
        on: {
          click: () => (this.replace ? history.replace : history.push)(this.to)
        }
      }, this.$slots.default)
    }
  })
}
export const Router = {
  props: {
    history: {
      require: true,
      type: Object
    },
    routes: {
      require: true,
      type: Array
    },
    store: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      location: {}
    }
  },
  beforeMount () {
    this.history.listen(location => {
      this.location = location
    })
  },
  methods: {
    matchPath (path) {
      const re = pathToRegexp(path)
      const { pathname } = this.location
      const match = re.exec(pathname)
      return match
    }
  },
  render (h) {
    let match = null
    let child = null
    this.routes.forEach(route => {
      let {component, path} = route
      if (match == null) {
        child = component
        match = path ? this.matchPath(path) : null
      }
    })
    return match ? h(child) : null
  }
}
