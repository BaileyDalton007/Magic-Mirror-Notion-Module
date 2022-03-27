/* eslint-disable prettier/prettier */
var NodeHelper = require("node_helper");
const spawn = require("child_process").spawn;

module.exports = NodeHelper.create({

    init() {
    },

    start() {
    },

    stop() {      
    },

    // If notification of the main.js file is received, the node_helper will do this here:
    socketNotificationReceived(notification, payload) {
        if (notification === "DO_PYTHON") {
            // this.config = payload;
            this.yourOwnMethod();
        } else {
            // ...
        }
    },


 yourOwnMethod() {
    var self = this;
    //var process = spawn("python3", ["/absolute/path/to/modules/MMM-Test/bussavganger.py"]);
    var data = "balls"
    this.sendSocketNotification("PYTHON_DONE", data)
 }});