<template>
  <div class="row" id="component-message" v-if="visible">
    <div
      class="col-10 offset-2 col-sm-8 offset-sm-4 col-md-6 offset-md-6 
      col-lg-4 offset-lg-8 message"
      :class="typeMessage"
    >
      <div class="progress">
        <div
          :class="typeProgressBar"
          role="progressbar"
          :style="'width: ' + progress + '%'"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="col-12 pb-2">
        <div class="row">
          <div class="col-10">
            {{ message }}
          </div>
          <div class="col-2 text-right">
            <font-awesome-icon
              style="cursor: pointer"
              icon="times"
              size="lg"
              @click="visible = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from "@/event-bus.js";
export default {
  name: "message",
  data() {
    return {
      message: "",
      progress: 0,
      time: 0,
      visible: false,
      type: ""
    };
  },
  computed: {
    typeMessage() {
      return {
        "message-success": this.type === "success",
        "message-warning": this.type === "warning",
        "message-error": this.type === "error",
        "message-info": this.type === "info"
      };
    },
    typeProgressBar() {
      return {
        "progress-bar-success": this.type === "success",
        "progress-bar-warning": this.type === "warning",
        "progress-bar-error": this.type === "error",
        "progress-bar-info": this.type === "info"
      };
    }
  },
  methods: {
    timeLimit() {
      const timeLimit = 6;
      let validator = this.visible ? this.time < timeLimit : false;

      if (validator) {
        this.time++;
        this.progress = this.progress + 100 / timeLimit;
        setTimeout(this.timeLimit, 1000);
      } else {
        this.close();
      }
    },
    close() {
      EventBus.$on("click", (this.visible = false));
    }
  },
  mounted() {
    EventBus.$on("timeLimit", item => {
      this.visible = true;
      this.progress = 0;
      this.time = 0;
      this.message = item.message;
      this.type = item.type;
      this.timeLimit();
    });
  }
};
</script>
<style scoped>
#component-message {
  position: fixed;
  left: 0px;
  right: 0px;
  z-index: 1000;
}
.message {
  color: #ffffff;
  padding: 0px !important;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 500;
}
.progress {
  margin-bottom: 10px !important;
  border-radius: 0px !important;
  background-color: #e9ecef8c !important;
  height: 8px !important;
}

.message-success {
  background-color: #0fa000f0 !important;
}

.progress-bar-success {
  background-color: #0ac52b !important;
}

.message-error {
  background-color: #ff0000f0 !important;
}

.progress-bar-error {
  background-color: #ff000085 !important;
}

.message-warning {
  background-color: #ff9800fc !important;
}

.progress-bar-warning {
  background-color: #e28b0c !important;
}

.message-info {
  background-color: #0087fffa !important;
}

.progress-bar-info {
  background-color: #0c87e2e8 !important;
}
</style>
