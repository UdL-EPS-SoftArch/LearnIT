
import { Component, OnInit } from '@angular/core';
import { Exam } from '../exam';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';

import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html'
})

export class ExamListComponent implements OnInit {

  public exams: Exam[] = [];
  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    public router: Router,
    private examService: ExamService) {
      console.log("list exam constructor");
  }

  ngOnInit() {
    console.log("list exam ngoninit");

    this.examService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (exams: Exam[]) => {
        this.exams = exams;
        this.totalRecipes = this.examService.totalElement();
        console.log(this.exams)
      });
  }

  changePage() {
    console.log("list exam change page");

    this.examService.page(this.page - 1).subscribe(
      (exams: Exam[]) => this.exams = exams);
  }
}
