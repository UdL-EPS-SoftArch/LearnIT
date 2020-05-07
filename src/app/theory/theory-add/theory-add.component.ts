import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TheoryService} from '../theory.service';
import {Theory} from '../theory';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';



@Component({
  selector: 'app-theory-add',
  templateUrl: './theory-add.component.html'
})

export class NewTheoryComponent implements OnInit {

  public theory: Theory;
  public levels: Level[] = [];
  public topics: Topic[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(private router: Router,
              private NewTheoryService: TheoryService,
              private levelService: LevelService,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.theory = new Theory();
    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.levels)
      });
    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.topics)
      });
  }


  onSubmit(): void {
    console.log(this.theory);
    this.NewTheoryService.create(this.theory).subscribe(
      (theory: Theory) => this.router.navigate(['theories']));
  }
}
