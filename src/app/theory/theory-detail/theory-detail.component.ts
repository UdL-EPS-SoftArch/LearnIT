import { Component, OnInit } from '@angular/core';
import {Theory} from '../theory';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {User} from '../../login-basic/user';
import {TheoryService} from '../theory.service';
import {Level} from '../../level/level';
import {Topic} from '../../topic/topic';
import {DomSanitizer} from "@angular/platform-browser"; [DomSanitizer]

@Component({
  selector: 'app-theory-detail',
  templateUrl: './theory-detail.component.html'
})
export class TheoryDetailComponent implements OnInit {
  public theory: Theory = new Theory();
  safeurl;
  constructor(private route: ActivatedRoute,
              private theoryService: TheoryService,
              private authenticationService: AuthenticationBasicService,
              private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.theoryService.get(id).subscribe(
      theory => {
        this.theory = theory;
        this.theory.getRelation(Level,'level').subscribe(level=>this.theory.level=level);
        this.theory.getRelation(Topic,'topic').subscribe(topic=>this.theory.topic=topic);
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }
}
