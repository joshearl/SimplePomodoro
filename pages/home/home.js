(function () {
    "use strict";

    var toast = YeahToast;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            /* TODO v1.0

             * Format display values as MM:SS.
             * Stack buttons.
             * Hide duration buttons when clock is running.
             * Hide stop button when clock is stopped.
             * Track use with Google Analytics.
             * Run in background.
             * Settings to change background color.
             * Settings to change length of time periods.

            */

            var pomodoros = {
                shortBreak: { length: 300000, completedMessage: "Break's over. Back to work!" },
                longBreak: { length: 900000, completedMessage: "Break's over. Back to work!" },
                work: { length: 1500000, completedMessage: "Good work! Let's take a break." }
            };
            
            var countdown,
                ticker,
                currentPomodoro,
                workButton = WinJS.Utilities.query('#work'),
                shortBreakButton = WinJS.Utilities.query('#short-break'),
                longBreakButton = WinJS.Utilities.query('#long-break'),
                stopButton = WinJS.Utilities.query('#stop'),
                timeDisplay = WinJS.Utilities.query('#time-display');

            workButton.listen("click", function () { start(pomodoros.work); });
            shortBreakButton.listen("click", function () { start(pomodoros.shortBreak); });
            longBreakButton.listen("click", function () { start(pomodoros.longBreak); });
            stopButton.listen("click", reset);
            
            function start(pomodoro) {
                currentPomodoro = pomodoro;
                countdown = getCountdown(currentPomodoro.length);
                update();
            }

            function update() {
                var remaining = countdown.remaining();
                
                if (remaining > 0) {
                    setDisplayTo(remaining);
                    scheduleNextUpdate();
                } else {
                    showToast(currentPomodoro.completedMessage);
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
                    type: "shortBreak",
                    remaining: function () {
                        var now = new Date(),
                            end = new Date(this.start + length);

                        return ((end - now.getTime()) / 1000) / 60;
                    }
                };
            }

            function showToast(message) {
                toast.show({ title: "SIMPLE POMODORO", textContent: message });
            }
        }
    });
})();
