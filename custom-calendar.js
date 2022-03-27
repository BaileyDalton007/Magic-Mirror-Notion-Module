/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */

Module.register("custom-calendar", {
	defaults: {},
	start: function () {
    var self = this;
    setInterval(function() {
            self.sendSocketNotification('DO_PYTHON');
            self.updateDom();
        }, 5000);
  },
	getDom: function() {
        var element = document.createElement("div")
        element.id = "display"
        element.className = "myContent"
        element.innerHTML = "Hello World"
        return element
      },
	notificationReceived: function (notification, payload) {},

	socketNotificationReceived: function (notification, payload) {
    if (notification == "PYTHON_DONE") {
      var element = document.getElementById("display");

      element.innerHTML = payload
    }
  }
});