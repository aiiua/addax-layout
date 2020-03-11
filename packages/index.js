import AddaxHeader from './components/header'
import AddaxLoading from './components/loading'
import AddaxSider from './components/sider'

const components = {
    AddaxHeader,
    AddaxLoading,
    AddaxSider
}

const install = Vue => {
    if (install.installed) return

    Object.keys(components).forEach(key => {
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

export default API
