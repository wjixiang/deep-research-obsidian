import * as fs from 'fs/promises';
// import * as readline from 'readline';

import { researchWorker } from './deep-research';

import { OutputManager } from './output-manager';
import { deepResearchObSettings } from './setting';
import { provider } from './ai/providers';
import { feedback } from './feedback';


export class deepReserachAPI {
	queryFn: (query: string)=> Promise<string>;
	setting: deepResearchObSettings;
	provider: provider;
	feedback: feedback;
	researchWorker: researchWorker;

	constructor (queryFn: (query: string)=> Promise<string>, setting: deepResearchObSettings) {
		this.queryFn = queryFn
		this.setting = setting
		this.provider = new provider(this.setting)
		this.feedback = new feedback(this.provider)
		this.researchWorker = new researchWorker(this.setting,this.provider)
	}

	askQuestion(query: string): Promise<string> {
		return new Promise( resolve => {
			this.queryFn(query)
				.then(queryResult => resolve(queryResult))
		});
	}

	// run the agent
	async run() {
		// Get initial query
		const initialQuery = await this.askQuestion('What would you like to research? ');
	
		// Get breath and depth parameters
		const breadth =
			parseInt(
			await this.askQuestion(
				'Enter research breadth (recommended 2-10, default 4): ',
			),
			10,
			) || 4;
		const depth =
			parseInt(
			await this.askQuestion('Enter research depth (recommended 1-5, default 2): '),
			10,
			) || 2;

		log(`Creating research plan...`);

		// Generate follow-up questions
		const followUpQuestions = await this.feedback.generateFeedback({
			query: initialQuery,
		});

		log(
			'\nTo better understand your research needs, please answer these follow-up questions:',
		);

		// Collect answers to follow-up questions
		const answers: string[] = [];
		for (const question of followUpQuestions) {
			const answer = await this.askQuestion(`\n${question}\nYour answer: `);
			answers.push(answer);
		}

		// Combine all information for deep research
		const combinedQuery = `
		Initial Query: ${initialQuery}
		Follow-up Questions and Answers:
		${followUpQuestions.map((q: string, i: number) => `Q: ${q}\nA: ${answers[i]}`).join('\n')}
		`;

		log('\nResearching your topic...');

		log('\nStarting research with progress tracking...\n');

		const { learnings, visitedUrls } = await this.researchWorker.deepResearch({
			query: combinedQuery,
			breadth,
			depth,
			onProgress: (progress) => {
			output.updateProgress(progress);
			},
		});

		log(`\n\nLearnings:\n\n${learnings.join('\n')}`);
		log(
			`\n\nVisited URLs (${visitedUrls.length}):\n\n${visitedUrls.join('\n')}`,
		);
		log('Writing final report...');

		const report = await this.researchWorker.writeFinalReport({
			prompt: combinedQuery,
			learnings,
			visitedUrls,
		});

		// Save report to file
		await fs.writeFile('output.md', report, 'utf-8');

		console.log(`\n\nFinal Report:\n\n${report}`);
		console.log('\nReport has been saved to output.md');
  }
}

const output = new OutputManager();

// Helper function for consistent logging
function log(...args: any[]) {
  output.log(...args);
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// Helper function to get user input
