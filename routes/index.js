const router = require('express').Router();

// import modular routers for /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;