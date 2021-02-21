<!-- Copyright © 2021 All rights reserved. -->

<!--
 * Chat component.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
!*-->

<template>
  <div class="mesgs">
    <div class='top'>
      <div v-if='chat'>
        <h5 > {{ otherUser.firstName }} {{ otherUser.lastName }} </h5>
        <p > | {{ format(chat.updatedAt) }} </p>
      </div>
    </div>
    <div class="msg_history" ref='history'>
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
        <button type="button" class="btn btn-primary" @click='generateNews'>Generate News</button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message';
import moment from 'moment';

export default {
  components: {
    Message
  },
  props: {
    messages: Array,
    chat: Object
  },
  computed: {
    userId() {
      return JSON.parse(localStorage.getItem('user'))._id;
    },
    otherUser() {
      return this.chat.userIds.find(user => user._id !== this.userId);
    },
    user() {
      return this.chat.userIds.find(user => user._id === this.userId);
    }
  },
  methods: {
    send() {
      this.$emit('send', this.$refs.input.value)
      this.$refs.input.value = '';
    },
    format(string) {
      return moment(string, 'YYYY-MM-DDThh:mmTZD').fromNow()
    },
    scrollDown() {
      this.$refs.history.scrollTop = this.$refs.history.scrollHeight;
    },
    generateNews() {
      this.$emit('generateNews');
    }
  }
};
</script>

<style scoped lang='scss'>
input {
  outline: 0;
}

.top {
  top: 0;
  width: 100%;
  position: fixed;
  transform: translateX(-24px);
  box-shadow: 1px 1px 1px #9b79c7;
  background: white;
  height: 63px;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;

    p {
      transform: translate(5px, 5px);
    }
  }
}

h5 {
  margin-left: 20px;
}
// .sign-out {
//   background: #05728f;
//   border: darken(#05728f, 10%);
//   white-space: nowrap;
//   &:hover {
//     background: #05728f;
//     opacity: 0.9;
//   }
//   position: absolute;
//   right: 0;
//   // margin-left: calc(100% - 400px);
//   // float: right;
//   // display: block;
//   box-shadow: 0.5px 0.5px 1.5px #9b79c7;
// }
</style>