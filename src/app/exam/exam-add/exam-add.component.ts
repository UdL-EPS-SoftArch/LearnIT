
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {NgForm} from '@angular/forms';

import {User} from '../../login-basic/user';
import {Exam} from '../exam';
import {ExamService} from '../exam.service';
import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';



@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html'
})

export class NewExamComponent implements OnInit {

  public exam: Exam;
  public name: string = '';

  public exams_questions: Question[] = [];
  //public questions: any;

  public number_of_questions = 1;

  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    private router: Router,
    private examService: ExamService,
    private questionService: QuestionService) {

      console.log("new exam constructor");
  }

  ngOnInit(): void {
    console.log("new exam init");

    this.exam = new Exam();

    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        console.log(questions);
        console.log(typeof(questions));

        this.totalRecipes = this.questionService.totalElement();

        this.exams_questions = questions;
        console.log(this.exams_questions);
        console.log(typeof(this.exams_questions));
      });
  }


  onSubmit(): void {
    console.log("new exam submit");

    this.exam.nbOfQuestions = 1;

    console.log(this.exam);

    this.examService.create(this.exam).subscribe(
      (exam: Exam) => this.router.navigate(['exams']));

  }
}




//
