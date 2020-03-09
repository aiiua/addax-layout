import AddaxHeader from './header'
import AddaxLoading from './loading'
import AddaxSider from './sider'

const components = {
    AddaxHeader,
    AddaxLoading,
    AddaxSider
}

const install = Vue => {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}

module.exports.default = module.exports = install
