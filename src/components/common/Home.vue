<template>
    <div>
        <nav-menu class="nav-menu"></nav-menu>
        <keep-alive><router-view></router-view></keep-alive>
    </div>
</template>

<script>
    import NavMenu from '@/components/common/NavMenu'
    export default {
        components: {NavMenu}
    }
</script>

<style scoped>
    .nav-menu {
        /*margin-bottom: 40px;*/
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
    }
</style>
