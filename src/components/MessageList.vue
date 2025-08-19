<template>
  <div class="messages">
    <h2>{{ appMessages.messageList.title }}</h2>
    
    <button @click="$emit('refresh')" :disabled="loading">
      {{ loading ? appMessages.messageList.buttonLoading : appMessages.messageList.buttonRefresh }}
    </button>
    
    <div v-if="loading" class="loading">
      {{ appMessages.messageList.loadingMessage }}
    </div>
    
    <div v-else-if="messages.length === 0" class="loading">
      {{ appMessages.messageList.emptyMessage }}
    </div>
    
    <div v-else>
      <div v-for="message in messages" :key="message.id" class="message-item">
        <div class="message-text">{{ message.message }}</div>
        <div class="message-timestamp">
          {{ appMessages.messageList.timestampPrefix }}{{ formatDate(message.timestamp) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageRecord } from '../types/interfaces'
import appMessages from '../infraestructure/appMessages'

defineEmits<{
  refresh: []
}>()

defineProps<{
  messages: MessageRecord[]
  loading: boolean
}>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>
