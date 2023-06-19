import { useContext } from "react"
import { LevelContext } from "./levelcontext"

export default function Section({children})
{
    let level = useContext(LevelContext)
    return (
        <section className="section">
            <LevelContext.Provider value={level + 1}>
            {children}
            </LevelContext.Provider>
        </section>
    )
}