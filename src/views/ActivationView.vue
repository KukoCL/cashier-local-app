<template>
  <div class="activation-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-lg" style="max-width: 500px; width: 100%;">
      <div class="card-body p-5">
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="mb-3">
            <i class="fas fa-key text-primary" style="font-size: 3rem;"></i>
          </div>
          <h2 class="card-title h3 mb-2">{{ appMessages.activation.title }}</h2>
          <p class="text-muted">{{ appMessages.activation.subtitle }}</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="clearError"
          ></button>
        </div>

        <!-- Activation Form -->
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="activationKey" class="form-label">
              {{ form.activationKey.label }}
            </label>
            <input
              id="activationKey"
              v-model="activationKey"
              type="text"
              class="form-control form-control-lg"
              :placeholder="form.activationKey.placeholder"
              :disabled="isActivating"
              required
              autocomplete="off"
              spellcheck="false"
            />
          </div>

          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="isActivating || !activationKey.trim()"
            >
              <span v-if="isActivating" class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">{{ appMessages.common.loading }}</span>
              </span>
              {{ isActivating ? actions.activating : actions.activate }}
            </button>
          </div>
        </form>

        <!-- Description -->
        <div class="mt-4 text-center">
          <small class="text-muted">
            {{ appMessages.activation.description }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActivation } from '../composables/useActivation'
import appMessages from '../infraestructure/appMessages'

const router = useRouter()
const { form, actions } = appMessages.activation;
const { activateApplication, isActivating, error, clearError } = useActivation()

// Form data
const activationKey = ref('')

const handleSubmit = async () => {
  if (!activationKey.value.trim()) {
    return
  }

  const success = await activateApplication(activationKey.value)
  
  if (success) {
    // Redirect to home page after successful activation
    router.push('/')
  }
}
</script>

<style scoped>
.activation-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
  border-radius: 15px;
}

.form-control-lg {
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.btn-lg {
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
}

.fa-key {
  opacity: 0.8;
}
</style>