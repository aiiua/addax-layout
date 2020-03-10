import AddaxHeader from './header'
import AddaxLoading from './loading'
import AddaxSider from './sider'

const components = {
    AddaxHeader,
    AddaxLoading,
    AddaxSider
}

const install = Vue => {
    if (install.installed) return

    Object.keys(components).forEach(key => {
        console.log(key)
        Vue.component(key, components[key])
    })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const API = {
    install,
    ...components
}

module.exports.default = module.exports = API
