$(function() {

  var model = {
    init: function() {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify([]);
      }
    }, //called at the start
    add: function(obj) {
      var data = JSON.parse(localStorage.notes);
      data.push(obj);
      localStorage.notes = JSON.stringify(data);
    }, //this function add the new string to the list
    getAllNotes: function() {
      return JSON.parse(localStorage.notes);
    } //visualizes all the string
  };


  var octopus = {
    addNewNote: function(noteStr) {
      model.add({
        content: noteStr,
        date: Date.now()
      });
      view.render();
    },

    getNotes: function() {
      return model.getAllNotes().reverse();
      //gives the new notes in reverse cronological order
    },

    init: function() {
      model.init();
      view.init();
    } //called at the start
  };


  var view = {
    init: function() {
      this.noteList = $('#notes');
      var newNoteForm = $('#new-note-form');
      var newNoteContent = $('#new-note-content');
      // var dateStr = Date.now();
      newNoteForm.submit(function(e) {
        octopus.addNewNote(newNoteContent.val());
        newNoteContent.val(''); //resets the textfield after submitting a string
        e.preventDefault();
      });
      view.render();
    }, //called at the start
    render: function() {
      var htmlStr = '';
      octopus.getNotes().forEach(function(note) {
        var dateStr = "<span class='note-date'>" + new Date(note.date).toDateString() + "</span>";
        htmlStr += `<li class="note">${dateStr}
          ${note.content} </li>`;
      });
      this.noteList.html(htmlStr);
    }
  };

  octopus.init();
});