import { Injectable } from '@angular/core';
import { SportEvent } from './sport-event.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SportsEventService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44309/api/events';
  readonly bearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTcG9ydHNCZXR0aW5nU2VydmljZUFjY2Vzc1Rva2VuIiwianRpIjoiYjUxZjg4OWItN2MwNy00MDk5LWJkMmQtMzUzZDQ4MDVjN2Y5IiwiaWF0IjoiMS8yOS8yMDIxIDk6NDI6NTQgQU0iLCJJZCI6IjEiLCJGaXJzdE5hbWUiOiJTcG9ydHNCZXR0aW5nIiwiTGFzdE5hbWUiOiJBZG1pbiIsIlVzZXJOYW1lIjoiU3BvcnRzQmV0dGluZ0FkbWluIiwiRW1haWwiOiJTcG9ydHNCZXR0aW5nQWRtaW5AYWJjLmNvbSIsImV4cCI6MTYxNDUwNTM3NCwiaXNzIjoiU3BvcnRzQmV0dGluZ0F1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiU3BvcnRzQmV0dGluZ1NlcnZpY2VQb3N0bWFuQ2xpZW50In0._naKK9BjKHMcGCvCBqBv0SVC94aV_pRJtMQYpzb-cBE";
  formData:SportEvent = new SportEvent();
  list: SportEvent[];  

  getAllEvents() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.bearer });
  let options = { headers: headers };
    return this.http.get(this.baseURL, options)
      .toPromise()
      .then(res =>this.list = res as SportEvent[]);
  }

  postSportEvent(sportEvent:SportEvent) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.bearer });
    let options = { headers: headers };
    var today = new Date();
    sportEvent.eventStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
    sportEvent.eventStartDate.setHours(23);
    sportEvent.eventStartDate.setMinutes(59);
    sportEvent.eventStartDate.setSeconds(0);
    var date = new Date(sportEvent.eventStartDate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time = ('0' + day).slice(-2) + "/" + ('0' + month).slice(-2) + "/" + year + " " + hour + ':' + minute + ':' + '00'; 
    sportEvent.timeStamp = time;
    return this.http.post(this.baseURL, sportEvent, options);
  }

  putSportEvent(sportsEvent:SportEvent) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.bearer });
  let options = { headers: headers };
  this.formData = sportsEvent;
    return this.http.put(`${this.baseURL}/${this.formData.eventId}`, this.formData, options);
  }
 
  deleteSportEvent(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.bearer });
  let options = { headers: headers };
    return this.http.delete(`${this.baseURL}/${id}`, options);
  }

  formatDateTime(dateTime:Date){
    let parsedDateTime = new Date(dateTime);
    var formatedDateTime = ('0' + parsedDateTime.getDate()).slice(-2) + "/" + ('0' + parsedDateTime.getMonth() + 1).slice(-2) + "/" + parsedDateTime.getFullYear() + " " + ('0' + parsedDateTime.getHours()).slice(-2) + ":" + ('0' + parsedDateTime.getMinutes()).slice(-2)
    return formatedDateTime;
  }
}
