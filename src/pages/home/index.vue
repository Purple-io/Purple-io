<template>
  <div class='home'>
    <div class='selection-menu'>
        <template v-for='chat in chats' :key='chat._id'>
          <ChatSelector :ref='chat._id' :chat='chat' @click='changeActive(chat)'/>
        </template>
          <div class="chat_list pending">
            <div class="chat_people">
              <div class="chat_ib">
                <h5>
                  Pending
                </h5>
              </div>
            </div>
          </div>
        <template v-for='p in pendingQueues' :key='p._id'>
          <Pending :ref='p._id' :queue='p'/>
        </template>
    </div>
  </div>


</template>

<script>
import axios from 'axios';
import ChatSelector from '@/components/ChatSelector.vue';
import Pending from '@/components/Pending.vue';

export default {
  data() {
    return {
      selectedChat: null,
      chats: [],
      pendingQueues: []
    }
  },
  components: {
    ChatSelector,
    Pending
  },
  async mounted() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/sign-in';
    }
    const response = await axios.get('http://localhost:5000/chat/getAllChats', {
      params: {
        userId: '603131ac1cca7ca55e5db17e'
      }
    });
    this.chats = response.data;
    this.$nextTick(() => {
      this.selectedChat = this.chats.length ? response.data[0] : null;

      if (this.selectedChat) {
        this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
      }
    });

    const responsePending = await axios.get('http://localhost:5000/chat/getAllPendingChats', {
      params: {
        userId: '603131ac1cca7ca55e5db17e'
      }
    });
    this.pendingQueues = responsePending.data;
    this.$nextTick(() => {
      this.selectedChat = this.chats.length ? responsePending.data[0] : null;

      if (this.selectedChat) {
        console.log(this.$refs, this.selectedChat, responsePending.data[0])
        this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
      }
    });
  },
  methods: {
    changeActive(chat) {
      if (this.selectedChat) {
        this.$refs[this.selectedChat._id].$el.classList.remove('active_chat');
      }
      this.selectedChat = chat;
      this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
    }
  }
};
</script>

<style scoped lang='scss'>

.home {
  height: 100%;
}

.selection-menu {
  position: fixed;
  width: 25%;
  display: flex;
  flex-flow: column;
  flex: 0 0 25%;
  min-width: 260px;
  max-width: 500px;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  border-right: 2px solid grey;
}

.pending {
  margin-top: 100px;
}
</style>