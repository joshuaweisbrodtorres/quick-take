const router = require('express').Router();
let notesArray = require('../../db/db.json');
const uuid = require('uuid')
const path = require('path');
const { createNewNote, deleteNote } = require('../../lib/notes');

// Gets the database for this server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'))
});

// Adds notes to the database for this server
router.post('/', (req, res) => {
    req.body.id = uuid.v4()
    const note = createNewNote(req.body)
    res.json(note)
});

// Gets a specific note by id
router.get('/:id', (req, res) => {
    // if it is a found then show that object
    notesArray.forEach(note => {
        console.log(`note id: ${note.id}, req.params.id: ${req.params.id}`)
        if(note.id === req.params.id) {
            console.log(note.id)
            res.json(notesArray.filter(note => note.id === req.params.id))
        } else {
            res.status(400).json({ msg: `No note found with an id of ${req.params.id}`})
        }
    })
})

// Deletes a specific note by id
router.delete('/:id', (req, res) => {
    // check all the items in the array to see if the id of the deleted item matches one of the items
    const toBeDeleted = notesArray.some(note => note.id === req.params.id);
    // if matching lets the user know in the console what is being deleted and 
    if(toBeDeleted) {
        res.json(deleteNote(req.params.id));
        
    } else {
        res.status(400).json({ msg: `Cannot delete this note`})
    }
})

module.exports = router;