angular.module('starter')

.factory('timerFactory', function ($log, $cordovaLocalNotification, $ionicPopup) {

    //==============================
    // Private
    //==============================

    //TODO: create id rather than pass it in
    function _setNotification(id, timeAmount) {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + timeAmount);

        console.log('set notification');

        $cordovaLocalNotification.add({
            id: id,
            date: alarmTime,
            message: "Time is up!",
            title: "LightStim"
        }).then(function () {
            console.log("The notification was set");
        });
    };


    function _cancelNotification(id) {

        console.log('cancel notification');

        $cordovaLocalNotification.cancel(id).then(function () {
            console.log('callback for cancellation background notification');
        });
    };

    //TODO: Make this smart, we could store a hash of types with numbers,
    //then we would always be able to stop, start, pause - and update the location notification id
    //we would have to cancel / reset, but could be sexy
    function createId(type) {

    };

    //==============================
    // Public Api
    //==============================
    return {
        setNotification: _setNotification,
        cancelNotification: _cancelNotification,
    };


});