
import { Component, OnInit } from '@angular/core';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Router} from '@angular/router';

import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import { Topic } from '../../topic/topic';
import { TopicService } from '../../topic/topic.service';
import {Theory} from '../theory';
import {TheoryService} from '../theory.service';

@Component({
  selector: 'app-theory-list',
  templateUrl: './theory-list.component.html'
})

export class TheoryListComponent implements OnInit {

  public theories: Theory[] = [];

  public levels: Level[] = [];
  public level: Level;

  public topics: Topic[] = [];
  public topic: Topic;

  public pageSize = 10;
  public page = 1;
  public totalRecipes = 0;
  public levelName = 'Master';

  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private theoryService: TheoryService,
    private levelService: LevelService,
    private topicService: TopicService) {
  }

  ngOnInit() {
    console.log('new theory init');

    console.log(this.levelName);

    this.level = new Level();
    this.topic = new Topic();

    this.theoryService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (theories: Theory[]) => {
        this.theories = theories;
        this.totalRecipes = this.theoryService.totalElement();
        // console.log(this.theories)
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

    // this.filtereTheory();
  }

  changePage() {
    this.theoryService.page(this.page - 1).subscribe(
      (theories: Theory[]) => this.theories = theories);
  }

  changeLevel(value: any) {
    console.log('change theory filter level');

    this.level = new Level();

    const levelUri = value.target.value;
    const levelArray = levelUri.split('/');
    const levelId = Number(levelArray[levelArray.length-1]);

    this.levelService.get(levelId).subscribe(
      level => {
        this.level = level;
        // console.log(this.level);

        this.topicService.findByLevel(levelUri).subscribe(
          (topics: Topic[]) => {
            this.topics = topics;
            // console.log(this.topics)

            this.filtereTheory();
          });
      });
  }

  changeTopic(value: any) {
    console.log('change theory filter topic');

    this.topic = new Topic();

    const topicUri = value.target.value;
    const topicArray = topicUri.split('/');
    const topicId = Number(topicArray[topicArray.length-1]);

    // get selected level
    this.topicService.get(topicId).subscribe(
      topic => {
        this.topic = topic;
        // console.log(this.topic);

        this.filtereTheory();
      });
  }

  filtereTheory() {
    console.log('filter theory');

    if (!this.isEmpty(this.topic) && !this.isEmpty(this.level)) {
      console.log('level and topic');
      this.theoryService.findByLevelAndTopic(this.level, this.topic).subscribe(
        (theories: Theory[]) => {
          this.theories = theories;
          // console.log(this.theories)

          this.totalRecipes = this.theoryService.totalElement();
        });
    }
    else {
      if (!this.isEmpty(this.level)) {
        console.log('level');
        this.theoryService.findByLevel(this.level).subscribe(
          (theories: Theory[]) => {
            this.theories = theories;
            // console.log(this.theories)

            this.totalRecipes = this.theoryService.totalElement();
          });
      }
      else if (!this.isEmpty(this.topic)){
        console.log('topic');
        this.theoryService.findByTopic(this.topic).subscribe(
          (theories: Theory[]) => {
            this.theories = theories;
            // console.log(this.theories)

            this.totalRecipes = this.theoryService.totalElement();
          });
      }
      else {
        console.log('ninguno');
        this.theoryService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
          (theories: Theory[]) => {
            this.theories = theories;
            // console.log(this.theories)

            this.totalRecipes = this.theoryService.totalElement();
          });
      }
    }
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
    this.filtereTheory();
  }

  clearLevel() {
    this.level = new Level();
    this.filtereTheory();
  }
}




//
