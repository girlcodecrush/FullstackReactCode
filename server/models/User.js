//create a mongooes model class in this file
const mongoose = require ('mongoose');
//pull one property off of the mongoose object
//const Schema = mongoose.Schema;
// line 7 says: the mongoose obj has a prop called Schema, take the prop, assign it to
// a new variable called Schema, {} indicates that Schema is an assigned variable
const {Schema} = mongoose;

//create a new model called 'users' (Schema is equivalent to model here)
const userSchema = new Schema ({
  googleId: String,
});
//create a model class, tell mongooes to be aware that the new collection is need to be created
//1st arg - the name of the collection; 2nd arg - userSchema
//here, load the new model(schema) into mongoose
mongoose.model ('users', userSchema);

// make sure that to get User.js to be executed, this file needs to be required somewhere else
// go over to index.js and require this file from there
