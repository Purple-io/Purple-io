<!-- Copyright © 2021 All rights reserved. -->

<!--
 * A single Message component.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <div>
    <div v-if='incoming' class='incoming_msg'>
        <div class="received_msg">
          <div class="received_withd_msg">
            <p> {{ message }}</p>
            <span class="time_date"> {{ timestamp }} </span></div>
        </div>
    </div>

    <div v-else class="outgoing_msg">
      <div class="sent_msg">
          <p> {{ message }}</p>
          <span class="time_date"> {{ timestamp }} </span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    incoming: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang='scss'>
</style>