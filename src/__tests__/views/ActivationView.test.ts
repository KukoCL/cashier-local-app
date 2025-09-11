import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ActivationView from '../../views/ActivationView.vue'
import { createPinia } from 'pinia'

describe('ActivationView', () => {
  const createWrapper = () => {
    return shallowMount(ActivationView, {
      global: {
        plugins: [createPinia()],
        mocks: {
          $router: {
            push: () => {},
          },
        },
        stubs: {
          'router-link': true,
        },
      },
    })
  }

  it('should render activation form', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('h2').text()).toContain('Activación de Aplicación')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('should have disabled submit button when no activation key', () => {
    const wrapper = createWrapper()

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('should enable submit button when activation key is present', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('input[type="text"]')
    await input.setValue('test-activation-key')

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })

  it('should render form elements correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('label[for="activationKey"]').text()).toContain('Clave de Activación')
    expect(wrapper.find('input#activationKey').exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
  })
})