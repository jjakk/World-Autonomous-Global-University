import { useEffect, useState } from "react";
import "./HomePage.scss"
import type Course from "../classes/Course/Course";
import AppStorage from "../classes/AppStorage";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { calculateCourseCode } from "../utils";

function HomePage() {
    const [courses, setCourses] = useState<Course[]>([]);
    
    useEffect(() => {
        (async function() {
            const crs: Course[] | null = AppStorage.getCourses();
            if(crs) {
                setCourses(crs);
            }
        })();
    }, []);

    return (
        <div className="home-page">
            <h1>Welcome to World Autonomous Global University!</h1>
            <h2>Plan of Study:</h2>
            <Accordion>
            {
                courses
                ?
                courses.map((course, index) => (
                    <AccordionTab
                        key={index}
                        disabled={!course.unlocked}
                        header={
                            <div className="course-header">
                                <span className="course-header-text">
                                    Course {calculateCourseCode(index)}: : 
                                    <br />
                                    {course.name}
                                </span>
                                <div className="course-header-progress">
                                    <ProgressBar value={course.progress*100}></ProgressBar>
                                </div>
                            </div>
                        }
                    >
                        <div className="course-content">
                            <h2>{course.name}</h2>
                            <p>{course.description}</p>
                            <NavLink to={`/course/${index}`}>
                                <Button label="View Course Page" />
                            </NavLink>
                        </div>
                    </AccordionTab>
                ))
                : (<p>"Loading courses..."</p>)
            }
            </Accordion>
        </div>
    );
};

export default HomePage;