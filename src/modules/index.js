const files = require.context('.', true, /^\.\/\w+\/index\.js$/)

const modules = {}
const menus = []
const routes = []

// TODO how to deal with the menu order?
function createMenu(name, menu) {
  return { $call: menu, module: name }
}

function createRoute(name, route) {
  const path = typeof(route.path) === 'string' ? '/' + route.path.replace(/^\.?\//, '') : ''
  return { ...route, path: `/${name}${path}` }
}

files.keys().forEach((key) => {
  const name = /^\.\/(\w+)\/index\.js$/.exec(key)[1]
  const m = files(key).default
  modules[name] = m
  menus.push(createMenu(name, m.menu))
  routes.push(createRoute(name, m.route))
})

export { modules as default, routes, menus }
