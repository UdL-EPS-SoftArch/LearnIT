import { Component, OnInit } from '@angular/core';
import {Question} from '../question';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {QuestionService} from '../question.service';
import {Level} from '../../level/level';
import {Topic} from '../../topic/topic';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
  public question: Question = new Question();

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionService.get(id).subscribe(
      question => {
        this.question = question;
        this.question.getRelation(Level,'levelId').subscribe(level=>this.question.levelId=level);
        this.question.getRelation(Topic,'topicId').subscribe(topic=>this.question.topicId=topic);
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
