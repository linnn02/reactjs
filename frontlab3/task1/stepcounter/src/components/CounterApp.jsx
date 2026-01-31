import React from "react";
import StepCounter from "./StepCounter";

export default function CounterApp() {
    return (
        <div style={{ maxWidth: 520, margin: "0 auto", fontFamily: "Arial" }}>
            <h2>CounterApp (nezavisimye schetchiki)</h2>
            {/* 
            Здесь два отдельных компонента StepCounter. Они независимы, потому что у каждого
            свой собственный state внутри (useState). Props задают старт и шаг
             */}

            <h4>Counter 1: initialValue=0, step=1</h4><StepCounter initialValue={0} step={1} />

            <h4>Counter 2: initialValue=10, step=5</h4><StepCounter initialValue={10} step={5} />
        </div>);
}
