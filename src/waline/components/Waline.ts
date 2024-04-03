import { createApp, ref, defineComponent, h, onMounted } from 'vue'
import { init } from '@waline/client'
import '@waline/client/waline.css'

export const WalineComponent = defineComponent({
  name: 'WalineComment',
  props: {
    walineOptions: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const walineRef = ref()
    onMounted(() => {
      init({
        el: '#waline',
        serverURL: props.walineOptions.serverURL,
        login: props.walineOptions.login || 'force'
      })
    })

    return () => h('div', { id: 'waline', ref: el => (walineRef.value = el) })
  }
})

WalineComponent.newInstance = (props: any) => {
  const { selector = '.VPDoc .content-container' } = props.walineOptions

  const container = document.createElement('div')
  container.classList.add('waline-wrap')
  container.style.paddingTop = '48px'
  const parent = document.querySelector(selector)
  if (!parent) return
  parent.appendChild(container)

  const app = createApp({
    render() {
      return h(WalineComponent, {
        ...props
      })
    }
  })

  app.mount(container)

  return {
    destroy() {
      app.unmount()
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }
  }
}

export default WalineComponent
