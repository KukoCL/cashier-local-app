import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageForm from '../components/MessageForm.vue'
import { ref } from 'vue'

// Mock the composable
vi.mock('../composables/useMessages', () => ({
  useMessageForm: () => ({
    newMessage: ref(''),
    loading: ref(false),
    status: ref({ message: '', type: '' }),
    saveMessage: vi.fn().mockResolvedValue(true),
    clearStatus: vi.fn(),
    resetForm: vi.fn(),
  }),
}))

describe('MessageForm Component', () => {
  it('should render correctly when not loading', () => {
    const wrapper = mount(MessageForm)

    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Save Message to Database')
  })

  it('should have textarea with correct placeholder', () => {
    const wrapper = mount(MessageForm)
    const textarea = wrapper.find('textarea')

    expect(textarea.attributes('placeholder')).toBe('Type your hello world message here...')
  })

  it('should have form structure', () => {
    const wrapper = mount(MessageForm)

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Enter a message to test the database:')
  })

  it('should have button without type attribute (default click handler)', () => {
    const wrapper = mount(MessageForm)
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    // Button doesn't have type="submit", it uses @click handler
    expect(button.attributes('type')).toBeUndefined()
  })
})
