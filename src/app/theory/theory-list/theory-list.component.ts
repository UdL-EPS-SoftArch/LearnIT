
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

  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(
    public router: Router,
    private theoryService: TheoryService,
    private levelService: LevelService,
    private topicService: TopicService) {
  }

  ngOnInit() {
    console.log("new theory init");

    //this.level = new Level();
    //this.topic = new Topic();

    this.theoryService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
      (theories: Theory[]) => {
        this.theories = theories;
        this.totalRecipes = this.theoryService.totalElement();
        //console.log(this.theories)
      });

    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        //console.log(this.levels)
      });

    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        //console.log(this.topics)
      });
  }

  changePage() {
    this.theoryService.page(this.page - 1).subscribe(
      (theories: Theory[]) => this.theories = theories);
  }

  changeLevel(value: any) {
    console.log("change theory filter level");

    let level_uri = value.target.value;
    //console.log(theory_uri);

    let level_array = level_uri.split("/");
    //console.log(theory_array);
    //console.log(typeof(theory_array));

    let level_id = Number(level_array[level_array.length-1]);
    //console.log(theory_id);
    //console.log(typeof(theory_id));

    // get selected level
    this.levelService.get(level_id).subscribe(
      level => {
        this.level = level;
        console.log(this.level);
      });

    // get filtered topics
    this.topicService.findByLevel(level_uri).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        console.log(this.topics)
      });

    // get filtered theories
    //this.filtereTheory();

  }

  changeTopic(value: any) {
    console.log("change theory filter topic");

    let topic_uri = value.target.value;
    //console.log(topic_uri);
    let topic_array = topic_uri.split("/");
    //console.log(topic_array);
    let topic_id = Number(topic_array[topic_array.length-1]);
    //console.log(topic_id);

    // get selected level
    this.topicService.get(topic_id).subscribe(
      topic => {
        this.topic = topic;
        console.log(this.topic);
      });

    // get filtered theories
    this.filtereTheory();
  }

  filtereTheory() {
    console.log("filter theory");

    //console.log(this.level);
    //console.log(this.topic);

    this.theoryService.findByLevelAndTopic(this.level, this.topic).subscribe(
      (theories: Theory[]) => {
        this.theories = theories;
        this.totalRecipes = this.theoryService.totalElement();
        console.log(this.theories)
      });

  }
}




//
