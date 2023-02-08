import { IInDay } from './ISchedule';
import { ModalState } from '../store/reducers/ModalSlice';
export interface ICourse{
  courseSupplements:CourseSupplement[],
  courseDuration:string,
  view:"byTime" | "bySupplement",
  timeCourse:ITimeCourse
}

export interface CourseSupplement extends ModalState{
  isMinimized:boolean
}

export interface ITimeCourse{
  [key:string]: ITime,
}
export interface ITime{
  supplementsByTime:ModalState[],
  isMinimized:boolean
}
export interface IOneDay{
  time:string,
  itemIndex:number
}

export interface IChangeInDay{
  itemIndex:number,
  newInDay:IInDay[]
}
export interface ISliceInDay{
  itemIndex:number,
  index:number
}

export interface IChangeTime{
  itemIndex:number,
  timeIndex:number,
  timeValue:string
}
export interface IChangeDoze{
  itemIndex:number,
  timeIndex:number,
  dozeValue:number
}