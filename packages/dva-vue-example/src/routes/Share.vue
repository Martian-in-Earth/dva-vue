<template>
    <div>aaa
        <dva-link to="/?c=b">home</dva-link>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({share}) => ({share}))({
    })
</script>
