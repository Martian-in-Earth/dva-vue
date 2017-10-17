<template>
    <div> {{share.c}}
        <router-link to="/?c=b">home</router-link>
        <router-view></router-view>
        <router-view name="a"></router-view>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({share}) => ({share}))({
    })
</script>
