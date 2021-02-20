<template>
  <div class='home'>
    <div class='selection-menu'>
          <div class="chat_list new">
            <div class="chat_people">
              <div class="chat_ib">
                <button type="button" class='new' aria-label="Close" @click='newChat'>+</button>
              </div>
            </div>
          </div>

        <template v-for='chat in chats' :key='chat._id'>
          <ChatSelector :ref='chat._id' :chat='chat' @click='changeActive(chat)'/>
        </template>
          <div class="chat_list pending">
            <div class="chat_people">
              <div class="chat_ib">
                <h5>
                  Pending:
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
import io from "socket.io-client";

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
    const socket = io("http://localhost:5000");
    window.socket = socket;

    const response = await axios.get('http://localhost:5000/chat/getAllChats', {
      params: {
        userId: JSON.parse(localStorage.getItem('user'))._id
      },
      headers: {
        Authorization: localStorage.getItem('token')
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
        userId: JSON.parse(localStorage.getItem('user'))._id
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    this.pendingQueues = responsePending.data;


    socket.on('received', data => {
      console.log(data.message)
    });
  },
  methods: {
    changeActive(chat) {
      if (this.selectedChat) {
        this.$refs[this.selectedChat._id].$el.classList.remove('active_chat');
      }
      this.selectedChat = chat;
      this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
    },
    newChat() {
      window.location.href = "/new-chat"
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
  background: #FAfAfA;
}

.pending {
  margin-top: 50px;
  background: #FAfAfA;
}
.new {
  background: #FAfAfA;
  padding: 0;
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 35px;
    float: right;
    padding: 0;
    margin: 0;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>