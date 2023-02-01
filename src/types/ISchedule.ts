export interface ISchedule{
    article:string,
    period:   "Ежедневно" |"Еженедельно",
    inDay:IInDay[]
}

export enum PeriodEnum{

}

export interface IInDay{
  time:string,
  doza:number
}