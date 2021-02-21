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
    <Chat :messages='messages' @send='send' ref='chat'/>
  </div>
</template>

<script>
import axios from 'axios';
import ChatSelector from '@/components/ChatSelector.vue';
import Pending from '@/components/Pending.vue';
import io from "socket.io-client";
import Chat from '@/components/Chat.vue';
import moment from 'moment';

export default {
  data() {
    return {
      selectedChat: null,
      chats: [],
      pendingQueues: [],
      messages: []
    }
  },
  components: {
    ChatSelector,
    Pending,
    Chat
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
    this.$nextTick(async () => {
      this.selectedChat = this.chats.length ? response.data[0] : null;

      if (this.selectedChat) {
        this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
      }

      await this.updateMessages();

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
      if (data.chatId === this.selectedChat._id) {
        this.messages.push({ incoming: true, text: data.message })
      }
    });
  },
  methods: {
    async changeActive(chat) {
      if (this.selectedChat) {
        this.$refs[this.selectedChat._id].$el.classList.remove('active_chat');
      }
      this.selectedChat = chat;
      this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
      await this.updateMessages();

    },
    async updateMessages() {
      const messages = await axios.get('http://localhost:5000/chat/getMessages', {
        params: {
          chatId: this.selectedChat._id
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const id = JSON.parse(localStorage.getItem('user'))._id;
      this.messages = messages.data.map(data => {
        return {
          text: data.content,
          incoming: data.toUser === id,
          timestamp: moment(data.createdAt, 'YYYY-MM-DDThh:mmTZD').fromNow()
        }
      });
      this.$nextTick(() => this.$refs.chat.scrollDown());
    },
    newChat() {
      window.location.href = "/new-chat"
    },
    async send(message) {
      socket.emit('sendMessage', {
        messageContent: message,
        chatId: this.selectedChat._id,
        userId: JSON.parse(localStorage.getItem('user'))._id
      });

      const response = await axios.post('http://localhost:5000/chat/censorSenderMessage', {
        messageContent: message,
        banned: this.selectedChat.banned
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      this.messages.push({ incoming: false, text: response.data, timestamp: moment().fromNow() });
      this.$nextTick(() => this.$refs.chat.scrollDown());
    }
  }
};
</script>

<style scoped lang='scss'>

.home {
  height: 100%;
  display: flex;
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