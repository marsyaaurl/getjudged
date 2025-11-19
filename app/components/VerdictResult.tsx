"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function VerdictResult({
    verdict,
    explanation,
    question,
    confession,   // ⬅ add this
    onClose,
}: {
    verdict: string;
    explanation: string;
    question: string;
    confession: string;
    onClose: () => void;
}) {
    const router = useRouter();

    const sendToDB = async () => {
        const { error } = await supabase.from("confessions").insert([
            {
                question: question,
                verdict: verdict,
                explanation: explanation,
                confession: confession, // ⬅ SEND IT
                likes: 0,
            },
        ]);

        if (error) {
            console.log(error);
            alert("Failed posting your confession");
        } else {
            alert("Your confession has been posted");
        }

        router.push("/Verdicts");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md">
                <h2
                    className={`text-5xl font-bold text-center ${
                        verdict === "GUILTY"
                            ? "text-[#FF1592]"
                            : "text-[#F5BD1E]"
                    }`}
                >
                    {verdict}
                </h2>

                <p className="mt-3 text-center">{explanation}</p>

                <div className="flex justify-between">
                    <button
                        className="mt-5 px-4 py-2 bg-white border-2 text-[#E11180] font-semibold rounded-lg"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="flex flex-col mt-5 px-4 bg-[#E11180] font-semibold text-white rounded-lg"
                        onClick={sendToDB}
                    >
                        Post<span className="text-xs font-thin">Anonymously</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
