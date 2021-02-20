<!-- Copyright © 2021 All rights reserved. -->

<!--
 * New-Chat component.
 *
 * Fields:
 *   Topic
 *   Affiliation
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <form class='range-field needs-validation' novalidate @submit.prevent='submit'>
    <h3>New Chat</h3>

    <div class='form-group'>
      <label>Topic:</label>
      <Multiselect
        ref='multiselect'
        v-model='topic'
        class='multiselect'
        :searchable='true'
        :options='options'
        :allow-empty='false'
      />
      <input ref='mirror' v-model='topic' class='mirror form-control form-control-lg' required @input='validate'>
    </div>

    <AffiliationSlider
      ref='affiliationSlider'
      :default='default'
    />

    <div>
      <BannedWordsInput ref='banned'/>
    </div>

    <button type='submit' class='btn btn-dark btn-lg btn-block'>Submit</button>
  </form>
</template>

<script>
import axios from 'axios';
import AffiliationSlider from '@/components/AffiliationSlider.vue';
import Multiselect from '@vueform/multiselect';
import BannedWordsInput from '@/components/BannedWordsInput.vue';

export default {
  components: {
    Multiselect,
    AffiliationSlider,
    BannedWordsInput
  },
  data() {
    return {
      topic: null,
      options: [
        'Gun Control',
        'Abortion',
        'Religious Freedom',
        'Animal Rights',
        'Vaccines',
        'Privacy Rights',
        'Free-Market Capitalism',
        'Global Climate Change',
        'Evolution',
        'Marijuana Legalization',
        'Capital Punishment',
        'Marriage Equality',
        'Immigration Reform',
        'The Trump Presidency',
        'The Opioid Crisis',
        'Transgender Rights',
        'Federal Livable Wage',
        'White Supremacy',
        'The Green New Deal',
        'Electoral College',
        'Black Lives Matter',
        'Cancel Culture',
        'Student Debt Crisis',
        'The Israeli-Palestinian Conflict',
        'Universal Healthcare'
      ]
    };
  },
  computed: {
    default() {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).affiliation : null;
    }
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
      this.checkValidity();
      if (!this.$el.checkValidity()) {
        return;
      }

      const data = {
        issue: this.options[this.topic],
        rating: this.$refs.affiliationSlider.getValue(),
        banned: this.$refs.banned.tags,
        userId: JSON.parse(localStorage.getItem('user'))._id
      };

      await axios.post('http://localhost:5000/match/find/', data)
      .then(() => {
        window.location.href = '/home';
      })
      .catch(error => alert('An error occurred. Try again. ' + error));
    },
    checkValidity() {
      if (!this.$el.checkValidity()) {
        this.$refs.multiselect.$el.children[0].classList.add('invalid');
      }
      else {
        this.$refs.multiselect.$el.children[0].classList.remove('invalid');
      }
    }
  }
};
</script>

<style src='@vueform/multiselect/themes/default.css'></style>
<style scoped lang='scss'>

form {
  width: 500px;
  margin: 50px auto;
  border-radius: 15px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;

  & > div, & > h3 {
    margin: 20px 0;
  }

  &::v-deep .multiselect-input {
    color: #6c757d;
    font-size: 1.25rem;
    border-radius: .3rem;
    display: block;
    width: 100%;
    padding: .2rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    &.invalid {
      border-color: #dc3545;
      padding-right: calc(1.5em + .75rem);
    }
  }

  .mirror {
    visibility: hidden;
    position: absolute;
  }
}

</style>