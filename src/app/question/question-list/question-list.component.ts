import { Component, OnInit } from '@angular/core';
import {Question} from '../question';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent implements OnInit {
  public questions: Question[] = [];
  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private questionService: QuestionService) {
  }

  ngOnInit() {

    this.questionService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.totalRecipes = this.questionService.totalElement();
        console.log(this.questions)
      });
  }

  changePage() {
    this.questionService.page(this.page - 1).subscribe(
      (questions: Question[]) => this.questions = questions);
  }
}
