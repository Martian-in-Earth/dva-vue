<template>
    <div> {{share.c}}
        <a @click="nav">home</a>
        <router-view></router-view>
        <router-view name="a"></router-view>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({share}) => ({share}))({
      methods: {
        nav () {
          this.dispatch({type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/?a=b'] } })
        }
      }
    })
</script>
