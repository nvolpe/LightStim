angular.module('starter.controllers', ['timer'])

.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopup, $timeout, $cordovaLocalNotification) {

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


    $scope.draggable = false;

    //$rootScope.$watch('draggable', function (newValue, oldValue) {
    //    $scope.draggable = $rootScope.draggable;
    //});


})


//==============================
// Wrinkle Controller
//==============================
.controller('wrinklesCtrl', function ($scope, $rootScope, $ionicModal, $timeout, timerFactory) {

    // Create the Concierge_Acne_Mini modal that we will use later
    $ionicModal.fromTemplateUrl('templates/concierge_wrinkles.html', {
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


    $scope.startStopTimer = function () {
        console.log('wrinkle controller');
    };

    //Nick V's Code
    //--------------------------------------------

 

    /////////

    $scope.timerRunning = false;
    //$rootScope.draggable = false;

    console.log('draggable', $rootScope.draggable);

    var isStart = false;

    //range slider testing
    $('input[type="range"]').rangeslider({

        // Feature detection the default is `true`.
        // Set this to `false` if you want to use
        // the polyfill also in Browsers which support
        // the native <input type="range"> element.
        polyfill: false,

        // Default CSS classes
        rangeClass: 'rangeslider',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',

        // Callback function
        onInit: function () {
            isStart = false;

            var timer = 0;
            $('.rangeslider__fill').addClass('progress-bar');
            $('.rangeslider__handle').addClass('wrinkle-slider-handle');
            $('.rangeslider__fill')[0].style.width = '0px';

            function timerRun() {
                $('.progress-bar').css("width", timer + "%").attr("aria-valuenow", timer);

                if (timer >= 100) {
                    $('.progress-bar').css("width", "100%");
                    return;
                }
                timer++;
                setTimeout(function () { timerRun() }, 200);
            }

            //timerRun();
        },

        // Callback function
        onSlide: function (position, value) {

            if (isStart) {
                $rootScope.draggable = false;
                console.log('why is slide happening');
                console.dir(position);
                console.dir(value);
            }
            isStart = true;
        },

        // Callback function
        onSlideEnd: function (position, value) {
            $rootScope.draggable = true;
            //$('input[type="range"]').val(10).change();
            console.dir($scope.timerRunning);
        }
    });

    var timeStarted = false;
    $scope.timerRunning = false;

    /*
        TODO:
        When the User clicks START TIME, set a local notification for that exact time
    */

    var timeStarted = false;
    $scope.timerRunning = false;

    var timeAmount = 2;

    var id = Math.floor(Math.random() * (10000));
    console.log('id', id);

    $scope.startStopTimer = function () {
        if (!timeStarted) {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            timeStarted = true;

            //set local notification
            timerFactory.setNotification(id, timeAmount); //TODO pass in wrinkles
        } else {
            $scope.$broadcast('timer-reset');
            $scope.timerRunning = false;
            timeStarted = false;

            //cancels local notification
            timerFactory.cancelNotification(id);
        }
    };

})


.controller('acneMiniCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, timerFactory) {

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

    //Nick V's Code
    //--------------------------------------------

    var timeStarted = false;
    $scope.timerRunning = false;

    /*
        TODO:
        When the User clicks START TIME, set a local notification for that exact time
    */

    var timeStarted = false;
    $scope.timerRunning = false;

    var timeAmount = 2;

    var id = Math.floor(Math.random() * (10000));
    console.log('id', id);

    $scope.startStopTimer = function () {
        if (!timeStarted) {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            timeStarted = true;

            //set local notification
            timerFactory.setNotification(id, timeAmount); //TODO pass in acne
        } else {
            $scope.$broadcast('timer-reset');
            $scope.timerRunning = false;
            timeStarted = false;

            //cancels local notification
            timerFactory.cancelNotification(id);
        }
    };
})

.controller('AppCtrl3', function ($scope, $ionicModal, $ionicPopup, $timeout, $cordovaLocalNotification) {

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




//.directive('preventDrag', function ($ionicGesture, $ionicSlideBoxDelegate) {
//    return {
//        restrict: 'A',
//        link    : function (scope, elem) {
//            var reportEvent = function (e) {
//                if (e.target.tagName.toLowerCase() === 'input') {
//                    $ionicSlideBoxDelegate.enableSlide(false);
//                } else {
//                    $ionicSlideBoxDelegate.enableSlide(true);
//                }
//            };
//            $ionicGesture.on('touch', reportEvent, elem);
//        }
//    };
//});