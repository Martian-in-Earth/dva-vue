<template>
    <div>aaa
        <router-link to="/">home</router-link>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
export default connect(({share}) => ({share}))({

})
</script>
