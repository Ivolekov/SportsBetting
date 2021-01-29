import { Component, OnInit } from '@angular/core';
import { SportsEventService } from '../shared/sports-event.service';
import { SportEvent } from '../shared/sport-event.model';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public service:SportsEventService, private router:Router, private toastr:ToastrService) { }
  
  sportEvent:SportEvent = new SportEvent();
  
  ngOnInit(): void {
    this.service.getAllEvents().then(res=>res.forEach(el=>{
      el.formatedEventStartDate = this.service.formatDateTime(el.eventStartDate)
    }))
  }
  
  activatePreviewMode(){
    this.router.navigate(["preview"]).then( (e) => {
      if (!e) {
        console.log("Navigation has failed!");
      } 
    });
  }

  onInsert() {
    this.service.postSportEvent(this.sportEvent).subscribe(
      res => {
        this.service.getAllEvents().then(r=>r.forEach(el=>{
          el.formatedEventStartDate = this.service.formatDateTime(el.eventStartDate)
        }));
        this.toastr.success('Submitted successfully', 'Add Sports Event')
      },
      err => { 
        console.log(err);
        this.toastr.error('Oops Somethig went wrong', 'Open the console');
       }
    );
  }

  onDelete(id: number){
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteSportEvent(id)
        .subscribe(
          res => {
            this.service.getAllEvents().then(res=>res.forEach(el=>{
              el.formatedEventStartDate = this.service.formatDateTime(el.eventStartDate)
            }));
            this.toastr.error("Deleted successfully", 'Event Id:' + id);
          },
          err => { 
            console.log(err)
            this.toastr.error('Oops Somethig went wrong', 'Open the console');
           }
        )
    }
  }

  editEvent(sportsEvent: any){
    sportsEvent.isItForEditing = !sportsEvent.isItForEditing;
  }

  updateRecord(sportsEvent: SportEvent) {
    this.service.putSportEvent(sportsEvent).subscribe(
      res => {
        
        this.service.getAllEvents().then(res=>res.forEach(el=>{
          el.formatedEventStartDate = this.service.formatDateTime(el.eventStartDate)
        }));
        this.toastr.info('Updated successfully', 'Event Id:' + sportsEvent.eventId)
      },
      err => { 
        console.log(err); 
        this.toastr.error('Oops Somethig went wrong', 'Open the console');
      }
    );
  }
}
