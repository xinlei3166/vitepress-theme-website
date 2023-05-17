import { onMounted } from 'vue'
import Live2d from './components/live2d'

const defaultLive2dOptions = {
  enable: true,
  model: {
    url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hibiki/hibiki.model.json'
  },
  display: {
    position: 'right',
    width: '135px',
    height: '300px',
    xOffset: '35px',
    yOffset: '5px'
  },
  mobile: {
    show: true
  },
  react: {
    opacity: 0.8
  }
}

export type Live2dOptions = Partial<typeof defaultLive2dOptions>

export const useLive2d = (live2dOptions: Live2dOptions = {}) => {
  onMounted(() => {
    init()
  })

  function init() {
    setTimeout(() => {
      if (!document) return
      Live2d.init({ live2dOptions: { ...defaultLive2dOptions, ...live2dOptions } })
    }, 500)
  }
}

export default useLive2d
