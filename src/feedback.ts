import { generateObject } from 'ai';
import { z } from 'zod';
import { systemPrompt } from './prompt';
import { provider } from './ai/providers';

export class feedback {
	provider: provider;

	constructor(AIProvider: provider){
		this.provider = AIProvider
	}

	async generateFeedback({
		query,
		numQuestions = 3,
		}: {
		query: string;
		numQuestions?: number;
		}) {
		
		const userFeedback = await generateObject({
			model: this.provider.invokeModal('gpt-4o-mini', false),
			system: systemPrompt(),
			prompt: `Given the following query from the user, ask some follow up questions to clarify the research direction. Return a maximum of ${numQuestions} questions, but feel free to return less if the original query is clear: <query>${query}</query>`,
			schema: z.object({
			introduce: z.string(),
			questions: z
				.array(z.string())
				.describe(
				`Follow up questions to clarify the research direction, max of ${numQuestions}`,
				),
			}),
		});
		
		return userFeedback.object.questions.slice(0, numQuestions);
	}
		
}

// export async function generateFeedback({
//   query,
//   numQuestions = 3,
// }: {
//   query: string;
//   numQuestions?: number;
// }) {

//   const userFeedback = await generateObject({
//     model: gpt4omini,
//     system: systemPrompt(),
//     prompt: `Given the following query from the user, ask some follow up questions to clarify the research direction. Return a maximum of ${numQuestions} questions, but feel free to return less if the original query is clear: <query>${query}</query>`,
//     schema: z.object({
//       introduce: z.string(),
//       questions: z
//         .array(z.string())
//         .describe(
//           `Follow up questions to clarify the research direction, max of ${numQuestions}`,
//         ),
//     }),
//   });

//   return userFeedback.object.questions.slice(0, numQuestions);
// }
