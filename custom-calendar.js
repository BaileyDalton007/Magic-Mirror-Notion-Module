/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */

const UPDATE_INTERVAL = 10000;

let currentEvents = "Loading...";
let currentDates = "";

Module.register("custom-calendar", {
	defaults: {
    maxLength: 10
  },

  getStyles: function () {
		return ["custom-calendar.css"];
	},

	start: function () {
    var self = this;
    self.sendSocketNotification('DO_PYTHON');
    self.updateDom();

    setInterval(function() {
            self.sendSocketNotification('DO_PYTHON');
            self.updateDom();
        }, UPDATE_INTERVAL);
  },
	getDom: function() {
        var display = document.createElement("div")
        display.id = "display";

        var title = document.createElement("div");
        title.id = "header";
        title.innerHTML = "Calendar"
        //title.setAttribute("style", "font-weight:bold")

        var content = document.createElement("div");
        content.id = "content";

        var events = document.createElement("div");
        events.id = "events";
        events.innerHTML = currentEvents;

        var dates = document.createElement("div");
        dates.id = "dates";
        dates.innerHTML = currentDates;

        content.appendChild(events);
        content.appendChild(dates);

        display.appendChild(title)
        display.appendChild(content)

        return display
      },
	notificationReceived: function () {},

	socketNotificationReceived: function (notification, payload) {
    if (notification == "PYTHON_DONE") {
      //if (formattedEvents != payload) {
        var data = this.format_events(payload);
        
        currentEvents = data[0];
        currentDates = data[1];

        this.updateDom();
      //}
    }
  },
    // Format raw json into a readable list
  format_events(payload) {
    const data = JSON.parse(payload);
    
    // Depends on which is bigger, will display all items in data, or the maximum specified in config
    const size = (this.config.maxLength >= data.length) ? data.length : this.config.maxLength;

    const eventList = data.slice(0, size);

    var returnEvents = "";
    var returnDates = "";

    for (let i = 0; i < eventList.length; i++) {
      returnEvents += eventList[i].name + "<br>";
      returnDates += eventList[i].date + "<br>";
    }

    return [returnEvents, returnDates]
  }

});
