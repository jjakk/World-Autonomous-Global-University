import { useEffect, useState } from "react";
import "./HomePage.scss"
import type Course from "../classes/Course";
import AppStorage from "../classes/AppStorage";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressBar } from "primereact/progressbar";

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
            <p>Your personalized AI-powered education experience starts here.</p>
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
                                <span className="course-header-text">{course.name}</span>
                                <div className="course-header-progress">
                                    <ProgressBar value={course.progress*100}></ProgressBar>
                                </div>
                            </div>
                        }
                    >
                        <div className="course-details">
                            <h2>{course.name}</h2>
                            <pre>{course.description}</pre>
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