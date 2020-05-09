import { Component, OnInit } from '@angular/core';
import {FinalLevelExam} from '../FinalLevelExam';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {FinalLevelExamService} from '../FinalLevelExam.service';

@Component({
  selector: 'app-FinalLevelExam-detail',
  templateUrl: './FinalLevelExam-detail.component.html',
})
  export class FinalLevelExamDetailComponent implements OnInit {
  public finalLevelExam: FinalLevelExam = new FinalLevelExam();

  constructor(private route: ActivatedRoute,
              private FinalLevelExamService: FinalLevelExamService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.FinalLevelExamService.get(id).subscribe(
      finalLevelExam => {
        this.finalLevelExam = finalLevelExam;
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
