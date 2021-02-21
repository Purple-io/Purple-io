<template>
  <div class='home'>
    <div class='selection-menu'>
        <div class="chat_list new">
          <div class="chat_people">
            <div class="chat_ib container">
              <a href='/'><img class='logo' src='/static/logo.png'/></a>

              <button type="button" class='new' aria-label="Close" @click='newChat'>+</button>
            </div>
          </div>
        </div>

        <template v-for='chat in chats' :key='chat._id'>
          <ChatSelector :ref='chat._id' :chat='chat' @click='changeActive(chat)' @close='close(chat)'/>
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
          <Pending :ref='p._id' :queue='p' @close='closePending(p)'/>
        </template>
    </div>
    <Chat :messages='messages' @send='send' ref='chat' @generateNews='generateNews'/>
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
    const socket = io("https://purplepov-api.herokuapp.com");
    window.socket = socket;

    const response = await axios.get('https://purplepov-api.herokuapp.com/chat/getAllChats', {
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

    const responsePending = await axios.get('https://purplepov-api.herokuapp.com/chat/getAllPendingChats', {
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
      if (!this.selectedChat) {
        this.messages = [];
        return;
      }

      const messages = await axios.get('https://purplepov-api.herokuapp.com/chat/getMessages', {
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

      const response = await axios.post('https://purplepov-api.herokuapp.com/chat/censorSenderMessage', {
        messageContent: message,
        banned: this.selectedChat.banned
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      this.messages.push({ incoming: false, text: response.data, timestamp: moment().fromNow() });
      this.$nextTick(() => this.$refs.chat.scrollDown());
    },
    async close(chat) {
      this.chats = this.chats.filter(chatParam => chatParam._id !== chat._id);

      await axios.post('https://purplepov-api.herokuapp.com/chat/deleteChat', {
        chatId: chat._id
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      if (this.selectedChat._id === chat._id) {
        this.$nextTick(() => {
          this.selectedChat = this.chats.length ? this.chats[0] : null;

          if (this.selectedChat) {
            this.$refs[this.selectedChat._id].$el.classList.add('active_chat');
          }
        });
      }
      await this.updateMessages();
    },
    async closePending(q) {
      this.pendingQueues = this.pendingQueues.filter(pendingQueues => pendingQueues._id !== q._id);

      await axios.post('https://purplepov-api.herokuapp.com/chat/deletePendingChat', {
        queueId: q._id
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
    },
    async generateNews() {
      if (!this.selectedChat) {
        this.messages = [];
        return;
      }
      const response = await axios.get('https://purplepov-api.herokuapp.com/news', {
        params: {
          issue: this.selectedChat.issue,
          user1Id: this.selectedChat.userIds[0]._id,
          user2Id: this.selectedChat.userIds[1]._id
        }
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      const message = `This is an automated message that sends a news article for discussion when the ` +
        `conversation goes stale. News article: ${response.data.article.url}`

      socket.emit('sendMessageNC', {
        messageContent: message,
        chatId: this.selectedChat._id,
        userId: JSON.parse(localStorage.getItem('user'))._id
      });

      this.messages.push({ incoming: false, text: message, timestamp: moment().fromNow() });
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

.logo {
  width: 60px;
  margin-top: 7px;
  margin-left: 5px;
  position: absolute;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
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
  background: white;
  box-shadow: 0px 5px 5px purple;
}

.pending {
  margin-top: 50px;
}
.new {
  padding: 0;
  font-weight: 100;
  color: #1c1f23;
  padding-bottom: 5px;

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