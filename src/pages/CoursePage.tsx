import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./CoursePage.scss"
import { useEffect, useState } from "react";
import type Course from "../classes/Course/Course";
import AppStorage from "../classes/AppStorage";
import { calculateCourseCode } from "../utils";
import { ProgressBar } from "primereact/progressbar";
import ChatAgent from "../classes/ChatAgent";
import type { Unit } from "../classes/Course/Unit";
import { ProgressSpinner } from "primereact/progressspinner";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";

function CoursePage() {
    let { courseIndex } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [units, setUnits] = useState<Unit[]>([]);
    const [loadingContent, setLoadingContent] = useState(false);

    const createNewUnits = async (course: Course): Promise<Unit[]> => {
        let newUnits: Unit[] = [];
        setLoadingContent(true);
        if(course) {
            const chatAgent = new ChatAgent(AppStorage.getUser()?.apiKey || "");
            newUnits = await chatAgent.createUnits(course);
            setLoadingContent(false);
        }
        setLoadingContent(false);
        return newUnits;
    };

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

    useEffect(() => {
        (async () => {
            if(course?.units?.length) {
                setUnits(course.units);
            }
            else if(course) {
                const newUnits: Unit[] = await createNewUnits(course);
                AppStorage.addCourseUnits(course, newUnits);
                setUnits(newUnits);
            }
        })();
    }, [course]);
    
    return (
        <div>
            <h1>Course {calculateCourseCode(parseInt(courseIndex || "0"))}: {course?.name}</h1>
            <h2>{course?.description}</h2>
            <ProgressBar value={(course?.progress || 0)*100}></ProgressBar>
            <h2>Curriculum</h2>
            {loadingContent ? (
                <div className="loading-content">
                    <ProgressSpinner />
                </div>
            ) : (
                <Accordion>
                    {units.map((unit, index) => (
                        <AccordionTab key={index} header={unit.name} disabled={!unit.unlocked}>
                            <h3>{unit.name}</h3>
                            {unit.readings.map((reading, rIndex) => (
                                <div key={rIndex}>
                                    <h4>Reading {rIndex + 1} - {reading.title}</h4>
                                    <h5>{reading.description}</h5>
                                    <Button
                                        label={"View Reading" + (reading.unlocked ? "" : " (Locked)")}
                                        disabled={!reading.unlocked}
                                        onClick={() => navigate(`/course/${courseIndex}/unit/${index}/reading/${rIndex}`)}
                                        outlined
                                    />
                                </div>
                            ))}
                        </AccordionTab>
                    ))}
                </Accordion>
            )}
        </div>
    );
}

export default CoursePage;