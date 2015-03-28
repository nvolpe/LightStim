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

    $scope.timerRunning = false;
    //$rootScope.draggable = false;

    //Initiate Range Slider
    var isStart = false;
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

            $('.rangeslider__fill').addClass('progress-bar');
            $('.rangeslider__handle').addClass('wrinkle-slider-handle');
            $('.progress-bar').css("width", 0 + "%").attr("aria-valuenow", 0);
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
    //-------------------------------
    //End Slider Init


    
    /*
    * Start Progress Bar
    */
    function startProgressBar(timeAmount) {

        var timer = 0;
        var maxTime = 360;
        var minTime = 120;
        //var timeDifference = maxTime - minTime;
        //timeAmount = 300 / timeDifference;
        //whats the correct math v!
        //percentMax = 25;

        var endTime = 180;
        var perecentMax = (endTime - minTime) / (maxTime - minTime) * 100;

        var currentTime,
            progressPercent;

        console.log('perecentMax', perecentMax);
        

        function timerRun() {

            currentTime = timer / 10;
            progressPercent = (currentTime / endTime) * perecentMax;

            console.log('progressPercent', progressPercent);

            $('.progress-bar').css("width", progressPercent + "%").attr("aria-valuenow", progressPercent);

            if (currentTime >= endTime) {
                //$('.progress-bar').css("width", "100%");
                //$('.progress-bar').css("width", percentMax + "%");
                return;
            }
            timer++;
            setTimeout(function () { timerRun() }, 100);
        }

        timerRun();
    }


    /*
    * Stop Progress Bar
    */
    function stopProgressBar() {


    }










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

            //start updating the progress bar
            startProgressBar(timeAmount);


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