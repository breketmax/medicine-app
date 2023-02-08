import React from 'react';
import {  useAppSelector } from '../../hooks/redux';
import CourseSupplementItem from '../CourseSupplementItem/CourseSupplementItem';
import CourseTimeItem from '../CourseTimetItem/CourseTimeItem';
import "./CourseList.css";

const CourseList:React.FC = () => {
  const {courseSupplements,view,timeCourse} = useAppSelector(state => state.rootReducer.courseReducer);


  if(view === 'bySupplement'){
    return (
      <div className="course-supplements-list">
        {courseSupplements.map((sup,i) => <CourseSupplementItem key={i}  {...sup} itemIndex={i}/>)}
      </div>
    );
  }

  return (
    <div>
      <div className="course-supplements-list">
        {Object.keys(timeCourse).map((time,index) => (
          <CourseTimeItem key={index} isMinimized={timeCourse[time].isMinimized} time={time} timeSchedule={timeCourse[time].supplementsByTime}/>
        ))}
      </div>
    </div>
  );
};

export default CourseList;