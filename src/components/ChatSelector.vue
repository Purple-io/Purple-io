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
          {{ otherUser.firstName }} {{ otherUser.lastName }}
          <span class="chat_date">{{ format(chat.updatedAt) }}</span>
        </h5>
        <p>Topic: {{ chat.issue }} </p><button @click='close' type="button" class="btn-close" aria-label="Close"></button>
        <p>Affiliation: {{ otherUser.affiliation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
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
    format(string) {
      return moment(string, 'YYYY-MM-DDThh:mmTZD').fromNow()
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang='scss'>

.chat_list {
  cursor: pointer;
}

.btn-close {
  overflow: visible;
  transform-origin: top right;
  transform: scale(0.8) translateY(-1rem);
  opacity: 0.3;
  float: right;
}
</style>