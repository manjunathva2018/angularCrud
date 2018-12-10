var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');


var app=express();
var mongoose=require('mongoose');
var Auth=require('./models/Auth');
//var Status=require('./models/Status');

mongoose.connect('mongodb://localhost/UserDetails');
//mongoose connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected!')
});


app.use(express.static('public'));


//use body parser
app.use(bodyParser.json());

//use the api

app.get('/api/getalluser',function(req,res){
    Auth.find({},function(err,user){
         if(err)throw err;
         var object={};
         object.message=[];
         if(user!=undefined && user!=null){
         for(var i=0;i<user.length;i++){
            var obj={};
            obj.Name=user[i].Name;
            obj.Position=user[i].Position;
            obj.Office=user[i].Office;
            object.message.push(obj);
         }
        }
       res.send(JSON.stringify(object));
     });
   })

app.get('/api/getuser/:name',function(req,res){
    var name=req.params.name;
    Auth.find({"Name":name},function(err,user){
         if(err)throw err;
         var object={};
         object.message=[];
         if(user!=undefined && user!=null){
         for(var i=0;i<user.length;i++){
            var obj={};
            obj.Name=user[i].Name;
            obj.Position=user[i].Position;
            obj.Office=user[i].Office;
            object.message.push(obj);
         }
        }
       res.send(JSON.stringify(object));
     });
   })

   app.post('/api/adduser',function(req,res){
       var name=req.body.name;
       var position=req.body.position;
       var office=req.body.office;
       var object={};
       object.result=false;
      if(name!=undefined && position!=undefined){
          // a document instance
          var addUser=new Auth({"Name":name,"Position":position,"Office":office});
           // save model to database
           addUser.save(function(err,user){
            if(err) throw err;
            console.log("Saved user into DB",user);
        });
        object.result=true;
      }
      res.send(JSON.stringify(object));
   })

   app.put('/api/updateuser',function(req,res){
    var name=req.body.name;
    var position=req.body.position;
    var office=req.body.office;
    var object={};
    object.result=false;
   if(name!=undefined){
    Auth.findOneAndUpdate({"Name":name},{"Position":position,"Office":office},function(err,user){
        if(err)throw err;
        object.result=true;
     });
     object.result=true;
   }
   res.send(JSON.stringify(object));
})

app.delete('/api/deleteuser/:name',function(req,res){
    var name=req.params.name;
    console.log("name",name)
    var object={};
    object.result=false;
   if(name!=undefined){
    Auth.findOneAndRemove({"Name":name},function(err,user){
        if(err)throw err;
        object.result=true;
     });
     object.result=true;
   }
   res.send(JSON.stringify(object));
})

var server=app.listen(4000,function(){
    console.log('Server started at port 4000')
})

module.exports = app;

















