import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { User } from '../../login-basic/user';

@Component({
  selector: 'app-player-register',
  templateUrl: './player-register-form.html'
})
export class PlayerRegisterComponent implements OnInit {
  public user: Player;

  constructor(private router: Router,
              private playerService: PlayerService,
              private authenticationBasicService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.user = new Player();
  }

  onSubmit(): void {
    this.playerService.create(this.user).subscribe(
      (player: Player) => {
        this.authenticationBasicService.login(player.id, player.password).subscribe(
            (user: User) => this.router.navigate([user.uri]))
      });
  }
}
