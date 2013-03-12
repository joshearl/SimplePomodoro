(function () {
    "use strict";

    var toast = YeahToast,
        query = WinJS.Utilities.query;

    /* 

     * TODO v1.0
     * Stop throws an error occasionally.
     * Confirm that notifications are properly canceled.

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
                notification,
                appBar = query('#appBar')[0],
                workButton = query('#work'),
                shortBreakButton = query('#short-break'),
                longBreakButton = query('#long-break'),
                stopButton = query('#stop'),
                minutes = query('#minutes')[0],
                seconds = query('#seconds')[0];

            workButton.listen("click", function () { start(Pomodoro.unit.work); });
            shortBreakButton.listen("click", function () { start(Pomodoro.unit.shortBreak); });
            longBreakButton.listen("click", function () { start(Pomodoro.unit.longBreak); });
            stopButton.listen("click", reset);

            toggleButtonVisibility();

            function start(pomodoro) {
                cancelScheduledNotication();
                Pomodoro.currentPomodoro = pomodoro;
                countdown = Pomodoro.getCountdown(Pomodoro.currentPomodoro.length);
                notification = toast.schedule({ title: "SIMPLE POMODORO", textContent: Pomodoro.currentPomodoro.completedMessage, due: countdown.end });

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
                    setDisplayTo(countdown);
                    scheduleNextUpdate();
                } else {
                    reset();
                }
            }

            function setDisplayTo(countdown) {
                minutes.innerHTML = countdown ? countdown.getMinutes() : "00";
                seconds.innerHTML = countdown ? countdown.getSeconds() : "00";
            }

            function scheduleNextUpdate() {
                ticker = window.setTimeout(update, 50);
            }
            
            function reset() {
                window.clearTimeout(ticker);
                countdown = {};
                cancelScheduledNotication();
                toggleButtonVisibility();
                setDisplayTo();
            }

            function cancelScheduledNotication() {
                if (notification)
                    toast.cancel(notification.id);
            }
       }
    });
})();
