var mongoose=require('mongoose');
//schema
var userSchema=new mongoose.Schema({
   Name:String,
   Position:String,
   Office:String
});
// compile schema to model
module.exports=mongoose.model('user',userSchema,'UserTables');