export const appMessages = {
  app: {
    title: '🚀 Electron.NET + Vue 3 + TypeScript + Vite + LiteDB',
  },

  messageForm: {
    label: 'Enter a message to test the database:',
    placeholder: 'Type your hello world message here...',
    buttonSave: 'Save Message to Database',
    buttonSaving: 'Saving...',
    successMessage: 'Message saved successfully! ✅',
    errorPrefix: 'Error saving message: ',
  },

  messageList: {
    title: '📝 Saved Messages (from LiteDB)',
    buttonRefresh: 'Refresh Messages',
    buttonLoading: 'Loading...',
    loadingMessage: 'Loading messages from database...',
    emptyMessage: 'No messages found. Add your first message above!',
    timestampPrefix: 'Saved: ',
  },

  common: {
    loading: 'Loading...',
    error: 'Error: ',
  },
}

export default appMessages
