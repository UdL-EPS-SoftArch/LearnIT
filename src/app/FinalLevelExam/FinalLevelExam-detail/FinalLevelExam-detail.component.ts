
import { Component, OnInit } from '@angular/core';
import {FinalLevelExam} from '../FinalLevelExam';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {FinalLevelExamService} from '../FinalLevelExam.service';
import {Level} from '../../level/level';
import {Topic} from '../../topic/topic';

@Component({
  selector: 'app-FinalLevelExam-detail',
  templateUrl: './FinalLevelExam-detail.component.html'
})
export class FinalLevelExamDetailComponent implements OnInit {
  public question: FinalLevelExam = new FinalLevelExam();

  constructor(private route: ActivatedRoute,
              private questionService: FinalLevelExamService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.FinalLevelExamService.get(id).subscribe(
      FinalLevelExam => {
        this.FinalLevelExam = FinalLevelExam;
        this.FinalLevelExam.getRelation(Level,'levelId').subscribe(level=>this.FinalLevelExam.levelId=level);
        this.FinalLevelExam.getRelation(Topic,'topicId').subscribe(topic=>this.FinalLevelExam.topicId=topic);
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
