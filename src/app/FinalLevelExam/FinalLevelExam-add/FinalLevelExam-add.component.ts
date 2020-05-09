import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {FinalLevelExamService} from '../FinalLevelExam.service';
import {FinalLevelExam} from '../FinalLevelExam';
import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';
import {Level} from "../../level/level";
import {LevelService} from '../../level/level.service';
import {Topic} from "../../topic/topic";
import {TopicService} from '../../topic/topic.service';



@Component({
  selector: 'app-FinalLevelExam-add',
  templateUrl: './FinalLevelExam-add.component.html'
})

export class NewFinalLevelExamComponent implements OnInit {

  public finalLevelExam: FinalLevelExam;
  public name: string = '';
  public levels: Level[] = [];
  public topics: Topic[] = [];
  public questions: Question[] = [];

  //public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    private router: Router,
    private finalLevelExamService: FinalLevelExamService,
    private levelService: LevelService,
    private topicService: TopicService,
    private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.finalLevelExam = new FinalLevelExam();
    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        //this.number_of_questions = this.questionService.totalElement();
        console.log(this.questions);
      });
    this.levelService.getAll({sort: this.sorting}).subscribe(
      (levels: Level[]) => {
        this.levels = levels;
        //this.totalRecipes = this.levelService.totalElement();
        console.log(this.levels)
      });
    this.topicService.getAll({sort: this.sorting}).subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        //this.totalRecipes = this.topicService.totalElement();
        console.log(this.topics)
      });
  }


  onSubmit(): void {
    //this.FinalLevelExam.nbOfQuestions = this.number_of_questions;
    console.log(this.finalLevelExam);
    console.log(this.finalLevelExamService);
    this.finalLevelExamService.create(this.finalLevelExam).subscribe(
      (FinalLevelExam: FinalLevelExam) => this.router.navigate(['finalLevelExams']));
  }
}
