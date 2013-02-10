﻿(function () {
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

            var countdown,
                ticker,
                startWorkButton = WinJS.Utilities.query('#start-work'),
                startBreakButton = WinJS.Utilities.query('#start-break'),
                stopButton = WinJS.Utilities.query('#stop'),
                timeDisplay = WinJS.Utilities.query('#time-display');

            startWorkButton.listen("click", function () { start(minutes.twentyFive); });
            startBreakButton.listen("click", function () { start(minutes.five); });
            stopButton.listen("click", reset);
            
            function start(duration) {
                countdown = getCountdown(duration);
                update();
            }

            function update() {
                var remaining = countdown.remaining();

                if (remaining > 0) {
                    setDisplayTo(remaining);
                    scheduleNextUpdate();
                } else {
                    reset();
                }
            }

            function setDisplayTo(value) {
                timeDisplay.forEach(function (div) { div.innerHTML = value; });
            }

            function scheduleNextUpdate() {
                ticker = window.setTimeout(update, 200);
            }
            
            function reset() {
                window.clearTimeout(ticker);
                countdown = {};
                setDisplayTo("00:00");
            }

            function getCountdown(length) {
                return {
                    start: new Date().getTime(),
                    remaining: function () {
                        var now = new Date(),
                            end = new Date(this.start + length);

                        return ((end - now.getTime()) / 1000) / 60;
                    }
                };
            }
        }
    });
})();
