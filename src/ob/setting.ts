import { PluginSettingTab, App, Setting } from "obsidian";
import deepResearchOb from "../main";

export interface deepResearchObSettings {  
    OPENAI_ENDPOINT: string;
    OPENAI_KEY: string;
	CONTEXT_SIZE: string;
	FIRECRAWL_KEY: string;
	FIRECRAWL_BASE_URL: string;
	OPENAI_MODEL: string;
}
  
  
export const DEFAULT_SETTINGS: Partial<deepResearchObSettings> = {  
	OPENAI_ENDPOINT: '',
    OPENAI_KEY: "",
	CONTEXT_SIZE: "128000",
	OPENAI_MODEL: "o3-mini",
	FIRECRAWL_KEY: "",
	FIRECRAWL_BASE_URL: "http://localhost:3002"
};

export class deepResearchObSettingTab extends PluginSettingTab {  
    plugin: deepResearchOb;  
  
    constructor(app: App, plugin: deepResearchOb) {  
        super(app, plugin);  
        this.plugin = plugin;  
    }  
  
    display(): void {  
        const { containerEl } = this;  
        containerEl.empty();  
  
        new Setting(containerEl)
          .setName('OPENAI_ENDPOINT')
          .setDesc('API提供地址')
          .addText(text => text
            .setPlaceholder('Enter your url')
            .setValue(this.plugin.settings.OPENAI_ENDPOINT)
            .onChange(async (value) => {
              this.plugin.settings.OPENAI_ENDPOINT = value;
              await this.plugin.saveSettings();
            }));
  
        new Setting(containerEl)
          .setName('OPENAI_KEY')
          .setDesc("OpenAI API-key")
          .addText(text => text
            .setPlaceholder('Enter your api-key')
            .setValue(this.plugin.settings.OPENAI_KEY)
            .onChange(async (value) => {
              this.plugin.settings.OPENAI_KEY = value;
              await this.plugin.saveSettings();
            }));

		new Setting(containerEl)
			.setName('OPENAI_MODEL')
			.setDesc("model")
			.addText(text => text
				.setPlaceholder('Enter your api-key')
				.setValue(this.plugin.settings.OPENAI_MODEL)
				.onChange(async (value) => {
					this.plugin.settings.OPENAI_MODEL = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('CONTEXT_SIZE')
			.addText(text => text
				.setValue(this.plugin.settings.CONTEXT_SIZE)
				.onChange(async (value) => {
					this.plugin.settings.CONTEXT_SIZE = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('FIRECRAWL_KEY')
			.addText(text => text
				.setValue(this.plugin.settings.FIRECRAWL_KEY)
				.onChange(async (value) => {
					this.plugin.settings.FIRECRAWL_KEY = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('FIRECRAWL_BASE_URL')
			.addText(text => text
				.setValue(this.plugin.settings.FIRECRAWL_BASE_URL)
				.onChange(async (value) => {
					this.plugin.settings.FIRECRAWL_BASE_URL = value;
					await this.plugin.saveSettings();
				}));
    }  
  }  
