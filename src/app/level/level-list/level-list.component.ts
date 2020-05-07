import {Component, Input, OnInit} from '@angular/core';
import {Level} from '../level';
import {LevelService} from '../level.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})

export class LevelListComponent implements OnInit {

  @Input()
  levels: Level [] = [];
  @Input()
  routerLink: string | any[];
  selectedLevel: Level;
  selectedId: number;
  totalRecipes = 0;
  id: any;

  constructor(private levelService: LevelService) {
  }
  ngOnInit() {
    this.levelService.getAll().subscribe((levels: Level[]) => {
      this.levels = levels;
      this.totalRecipes = this.levelService.totalElement();
      console.log(this.levels);
    })
  }

  onSelect(level) {
    this.selectedId = level.levelId;
    this.selectedLevel = level;
  }
}
