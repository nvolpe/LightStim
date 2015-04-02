lightStim.controller('acneMiniCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $cordovaMedia, timerFactory, $ionicSideMenuDelegate) {

    // Create the Concierge_Acne_Mini modal that we will use later
    $ionicModal.fromTemplateUrl('templates/concierge_wrinkles.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the Concierge_Acne_Mini modal to close it
    $scope.closeConcierge = function () {
        $scope.modal.hide();
    };

    // Open the modal
    $scope.showConcierge = function () {
        $scope.modal.show();
    };

    //Nick V's Code
    //--------------------------------------------

    $scope.timeAmount = 300; // default the timer to 3 minutes
    $scope.timerRunning = false;
    $scope.tester = 'test';
    $scope.alarmmMinutes = 5;

    var id;
    function formatSeconds(isReset) {

        //if (isReset) {
        //    $scope.timeAmount = 180;
        //} 

        var minutes = Math.round(($scope.timeAmount - 30) / 60);
        var remainingSeconds = $scope.timeAmount % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }

        $scope.minutes = minutes;
        $scope.seconds = remainingSeconds;
        $scope.$apply(); //throws an error that $scope.$digest() is already occuring
    }


    function findSliderInterval(val) {

        //find the breaks

        //seems hacky to hardcode these value, need the maths here to make this sexier
        if (val <= 450) {
            setSlider(300, 2, 370, 1);
        } else if (val > 450 && val <= 750) {
            setSlider(600, 3, 600, 2);
        } else if (val > 750 && val <= 900) {
            setSlider(900, 4, 830, 3);
        }
    }

    function setSlider(seconds, minutes, value, position) {

        //if (adjust) {
        //    adjustedSeconds = seconds + 18;
        //} else {
        //    adjustedSeconds = seconds;
        //}

        $('input[type="range"]').val(value).change();
        $('.progress-bar-acne').css("width", 0 + "%").attr("aria-valuenow", 0);
        $('.col').removeClass('selectedTime-acne');
        $('#time-row :nth-child(' + position + ')').addClass('selectedTime-acne');

        $scope.timeAmount = seconds;
        formatSeconds();
        $scope.alarmmMinutes = minutes;
    }

    function resetTimer(time) {

        if (time) {
            $scope.timeAmount = time;
        }

        if ($scope.isStarted) {
            formatSeconds(true);
            $scope.timerRunning = false;
            stopProgressBar();
            $timeout.cancel(countdownTimer);
            //timerFactory.cancelNotification(id);
            console.log('cancellllllllled');
        }
    }

    function createId() {
        id = Math.floor(Math.random() * (10000));
    }


    formatSeconds();
    createId();
    $ionicSideMenuDelegate.canDragContent(true);

    /*
        BUG: Jquery is breaking the diretives! This shouldnt be written in JQuery anyways!!!
    */

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

            $('.rangeslider__fill').addClass('progress-bar-acne');
            $('.rangeslider__handle').addClass('acne-slider-handle');
            $('.progress-bar-acne').css("width", 0 + "%").attr("aria-valuenow", 0);
        },

        // Callback function
        onSlide: function (position, value) {
            if (isStart) {
                $ionicSideMenuDelegate.canDragContent(false);
            }
            isStart = true;
        },

        // Callback function
        onSlideEnd: function (position, value) {

            console.log('position', position)
            console.log('value', value)

            findSliderInterval(value);
            resetTimer();
            $scope.isStarted = false;
            formatSeconds(true);

            //wow, moving this to the end of the method works, at the start of the method it doesnt work!
            $ionicSideMenuDelegate.canDragContent(true);
        }
    });
    //-------------------------------
    //End Slider Init

    /*
    * Start Progress Bar
    */

    //define variable for css timer function so we can cancel it later
    var progressTimer;
    function startProgressBar() {

        //TODO, make these dynamic
        var timer = 0;
        var maxTime = 900;
        var minTime = 300;

        var endTime = $scope.timeAmount;
        var perecentMax = (endTime - minTime) / (maxTime - minTime) * 100;

        var currentTime,
            progressPercent;

        console.log('perecentMax', perecentMax);

        function timerRun() {

            currentTime = timer / 10;
            progressPercent = (currentTime / endTime) * perecentMax;
            console.log('progressPercent', progressPercent);
            $('.progress-bar-acne').css("width", progressPercent + "%").attr("aria-valuenow", progressPercent);

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

        if (progressTimer) {
            //clear the css timer from updating
            clearTimeout(progressTimer);

            //reset the progress bar back to 0 percent
            $('.progress-bar-acne').css("width", "0%").attr("aria-valuenow", 0);
        }
    }

    var timeStarted = false;

    /*
        TODO:
        When the User clicks START TIME, set a local notification for that exact time
    */
    var minutes;
    var countdownTimer;

    var previousSeconds;
    $scope.isStarted = false;

    function startCountdown() {

        if (!$scope.isStarted) {
            seconds = $scope.timeAmount;
            $scope.isStarted = true;
        }

        //var seconds = $scope.timeAmount;
        if ($scope.isStarted == true) {

            minutes = Math.round((seconds - 30) / 60);
            var remainingSeconds = seconds % 60;
            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }


            console.debug('minutes', minutes);
            console.debug('remainingSeconds', remainingSeconds);

            $scope.minutes = minutes;
            $scope.seconds = remainingSeconds;

            if (seconds == 0) {
                $timeout.cancel(countdownTimer);
                $scope.isStarted = false;
                return;
            } else {
                seconds--;
            }


            countdownTimer = $timeout(startCountdown, 1000);
        }
    }

    function mediaStatusCallback() {
        console.log('Media play callback');
    }

    /*
        ngclick events
    */
    $scope.startStopTimer = function () {

        if (!$scope.timerRunning) {

            countdownTimer = $timeout(startCountdown, 1000);

            var media = new Media('http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3', null, null, mediaStatusCallback);
            $cordovaMedia.play(media);

            // Let's bind to the resolve/reject handlers of
            // the timer promise so that we can make sure our
            // cancel approach is actually working.
            countdownTimer.then(
                function () {
                    console.log("Timer resolved!", Date.now());
                },
                function () {
                    console.log("Timer rejected!", Date.now());

                }
            );

            $scope.timerRunning = true;

            //start updating the progress bar
            startProgressBar();

            //set local notification
            timerFactory.setNotification(id, $scope.alarmmMinutes); //TODO pass in wrinkles

        } else {

            resetTimer();
            $scope.isStarted = false;
            formatSeconds(true);
            //cancels local notification
            timerFactory.cancelNotification(id);
        }
    };
})


