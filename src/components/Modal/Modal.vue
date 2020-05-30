<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :class="sizeModal">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button btn btn-secondary"
                @click="$emit('close')"
              >
                Cancelar
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: {
    sizeModal: {
      type: String,
      default: "col-12"
    }
  }
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  width: auto;
  height: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  padding: 10px;
  width: 100%;
  height: auto;
  max-height: 100%;
  overflow-y: auto;
}

.modal-container {
  margin: 0px auto;
  padding: 0px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  font-size: 25px;
  font-weight: 700;
  color: #000000;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 5px;
  padding-bottom: 5px;
}

.modal-body {
  overflow-y: auto;
  max-height: 65vh;
  font-weight: 500;
}

/* Scroll Personalizado */
.modal-wrapper::-webkit-scrollbar {
  width: 5px;
  background: #d5d5d5;
}

.modal-wrapper::-webkit-scrollbar-thumb {
  background: #898989;
  border-radius: 5px;
  border-right: 1px solid #d5d5d5;
  border-left: 1px solid #d5d5d5;
}

/* Scroll Personalizado */
.modal-body::-webkit-scrollbar {
  width: 9px;
  background: #d5d5d5;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #898989;
  border-radius: 5px;
  border-right: 1px solid #d5d5d5;
}

.modal-footer {
  padding-top: 0px;
  padding-bottom: 0px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
