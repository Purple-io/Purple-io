<template>
  <a href='/'><img class='logo' src='/static/logo.png'/></a>
  <div>
    <SignUp/>
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
  components: {
    SignUp
  },
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