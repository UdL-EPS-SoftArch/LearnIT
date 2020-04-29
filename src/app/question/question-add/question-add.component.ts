import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../login-basic/user';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {QuestionService} from '../question.service';
import {Question} from '../question';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html'
})

export class NewQuestionComponent implements OnInit {

  public question: Question;
  public levels: Level[] = [];
  public topics: Topic[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(private router: Router,
              private NewQuestionService: QuestionService,
              private levelService: LevelService,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.question = new Question();
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
    console.log(this.question);
    this.NewQuestionService.create(this.question).subscribe(
      (question: Question) => this.router.navigate(['questions']));
  }
}
