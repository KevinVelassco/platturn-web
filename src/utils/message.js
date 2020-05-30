import EventBus from "@/event-bus.js";
class Message {
  constructor() {
    this.type = "";
    this.message = "";
  }

  addMessageSuccess(message) {
    this.type = "success";
    this.message = message;
    this.event(this.type, this.message);
  }

  addMessageWarning(message) {
    this.type = "warning";
    this.message = message;
    this.event(this.type, this.message);
  }

  addMessageError(message) {
    this.type = "error";
    this.message = message;
    this.event(this.type, this.message);
  }

  addMessageInfo(message) {
    this.type = "info";
    this.message = message;
    this.event(this.type, this.message);
  }

  event(type, message) {
    EventBus.$emit("timeLimit", { type, message });
  }
}
export default new Message();
