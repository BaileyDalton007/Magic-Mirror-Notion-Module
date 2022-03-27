/* eslint-disable prettier/prettier */
var NodeHelper = require("node_helper");
const spawn = require("child_process").spawn;

const SCRIPT_PATH = "C:\\Users\\bdsoc\\MagicMirror\\modules\\custom-calendar\\get_notion_calendar.py";

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
            this.get_data();
        } else {
            // ...
        }
    },


 get_data() {
    var process = spawn("python3", [SCRIPT_PATH]);
    var data = "balls"
    this.sendSocketNotification("PYTHON_DONE", data)
 }});