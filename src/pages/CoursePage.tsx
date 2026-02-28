import { useNavigate, useParams } from "react-router-dom";
import "./CoursePage.scss"
import { useEffect, useState } from "react";
import type Course from "../classes/Course/Course";
import AppStorage from "../classes/AppStorage";
import { calculateCourseCode } from "../utils";
import { ProgressBar } from "primereact/progressbar";

function CoursePage() {
    let { courseIndex } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);

    useEffect(() => {
        (async function() {
            const courses: Course[] | null = AppStorage.getCourses();
            if(!courseIndex || !courses) {
                alert(`Error: Could not find this course`);
                navigate("/home");
            }
            else {
                const index = parseInt(courseIndex);
                if(!isNaN(index) && index >= 0 && index < courses.length) {
                    setCourse(courses[index]);
                }
            }
        })();
    }, [courseIndex]);
    
    return (
        <div>
            <h1>Course {calculateCourseCode(parseInt(courseIndex || "0"))}: {course?.name}</h1>
            <ProgressBar value={(course?.progress || 0)*100}></ProgressBar>
            <p>{course?.description}</p>
            <h2>Curriculum</h2>
            <p>Course curriculum will go here. This is a placeholder page for now.</p>
            <p>units: {course?.units?.length || 0}</p>
        </div>
    );
}

export default CoursePage;