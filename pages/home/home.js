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
            var now = new Date();
            var offset = 1500000;

            var countdownTimer = {
                start: now.getTime(),
                end: now.setTime(now.getTime() + offset)
            }
            
            var startButton = WinJS.Utilities.query('#start-button'),
                timeDisplay = WinJS.Utilities.query('#time-display');
                

            startButton.listen("click", function () {
                timeDisplay.forEach(function (div) { div.innerHTML = ((countdownTimer.end - countdownTimer.start) / 1000) / 60; });
            });
        }
    });
})();
