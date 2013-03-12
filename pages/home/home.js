(function () {
    "use strict";

    var toast = YeahToast,
        query = WinJS.Utilities.query;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            /* TODO v1.0

             * Show notifications when running in background.
             * Refactor into pomodoro object that raises events.
             * Prevent display from shifting as numbers change.
             * Track use with Google Analytics.
             * Center display in full screen, snapped views.
             * Reduce display size when snapped.
             * Play sound with notifications.
             * Settings to change background color.
             * Settings to change length of time periods.

            */

            var countdown,
                ticker,
                appBar = document.querySelector('#appBar'),
                workButton = query('#work'),
                shortBreakButton = query('#short-break'),
                longBreakButton = query('#long-break'),
                stopButton = query('#stop'),
                timeDisplay = query('#time-display');

            workButton.listen("click", function () { start(Pomodoro.unit.work); });
            shortBreakButton.listen("click", function () { start(Pomodoro.unit.shortBreak); });
            longBreakButton.listen("click", function () { start(Pomodoro.unit.longBreak); });
            stopButton.listen("click", reset);

            toggleButtonVisibility();

            function start(pomodoro) {
                Pomodoro.currentPomodoro = pomodoro;
                countdown = Pomodoro.getCountdown(Pomodoro.currentPomodoro.length);
                toggleButtonVisibility(Pomodoro.currentPomodoro);
                appBar.winControl.hide();
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
                if (!countdown) return;
                
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
