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
  public finalLevelExam: FinalLevelExam[] = [];
  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private finalLevelExamService: FinalLevelExamService) {
  }

  ngOnInit() {

    this.finalLevelExamService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (finalLevelExam: FinalLevelExam[]) => {
        this.finalLevelExam = finalLevelExam;
        this.totalRecipes = this.finalLevelExamService.totalElement();
        console.log(this.finalLevelExam)
      });
  }

  changePage() {
    this.finalLevelExamService.page(this.page - 1).subscribe(
      (finalLevelExam: FinalLevelExam[]) => this.finalLevelExam = finalLevelExam);
  }
}
