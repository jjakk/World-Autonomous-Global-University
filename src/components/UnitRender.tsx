import type { Unit } from "../classes/Course/Unit";
import "./UnitRender.scss";

interface UnitRenderProps {
    unit: Unit;
};

function UnitRender({ unit }: UnitRenderProps) {
    return (
        <div>
            {unit.reading.map((reading, rIndex) => (
                <div key={rIndex}>
                    <h3>Reading {rIndex + 1} - {reading.title}</h3>
                    <h4>{ reading.description }</h4>
                    <p>{ reading?.content || "No content yet"  }</p>
                </div>
            ))}
        </div>
    );
}

export default UnitRender;