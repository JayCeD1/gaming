import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Game} from "../../../models";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy{

  gameRating :number = 0;
  gameId !: string ;
  game !: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService) {

  }
  getColor(value: number): string {
   if (value > 75){
     return '#5ee432';
   }else if(value > 50){
     return '#fffa50';
   }else if( value > 30){
     return '#f7aa38';
   }else{
     return '#ef4655';
   }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  private getGameDetails(gameId: string | undefined) {
    this.gameSub = this.httpService.getGameDetails(gameId)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;

        setTimeout(() => {
          this.gameRating = this.game?.metacritic;
        },1000)
      })
  }

  ngOnDestroy(): void {
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
    if (this.gameSub){
      this.gameSub.unsubscribe();
    }
  }
}
