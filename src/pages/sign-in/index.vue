<template>
  <a href='/'><img class='logo' src='/static/logo.png'/></a>
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

.logo {
  position: absolute;
  width: 100px;
  margin-top: 40px;
  margin-left: 50px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>