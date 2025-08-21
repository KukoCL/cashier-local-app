import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmationDialog from '../../components/ConfirmationDialog.vue'

// Mock BaseModal component
vi.mock('../../components/BaseModal.vue', () => ({
  default: {
    name: 'BaseModal',
    template: '<div><slot /><slot name="footer" /></div>',
    props: ['isOpen', 'title', 'closeOnOverlayClick', 'showCloseButton'],
    emits: ['close'],
  },
}))

describe('ConfirmationDialog', () => {
  const defaultProps = {
    isOpen: true,
    message: 'Are you sure?',
  }

  it('should render with default props', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Are you sure?')
    expect(wrapper.text()).toContain('Confirm')
    expect(wrapper.text()).toContain('Cancel')
  })

  it('should render with custom text', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        ...defaultProps,
        title: 'Custom Title',
        confirmText: 'Yes',
        cancelText: 'No',
        details: 'Additional details',
      },
    })

    expect(wrapper.text()).toContain('Yes')
    expect(wrapper.text()).toContain('No')
    expect(wrapper.text()).toContain('Additional details')
  })

  it('should emit confirm event when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps,
    })

    await wrapper.find('.confirm-btn').trigger('click')

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('should emit cancel event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps,
    })

    await wrapper.find('.cancel-btn').trigger('click')

    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should show loading state', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        ...defaultProps,
        loading: true,
      },
    })

    expect(wrapper.text()).toContain('Processing...')
    expect(wrapper.find('.confirm-btn').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.cancel-btn').attributes('disabled')).toBeDefined()
  })

  it('should render different variants with correct icons', () => {
    const variants: Array<'danger' | 'warning' | 'success' | 'info'> = ['danger', 'warning', 'success', 'info']

    variants.forEach(variant => {
      const wrapper = mount(ConfirmationDialog, {
        props: {
          ...defaultProps,
          variant,
        },
      })

      expect(wrapper.find('.icon').classes()).toContain(`icon-${variant}`)
      expect(wrapper.find('.confirm-btn').classes()).toContain(`btn-${variant}`)
    })
  })

  it('should not render details when not provided', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps,
    })

    expect(wrapper.find('.confirmation-details').exists()).toBe(false)
  })
})
