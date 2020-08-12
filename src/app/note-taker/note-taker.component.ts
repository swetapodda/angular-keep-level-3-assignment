import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  errMessage: string;
  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(private notesService: NotesService) {

  }
  takeNote() {
    if (this.note.text && this.note.title) {

      this.notesService.addNote(this.note).subscribe(
        data => {
          if (data) {
            this.notes.push(this.note);
          } else {
            this.errMessage = 'We are unable to add the selected note.';
          }
        },
        error => {
          this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
        });
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
