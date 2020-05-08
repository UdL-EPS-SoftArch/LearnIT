import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Topic} from './topic';
import {Observable} from 'rxjs';

@Injectable()
export class TopicService extends RestService<Topic>{

  constructor(injector: Injector) {
    super(Topic, 'topics', injector);
  }

  public findByNameContaining(text: string): Observable<Topic[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByNameContaining', options);
  }

  public findByLevel(uri: string): Observable<Topic[]> {
    const options: any = {params: [{key: 'level', value: uri}]};
    return this.search('findByLevel', options);
  }
}

