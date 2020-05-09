import { Component, OnInit } from '@angular/core';
import {FinalLevelExam} from '../FinalLevelExam';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {FinalLevelExamService} from '../FinalLevelExam.service';

@Component({
  selector: 'app-FinalLevelExam-delete',
  templateUrl: './FinalLevelExam-delete.component.html'
})
export class FinalLevelExamDeleteComponent implements OnInit {
  public finalLevelExam: FinalLevelExam = new FinalLevelExam();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private finalLevelExamService: FinalLevelExamService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.finalLevelExamService.get(this.id).subscribe(
      final => this.finalLevelExam = final);
  }

  delete() {
    this.finalLevelExamService.delete(this.finalLevelExam).subscribe(
      () => {
        this.router.navigate(['finalLevelExams']);
      });
  }
}
