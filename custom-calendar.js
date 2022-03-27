/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */

const UPDATE_INTERVAL = 5000;

Module.register("custom-calendar", {
	defaults: {},
	start: function () {
    var self = this;
    setInterval(function() {
            self.sendSocketNotification('DO_PYTHON');
            self.updateDom();
        }, UPDATE_INTERVAL);
  },
	getDom: function() {
        var element = document.createElement("div")
        element.id = "display"
        element.className = "myContent"
        element.innerHTML = "Hello World"
        return element
      },
	notificationReceived: function () {},

	socketNotificationReceived: function (notification, payload) {
    if (notification == "PYTHON_DONE") {
      var element = document.getElementById("display");

      element.innerHTML = payload
    }
  }
});