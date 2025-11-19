"use client";
import { useState, useEffect } from "react";
import { question } from "../data/questions";

export default function ConfessForm({
    onResult,
}: {
    onResult: (q: string, v: string, e: string, c: string) => void;
}) {
    const [value, setValue] = useState("");
    const [randomQuestion, setRandomQuestion] = useState("");

    function randomize<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    useEffect(() => {
        setRandomQuestion(randomize(question));
    }, []);

    const sendToAI = async () => {
        const res = await fetch("/api/judge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ story: value }),
        });

        const data = await res.json();

        // ⬅⬅⬅ PASS CONFESSION HERE
        onResult(randomQuestion, data.verdict, data.explanation, value);
    };

    return (
        <div className="flex flex-col gap-y-4 justify-center items-center">
            <div className="text-center w-full font-bold text-3xl text-[#FF1592]">
                {randomQuestion || "Loading question..."}
            </div>

            <div className="w-full max-w-2xl flex flex-col gap-4 px-5 md:px-0">
                <textarea
                    className="rounded-2xl w-full h-60 p-5 border-2 border-[#E11180]"
                    placeholder="Spill your confession here..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>

                <button
                    className="bg-[#E11180] font-semibold text-white rounded-xl w-full px-5 py-3"
                    onClick={sendToAI}
                    type="button"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
