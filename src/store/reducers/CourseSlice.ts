import { IChangeInDay, IOneDay, ISliceInDay, ITimeCourse } from './../../types/ICourse';
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
      action.payload.inDay.forEach(day => {
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
    },
    deleteSupplement(state,action:PayloadAction<string>){
      state.courseSupplements = state.courseSupplements.filter(sup => sup.supplementSchedule.supplement.Article !== action.payload);
      Object.keys(state.timeCourse).forEach(key => {
        state.timeCourse[key].supplementsByTime = state.timeCourse[key].supplementsByTime.filter(item => item.supplement.Article !== action.payload);
        if(!state.timeCourse[key].supplementsByTime.length) delete state.timeCourse[key] 
      });
    },
    deleteTime(state,action:PayloadAction<string>){
      delete state.timeCourse[action.payload];
      state.courseSupplements.forEach((_,index) => {
        state.courseSupplements[index].supplementSchedule.inDay = state.courseSupplements[index].supplementSchedule.inDay.filter(inD => inD.time !== action.payload);
      }) 
      state.courseSupplements = state.courseSupplements.filter(sup => sup.supplementSchedule.inDay.length !== 0)
    },
    deleteOneTake(state,action:PayloadAction<IOneDay>){
      state.courseSupplements.forEach((_,index)=>{
        if(state.courseSupplements[index].supplementSchedule.supplement.Article === action.payload.article){
         if(state.courseSupplements[index].supplementSchedule.inDay.length === 1){
          state.courseSupplements.splice(index,1)
         }else{
          state.courseSupplements[index].supplementSchedule.inDay = state.courseSupplements[index].supplementSchedule.inDay.filter(timeItem => (
            timeItem.time !== action.payload.time
          ));
         };
        };
      });

      if(state.timeCourse[action.payload.time].supplementsByTime.length === 1){
        delete state.timeCourse[action.payload.time]
      }else{
        state.timeCourse[action.payload.time].supplementsByTime = state.timeCourse[action.payload.time].supplementsByTime.filter(sup => sup.supplement.Article !== action.payload.article);
      }

    },
    changeInDayCourse(state,action:PayloadAction<IChangeInDay>){
      state.courseSupplements.forEach((_,index) =>{
        if(state.courseSupplements[index].supplementSchedule.supplement.Article === action.payload.article){
          state.courseSupplements[index].supplementSchedule.inDay.push(...action.payload.newInDay)
        }
      })
    },
    sliceInDayCourse(state,action:PayloadAction<ISliceInDay>){
      state.courseSupplements.forEach((_,index) =>{
        if(state.courseSupplements[index].supplementSchedule.supplement.Article === action.payload.article){
          state.courseSupplements[index].supplementSchedule.inDay= state.courseSupplements[index].supplementSchedule.inDay.slice(0,action.payload.index)
        }
      })
    },

  }
});


export default courseSlice.reducer;
export const {addSupplementInCourse,minimizeCard,minimizeAllCard,minimizeTimeCard,changeView,deleteSupplement,deleteTime,deleteOneTake,sliceInDayCourse,changeInDayCourse} = courseSlice.actions;