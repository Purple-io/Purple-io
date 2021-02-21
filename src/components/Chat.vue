<!-- Copyright © 2021 All rights reserved. -->

<!--
 * Chat component.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <div class="mesgs">
    <div class="msg_history">
      <Message
        v-for='(message, index) in messages'
        :key='index'
        :incoming='message.incoming'
        :timestamp='message.timestamp'
        :message='message.text'
      />
    </div>
    <div class="type_msg">
      <div class="input_msg_write">
        <input ref='input' type="text" class="write_msg" placeholder="Type a message" @keydown.enter='send'/>
        <button class="msg_send_btn" type="button" @click='send'><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message';

export default {
  components: {
    Message
  },
  props: {
    messages: Array
  },
  methods: {
    send() {
      this.$emit('send', this.$refs.input.value)
      this.$refs.input.value = '';
    }
  }
};
</script>

<style scoped lang='scss'>
</style>