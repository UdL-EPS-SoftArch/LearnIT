import { Component, OnInit } from '@angular/core';
import {Theory} from '../theory';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {TheoryService} from '../theory.service';

@Component({
  selector: 'app-theory-delete',
  templateUrl: './theory-delete.component.html'
})
export class TheoryDeleteComponent implements OnInit {
  public theory: Theory = new Theory();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private theoryService: TheoryService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.theoryService.get(this.id).subscribe(
      theory => this.theory = theory);
  }

  delete() {
    this.theoryService.delete(this.theory).subscribe(
      () => {
        this.router.navigate(['theories']);
      });
  }
}
