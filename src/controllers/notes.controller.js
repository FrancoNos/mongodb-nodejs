const notesCtrl = {};
const Note = require ("../models/Note");

notesCtrl.renderNoteForm = (req, res) =>{
    res.render("notes/newNote");
};

notesCtrl.createNewNote = async (req, res) =>{
    const {title, description} = req.body;
    const newNote = new Note ({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Nota añadida exitosamente");

    res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();
        res.render("notes/allnotes", { notes });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

notesCtrl.renderEditForm = async (req, res) =>{
    const note = await Note.findById(req.params.id).lean();;
    if(note.user != req.user.id){
        req.flash("error_msg", "No estás autorizado para editar notas de otro usuario.");
        return res.redirect("/notes");
    }
    console.log(note);
    res.render("notes/edit-notes", { note });
};

notesCtrl.updateNote = async (req, res) =>{
    const { title, description} = req.body;
   await Note.findByIdAndUpdate(req.params.id, {title, description});
   req.flash("success_msg", "Nota actualizada exitosamente");
    res.redirect("/notes");
};

notesCtrl.deleteNote = async (req, res) =>{
   await Note.findByIdAndDelete(req.params.id);
   
   req.flash("success_msg", "Nota borrada exitosamente");

   res.redirect("/notes");
};

module.exports = notesCtrl;
