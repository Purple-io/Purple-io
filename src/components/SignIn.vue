<!-- Copyright © 2021 All rights reserved. -->

<!--
 * Sign-In component.
 *
 * Fields:
 *   Email
 *   Password
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <form class='range-field needs-validation' novalidate @submit.prevent='submit'>
    <h3>Sign In</h3>

    <div class='form-group'>
      <label for='email' class='form-label'>Email Address</label>
      <input ref='email' id='email' type='email' class='form-control form-control-lg' required>
    </div>

    <div class='form-group'>
      <label>Password</label>
      <input ref='password' type='password' class='form-control form-control-lg' required>
    </div>

    <button type='submit' class='btn btn-dark btn-lg btn-block'>Sign In</button>

    <p class='forgot-password text-right'>Not registered <a href='../sign-up'>sign up?</a></p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    const forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  },
  methods: {
    async submit() {
      const data = {
        email: this.$refs.email.value,
        password: this.$refs.password.value
      };

      await axios.post('http://localhost:5000/login', data)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        window.location.href = '/home';
      })
      .catch(error => alert('An error occurred. Try again. ' + error));
    }
  }
};
</script>

<style scoped lang='scss'>

form {
  background-color: white;
  width: 500px;
  margin: 50px auto;
  border-radius: 15px;
  box-shadow: 0px 14px 150px purple;
  padding: 40px 55px 45px 55px;

  & > div, & > h3 {
    margin: 20px 0;
  }

  span {
    margin: 0 20px;
  }
}
</style>