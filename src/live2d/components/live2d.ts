import { createApp, h } from 'vue'
import Live2d from './Live2dComponent.vue'

Live2d.init = (props: any) => {
  const container = document.createElement('div')
  container.classList.add('live2d-wrap')
  const parent = document.querySelector('#app')
  if (!parent) return
  parent.appendChild(container)

  const app = createApp({
    render() {
      return h(Live2d, {
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

export default Live2d
