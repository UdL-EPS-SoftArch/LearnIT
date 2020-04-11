import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {Router} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register-form.html',
})
export class StudentRegisterComponent implements OnInit {
  public user: Student;

  constructor(private router: Router,
              private studentService: StudentService,
              private authenticationBasicService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.user = new Student();
  }

  onSubmit(): void {
    this.studentService.create(this.user).subscribe(
      (student: Student) => {
        this.authenticationBasicService.login(student.id, student.password).subscribe(
          (user: User) => this.router.navigate([user.uri]));
      });
  }
}
