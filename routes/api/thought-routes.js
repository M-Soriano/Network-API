const router = require('express').Router();

const {getAllThoughts, 
    getThoughtById, 
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought.controller');

//get  and post routes /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought);

//  /api/thoughts/:id  (GET, PUT, DELETE)
router
.route('./:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);




router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction);

module.exports = router;
