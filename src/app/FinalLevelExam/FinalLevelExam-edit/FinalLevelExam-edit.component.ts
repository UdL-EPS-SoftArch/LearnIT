import { Component, OnInit } from '@angular/core';
import {Question} from '../../question/question';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../login-basic/user';
import {QuestionService} from '../../question/question.service';
import {Level} from '../../level/level';
import {LevelService} from '../../level/level.service';
import {Sort} from '@lagoshny/ngx-hal-client';
import {Topic} from '../../topic/topic';
import {TopicService} from '../../topic/topic.service';
import {FinalLevelExam} from '../FinalLevelExam';
import {FinalLevelExamService} from '../FinalLevelExam.service';


@Component({
  selector: 'app-FinalLevelExamEditComponent-edit',
  templateUrl: './FinalLevelExam-edit.component.html',
})
export class FinalLevelExamEditComponent implements OnInit {

  public finalExam: FinalLevelExam = new FinalLevelExam();
  public levels: Level[] = [];
  public questions: Question[] = [];
  public topics: Topic[] = [];
  public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'name', order: 'ASC' }];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private finalLevelExamService: FinalLevelExamService,
              private authenticationService: AuthenticationBasicService,
              private levelService: LevelService,
              private questionService: QuestionService,
              private topicService: TopicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.finalLevelExamService.get(id).subscribe(
      (final: FinalLevelExam) => {
        this.finalExam = final
        this.finalExam.getRelation(Level,'levelId').subscribe(level=>this.finalExam.level=level);
        this.finalExam.getRelation(Topic,'topicId').subscribe(topic=>this.finalExam.topic=topic);
      });

    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        this.totalRecipes = this.levelService.totalElement();
        console.log(this.levels)
      });
    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        this.totalRecipes = this.topicService.totalElement();
        console.log(this.topics)
      });
    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.totalRecipes = this.topicService.totalElement();
        console.log(this.questions)
      });
  }

  onSubmit(): void {
    this.finalLevelExamService.patch(this.finalExam).subscribe(
      (final: FinalLevelExam) => { this.router.navigate(['/finalLevelExams', final._links.self.href.split('/')[4]]);
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
