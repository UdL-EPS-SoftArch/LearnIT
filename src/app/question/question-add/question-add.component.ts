import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../login-basic/user';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {QuestionService} from '../question.service';
import {Question} from '../question';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html'
})

export class NewQuestionComponent implements OnInit {

  public question: Question;
  public ingredientNb = 1;

  constructor(private router: Router,
              private NewQuestionService: QuestionService) {
  }

  ngOnInit(): void {
    this.question = new Question();
    this.ingredientNb++;
  }

  onSubmit(): void {
    this.NewQuestionService.create(this.question).subscribe(
      (question: Question) => this.router.navigate(['questions']));
  }
}
