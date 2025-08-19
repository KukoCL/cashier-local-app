<template>
  <div class="form-group">
    <label for="message">{{ appMessages.messageForm.label }}</label>
    <textarea 
      id="message" 
      v-model="newMessage" 
      :placeholder="appMessages.messageForm.placeholder"
      @keyup.ctrl.enter="handleSaveMessage"
    ></textarea>
  </div>
  
  <button @click="handleSaveMessage" :disabled="loading || !newMessage.trim()">
    {{ loading ? appMessages.messageForm.buttonSaving : appMessages.messageForm.buttonSave }}
  </button>
  
  <div v-if="status.message" :class="['status', status.type]">
    {{ status.message }}
  </div>
</template>

<script setup lang="ts">
import { useMessageForm } from '../composables/useMessages'
import appMessages from '../infraestructure/appMessages'

const emit = defineEmits<{
  messageSaved: []
}>()

const { newMessage, loading, status, saveMessage } = useMessageForm()

const handleSaveMessage = async () => {
  const success = await saveMessage()
  if (success) {
    emit('messageSaved')
  }
}
</script>
