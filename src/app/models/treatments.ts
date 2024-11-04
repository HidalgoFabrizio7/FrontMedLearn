import {Illness} from './Illness';

export class Treatments{
  idTreatments: number=0
  descriptionTreatment: string=""
  durationTreatment: number=0
  startDayTreatment:Date = new Date(Date.now())
  finishDayTreatment:Date = new Date(Date.now())
  illness:Illness=new Illness()
}
