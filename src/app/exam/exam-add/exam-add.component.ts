
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Sort} from '@lagoshny/ngx-hal-client';

import {ExamService} from '../exam.service';
import {Exam} from '../exam';
import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';



@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html'
})

export class NewExamComponent implements OnInit {

  public exam: Exam;
  public name: string = '';
  public questions: Question[] = [];
  public number_of_questions = "1";

  //public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    private router: Router,
    private examService: ExamService,
    private questionService: QuestionService) {

      console.log("new exam constructor");
  }

  ngOnInit(): void {
    console.log("new exam ngoninit");

    this.exam = new Exam();
    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        //this.number_of_questions = this.questionService.totalElement();
        console.log(this.questions);
      });
  }


  onSubmit(): void {
    console.log("new exam submit");

    this.exam.nbOfQuestions = this.number_of_questions;
    console.log(this.exam);



    this.examService.create(this.exam).subscribe(
      (exam: Exam) => this.router.navigate(['exams']));

  }
}




//
