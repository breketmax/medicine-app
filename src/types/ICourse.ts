import { IInDay } from './ISchedule';
import { ModalState } from '../store/reducers/ModalSlice';
export interface ICourse{
  courseSupplements:CourseSupplement[],
  courseDuration:string,
  view:"byTime" | "bySupplement",
  timeCourse:ITimeCourse
}

export interface CourseSupplement{
  supplementSchedule:ModalState,
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
  article:string
}

export interface IChangeInDay{
  article:string,
  newInDay:IInDay[]
}
export interface ISliceInDay{
  article:string,
  index:number
}