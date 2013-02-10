(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            /* TODO v1.0
             * Start countdown from 25:00.
             * Start countdown from 5:00.
             * Start countdown from 15:00.
             * Reset current countdown.
             * Notification when timer is up.
             * Analytics.
             * Run in background.
             * Settings to change background color.
             * Settings to change length of time periods.

            */
            var minutes = {
                five: 300000,
                fifteen: 900000,
                twentyFive: 1500000
            };
            
            var countdown = {
                start: new Date().getTime(),
                remaining: function () {
                    var now = new Date();
                    var end = new Date(this.start + minutes.twentyFive);

                    return ((end - now.getTime()) / 1000) / 60;
                }
            };
            
            var startButton = WinJS.Utilities.query('#start-button'),
                timeDisplay = WinJS.Utilities.query('#time-display');
                
            startButton.listen("click", start);
            
            function start() {
                timeDisplay.forEach(function (div) { div.innerHTML = countdown.remaining(); });
                window.setTimeout(start, 500);
            }
        }
    });
})();
