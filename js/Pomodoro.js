(function () {
    "use strict";

    WinJS.Namespace.define("Pomodoro", {
        /* API
         * example: https://github.com/muncman/jquery-pomodoro-timer/blob/master/js/jquery.pomodoro.js
         * accepts pomodoro objects as options
         * provides default pomodoros
         * 

        */
        currentPomodoro : {},

        unit: {
            shortBreak: { length: 300000, completedMessage: "Break's over. Back to work!" },
            longBreak: { length: 900000, completedMessage: "Break's over. Back to work!" },
            work: { length: 1500000, completedMessage: "Good work! Let's take a break." }
            //work: { length: 5000, completedMessage: "Good work! Let's take a break." }
        },
        
        getCountdown : function (length) {
            var start = new Date().getTime(),
                end = new Date(start + length);

            return {
                start: start,
                end: end,
                type: this.currentPomodoro,
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
    });
})();