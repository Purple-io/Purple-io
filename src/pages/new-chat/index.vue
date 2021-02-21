<template>
  <a href='/'><img class='logo' src='/static/logo.png'/></a>
  <div>
    <NewChatForm/>
  </div>
</template>

<script>
import NewChatForm from '@/components/NewChatForm.vue';

export default {
  components: {
    NewChatForm
  },
  created() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/sign-in';
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