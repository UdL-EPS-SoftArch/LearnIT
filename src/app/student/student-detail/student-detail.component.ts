import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {
  public student: Student = new Student();

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.get(id).subscribe(
      student => {
        this.student = student;
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
