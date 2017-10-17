<template>
    <div>
        <div @click="down">aa {{posts.nickName}}</div>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({posts}) => ({posts}))({
      methods: {
        down () {
          this.dispatch({type: 'index/getUser', payload: 'aa'}).then(() => console.log('done'))
        }
      }
    })
</script>
