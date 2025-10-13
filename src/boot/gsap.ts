import { boot } from 'quasar/wrappers'
import { gsap } from 'gsap'

gsap.registerPlugin(SplitText)

export default boot(() => {
  // disponibiliza globalmente, se quiser
})

export { gsap }
