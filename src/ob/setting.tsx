import { PluginSettingTab, App, Setting } from "obsidian";
import deepResearchOb from "../main";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import styled from "styled-components";

import ReactSwitch from "react-switch";

export interface deepResearchObSettings {  
    OPENAI_ENDPOINT: string;
    OPENAI_KEY: string;
	CONTEXT_SIZE: string;
	IS_FIRECRAWL_SELF_HOST: boolean;
	FIRECRAWL_OFFICAL_KEY: string;
	FIRECRAWL_SELF_HOST_KEY: string;
	FIRECRAWL_BASE_URL: string;
	OPENAI_MODEL: string;
	CONCURENCY_LIMIT: string
}
  
  
export const DEFAULT_SETTINGS: Partial<deepResearchObSettings> = {  
	OPENAI_ENDPOINT: '',
    OPENAI_KEY: "",
	CONTEXT_SIZE: "128000",
	OPENAI_MODEL: "o3-mini",
	FIRECRAWL_OFFICAL_KEY: "",
	FIRECRAWL_SELF_HOST_KEY: "",
	FIRECRAWL_BASE_URL: "http://localhost:3002",
	IS_FIRECRAWL_SELF_HOST: false
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
		
		const settingDiv = containerEl.createDiv({cls:"setting-item"})
		const root = createRoot(settingDiv)
		const saveSet = async (data:deepResearchObSettings) => {
			this.plugin.saveData(data)
		}
		root.render(<>
			<FirecrawlSetting settings={this.plugin.settings} save={saveSet} />
		</>)
    }  
  }  


type SettingProps = {
	settings: deepResearchObSettings;
	save: (data:deepResearchObSettings)=>Promise<void>;
}
export const FirecrawlSetting = ({settings, save}: SettingProps) => {
	const [firecrawlUseLocalhost, setfirecrawlUseLocalhost] = useState<boolean>(settings.IS_FIRECRAWL_SELF_HOST)

	const [firecrawlBaseUrl, setFirecrawlBaseUrl] = useState<string>(  
		settings.FIRECRAWL_BASE_URL || "https://api.firecrawl.dev"  
	);  
	const [firecrawlOfficalKey, setFirecrawlofficalKey] = useState<string>(  
		settings.FIRECRAWL_OFFICAL_KEY || ""  
	);  

	const [firecrawlSelfHostKey, setFirecrawlSelfHostKey] = useState<string>(  
		settings.FIRECRAWL_OFFICAL_KEY || ""  
	);  

	const toggleFircrawlProvider = () => {
		
		const firecrawlLocalhustUse = !firecrawlUseLocalhost

		setfirecrawlUseLocalhost(firecrawlLocalhustUse)
		settings.IS_FIRECRAWL_SELF_HOST = firecrawlLocalhustUse
		save(settings)
	}

	const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
		const newBaseUrl = e.target.value;  
		setFirecrawlBaseUrl(newBaseUrl);  
		settings.FIRECRAWL_BASE_URL = newBaseUrl
		save(settings)
	};  

	const handleOfficalApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
		const newApiKey = e.target.value;  
		setFirecrawlofficalKey(newApiKey);  
		settings.FIRECRAWL_OFFICAL_KEY = newApiKey
		save(settings) 
	};  

	const handleSelfHostApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
		const newApiKey = e.target.value;  
		setFirecrawlSelfHostKey(newApiKey);  
		settings.FIRECRAWL_OFFICAL_KEY = newApiKey
		save(settings) 
	}; 

	return ( 
		<div style={{
			width: "100%"
		}}>
			<h1>Firecrawl</h1>
			<InlineToggleDiv>
				<h2>Use Local Host </h2>	
				<ReactSwitch 
						checked={firecrawlUseLocalhost}
						onChange={toggleFircrawlProvider}
					/>
			</InlineToggleDiv>
			{firecrawlUseLocalhost ? 
				<>
					<div className="setting-item-info">
						<div className="setting-item-name">
							FIRECRAWL_BASE_URL
						</div>

						<div className="setting-item-description">

						</div>
					</div>

					<div className="setting-item-control">
						<input type="text" spellCheck="false" placeholder="Enter your Firecrawl URL" 
							value={firecrawlBaseUrl}  
							onChange={handleBaseUrlChange}  
					/>
					</div>

					<div className="setting-item-info">
						<div className="setting-item-name">
							FIRECRAWL_SLEF_HOST_KEY
						</div>

						<div className="setting-item-description">

						</div>
					</div>

					<div className="setting-item-control">
						<input type="text" spellCheck="false" placeholder="Enter your api-key" 
							value={firecrawlSelfHostKey}  
							onChange={handleSelfHostApiKeyChange}  
							/>
					</div>
				</>
				:
				<SettingContainer>
					<div className="setting-item-info">
						<div className="setting-item-name">
							FIRECRAWL_OFFICAL_KEY
						</div>

						<div className="setting-item-description">

						</div>
					</div>

					<div className="setting-item-control">
					<input type="text" spellCheck="false" placeholder="Enter your api-key" 
							value={firecrawlOfficalKey}  
							onChange={handleOfficalApiKeyChange}  
							/>
					</div>
				</SettingContainer>}
		</div>
	);
}

const InlineToggleDiv = styled.div`
	display: inline-flex;
	align-items: center;
`
const SettingContainer = styled.div`
	display: flex;
	justify-content: space-between;
`
