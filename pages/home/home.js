(function () {
    "use strict";

    var toast = YeahToast;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            /* TODO v1.0

             * Refactor into pomodoro object that raises events.
             * Hide stop button when clock is stopped.
             * Prevent display from shifting as numbers change.
             * Track use with Google Analytics.
             * Show notifications when running in background.
             * Reduce display size when snapped.
             * Play sound with notifications.
             * Settings to change background color.
             * Settings to change length of time periods.

            */

            var countdown,
                ticker,
                workButton = WinJS.Utilities.query('#work'),
                shortBreakButton = WinJS.Utilities.query('#short-break'),
                longBreakButton = WinJS.Utilities.query('#long-break'),
                stopButton = WinJS.Utilities.query('#stop'),
                timeDisplay = WinJS.Utilities.query('#time-display');

            workButton.listen("click", function () { start(Pomodoro.unit.work); });
            shortBreakButton.listen("click", function () { start(Pomodoro.unit.shortBreak); });
            longBreakButton.listen("click", function () { start(Pomodoro.unit.longBreak); });
            stopButton.listen("click", reset);

            toggleButtonVisibility(Pomodoro.currentPomodoro);

            function start(pomodoro) {
                Pomodoro.currentPomodoro = pomodoro;
                countdown = Pomodoro.getCountdown(Pomodoro.currentPomodoro.length);
                toggleButtonVisibility(Pomodoro.currentPomodoro);
                update();
            }
            
            function toggleButtonVisibility(pomodoro) {
                if (!pomodoro) {
                    stopButton.addClass('hidden');
                } else {
                    stopButton.removeClass('hidden');
                }
            }

            function update() {
                var remaining = countdown.getRemaining();
                
                if (remaining > 0) {
                    setDisplayTo(countdown.getDisplayTime());
                    scheduleNextUpdate();
                } else {
                    showToast(Pomodoro.currentPomodoro.completedMessage);
                    reset();
                }
            }

            function setDisplayTo(value) {
                timeDisplay.forEach(function (div) { div.innerHTML = value; });
            }

            function scheduleNextUpdate() {
                ticker = window.setTimeout(update, 50);
            }
            
            function reset() {
                window.clearTimeout(ticker);
                countdown = {};
                toggleButtonVisibility();
                setDisplayTo("00:00");
            }
            
            function showToast(message) {
                toast.show({ title: "SIMPLE POMODORO", textContent: message });
            }
        }
    });
})();
