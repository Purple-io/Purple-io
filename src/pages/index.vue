<template>
</template>

<script>

export default {
  created() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/sign-in';
    }
    else {
      window.location.href = '/home';
    }
  }
}
</script>