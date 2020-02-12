import ModalComponent from './src/component.vue'

const Options = {}

const install = Vue => {
  Vue.component('modal-component', ModalComponent)
}

const setup = options => {
  for (let key in options) {
    if (!(key in Options)) return
    Options[key] = options[key]
  }
}

export default {
  install,
}

export { ModalComponent, install as ModalComponentInstaller, setup, Options }
