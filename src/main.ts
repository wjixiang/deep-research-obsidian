import { Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import { deepReserachAPI } from './run';
import { deepResearchObSettings, deepResearchObSettingTab, DEFAULT_SETTINGS } from './ob/setting'
import { logData } from './components/Log/log.types';
import { LogBoxView, LOGBOX} from './ob/LogBoxObView'
import QueryPopup from './ob/QueryPopupModal';
import { normalizePath } from 'obsidian';



export default class deepResearchOb extends Plugin {
	settings: deepResearchObSettings;
	deepReserachAPI: deepReserachAPI;
	queryFn = (query: string): Promise<string> => {
		return new Promise((resolve)=> {
			this.logdata.push({
				logType: 'query',
				logContent: query
			})

			new QueryPopup(this.app, query, resolve).open()
		})
	}
	logdata: logData[] = [];

	logger = (logContent: string) => {
		this.logdata.push({
			logType: 'log',
			logContent: logContent
		})

		console.log(logContent)
	}

	rootDir = ""
	fileWriter = async(fileName: string, content: string) => {
		await this.app.vault.create(normalizePath(this.rootDir + "/" + fileName), content)
		console.log("write file success:")
	}

	init = async() => {
		await this.loadSettings();
		this.addSettingTab(new deepResearchObSettingTab(this.app,this))
		this.deepReserachAPI = new deepReserachAPI(this.queryFn, this.settings,this.fileWriter, this.logger)

		this.registerView(LOGBOX, (leaf) => new LogBoxView(leaf, this.logdata))
	}


	async onload() {
		await this.init()
		
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			
			new Notice('start Deep Research');
			this.deepReserachAPI.run()
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async openLogBox() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(LOGBOX);
	
		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({ type: LOGBOX, active: true });
		}
	
		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf);
	}
}


