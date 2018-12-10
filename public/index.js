var app=angular.module('statusReport',['ui.router','ngRoute']);

app.config(function($stateProvider,$urlRouterProvider,$routeProvider,$locationProvider){
   var loginState={
       name:'login',
       url:'/login',
       templateUrl:'./views/Login.html',
       controller:'loginCtrl'
   };
    var registerState={
        name:'register',
        url:'/register',
        templateUrl:'./views/register.html',
        controller:'registerCtrl'
    };
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $locationProvider.hashPrefix('!');

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

app.controller('indexCtrl',['$scope','$injector',function(s,i){
    const h=i.get('$http'),t=i.get('$timeout'),w=i.get('$window'),st = i.get('$state'),r = i.get('$rootScope');
  /*  s.activateState = function(state){
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
    }*/
    s.logout=function(){
       // st.reload();
      //  st.go('about');
       
    w.location.replace('./index.html');
    }
 }]);