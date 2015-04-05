// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function ($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        console.log('$ionicPlatform ready');

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        document.addEventListener("pause", function (event) {
            console.log('run() -> cordovaPauseEvent');
        });

        document.addEventListener("resume", function (event) {

            var alertPopup = $ionicPopup.alert({
                 title: 'Diff in seconds',
                 template: 'Difference in seconds:'
            });
        });

    });

    // $ionicPlatform.on('resume', function() {
    //     // do something update your interval

    //     var alertPopup = $ionicPopup.alert({
    //          title: 'Diff in seconds',
    //          template: 'Difference in seconds:'
    //     });

    //     $log.log('Diff in seconds');
    // }

    // $ionicPlatform.on('pause', function() {
    //     // do something here to store the timestamp
    //     // onPauseTime = $scope.timeAmount;

    //     $log.log('Diff in seconds: ');
    // }
})


.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html"
            }
        }
    })

    .state('app.timer_wrinkles', {
        url: "/timer_wrinkles",
        views: {
            'menuContent': {
                templateUrl: "templates/timer_wrinkles.html",
                controller: 'wrinklesCtrl'
            }
        }
    })

    .state('app.timer_acne_mini', {
        url: "/timer_acne_mini",
        views: {
            'menuContent': {
                templateUrl: "templates/timer_acne_mini.html",
                controller: 'acneMiniCtrl'
            }
        }
    })

    .state('app.timer_pain', {
        url: "/timer_pain",
        views: {
            'menuContent': {
                templateUrl: "templates/timer_pain.html",
                controller: 'AppCtrl3'
            }
        }
    })
    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })
      .state('app.playlists', {
          url: "/playlists",
          views: {
              'menuContent': {
                  templateUrl: "templates/playlists.html",
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/timer_wrinkles');


});
