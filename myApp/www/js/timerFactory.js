angular.module('starter')

.factory('timerFactory', function ($log, $cordovaLocalNotification, $ionicPopup) {

    //==============================
    // Private
    //==============================
    var ids = [];
    var alarmTime;
    var additionalTime;



    //TODO: create id rather than pass it in
    function _setNotification(unimplented, timeAmount) {

        createIds();

        additionalTime = timeAmount;

        //for development
        //alarmTime.setMinutes(alarmTime.getMinutes() + 1);

         angular.forEach(ids, function (id) {

             console.log('set notification');

             alarmTime = new Date();;
             alarmTime.setMinutes(alarmTime.getMinutes() + additionalTime);

             console.log('Time was set for : ' + alarmTime);
             console.log('addtional time is : ' + additionalTime);

             $cordovaLocalNotification.add({
                 id: id,
                 date: alarmTime,
                 message: "Timer has reached interval",
                 title: "LightStim",
                 sound: 'file://mp3/beep.caf'
             }).then(function () {
                 console.log("The notification was set");
             });

             additionalTime = additionalTime + timeAmount;
         });
    };

    function _cancelNotification(unimplented) {

        angular.forEach(ids, function (id) {
            $cordovaLocalNotification.cancel(id).then(function () {
                console.log('callback for cancellation background notification');
            });
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
    function createIds(type) {

        for (i = 0; i < 10; i++) {
            //temp math.random for development
            id = Math.floor(Math.random() * (10000));
            ids.push(id)

        }
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