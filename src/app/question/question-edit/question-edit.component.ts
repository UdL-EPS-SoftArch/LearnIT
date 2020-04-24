import { Component, OnInit } from '@angular/core';
import {Question} from '../question';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../login-basic/user';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
})
export class QuestionEditComponent implements OnInit {
  public question: Question = new Question();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private questionService: QuestionService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionService.get(id).subscribe(
      (question: Question) => this.question = question);
  }

  onSubmit(): void {
    this.questionService.patch(this.question).subscribe(
      (question: Question) => { this.router.navigate(['/questions', question._links.self.href.split('/')[4]]);
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
