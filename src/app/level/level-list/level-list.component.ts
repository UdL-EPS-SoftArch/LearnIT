import {Component, OnInit} from '@angular/core';
import {Level} from '../level';
import {LevelService} from "../level.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html'
})

export class LevelListComponent implements OnInit {

  public levels: Level[] = [];
  public totalRecipes = 0;

  constructor(public router: Router, private levelService: LevelService) {
  }

  ngOnInit() {
    this.levelService.getAll().subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.levels)
      });
  }


}


