import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html'
})
export class StudentDeleteComponent implements OnInit {
  public user: Student = new Student();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.studentService.get(this.id).subscribe(
      student => this.user = student);
  }

  delete() {
    this.studentService.delete(this.user).subscribe(
      () => {
        this.authenticationService.logout();
        this.router.navigate(['']);
      });
  }
}
