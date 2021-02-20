<template>
  Home
</template>

<script>

export default {
  created() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/sign-in';
    }
  }
};
</script>

<style scoped lang='scss'>
</style>