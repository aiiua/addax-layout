<template>
    <div class="zzld-layout-sider">
        <div class="sider-logo">
            <img class="logo" :src="logo" />
            <h1 class="sider-title">
                <span>{{title}}</span>
                <span class="subtitle">综合服务平台</span>
            </h1>
        </div>
        <Sider
            class="sider-menu"
            ref="sider"
            hide-trigger
            collapsible
            :collapsed-width="80"
            :value="toggle"
        >
            <Menu
                accordion
                :active-name="active"
                theme="dark"
                width="auto"
                @on-select="handleSelect"
            >
                <template v-for="item in menu">
                    <MenuItem
                        v-if="item.meta.isTop"
                        :key="item.name"
                        :name="item.name"
                        :to="item.path"
                    >
                        <Iconfont
                            :value="item.meta.icon"
                            :size="toggle ? 24 : 16"
                        />
                        <span class="sider-menu-title">{{
                            item.meta.title
                        }}</span>
                    </MenuItem>
                    <Submenu
                        v-if="!item.meta.isTop && !toggle"
                        :key="item.name"
                        :name="item.name"
                    >
                        <template slot="title">
                            <Iconfont :value="item.meta.icon" />
                            <span class="sider-menu-title">
                                {{ item.meta.title }}
                            </span>
                        </template>
                        <template v-for="child in item.children">
                            <MenuItem
                                :key="child.name"
                                :name="child.name"
                                :to="`${item.path}/${child.path}`"
                                v-if="child.meta"
                            >
                                <span>{{ child.meta.title }}</span>
                            </MenuItem>
                        </template>
                    </Submenu>
                    <Poptip
                        v-if="!item.meta.isTop && toggle"
                        :key="item.name"
                        transfer
                        padding="0"
                        trigger="hover"
                        placement="right-start"
                        popper-class="sider-menu-poptip"
                    >
                        <Submenu :name="item.name">
                            <template slot="title">
                                <Iconfont :value="item.meta.icon" :size="24" />
                                <span class="sider-menu-title">
                                    {{ item.meta.title }}
                                </span>
                            </template>
                        </Submenu>

                        <div slot="content">
                            <CellGroup @on-click="handleSelect">
                                <Cell
                                    v-for="child in item.children"
                                    :selected="active === child.name"
                                    :to="`${item.path}/${child.path}`"
                                    :key="child.name"
                                    :name="child.name"
                                    :title="child.meta.title"
                                />
                            </CellGroup>
                        </div>
                    </Poptip>
                </template>
            </Menu>
        </Sider>
    </div>
</template>

<script>
import { Sider, Menu, Submenu, MenuItem, Poptip, CellGroup, Cell } from 'view-design'

export default {
    name: 'AddaxSider',

    components: {
        Sider, Menu, Submenu, MenuItem, Poptip, CellGroup, Cell
    },

    props: {
        // Logo
        logo: {
            type: String,
            default: ''
        },

        // 标题
        title: {
            type: String,
            default: ''
        },

        // 是否收缩
        toggle: {
            type: Boolean,
            default: false
        },

        // 菜单
        menu: {
            type: Array,
            default: () => {
                return []
            }
        },

        // 选中菜单
        active: {
            type: String,
            default: ''
        }
    },

    methods: {
        handleToggle () {
            this.$refs.sider.toggleCollapse()
        },

        handleSelect (value) {
            this.$store.dispatch('menu/SetSubMenuActive', value)
        }
    }
}
</script>
