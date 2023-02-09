import { IChangeInDay, IChangeTime, IOneDay, ISliceInDay, ITimeCourse, IChangeDoze, IDeleteTake, IChangeDozeArticle } from './../../types/ICourse';
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
      let newCourseItem:CourseSupplement = {...action.payload,isMinimized:true};
      state.courseSupplements.push(newCourseItem);
      state.courseSupplements.sort((a,b) => a.inDay.length > b.inDay.length ? 1:-1);

      
    },
    rerenderTimeCourse(state){
      let timeCourseCopy:ITimeCourse = {};
      state.courseSupplements.forEach(sup => {
        sup.inDay.forEach(day => {
          if(!timeCourseCopy[day.time]){
            timeCourseCopy[day.time]= {
              isMinimized: typeof state.timeCourse[day.time] === 'undefined'? true : state.timeCourse[day.time].isMinimized,
              supplementsByTime:[sup]
            }
          }
          else{
            timeCourseCopy[day.time].supplementsByTime.push(sup)
          }
        })
      });
      state.timeCourse = {};

      let sortedTimes = Object.keys(timeCourseCopy).sort((a,b) => a > b ? 1 : -1);
      sortedTimes.map(time => state.timeCourse[time] = timeCourseCopy[time]);
    },
    minimizeCard(state,action:PayloadAction<number>){
      state.courseSupplements[action.payload].isMinimized = !state.courseSupplements[action.payload].isMinimized;
    },
    minimizeAllCard(state){
      state.courseSupplements.map(sup => sup.isMinimized = true);
      state.view = "bySupplement";
    },
    minimizeTimeCard(state,action:PayloadAction<string>){
      state.timeCourse[action.payload].isMinimized = !state.timeCourse[action.payload].isMinimized;
    },
    changeView(state,action:PayloadAction<"byTime" | "bySupplement">){
      state.view =action.payload
    },
    deleteSupplement(state,action:PayloadAction<string>){
      state.courseSupplements = state.courseSupplements.filter(sup => sup.supplement.Article !== action.payload);
    },
    deleteTime(state,action:PayloadAction<string>){
      state.courseSupplements.forEach((_,index) => {
        state.courseSupplements[index].inDay = state.courseSupplements[index].inDay.filter(inD => inD.time !== action.payload);
      }) 
      state.courseSupplements = state.courseSupplements.filter(sup => sup.inDay.length !== 0)
    },
    deleteOneTake(state,action:PayloadAction<IOneDay>){
      if(state.courseSupplements[action.payload.itemIndex].inDay.length === 1){
       state.courseSupplements.splice(action.payload.itemIndex,1)
      }else{
       state.courseSupplements[action.payload.itemIndex].inDay = state.courseSupplements[action.payload.itemIndex].inDay.filter(timeItem => (
         timeItem.time !== action.payload.time
       ));
      };
    },
    changeInDayCourse(state,action:PayloadAction<IChangeInDay>){
      state.courseSupplements[action.payload.itemIndex].inDay.push(...action.payload.newInDay);
      state.courseSupplements.sort((a,b) => a.inDay.length > b.inDay.length ? 1 : -1);
    },
    sliceInDayCourse(state,action:PayloadAction<ISliceInDay>){
      state.courseSupplements[action.payload.itemIndex].inDay= state.courseSupplements[action.payload.itemIndex].inDay.slice(0,action.payload.index)
      state.courseSupplements.sort((a,b) => a.inDay.length > b.inDay.length ? 1 : -1);
    },
    changeTimeCourse(state,action:PayloadAction<IChangeTime>){
      state.courseSupplements[action.payload.itemIndex].inDay[action.payload.timeIndex].time = action.payload.timeValue;
    },
    changeDozeCourse(state,action:PayloadAction<IChangeDoze>){
      state.courseSupplements[action.payload.itemIndex].inDay[action.payload.timeIndex].doza = action.payload.dozeValue;
    },
    deleteOneTakeArticle(state,action:PayloadAction<IDeleteTake>){
      state.courseSupplements.forEach((_,index)=>{
        if(state.courseSupplements[index].supplement.Article === action.payload.article){
          state.courseSupplements[index].inDay =  state.courseSupplements[index].inDay.filter(timeItem => timeItem.time !== action.payload.time);
        }
      });
    },
    changeDozeCourseArticle(state,action:PayloadAction<IChangeDozeArticle>){
      state.courseSupplements.forEach((_,index)=>{
        if(state.courseSupplements[index].supplement.Article === action.payload.article){
          state.courseSupplements[index].inDay.forEach((item,ind) =>{
            if(item.time === action.payload.time) {
              state.courseSupplements[index].inDay[ind].doza = action.payload.doze
            }
          });
        }
      });
    }
  }
});


export default courseSlice.reducer;
export const {
  addSupplementInCourse,
  minimizeCard,
  minimizeAllCard,
  changeView,
  deleteSupplement,
  deleteTime,
  deleteOneTake,
  sliceInDayCourse,
  changeInDayCourse,
  rerenderTimeCourse,
  minimizeTimeCard,
  changeTimeCourse,
  changeDozeCourse,
  deleteOneTakeArticle,
  changeDozeCourseArticle,
} = courseSlice.actions;