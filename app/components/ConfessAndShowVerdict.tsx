"use client";
import { useState } from "react";
import ConfessForm from "./ConfessForm";
import VerdictResult from "./VerdictResult";

export default function ConfessAndShowVerdict() {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [verdict, setVerdict] = useState("");
    const [explanation, setExplanation] = useState("");
    const [confession, setConfession] = useState("");

    const handleResult = (q: string, v: string, e: string, c: string) => {
        setVerdict(v);
        setExplanation(e);
        setQuestion(q);
        setConfession(c);
        setIsOpen(true);
    };

    return (
        <>
            <ConfessForm onResult={handleResult} />

            {isOpen && (
                <VerdictResult
                    verdict={verdict}
                    explanation={explanation}
                    question={question}
                    confession={confession}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
