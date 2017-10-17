<template>
    <div>
        <div @click="down">aa {{profile.nickName}}</div>
    </div>
</template>
<script>
    import {connect} from 'dva-vue'
    export default connect(({profile}) => ({profile}))({
      methods: {
        down () {
          this.dispatch({type: 'index/getUser', payload: 'aa'}).then(() => console.log('done'))
        }
      }
    })
</script>
