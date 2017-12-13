<template>
    <div>
        <div @click="nav">share</div>
        <div @click="down">aa {{index.nickName}}</div>
    </div>
</template>
<script>
    export default {
      connect: true,
      methods: {
        nav () {
          this.dispatch({type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'replace', args: ['share?c=b'] } })
        },
        down () {
          this.dispatch({type: 'index/getUser', payload: 'aa'}).then(() => console.log('done'))
        }
      }
    }
</script>
