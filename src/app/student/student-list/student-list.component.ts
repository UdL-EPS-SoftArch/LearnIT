import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  public students: Student[] = [];
  public pageSize = 5;
  public page = 1;
  public totalStudents = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];

  constructor(
    public router: Router,
    private studentService: StudentService) {
  }

  ngOnInit() {
    this.studentService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (students: Student[]) => {
        this.students = students;
        this.totalStudents = this.studentService.totalElement();
      });
  }

  changePage() {
    this.studentService.page(this.page - 1).subscribe(
      (students: Student[]) => this.students = students);
  }
}
