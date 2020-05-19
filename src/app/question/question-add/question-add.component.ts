import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';

import {User} from '../../login-basic/user';
import {Question} from '../question';
import {QuestionService} from '../question.service';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html'
})

export class NewQuestionComponent implements OnInit {

  public question: Question;
  //public levels: Level[] = [];
  public topics: Topic[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(private router: Router,
              private NewQuestionService: QuestionService,
              private levelService: LevelService,
              private topicService: TopicService) {
  }

  ngOnInit(): void {
    console.log("new question init");

    this.question = new Question();

    /*
    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        //this.totalRecipes = this.levelService.totalElement();
        this.levels = levels;
      });
    */

    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        //this.totalRecipes = this.topicService.totalElement();
        console.log(this.topics)
      });
  }

  onSubmit(): void {
    console.log("new exam submit");

    //console.log(this.question);
    //console.log(this.question.levelId);

    this.NewQuestionService.create(this.question).subscribe(
      (question: Question) => this.router.navigate(['questions']));
  }
}
