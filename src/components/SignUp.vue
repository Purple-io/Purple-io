<!-- Copyright © 2021 All rights reserved. -->

<!--
 * Sign-up component.
 *
 * Fields:
 *   Email
 *   Password
 *   Confirm Password
 *   Affiliation
 *   First name
 *   Last name
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <form class='range-field needs-validation' novalidate @submit.prevent='submit'>
    <h3>Sign Up</h3>

    <div class='form-group'>
      <label for='email' class='form-label'>Email Address</label>
      <input ref='email' id='email' type='email' class='form-control form-control-lg' required>
      <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small>
    </div>

    <div class='form-group'>
      <label>First Name</label>
      <input ref='firstName' class='form-control form-control-lg' required>
    </div>

    <div class='form-group'>
      <label>Last Name</label>
      <input ref='lastName' class='form-control form-control-lg' required>
    </div>

    <AffiliationSlider ref='affiliationSlider'/>

    <div class='form-group'>
      <label>Password</label>
      <input
        ref='password'
        type='password'
        class='form-control form-control-lg'
        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
        required
        @input='validateConfirm'
      >
      <div class='invalid-feedback'>
        Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
      </div>
    </div>

    <div class='form-group'>
      <label>Confirm Password</label>
      <input
        ref='confirmPassword'
        type='password'
        class='form-control form-control-lg'
        required
        @input='validateConfirm'
      >
      <div class='invalid-feedback'>
        Passwords must match.
      </div>
    </div>
    <button type='submit' class='btn btn-dark btn-lg btn-block'>Sign Up</button>

    <p class='forgot-password text-right'> Already registered <a href='../sign-in'>sign in?</a></p>
  </form>
</template>

<script>
import AffiliationSlider from '@/components/AffiliationSlider.vue';
import axios from 'axios';

export default {
  components: {
    AffiliationSlider
  },
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
      if (!this.$el.checkValidity()) {
        return;
      }

      const data = {
        email: this.$refs.email.value,
        firstName: this.$refs.firstName.value,
        lastName: this.$refs.lastName.value,
        affiliation: this.$refs.affiliationSlider.getValue(),
        password: this.$refs.password.value
      };

      await axios.post('http://localhost:5000/register', data)
      .then(() => {
        window.location.href = '/home';
      })
      .catch(error => alert('An error occurred. Try again. ' + error));
    },
    validateConfirm() {
      const password = this.$refs.password;
      const confirm = this.$refs.confirmPassword;

      if (confirm.value === password.value) {
        confirm.setCustomValidity('');
      }
      else {
        confirm.setCustomValidity('Passwords do not match');
      }
    }
  }
};
</script>

<style scoped lang='scss'>

form {
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