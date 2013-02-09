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
            WinJS.Utilities.query("#start-button")
                .listen("click", function () {
                    var timeDisplay = WinJS.Utilities.query('#time-display');
                    timeDisplay.forEach(function (div) { div.innerHTML = "hello world"; });
                });
        }
    });
})();
