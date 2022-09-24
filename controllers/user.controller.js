const {User} = require('../models');

const UserController =  {
    //get all
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then((dbUserData) => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        }); 
    },

    // get single user by it's Id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('__v')
          .then(dbUserData => {
            //if nothing found
            if (!dbUserData){
                res.status(404).json({ message: 'No though where found with this ID'});
                return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

     // Creating User
     createUser({body}, res) {
        User.create(body)

        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
     },

//update user
 
    updateUser({params, body},res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
              })
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No user found' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch((err) => res.status(400).json(err));
         },

         //delete user
         deleteUser({ params }, res) {
            User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                //if nothing found
                if (!dbUserData){
                    res.status(404).json({ message: 'No user with this ID'});
                    return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.status(400).json(err));
            },

            //add friend

            addFriend({ params }, res) {
                User.findOneAndUpdate(
                    { _id: params.id },
                    {$push:{
                        friends: params.friendId
                    }},
                    { new: true}
                    )
                    .populate({
                        path: 'friends',
                        select:'__v'
                    })
                    .select('__v')
                    .then(dbUserData => {
                        //if nothing found
                        if (!dbUserData){
                            res.status(404).json({ message: 'Not found'});
                            return;
                        }
                        res.json(dbUserData);
                      })
                      .catch(err => res.json(err));
             },

             //delete friend
             deleteFriend({ params }, res) {
                User.findOneAndDelete(
                    { _id: params.thoughtId },
                    {
                        $pull: {
                            friends: params.friendId
                        }
                    },
                    {new: true}
                    )
                    .populate({
                        path:'friends',
                        select:'__v'
                    })
                    .select(__v)
                    .then(dbUserData => {
                        //if nothing found
                        if (!dbUserData){
                            res.status(404).json({ message: 'Not found'});
                            return;
                        }
                        res.json(dbUserData);
                      })
                      .catch(err => res.status(400).json(err));
             }   
};

module.exports = UserController ;