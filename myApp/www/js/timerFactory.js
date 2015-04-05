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
            message: "Version 1",
            title: "LightStim"
        }).then(function () {
            console.log("The notification was set");
        });
    };

    function _cancelNotification(id) {

        $cordovaLocalNotification.cancel(id).then(function () {
            console.log('callback for cancellation background notification');
        });

        //checkIfScheduled(id);
    };

    function _cancelAllNotifications() {

        $cordovaLocalNotification.cancelAll().then(function () {
          console.log('callback for canceling all background notifications');

          var alertPopup = $ionicPopup.alert({
             title: 'All Cancelled',
             template: 'All notifcations were cancelled'
           });

        });
    };


    //TODO: Make this smart, we could store a hash of types with numbers,
    //then we would always be able to stop, start, pause - and update the location notification id
    //we would have to cancel / reset, but could be sexy
    function createId(type) {
        console.log('Not Implemented');
    };


    function checkIfScheduled() {

        $cordovaLocalNotification.isScheduled().then(function (isScheduled) {
            console.log(isScheduled);
          
            if (isScheduled) {

                $ionicPopup.alert({
                    title: 'deleted',
                    template: 'trying to delete'
                });

                $cordovaLocalNotification.cancel(id).then(function () {
                    console.log('callback for cancellation background notification');
                });
            };
        });
    };


    //==============================
    // Public Api
    //==============================
    return {
        setNotification: _setNotification,
        cancelNotification: _cancelNotification,
        cancelAllNotifications: _cancelAllNotifications
    };
});