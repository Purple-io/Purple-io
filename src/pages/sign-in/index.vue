<template>
  <div>
    <SignIn/>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue';

export default {
  components: {
    SignIn
  },
  created() {
    if (localStorage.getItem('token')) {
      window.location.href = '/home';
    }
  }
};
</script>

<style scoped lang='scss'>

div {
  margin: 0 auto;
}
</style>