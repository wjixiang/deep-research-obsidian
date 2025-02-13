import { generateObject, generateText} from "ai";
import { o3MiniModel } from "./ai/providers";
import { generateFeedback } from "./feedback";
import exp from "constants";
import { systemPrompt } from "./prompt";

const testSetting = {
    numQuestions: 3,
    query: "Summarize the latest development of the treatment of cardiac failure thoroughly, based on solid evidence."
}

describe(generateObject, () => {
    it.skip("generate text", async() => {
        const result = await generateText({
            model: o3MiniModel,
            prompt: "what is the biggest thing in the world?"
        }).then((value)=>{
            console.log(value.text)
            expect(value)
        }) 
    },10000)

    it("generate object", async() => {
        const userFeedbackText = await generateText({
            model: o3MiniModel,
            system: systemPrompt(),
            prompt: `Given the following query from the user, ask some follow up questions to clarify the research direction. Return a maximum of ${testSetting.numQuestions} questions, but feel free to return less if the original query is clear: <query>${testSetting.query}</query>`,
          })

        const result = await generateFeedback({
            query: "Summarize the latest development of the treatment of cardiac failure",
            numQuestions: 3
        })

        expect(result)
    },10000)
})