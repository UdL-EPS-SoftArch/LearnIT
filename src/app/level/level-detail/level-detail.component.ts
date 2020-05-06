import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, Input} from '@angular/core';
import {LevelService} from '../level.service';
import {Level} from '../level';
import {Topic} from '../../topic/topic';

@Component(
  {
    selector: 'app-level-detail',
    templateUrl: './level-detail.component.html',
    styleUrls: ['./level-detail.component.css']
  }
)

export class LevelDetailComponent implements OnInit {

  @Input() level: Level;
  topics: Topic[] = [];
  public totalRecipes = 0;
  constructor(private route: ActivatedRoute, private router: Router, private levelService: LevelService){}

  ngOnInit() {
    this.levelService.get(this.route.snapshot.paramMap.get('id')).subscribe(
      (level: Level) => {
        this.level = level;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.level);
        this.topics = level.topics;
      });
  }
}
