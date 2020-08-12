import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note> = [];
  startedNotes: Array<Note> = [];
  completedNotes: Array<Note> = [];
  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      notesResponseList => {
        this.notStartedNotes = [];
        this.startedNotes = [];
        this.completedNotes = [];
        console.log(notesResponseList);
        notesResponseList.forEach(note => {
          if (note.state === 'started') {
            this.startedNotes.push(note);
          } else if (note.state === 'not-started') {
            this.notStartedNotes.push(note);
          } else if (note.state === 'completed') {
            this.completedNotes.push(note);
          }
        });
      },
      error => {

      }
    );
  }
}
