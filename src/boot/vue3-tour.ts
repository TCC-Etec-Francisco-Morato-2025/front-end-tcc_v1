import { boot } from 'quasar/wrappers'
import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'

export default boot(({ app }) => {
  app.use(Vue3Tour)
})
