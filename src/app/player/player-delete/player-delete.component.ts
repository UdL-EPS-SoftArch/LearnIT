import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import {Player} from '../player';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './player-delete.component.html'
})
export class PlayerDeleteComponent implements OnInit {
  public user: Player = new Player();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(this.id).subscribe(
      player => this.user = player);
  }

  delete() {
    this.playerService.delete(this.user).subscribe(
      () => {
        this.authenticationService.logout();
        this.router.navigate(['']);
      });
  }
}
