<!-- Copyright © 2021 All rights reserved. -->

<!--
 * Component for the political affiliation slider.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <div class='form-group'>
    <label for='formControlRange'>Political Affiliation</label>
    <div class='d-flex justify-content-center my-4'>
      <span class='font-weight-bold purple-text mr-2 mt-1'>Democrat</span>
      <input ref='slider' class='border-0' type='range' min='-5' max='5' :value='default'>
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
}
</style>