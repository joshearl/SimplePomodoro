﻿(function () {
    "use strict";

    var toast = YeahToast;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            /* TODO v1.0

             * Hide stop button when clock is stopped.
             * Prevent display from shifting as numbers change.
             * Track use with Google Analytics.
             * Show notifications when running in background.
             * Handle snapping.
             * Play sound with notifications.
             * Settings to change background color.
             * Settings to change length of time periods.
             * Refactor into pomodoro object that raises events.

            */

            var pomodoros = {
                shortBreak: { length: 300000, completedMessage: "Break's over. Back to work!" },
                longBreak: { length: 900000, completedMessage: "Break's over. Back to work!" },
                work: { length: 1500000, completedMessage: "Good work! Let's take a break." }
                //work: { length: 5000, completedMessage: "Good work! Let's take a break." }
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
            
            toggleButtonVisibility(currentPomodoro);

            
            function start(pomodoro) {
                currentPomodoro = pomodoro;
                countdown = getCountdown(currentPomodoro.length);
                toggleButtonVisibility(currentPomodoro);
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
                var start = new Date().getTime(),
                    end = new Date(start + length);

                return {
                    start: start,
                    type: currentPomodoro,
                    getRemaining: function () {
                        var now = new Date().getTime();

                        return ((end - now) / 1000) / 60;
                    },
                    getDisplayTime: function () {
                        return getMinutes() + ':' + getSeconds();
                    }
                };

                function getSeconds() {
                    var offset = 1,
                        seconds = String(Math.round((getRemainingInSeconds() - offset) % 60));

                    return formatForDisplay(seconds);
                }

                function getMinutes() {
                    var minutes = String(Math.floor((getRemainingInSeconds() - 0.5) / 60));
                    return formatForDisplay(minutes);
                }
                
                function formatForDisplay(value) {
                    return value < 1 ? "00" : value < 10 ? '0' + value : value;
                }
                
                function getRemainingInSeconds() {
                    return (end - new Date().getTime()) / 1000;
                }
            }

            function showToast(message) {
                toast.show({ title: "SIMPLE POMODORO", textContent: message });
            }
        }
    });
})();
