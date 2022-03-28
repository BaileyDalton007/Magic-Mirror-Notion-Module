/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */

const UPDATE_INTERVAL = 1000000;

const dateOptions = {timezone: 'America/New_York', month: 'short', day: 'numeric' };

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
        title.innerHTML = "NOTION CALENDAR"

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
        var data = this.format_events(payload);
        
        currentEvents = data[0];
        currentDates = data[1];

        this.updateDom();
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

      // Truncates time as we only need date
      // Appends zeroed time because timezones, good luck
      var date = new Date(eventList[i].date.slice(0, 10) + "T00:00:00");
      Log.log(date);
      var dateString = date.toLocaleDateString("en-US", dateOptions);
      Log.log(dateString);


      // Uses the date to assign the suffix
      var suffix = "th";

      var numDate = date.getDate();
      switch(numDate) {
        case 1:
        case 21:
        case 31:
          suffix = "st";
          break;
        case 2:
        case 22:
          suffix = "nd";
          break;
        case 3:
        case 23:
          suffix = "rd"
          break;
      }

      returnDates += dateString + suffix + "<br>";
    }

    return [returnEvents, returnDates]
  }

});
