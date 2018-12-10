app.controller('userDashboardCtrl', ['$scope', '$injector', function (s, i) {
    const h = i.get('$http'), t = i.get('$timeout'), w = i.get('$window'), st = i.get('$state');

    s.alert = false;
    s.noRecords = false;
    s.alertMessage = "";

    s.closeAlert = function () {
        t(function () {
            s.alert = false;
        }, 3500);
    }

    s.getAllUsers = function () {
        h.get('/api/getalluser')
            .then(function (response) {
                s.totalUsers = response.data.message;
                if (s.totalUsers.length === 0) {
                    s.noRecords = true;
                }
                console.log("getalluser response", s.totalUsers);
            }, function (error) {
                s.totalUsersError = error.data;
                console.log("getalluser error", s.totalUsersError);

            })
    }
    s.getAllUsers();

    s.addUser = function () {
        var obj = {};
        obj.name = s.name;
        obj.position = s.position;
        obj.office = s.office;
        console.log("final object before submit-", obj);
        h.post('/api/adduser', obj)
            .then(function (response) {
                s.addUserResponse = response.data;
                console.log("addUser response", s.addUserResponse);
                if (s.addUserResponse.result === true) {
                    s.alert = true;
                    s.alertMessage = "User added successfully"
                    s.closeAlert();
                }
                s.name = ""; s.position = ""; s.office = "";
                s.getAllUsers();
            }, function (error) {
                console.log("addUser response", error.data);
            });

    }

    s.openUpdate = function (name) {
        s.updateName = name;
    }

    s.updateUser = function () {
        var obj = {};
        obj.name = s.updateName;
        obj.position = s.updatePosition;
        obj.office = s.updateOffice;
        console.log("before update submit:", obj);
        h.put('/api/updateuser', obj)
            .then(function (response) {
                s.updateResponse = response.data;
                console.log("updateResponse response", s.addUserResponse);
                s.getAllUsers();
                s.alertMessage = "user updated successfully"
                s.alert = true;
                s.closeAlert();
            }, function (error) {
                console.log("updateUser response", error.data);
            })
    }

    s.deleteUser = function (name) {
        console.log("before deleteUser:", name);
        h.delete('/api/deleteuser/' + name)
            .then(function (response) {
                s.deleteRes = response.data;
                console.log("deleteUser response:", s.deleteRes)
                s.getAllUsers();
                s.alertMessage = "A user is deleted successfully"
                s.alert = true;
                s.closeAlert();
            }, function (error) {
                console.log("deleteUser error:", error.data)
            })
    }

}]);