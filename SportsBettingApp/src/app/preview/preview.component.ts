import { Component, OnInit } from '@angular/core';
import { SportsEventService } from '../shared/sports-event.service';
import { Router } from "@angular/router";
import { SportEvent } from '../shared/sport-event.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  constructor(public service:SportsEventService, private router:Router) {

   }
list:SportEvent[];
  ngOnInit(): void {
     this.service.getAllEvents().then(res=>res.forEach(el=>{
      let today = new Date();
      let elDate = new Date(el.eventStartDate);
       if(elDate.getTime() < today.getTime()){
         el.changeColor=true;
       }
       el.oddsForFirstTeam = Math.round( el.oddsForFirstTeam * 100 ) / 100;
       el.oddsForDraw = Math.round( el.oddsForDraw * 100 ) / 100;
       el.oddsForSecondTeam = Math.round( el.oddsForSecondTeam * 100 ) / 100;
       el.formatedEventStartDate = this.service.formatDateTime(el.eventStartDate)
     }));  
    }

  activateEditMode(){
    this.router.navigate(["edit"]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
  loggingOnConsole(eventId: number, oddValue:number, oddTitle:string){
    console.log(eventId, oddTitle, oddValue)
  }
}
