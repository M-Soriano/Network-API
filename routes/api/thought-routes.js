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
.route('./:Id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:userId POST
router
.route('/:userId')
.post(createThought);


// POST  /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// DELETE  /api/thoughts/:thoughts/:thoughtId/reactions

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
