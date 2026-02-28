import { useNavigate, useParams } from "react-router-dom";
import type { Reading } from "../classes/Course/Reading";
import "./ReadingPage.scss";
import { useEffect, useState } from "react";
import AppStorage from "../classes/AppStorage";
import type { Unit } from "../classes/Course/Unit";
import { ProgressSpinner } from "primereact/progressspinner";
import ChatAgent from "../classes/ChatAgent";
import { Button } from "primereact/button";


function ReadingPage() {
    let { courseIndex, unitIndex, readingIndex } = useParams();
    const navigate = useNavigate();
    const [reading, setReading] = useState<Reading | null>(null);
    const [loadingContent, setLoadingContent] = useState<boolean>(false);

    const retreiveReadingContent = async (reading: Reading): Promise<Reading> => {
        const chatAgent = new ChatAgent(AppStorage.getUser()?.apiKey || "");
        const updatedReading = await chatAgent.createReadingContent(reading);
        return updatedReading;
    };

    useEffect(() => {
        const units: Unit[] | null = AppStorage.getCourseUnits(parseInt(courseIndex || "-1"));
        if(units) {
            const foundUnit = units[parseInt(unitIndex || "-1")];
            if(foundUnit) {
                const foundReading = foundUnit.readings[parseInt(readingIndex || "-1")];
                if(foundReading) {
                    setReading(foundReading);
                }
            }
        }
    }, [courseIndex, unitIndex, readingIndex]);

    useEffect(() => {
        (async function() {
            if(reading) {
                if(!reading.content) {
                    setLoadingContent(true);
                    const newReading: Reading = await retreiveReadingContent(reading);
                    setReading(newReading);
                    // Update the reading content in storage
                    AppStorage.addReadingContent(
                        parseInt(courseIndex || "-1"),
                        parseInt(unitIndex || "-1"),
                        parseInt(readingIndex || "-1"),
                        newReading.content || []
                    );
                    setLoadingContent(false);

                }
            }
        })();
    }, [reading]);

    console.log(reading?.content);

    return (
        <div className="reading-page">
            <h1>{reading?.title}</h1>
            <h2>{reading?.description}</h2>
            {loadingContent ? (
                <div className="loading-content">
                    <ProgressSpinner />
                </div>
            ) : (
                <>
                    <div className="reading-content">
                        {reading?.content?.map((paragraph, index) => (
                            <p key={index}>&emsp;{paragraph}</p>
                        ))}
                    </div>
                    <div className="end-of-reading-actions">
                        <Button label="Back to Course" severity="secondary" onClick={() => navigate(`/course/${courseIndex}`)} />
                        <Button label="Mark as Read" severity="success" outlined />
                        <Button label="Next Reading" severity="secondary" disabled={true} />
                    </div>
                </>
            )}
        </div>
    );
}

export default ReadingPage;