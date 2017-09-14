<template>
    <div>
        <div @click="down">aa {{index.nickName}}</div>
         <router-link to="share">share</router-link>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({index}) => ({index}))({
      methods: {
        down () {
          this.dispatch({type: 'index/getUser', payload: 'aa'}).then(()=>console.log('done'))
        }
      }
    })
</script>
