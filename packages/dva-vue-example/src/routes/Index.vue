<template>
    <div @click="down">aa {{index.nickName}}</div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({index}) => ({index}))({
      methods: {
        down () {
          this.dispatch({type: 'index/getUser', payload: 'aa'})
        }
      }
    })
</script>
