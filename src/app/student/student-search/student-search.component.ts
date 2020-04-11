import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../login-basic/user';
import {StudentService} from '../student.service';
import {Student} from '../student';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
})
export class StudentSearchComponent {
  @Input() users: User[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private studentService: StudentService) {
  }

  performSearch(text: string): void {
    this.studentService.findByUsernameContaining(text).subscribe((students: Student[]) =>
      this.emitResults.emit(students.sort((a, b) => a.id.localeCompare(b.id))));
  }
}
