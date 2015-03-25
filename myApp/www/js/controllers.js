angular.module('starter.controllers', ['timer'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $cordovaLocalNotification) {
    // Form data for the login modal
    /*
    $scope.loginData = {};
  
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    */

    // Triggered in the login modal to close it
    /*
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };
    */

    // Open the Concierge_Wrinkles modal
    /*
    $scope.Concierge_Wrinkles = function() {
      $scope.modal.show();
    };
    */

    // Create the Concierge_Wrinkles modal that we will use later
    $ionicModal.fromTemplateUrl('templates/concierge_wrinkles.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the Concierge_Wrinkles modal to close it
    $scope.closeConcierge_Wrinkles = function () {
        $scope.modal.hide();
    };

    // Open the Concierge_Wrinkles modal
    $scope.Concierge_Wrinkles = function () {
        $scope.modal.show();
    };
    
    $scope.add = function () {
        var alarmTime = new Date();
        alarmTime.setMinutes(alartTime.getMinutes() + 1);

        $cordovaLocalNotification.add({
            id: "12345",
            data: alarmTime,
            message: "this is a message",
            title: "this is a title"
        }).then(function () {
            console.log("The notification was set");
        });
    }


    //temporary place for now
    console.log('Start writing code here');
    var timeStarted = false;
    $scope.timerRunning = false;

    $scope.startStopTimer = function () {
        if (!timeStarted) {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            timeStarted = true
        } else if ((timeStarted) && (!$scope.timerRunning)) {
            $scope.$broadcast('timer-resume');
            $scope.timerRunning = true;
        } else {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        }
    };


    // Perform the login action when the user submits the login form
    /*
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);
  
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
    */
})




.controller('AppCtrl2', function ($scope, $ionicModal, $timeout) {


    // Create the Concierge_Acne_Mini modal that we will use later
    $ionicModal.fromTemplateUrl('templates/concierge_acne.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the Concierge_Acne_Mini modal to close it
    $scope.closeConcierge_Acne_Mini = function () {
        $scope.modal.hide();
    };

    // Open the Concierge_Acne_Mini modal
    $scope.Concierge_Acne_Mini = function () {
        $scope.modal.show();
    };

})



.controller('AppCtrl3', function ($scope, $ionicModal, $timeout) {


    // Create the Concierge_Acne_Mini modal that we will use later
    $ionicModal.fromTemplateUrl('templates/concierge_pain.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the Concierge_Acne_Mini modal to close it
    $scope.closeConcierge_Pain = function () {
        $scope.modal.hide();
    };

    // Open the Concierge_Acne_Mini modal
    $scope.Concierge_Pain = function () {
        $scope.modal.show();
    };

})



/*
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
*/
