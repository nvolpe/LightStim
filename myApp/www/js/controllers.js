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
    $scope.timeAmount = 180; // default the timer to 3 minutes


    $scope.countdown = 180;

    $scope.time = 180;

    function formatSeconds() {
        var minutes = Math.round(($scope.time - 30) / 60);
        var remainingSeconds = $scope.time % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }

        $scope.minutes = minutes;
        $scope.seconds = remainingSeconds;
    }

    formatSeconds();

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
                //console.log('why is slide happening');
                //console.dir(position);
                //console.dir(value);
            }
            isStart = true;
        },

        // Callback function
        onSlideEnd: function (position, value) {
            $rootScope.draggable = true;
            //$('input[type="range"]').val(10).change();
            console.dir($scope.timerRunning);

            console.debug('position', position);
            console.debug('value', value);

            //$scope.timeAmount = value;
            //$scope.$broadcast('timer-reset');

            //$scope.$broadcast('timer-add-cd-seconds', value);
            //$scope.$broadcast('timer-set-countdown', value);
            //$scope.$broadcast('timer-set-countdown-seconds', value);
            //$scope.$broadcast('timer-reset');


            $scope.countdown = 550;

            $scope.apply();
            //$timeout(function () {
            //    $scope.$broadcast('timer-start');
            //}, 0);


            //$scope.$broadcast('timer-add-cd-seconds', value);

            //$scope.$broadcast('timer-start');
            //$scope.$broadcast('timer-stop');
        }
    });
    //-------------------------------
    //End Slider Init

    /*
    * Start Progress Bar
    */

    //define variable for css timer function so we can cancel it later
    var progressTimer;

    function startProgressBar(timeAmount) {

        //TODO, make these dynamic
        var timer = 0;
        var maxTime = 360;
        var minTime = 120;

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
                return;
            }
            timer++;
            progressTimer = setTimeout(function () { timerRun() }, 100);
        }
        timerRun();
    }


    /*
    * Stop Progress Bar
    */
    function stopProgressBar() {
        //clear the css timer from updating
        clearTimeout(progressTimer);

        //reset the progress bar back to 0 percent
        $('.progress-bar').css("width", "0%").attr("aria-valuenow", 0);
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

    var counter = 180;

    var seconds = 180;
    var minutes;

    var timer;


    function runThatTimer () {

        counter--;

        minutes = Math.round((seconds - 30) / 60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }

        if (seconds == 0) {
            clearInterval(mytimeout);
        } else {
            seconds--;
        }

        console.debug('minutes', minutes);
        console.debug('remainingSeconds', remainingSeconds);

        $scope.minutes = minutes;
        $scope.seconds = remainingSeconds;
    

        timer = $timeout(runThatTimer, 1000);
    };








    $scope.startStopTimer = function () {

        if (!timeStarted) {

            timer = $timeout(runThatTimer, 1000);


            // Let's bind to the resolve/reject handlers of
            // the timer promise so that we can make sure our
            // cancel approach is actually working.
            timer.then(
                function () {

                    console.log("Timer resolved!", Date.now());

                },
                function () {

                    console.log("Timer rejected!", Date.now());

                }
            );

            //var mytimeout = $timeout($scope.onTimeout, 1000);

            timeStarted = true;


            //    //start updating the progress bar
            //    startProgressBar(timeAmount);

            //    //set local notification
            //    timerFactory.setNotification(id, timeAmount); //TODO pass in wrinkles

        } else {

            //clearInterval(mytimeout);

            $timeout.cancel(timer);

            //stopProgressBar(timeAmount);

            //cancels local notification
            //timerFactory.cancelNotification(id);
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