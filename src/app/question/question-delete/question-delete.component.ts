import { Component, OnInit } from '@angular/core';
import {Question} from '../question';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html'
})
export class QuestionDeleteComponent implements OnInit {
  public question: Question = new Question();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private questionService: QuestionService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.questionService.get(this.id).subscribe(
      question => this.question = question);
  }

  delete() {
    this.questionService.delete(this.question).subscribe(
      () => {
        this.router.navigate(['questions']);
      });
  }
}
