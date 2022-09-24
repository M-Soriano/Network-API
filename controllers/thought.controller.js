const {Thought,User} = require('../models');

const thoughtController =  {
    //get thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
            
        })
        //.populate({
         //   path: 'thoughts',
         //   select: '-__v'
        //})
        .select('-__v')
        .sort({_id: -1})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        }); 
    },

    // get single though by it's Id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtid})
        .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('__v')
          .then(dbThoughtData => {
            //if nothing found
            if (!dbThoughtData){
                res.status(404).json({ message: 'No though where found with this ID'});
                return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

     // Creating thought
     createThought({body}, res) {
        Thought.create(body)
        .then(({_id})=> {
            return User.findOneAndUpdate({
                _id: body.userId },
            {$push: {thoughts: _id }},
            {new: true}            
            );
        })
        .then(dbThoughtData => {
            //if nothing found
            if (!dbThoughtData){
                res.status(404).json({ message: 'No user with this ID'});
                return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));

         },

         updateThought({params, body},res) {
            Thought.findOneAndUpdate({ _id: params.thoughtid }, body, {
                new: true,
              })
              .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No though found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch((err) => res.status(400).json(err));
         },

         //delete thought
         deleteThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                //if nothing found
                if (!dbThoughtData){
                    res.status(404).json({ message: 'No user with this ID'});
                    return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => res.status(400).json(err));
            },

            //add reaction

            addReaction({ params,body }, res) {
                Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    {$push: {
                        reactions: body
                    }},
                    { new: true, runValidators: true}
                    )
                    .then(dbThoughtData => {
                        //if nothing found
                        if (!dbThoughtData){
                            res.status(404).json({ message: 'Not found'});
                            return;
                        }
                        res.json(dbThoughtData);
                      })
                      .catch(err => res.json(err));
             },

             //delete
             deleteReaction({ params }, res) {
                Thought.findOneAndDelete(
                    { _id: params.thoughtId },
                    {
                        $pull: {
                            reactions: {
                                reactionId: params.reactionId
                            }
                        }
                    },
                    {new: true}
                    )
                  .then(dbThoughtData => res.json(dbThoughtData))
                  .catch(err => res.json(err));
             }   
};

module.exports = thoughtController;