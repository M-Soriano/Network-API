const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validate the emmal reference website https://medium.com/@hamdi.fersi/javascript-html-form-email-validation-2583be38c6e6
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

},
{
    toJSON: {
       virtuals: true,
       getters: true      
    },
    // prevents virtuals from duplicating of _id as id
    id: false
}
);

//get total count of friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})
// create User schema from User model
const User = model('User', UserSchema);

//Export User module
module.exports = User;