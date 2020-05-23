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
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html'
})

export class ExamEditComponent implements OnInit {

  public exam: Exam;
  public name: string = '';

  public examsQuestions: Question[] = [];
   // public questions: any;

  public numberOfQuestions = 1;

  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamService,
    private questionService: QuestionService,
    private authenticationService: AuthenticationBasicService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.examService.get(id).subscribe(
      (exam: Exam) => {
        this.exam = exam});

    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        console.log(questions);
        console.log(typeof(questions));

        this.totalRecipes = this.questionService.totalElement();

        this.examsQuestions = questions;
        console.log(this.examsQuestions);
        console.log(typeof(this.examsQuestions));
      });

  }


  onSubmit(): void {
    this.examService.patch(this.exam).subscribe(
      (exam: Exam) => { this.router.navigate(['/exams', exam._links.self.href.split('/')[4]]);
         }
      );
     }
  }
