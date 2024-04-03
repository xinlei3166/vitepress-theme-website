<template>
  <div
    id="live2d"
    ref="live2dRef"
    :style="{
      position: 'fixed',
      [live2dOptions.display.position]: live2dOptions.display.xOffset,
      bottom: live2dOptions.display.yOffset,
      width: live2dOptions.display.width,
      height: live2dOptions.display.height,
      zIndex: 99999,
      opacity: live2dOptions.react.opacity,
      pointerEvents: 'none'
    }"
  >
    <canvas
      v-if="live2dOptions.enable"
      id="live2dCanvasElement"
      :style="{
        position: 'absolute',
        left: '0',
        top: '0'
      }"
      class="live2dCanvasElement"
      :width="stripPX(live2dOptions.display.width)"
      :height="stripPX(live2dOptions.display.height)"
    ></canvas>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
// import '../live2d'

export default defineComponent({
  props: {
    live2dOptions: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const live2dRef = ref()

    onMounted(() => {
      if (!props.live2dOptions.enable) return
      // 是否显示看板娘
      const isShow = !(!props.live2dOptions.mobile.show && !isPC())
      if (!isShow) return
      window.loadlive2d?.('live2dCanvasElement', props.live2dOptions.model.url)
    })

    function stripPX(value) {
      return parseInt(value.replace(/px/g, ''))
    }

    // 判断是否是电脑端访问
    function isPC() {
      const userAgentInfo = navigator.userAgent || ''
      const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    }

    return { live2dRef, stripPX }
  }
})
</script>
