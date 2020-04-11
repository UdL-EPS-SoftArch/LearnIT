import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../login-basic/user';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
})
export class StudentEditComponent implements OnInit {
  public student: Student = new Student();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.get(id).subscribe(
      (student: Student) => this.student = student);
  }

  onSubmit(): void {
    this.student.password = this.student.passwordReset ? this.student.password : undefined; // Don't edit if not a reset
    this.studentService.patch(this.student).subscribe(
      (student: Student) => {
        if (this.student.passwordReset) {
          this.authenticationService.logout();
          this.authenticationService.login(this.student.id, this.student.password).subscribe(
            (user: User) => this.router.navigate([user.uri]));
        } else {
          this.router.navigate([student.uri]);
        }
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
