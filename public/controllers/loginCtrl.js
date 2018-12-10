app.controller('loginCtrl',['$scope','$injector',function(s,i){
    const h=i.get('$http'),t=i.get('$timeout'),w=i.get('$window'),st = i.get('$state');

   s.loginSubmit=function(){
    w.location.replace('./user.html');
   }
 }]);