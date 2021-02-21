<!-- Copyright © 2021 All rights reserved. -->

<!--
 * Component for the political affiliation slider.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <div class='form-group'>
    <div class='text'>
    <label for='formControlRange'>
      Political Affiliation</label>
    <p class='forgot-password text-right'> Unsure? <a target='_blank' href='https://app.appsmith.com/applications/6031f5e1cf5d8f2fc9d0fe28/pages/6031f5e1cf5d8f2fc9d0fe2a'>find out!</a></p></div>
    <div class='d-flex justify-content-center my-4'>
      <span class='font-weight-bold purple-text mr-2 mt-1'>Democrat</span>
      <input ref='slider' class='border-0 input' type='range' min='-5' max='5' :value='default'>
      <span class='font-weight-bold purple-text ml-2 mt-1'>Republican</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    default: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getValue() {
      return this.$refs.slider.value;
    }
  }
};
</script>

<style scoped lang='scss'>

span {
  margin: 0 20px;
  transform: translateY(-15px);
}

.input {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background-image: linear-gradient(to right, blue, red);
  outline: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ddd;
    border: 3px solid transparent;
    border-radius: 50%;
    cursor: pointer;
     background-image: linear-gradient(white, white), linear-gradient(to right, blue, red);
     background-attachment: fixed, fixed;
     background-clip: padding-box, border-box;
}

.input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #ddd;
    border: 3px solid transparent;
    border-radius: 50%;
    cursor: pointer;
     background-image: linear-gradient(white, white), linear-gradient(to right, blue, red);
     background-attachment: fixed, fixed;
     background-clip: padding-box, border-box;
}
.forgot-password {
  transform: translateY(-0.4rem);
}
.text {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
</style>