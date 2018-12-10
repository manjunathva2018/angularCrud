var app=angular.module('userModule',['ui.router','ngRoute','ngMaterial','ngMessages']);

app.config(function($stateProvider,$urlRouterProvider,$routeProvider,$locationProvider,$mdThemingProvider){
  
    var dashboardState={
        name:'dashboard',
        url:'/dashboard',
        templateUrl:'./views/user-dashboard.html',
        controller:'userDashboardCtrl'
    };
   
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider.state(dashboardState);
    $locationProvider.hashPrefix('!');


    //material design themes
    $mdThemingProvider.theme('default')
    .primaryPalette('lime')
    .accentPalette('indigo');
});
/*
app.config(function($routeProvider) {
    $routeProvider
    .when("/dashboard", {
        templateUrl : "./views/Dashboard.html",
        controller:'dashboardCtrl'
    })
    .when("/about", {
        templateUrl:'./views/About.html',
        controller:'aboutCtrl'
    })
    .when("/contact", {
        templateUrl:'./views/Contact.html',
        controller:'contactCtrl'
    })
    .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
});*/

app.controller('userCtrl',['$scope','$injector',function(s,i){
    const h=i.get('$http'),t=i.get('$timeout'),w=i.get('$window'),st = i.get('$state'),
    $mdSidenav=i.get('$mdSidenav'),r = i.get('$rootScope');


    s.activateState = function(state){
        if(state=='dashboard'){
            r.dashboardState = true;
            r.aboutState = false;
            r.contactState = false;
            console.log("dashboardState",r.dashboardState);
        }
        else if(state=='about'){
            r.dashboardState = false;
            r.aboutState = true;
            r.contactState = false;
            console.log("aboutState",r.aboutState);
        }
        else if(state=='contact'){
            r.dashboardState = false;
            r.aboutState = false;
            r.contactState = true;
            console.log("contactState",r.contactState);
        }
    }
    s.logout=function(){
       // st.reload();
      //  st.go('about');
       
    w.location.replace('./index.html');
    }

    
    s.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
 }]);