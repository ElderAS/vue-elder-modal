<template lang="html">
  <transition name="elder-modal">
    <div v-if="show" class="elder-modal" @click="onClickaway">
      <slot :close="close" />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    clickaway: Boolean,
    show: Boolean,
  },
  watch: {
    show: {
      handler(val, oldVal) {
        if (val === oldVal || oldVal === undefined) return
        let counter = parseInt(document.body.getAttribute('elder-modal-open')) || 0
        counter = Math.max(0, counter + (val ? 1 : -1))
        if (counter) document.body.setAttribute('elder-modal-open', counter)
        else document.body.removeAttribute('elder-modal-open')
      },
      immediate: true,
    },
  },
  methods: {
    onClickaway(event) {
      if (!this.clickaway) return
      if (event.target === this.$el) this.close()
    },
    close() {
      this.$emit('close')
      this.$emit('update:show', false)
    },
    onEsc(event) {
      if (this.show && event.keyCode === 27) this.close()
    },
  },
  mounted() {
    window.addEventListener('keyup', this.onEsc)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onEsc)
  },
}
</script>

<style lang="scss">
.elder-modal {
  z-index: 10;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#030a0c, 0.65);

  display: flex;
  justify-content: center;
  align-items: center;
}

.elder-modal-enter,
.elder-modal-leave-to {
  opacity: 0;
}

.elder-modal-enter-active,
.elder-modal-leave-active {
  transition: opacity 300ms ease;
}

body[elder-modal-open] {
  overflow: hidden;
}
</style>
