/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */

const UPDATE_INTERVAL = 5000;

let currentDisplay = "Loading...";

Module.register("custom-calendar", {
	defaults: {
    maxLength: 10
  },
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
        element.innerHTML = currentDisplay
        return element
      },
	notificationReceived: function () {},

	socketNotificationReceived: function (notification, payload) {
    if (notification == "PYTHON_DONE") {
      if (currentDisplay != payload) {
        var element = document.getElementById("display");
        var formatted_data = this.format_events(payload);
        element.innerHTML = formatted_data;
        currentDisplay = formatted_data;
      }
    }
  },
    // Format raw json into a readable list
  format_events(payload) {
    const data = JSON.parse(payload);
    
    // Depends on which is bigger, will display all items in data, or the maximum specified in config
    const size = (this.config.maxLength >= data.length) ? data.length : this.config.maxLength;

    const eventList = data.slice(0, size);

    var returnString = "";
    for (let i = 0; i < eventList.length; i++) {
      returnString += eventList[i].name + "<br>";
    }

    return returnString
  }

});
