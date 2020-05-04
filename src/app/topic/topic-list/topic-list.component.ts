import {Component, OnInit} from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from "../topic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html'
})

export class TopicListComponent implements OnInit {

  public topics: Topic[] = [];
  public totalRecipes = 0;

  constructor(public router: Router, private topicService: TopicService) {
  }

  ngOnInit() {
    this.topicService.getAll().subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        this.totalRecipes = this.topicService.totalElement();
        console.log(this.topics)
      });
  }


}


