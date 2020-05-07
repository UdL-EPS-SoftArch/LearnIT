import { Component, OnInit } from '@angular/core';
import {FinalLevelExam} from '../FinalLevelExam';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';
import {FinalLevelExamService} from '../FinalLevelExam.service';

@Component({
  selector: 'app-FinalLevelExam-list',
  templateUrl: './FinalLevelExam-list.component.html'
})

export class FinalLevelExamListComponent implements OnInit {
  public FinalLevelExams: FinalLevelExam[] = [];
  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private FinalLevelExamService: FinalLevelExamService) {
  }

  ngOnInit() {

    this.FinalLevelExamService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (FinalLevelExams: FinalLevelExam[]) => {
        this.FinalLevelExams  = FinalLevelExams;
        this.totalRecipes = this.FinalLevelExamsService.totalElement();
        console.log(this.FinalLevelExams)
      });
  }

  changePage() {
    this.FinalLevelExamService.page(this.page - 1).subscribe(
      (FinalLevelExams: FinalLevelExam[]) => this.FinalLevelExams = FinalLevelExams);
  }
}
