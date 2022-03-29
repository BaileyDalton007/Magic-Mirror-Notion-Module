/* eslint-disable prettier/prettier */
var NodeHelper = require("node_helper");
const exec = require("child_process").exec;

const fs = require('fs');
const { syncBuiltinESMExports } = require("module");

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
            this.get_data();
        } else
        if (notification === "CREDS") {
            this.writeCredentials(payload);
        }
    },
    // Takes API credientals from config file and writes them into a json file
    // for the Python script
    writeCredentials(data) {
        // Escape path funny buisness
        var parts = data[0].split('\\');
        this.path = parts.join('\\\\');

        this.database = data[1];
        this.token = data[2];

        var jsonData = `{"token": "${this.token}", "calendardb": "${this.database}", "path": "${this.path}"}`;
        var jsonObj = JSON.parse(jsonData);
        var jsonContent = JSON.stringify(jsonObj);

        // No error handling for you!
        fs.writeFile(this.path + "\\notionInfo.json", jsonContent, function (err) {});
    },
    parse_data() {
        let rawdata = fs.readFileSync(this.path + "\\json_data.json\\");
        let events = JSON.parse(rawdata);
        return events;
    },


 get_data() {
    // Python script makes notion api call and puts data into json_data.json to be parsed
    var SCRIPT_PATH = this.path + "\\get_notion_calendar.py"

    exec("python " + SCRIPT_PATH, {
        cwd: this.path
    }, () => {
        var data = this.parse_data();
        this.sendSocketNotification("PYTHON_DONE", data)
    });
 },
});