import { Illness } from "./Illness"

export class Diet{
    idDiet: number=0
    descriptionDiet: string=""
    durationDiet:number=0
    qualificationDiet:number=0
    startDayDiet:Date = new Date(Date.now())
    finishDayDiet:Date = new Date(Date.now())
    illness:Illness=new Illness()
}