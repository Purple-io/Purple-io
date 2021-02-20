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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    queue: Object
  }
};
</script>

<style scoped lang='scss'>
div {
  opacity: 0.7;
  background: #DDD;
}

</style>