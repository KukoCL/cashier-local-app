import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../../components/BaseModal.vue'

describe('BaseModal', () => {
  beforeEach(() => {
    // Create the teleport target if it doesn't exist
    if (!document.getElementById('modal-root')) {
      const div = document.createElement('div')
      div.id = 'modal-root'
      document.body.appendChild(div)
    }
  })

  it('should render when isOpen is true', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        title: 'Test Modal',
      },
      attachTo: document.body,
    })
    
    // Check if modal content exists in the DOM
    expect(document.querySelector('.modal-overlay')).toBeTruthy()
    expect(document.body.textContent).toContain('Test Modal')
    
    wrapper.unmount()
  })

  it('should not render when isOpen is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: false,
        title: 'Test Modal',
      },
      attachTo: document.body,
    })
    
    // Modal should not be in the DOM when isOpen is false
    expect(document.querySelector('.modal-overlay')).toBeFalsy()
    
    wrapper.unmount()
  })

  it('should render close button when showCloseButton is true', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        title: 'Test Modal',
        showCloseButton: true,
      },
      attachTo: document.body,
    })
    
    expect(document.querySelector('.modal-close-btn')).toBeTruthy()
    
    wrapper.unmount()
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        title: 'Test Modal',
        showCloseButton: true,
      },
      attachTo: document.body,
    })
    
    const closeBtn = document.querySelector('.modal-close-btn') as HTMLElement
    closeBtn?.click()
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('close')).toBeTruthy()
    
    wrapper.unmount()
  })

  it('should render slots content', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      },
      slots: {
        default: '<p>Body content</p>',
        footer: '<button>Footer button</button>',
      },
      attachTo: document.body,
    })
    
    expect(document.body.innerHTML).toContain('<p>Body content</p>')
    expect(document.body.innerHTML).toContain('<button>Footer button</button>')
    
    wrapper.unmount()
  })

  it('should emit close event when overlay is clicked and closeOnOverlayClick is true', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        title: 'Test Modal',
        closeOnOverlayClick: true,
      },
      attachTo: document.body,
    })
    
    const overlay = document.querySelector('.modal-overlay') as HTMLElement
    overlay?.click()
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('close')).toBeTruthy()
    
    wrapper.unmount()
  })
})
