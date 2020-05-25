
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {NgForm} from '@angular/forms';

import {User} from '../../login-basic/user';
import {Exam} from '../exam';
import {ExamService} from '../exam.service';
import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';



@Component({
  selector: 'app-exam-delete',
  templateUrl: './exam-delete.component.html'
})

export class ExamDeleteComponent implements OnInit {

  public exam: Exam = new Exam();
  private id: string;

  public examsQuestions: Question[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private authenticationService: AuthenticationBasicService) {

      console.log('new exam constructor');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.examService.get(this.id).subscribe(
      exam => this.exam = exam);
  }

  delete() {
    this.examService.delete(this.exam).subscribe(
      () => {
        this.router.navigate(['exams']);
      });
  }
}




//
