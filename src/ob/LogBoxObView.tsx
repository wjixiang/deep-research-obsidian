import { createRoot } from 'react-dom/client';  
import { ItemView, WorkspaceLeaf } from 'obsidian';
import { LogBox } from '../components/Log/LogBox';
import { logData } from '../components/Log/log.types';

export const LOGBOX = 'node_graph';

export class LogBoxView extends ItemView {

	logData: logData[];
  constructor(leaf: WorkspaceLeaf, logData: logData[]) {
    super(leaf);
	this.logData = logData
  }

  getViewType() {
    return LOGBOX;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
	const root = createRoot(container);
	root.render(<LogBox logs={this.logData}/>)
    
  }

  async onClose() {
    // Nothing to clean up.
  }
}
