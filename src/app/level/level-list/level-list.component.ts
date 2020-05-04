import {Component, OnInit} from '@angular/core';
import {Level} from '../level';
import {LevelService} from "../level.service";
import {Router} from "@angular/router";
import {Sort} from "@lagoshny/ngx-hal-client";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html'
})

export class LevelListComponent implements OnInit {

  public levels: Level[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(public router: Router, private levelService: LevelService) {
  }

  ngOnInit() {
    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.levels)
      });

  }
}


