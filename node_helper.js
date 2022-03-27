/* eslint-disable prettier/prettier */
var NodeHelper = require("node_helper");
const exec = require("child_process").exec;

const fs = require('fs');

const PATH = "C:\\Users\\bdsoc\\MagicMirror\\modules\\custom-calendar";

const SCRIPT_PATH = PATH + "\\get_notion_calendar.py";
const JSON_PATH = PATH + "\\json_data.json";


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
    // Python script makes notion api call and puts data into json_data.json to be parsed
    var process = exec("python " + SCRIPT_PATH, {
        cwd: PATH
    });

    var data = parse_data();
    this.sendSocketNotification("PYTHON_DONE", data)
 }});

const parse_data = () => {
    let rawdata = fs.readFileSync(JSON_PATH + "\\");
    let events = JSON.parse(rawdata);
    return events;
}