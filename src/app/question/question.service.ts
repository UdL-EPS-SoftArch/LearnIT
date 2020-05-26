import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Observable} from 'rxjs';

import { Topic } from '../topic/topic';
import { Level } from '../level/level';
import {Question} from './question';


@Injectable()
export class QuestionService extends RestService<Question>{

  constructor(injector: Injector) {
    super(Question, 'questions', injector);
  }

  public findByStatementContaining(text: string): Observable<Question[]> {
    const options: any = {
      params: [
        {
          key: 'text',
          value: text
        }
      ]
    };
    return this.search('findByStatementContaining', options);
  }

  public findByTopic(topic: Topic): Observable<Question[]> {
    const options: any = {
      params: [
        {
          key: 'topic',
          value: topic
        }
      ]};

    return this.search('findByTopic', options);
  }
  /*
  public findByTopic(topic: Topic): Observable<Question[]> {
    const options: any = {
      params: [
        {
          key: 'topic',
          value: topic
        }
      ]};

    return this.search('findByTopic', options);
  }
  */
}
