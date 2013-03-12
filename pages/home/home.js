(function () {
    "use strict";

    var toast = YeahToast,
        query = WinJS.Utilities.query;

    /* 

     * TODO v1.0
     * Pull request for schedule support in YeahToast.
     * Cancel toast when timer is stopped or switched.
     * Prevent display from shifting as numbers change.
     * Center display in full screen, snapped views.
     * Reduce display size when snapped.

     * TODO v2.0
     * Refactor pomodoro implementation for better display, event-based interface: https://github.com/joshearl/jquery-pomodoro-timer/tree/master/js
     * Track use with Google Analytics.
     * Play sound with notifications.
     * Settings to change background color.
     * Settings to change length of time periods.

     */

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            
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
                toast.schedule({ title: "SIMPLE POMODORO", textContent: Pomodoro.currentPomodoro.completedMessage, due: countdown.end });

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
