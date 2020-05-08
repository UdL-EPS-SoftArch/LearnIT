import { Component, OnInit } from '@angular/core';
import {Question} from '../question';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../login-basic/user';
import {QuestionService} from '../question.service';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
})
export class QuestionEditComponent implements OnInit {
  public question: Question = new Question();
  public levels: Level[] = [];
  public topics: Topic[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private questionService: QuestionService,
              private authenticationService: AuthenticationBasicService,
              private levelService: LevelService,
              private topicService: TopicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionService.get(id).subscribe(
      (question: Question) => {
        this.question = question
        this.question.getRelation(Level,'levelId').subscribe(level=>this.question.levelId=level);
        this.question.getRelation(Topic,'topicId').subscribe(topic=>this.question.topicId=topic);
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
    this.questionService.patch(this.question).subscribe(
      (question: Question) => { this.router.navigate(['/questions', question._links.self.href.split('/')[4]]);
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
