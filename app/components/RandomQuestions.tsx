import { question } from "../data/questions";

export default function RandomQuestions() {
    function randomize<Q>(arr: Q[]): Q {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    const res = randomize(question);

    return (
        <>
            <div className="text-center w-full font-bold text-3xl text-[#FF1592]">
                {res}
            </div>
        </>
    )
}