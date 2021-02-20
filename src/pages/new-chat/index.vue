<template>
  <NewChatForm/>
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
</style>