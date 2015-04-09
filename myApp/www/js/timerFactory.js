angular.module('starter')

.factory('timerFactory', function ($log, $cordovaLocalNotification, $ionicPopup) {

    //==============================
    // Private
    //==============================
    var ids = [];
    var alarmTime;
    var additionalTime;
    var times = [];

    //TODO: create id rather than pass it in
    function _setNotification(unimplented, timeAmount) {

        createIds();
        createTimes();

        $cordovaLocalNotification.add([{
            id: ids[0],
            date: times[0],
            message: "Timer has reached interval 1",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[1],
            date: times[1],
            message: "Timer has reached interval 2",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[2],
            date: times[2],
            message: "Timer has reached interval 3",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[3],
            date: times[3],
            message: "Timer has reached interval 4",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[4],
            date: times[4],
            message: "Timer has reached interval 5",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[5],
            date: times[5],
            message: "Timer has reached interval 6",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[6],
            date: times[6],
            message: "Timer has reached interval 7",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[7],
            date: times[7],
            message: "Timer has reached interval 8",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[8],
            date: times[8],
            message: "Timer has reached interval 9",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        },
        {
            id: ids[9],
            date: times[9],
            message: "Timer has reached interval 10",
            title: "LightStim",
            sound: 'file://mp3/beep.caf'
        }]);


         //angular.forEach(ids, function (id) {
         //    console.log('set notification');

         //    alarmTime = new Date();;
         //    alarmTime.setMinutes(alarmTime.getMinutes() + additionalTime);

         //    console.log('Time was set for : ' + alarmTime);
         //    console.log('addtional time is : ' + additionalTime);

         //    $cordovaLocalNotification.add({
         //        id: id,
         //        date: alarmTime,
         //        message: "Timer has reached interval",
         //        title: "LightStim",
         //        sound: 'file://mp3/beep.caf'
         //    }).then(function () {
         //        console.log("The notification was set");
         //    });

         //    additionalTime = additionalTime + timeAmount;
         //});
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


    function createTimes(timeAmount) {

        additionalTime = timeAmount;

        for (i = 0; i < 10; i++) {

            alarmTime = new Date();
            alarmTime.setMinutes(alarmTime.getMinutes() + additionalTime);

            console.log('Time was set for : ' + alarmTime);
            console.log('addtional time is : ' + additionalTime);

            times.push(alarmTime)

            additionalTime = additionalTime + timeAmount;
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