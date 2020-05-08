
import { Component, OnInit } from '@angular/core';
import {Theory} from '../theory';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';
import {TheoryService} from '../theory.service';

@Component({
  selector: 'app-theory-list',
  templateUrl: './theory-list.component.html'
})

export class TheoryListComponent implements OnInit {
  public theories: Theory[] = [];
  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private theoryService: TheoryService) {
  }

  ngOnInit() {

    this.theoryService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (theories: Theory[]) => {
        this.theories = theories;
        this.totalRecipes = this.theoryService.totalElement();
        console.log(this.theories)
      });
  }

  changePage() {
    this.theoryService.page(this.page - 1).subscribe(
      (theories: Theory[]) => this.theories = theories);
  }
}
