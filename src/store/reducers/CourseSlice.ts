import { ITimeCourse } from './../../types/ICourse';
import { ModalState } from './ModalSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CourseSupplement, ICourse } from '../../types/ICourse';


const initialState:ICourse = {
  courseSupplements:[],
  courseDuration: "2w",
  view:"bySupplement",
  timeCourse:{}
}

const courseSlice = createSlice({
  name:"course",
  initialState,
  reducers:{
    addSupplementInCourse(state,action:PayloadAction<ModalState>){
      let newCourseItem:CourseSupplement = {supplementSchedule:action.payload,isMinimized:true};
      let sortedCourse:CourseSupplement[] = [...state.courseSupplements,newCourseItem];
      sortedCourse.sort((a,b) => a.supplementSchedule.inDay.length > b.supplementSchedule.inDay.length ? 1:-1)
      state.courseSupplements = sortedCourse;
      let timeCourseCopy:ITimeCourse = JSON.parse(JSON.stringify(state.timeCourse));
      action.payload.inDay.map(day => {
        if(!timeCourseCopy[day.time]){
          timeCourseCopy[day.time]= {
            isMinimized:true,
            supplementsByTime:[action.payload]
          }
        }
        else{
          timeCourseCopy[day.time].supplementsByTime.push(action.payload)
        } 
      })
      state.timeCourse = {};
      let sortedTimes = Object.keys(timeCourseCopy).sort((a,b) => a > b ? 1 : -1);
      sortedTimes.map(time => state.timeCourse[time] = timeCourseCopy[time])
    },
    minimizeCard(state,action:PayloadAction<number>){
      state.courseSupplements[action.payload].isMinimized = !state.courseSupplements[action.payload].isMinimized;
    },
    minimizeAllCard(state){
      state.courseSupplements.map(sup => sup.isMinimized = true);
      Object.keys(state.timeCourse).map(key => state.timeCourse[key].isMinimized = true);
      state.view = "bySupplement";
    },
    minimizeTimeCard(state,action:PayloadAction<string>){
      state.timeCourse[action.payload].isMinimized = !state.timeCourse[action.payload].isMinimized;
    },
    changeView(state,action:PayloadAction<"byTime" | "bySupplement">){
      state.view =action.payload
    } 
  }
});


export default courseSlice.reducer;
export const {addSupplementInCourse,minimizeCard,minimizeAllCard,minimizeTimeCard,changeView} = courseSlice.actions;