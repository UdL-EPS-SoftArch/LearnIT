import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, Input} from '@angular/core';

import {Level} from '../level';
import {LevelService} from '../level.service';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Component(
  {
    selector: 'app-level-detail',
    templateUrl: './level-detail.component.html',
    styleUrls: ['./level-detail.component.css']
  }
)

export class LevelDetailComponent implements OnInit {

  @Input()
  level: Level;
  @Input()
  routerLink: string | any[];
  topics: Topic[] = [];
  selectedTopic: Topic;
  selectedId: number;
  public totalRecipes = 0;
  constructor(private route: ActivatedRoute, private router: Router, private levelService: LevelService,
              private topicService: TopicService, private authenticationService: AuthenticationBasicService){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.levelService.get(id).subscribe(
      level => {
        this.level = level;
        this.topics = this.level.topics;
      });
    this.topicService.findByLevel('levels/' + id).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        this.totalRecipes = this.topicService.totalElement();
        console.log(this.topics)
      });
  }

  onSelect(topic) {
    this.selectedId = topic.topicId;
    this.selectedTopic = topic;
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
