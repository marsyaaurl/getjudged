import Navbar from "../components/Navbar";
import VerdictCard from "../components/VerdictCard";
import VerdictResult from "../components/VerdictResult";

export default function Verdicts(){
    return(
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <VerdictCard />
            </div>
        </>
    )
}