import "./PlanOfStudyPage.scss"
import { useEffect, useState } from "react";
import type Course from "../classes/Course/Course";
import AppStorage from "../classes/AppStorage";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { calculateCourseCode, evalCourseProgress } from "../utils";
import { useNavigate } from "react-router-dom";

function CoursesRender({ courses, startIndex, endIndex }: { courses: Course[], startIndex: number, endIndex: number }) {
    const navigate = useNavigate();

    return (
        <Accordion>
        {
            courses.map((course, index) => (index >= startIndex && index < endIndex) ? (
                <AccordionTab
                    key={index}
                    header={
                        <div className="course-header">
                            <span className="course-header-text">
                                Course {calculateCourseCode(index)}:
                                <br />
                                {course.name}
                            </span>
                            <div className="course-header-progress">
                                <div className="course-header-progress-bar">
                                    <ProgressBar
                                        value={evalCourseProgress(course)}
                                    ></ProgressBar>
                                </div>
                                <span className="course-header-progress-text">Complete</span>
                            </div>
                        </div>
                    }
                >
                    <div className="course-content">
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                        <Button
                            label="View Course Page"
                            onClick={() => navigate(`/course/${index}`)}
                        />
                    </div>
                </AccordionTab>
            ) : null)
        }
        </Accordion>
    );
}

function PlanOfStudyPage() {
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
            {/* <ProgressBar
                value={evalPlanOfStudyProgress(courses)}
            ></ProgressBar> */}
            <h2>Your Plan of Study:</h2>
            <h3>Freshman Year</h3>
            <CoursesRender courses={courses} startIndex={0} endIndex={courses.length / 4} />
            <h3>Sophomore Year</h3>
            <CoursesRender courses={courses} startIndex={courses.length / 4} endIndex={courses.length / 2} />
            <h3>Junior Year</h3>
            <CoursesRender courses={courses} startIndex={courses.length / 2} endIndex={(3 * courses.length) / 4} />
            <h3>Senior Year</h3>
            <CoursesRender courses={courses} startIndex={(3 * courses.length) / 4} endIndex={courses.length} />
        </div>
    );
};

export default PlanOfStudyPage;