const notesCtrl = {};
const { redirect } = require("next/dist/server/api-utils");
const Note = require ("../models/Note");

notesCtrl.renderNoteForm = (req, res) =>{
    res.render("notes/newNote");
};

notesCtrl.createNewNote = async (req, res) =>{
    const {title, description} = req.body;
    const newNote = new Note ({title, description});
    await newNote.save();


    res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
    try {
        const notes = await Note.find().lean();  // Utiliza .lean() aquí
        res.render("notes/allnotes", { notes });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};



notesCtrl.renderEditForm = (req, res) =>{
    res.send("render edit form");
};

notesCtrl.updateNote = (req, res) =>{
    res.send("update note");
};

notesCtrl.deleteNote = async (req, res) =>{
   await Note.findByIdAndDelete(req.params.id);

   res.redirect("/notes");
};

module.exports = notesCtrl;
