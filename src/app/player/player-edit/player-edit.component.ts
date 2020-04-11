import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { User } from '../../login-basic/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../player-edit/player-edit.component.html'
})
export class PlayerEditComponent implements OnInit {
  public player: Player = new Player();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(
      (player: Player) => this.player = player);
  }

  onSubmit(): void {
    this.player.password = this.player.passwordReset ? this.player.password : undefined; // Don't edit if not a reset
    this.playerService.patch(this.player).subscribe(
      (player: Player) => {
        if (this.player.passwordReset) {
          this.authenticationService.logout();
          this.authenticationService.login(this.player.id, this.player.password).subscribe(
            (user: User) => this.router.navigate([user.uri]))
        } else {
          this.router.navigate([player.uri]);
        }
      });
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
