<!-- Copyright © 2021 All rights reserved. -->

<!--
 * A single Chat Selector component.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <div class="chat_list">
    <div class="chat_people">
      <div class="chat_ib">
        <h5>
          topic: {{ queue.issue }}
        </h5>
        <button @click.stop='close' type="button" class="btn-close" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    queue: Object
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang='scss'>
div {
  opacity: 0.7;
  background: #EEE;
}
.chat_list {
  box-shadow: 0px 0.5px 1.5px purple;
}

button {
  display: inline !important;
}
.chat_ib {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-close {
  overflow: visible;
  transform-origin: top right;
  transform: scale(0.8);
  float: right;
}

</style>