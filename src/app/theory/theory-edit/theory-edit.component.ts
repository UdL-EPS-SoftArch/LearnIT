import { Component, OnInit } from '@angular/core';
import {Theory} from '../theory';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../login-basic/user';
import {TheoryService} from '../theory.service';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';

@Component({
  selector: 'app-theory-edit',
  templateUrl: './theory-edit.component.html',
})
export class TheoryEditComponent implements OnInit {
  public theory: Theory = new Theory();
  public levels: Level[] = [];
  public topics: Topic[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private theoryService: TheoryService,
              private authenticationService: AuthenticationBasicService,
              private levelService: LevelService,
              private topicService: TopicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.theoryService.get(id).subscribe(
      (theory: Theory) => {
        this.theory = theory
        this.theory.getRelation(Level,'level').subscribe(level=>this.theory.level=level);
        this.theory.getRelation(Topic,'topic').subscribe(topic=>this.theory.topic=topic);
      });
    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.levels)
      });
    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        this.totalRecipes = this.topicService.totalElement();
        console.log(this.topics)
      });
  }

  onSubmit(): void {
    this.theoryService.patch(this.theory).subscribe(
      (theory: Theory) => { this.router.navigate(['/theories', theory._links.self.href.split('/')[4]]);
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
