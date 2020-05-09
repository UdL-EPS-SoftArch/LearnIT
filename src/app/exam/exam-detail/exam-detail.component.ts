
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Sort} from '@lagoshny/ngx-hal-client';

import {User} from '../../login-basic/user';
import { Exam } from '../exam';
import { ExamService } from '../exam.service';
import { Question } from '../../question/question';
import { QuestionService } from '../../question/question.service';


@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html'
})
export class ExamDetailComponent implements OnInit {

  public exam: Exam = new Exam();
  public questions: Question[] = [];

  GenuineUrl: SafeResourceUrl;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    public route: ActivatedRoute,
    public examService: ExamService,
    private questionService: QuestionService,
    public authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    console.log("exam detail init");

    const id = this.route.snapshot.paramMap.get('id');

    this.examService.get(id).subscribe(
      exam => {
        this.exam = exam;
        console.log(this.exam);
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

}




//
