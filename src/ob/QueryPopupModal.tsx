import { App, Modal } from "obsidian";
import { createRoot } from "react-dom/client";
import { ResearchComplimentBox } from "../components/Log/ResearchComplimentPopup";


export default class QueryPopup extends Modal {
	query: string
	response: (res:string)=>void

	constructor(app: App, query:string, response: (res:string)=>void) {
		super(app);
		this.query = query
		this.response = (userInput: string) => {
			response(userInput)
			this.close()
		}
	}

	onOpen() {
		const {contentEl} = this;
		const root = createRoot(contentEl)
		root.render(<ResearchComplimentBox query={this.query} resposneCallback={this.response }/>)

	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
