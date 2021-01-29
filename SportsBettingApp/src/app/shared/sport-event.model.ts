export class SportEvent {
    eventId:number = 0;
    eventName:string = "";
    oddsForFirstTeam:number = 1.00;
    oddsForDraw:number = 1.00;
    oddsForSecondTeam:number = 1.00;
    eventStartDate:Date = new Date();
    isItForEditing:boolean = false;
    changeColor:boolean = false;
    formatedEventStartDate:string ="";
    timeStamp:string="";
}
