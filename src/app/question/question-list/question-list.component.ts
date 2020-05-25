
import { Component, OnInit } from '@angular/core';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';

import {Question} from '../question';
import {QuestionService} from '../question.service';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import { Topic } from '../../topic/topic';
import { TopicService } from '../../topic/topic.service';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})

export class QuestionListComponent implements OnInit {

  public questions: Question[] = [];

  public levels: Level[] = [];
  public level: Level;

  public topics: Topic[] = [];
  public topic: Topic;

  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;

  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private levelService: LevelService,
    private topicService: TopicService,
    private questionService: QuestionService) {
  }

  ngOnInit() {

    this.questionService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.totalRecipes = this.questionService.totalElement();
        console.log(this.questions)
      });

    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        // console.log(this.levels)
      });

    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        // console.log(this.topics)
      });

  }

  changePage() {
    this.questionService.page(this.page - 1).subscribe(
      (questions: Question[]) => this.questions = questions);
  }

  changeLevel(value: any) {
    // console.log('change question filter level');
    // console.log(value);

    this.level = new Level();

    const levelUri = value.target.value;
    const levelArray = levelUri.split('/');
    const levelId = Number(levelArray[levelArray.length-1]);

    this.levelService.get(levelId).subscribe(
      level => {
        this.level = level;

        this.topicService.findByLevel(levelUri).subscribe(
          (topics: Topic[]) => {
            this.topics = topics;
            // console.log(this.topics);

            this.filterQuestion();
          });
      });
  }

  changeTopic(value: any) {
      // console.log('change question filter topic');
      // console.log(value);

      this.topic = new Topic();

      const topicUri = value.target.value;
      const topicArray = topicUri.split('/');
      const topicId = Number(topicArray[topicArray.length-1]);

      this.topicService.get(topicId).subscribe(
        topic => {
          this.topic = topic;
          // console.log(this.topic);

          this.filterQuestion();
        });
  }

  filterQuestion() {
    console.log('filter question');

    this.questionService.findByTopic(this.topic).subscribe(
      (questions: Question[]) => {
        // console.log(questions);
        this.questions = questions;

        this.totalRecipes = this.questionService.totalElement();

      });
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  clearTopic() {
    this.topic = new Topic();
    this.filterQuestion();
  }

  clearLevel() {
    this.level = new Level();
    this.filterQuestion();
  }
}




//
