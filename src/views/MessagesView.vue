<template>
  <div class="messages-view">
    <h1>{{ appMessages.app.title }}</h1>

    <MessageForm
      @message-saved="handleMessageSaved"
    />

    <MessageList
      :messages="messages"
      :loading="loading"
      @refresh="refreshMessages"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import MessageForm from '../components/MessageForm.vue'
import MessageList from '../components/MessageList.vue'
import { useMessageList } from '../composables/useMessages'
import appMessages from '../infraestructure/appMessages'

const { messages, loading, loadMessages, refreshMessages } = useMessageList()

const handleMessageSaved = () => {
  refreshMessages()
}

onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
/* Component-specific styles can be added here */
</style>
