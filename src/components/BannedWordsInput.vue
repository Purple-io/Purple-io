<template>
  <div>
    <label>Banned Words:</label>
    <div class='tag-input form-control form-control-lg'>
      <div v-for='(tag, index) in tags' :key='tag' class='tag-input__tag'>
        <span @click='removeTag(index)'>&#10005;</span>
        {{ tag }}
      </div>
      <input
        type='text'
        placeholder='Add Word...'
        class='tag-input__text'
        @keydown.enter='addTag'
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: []
    };
  },
  methods: {
    addTag(event) {
      event.preventDefault();
      const val = event.target.value.trim();
      if (val.length > 0) {
        this.tags.push(val);
        event.target.value = '';
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.tag-input {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  height: auto !important;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>