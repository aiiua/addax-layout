<template>
    <Header>
        <Menu ref="menu" mode="horizontal" :active-name="active">
            <div class="header-content">
                <MenuItem
                    v-for="item in menus"
                    :key="item.name"
                    :name="item.name"
                >
                    <Iconfont v-if="active === item.name" type="svg" :value="item.activeIcon" :size="24" />
                    <Iconfont v-else type="svg" :value="item.icon" :size="24" />
                    {{ item.label }}
                </MenuItem>
            </div>
        </Menu>
        <div class="header-mine">
            <!-- <Notice /> -->
        </div>
        <div class="header-notice">
            <!-- <Mine /> -->
        </div>
    </Header>
</template>

<script>
import { Header, Menu, MenuItem } from 'view-design'

export default {
    name: 'AddaxHeader',

    components: {
        Header, Menu, MenuItem
    },

    props: {
        // 横向菜单
        menus: {
            type: Array,
            default: () => {
                return []
            }
        },

        // 菜单选中
        active: {
            type: String,
            default: ''
        }
    }
}
</script>
