import { App, Plugin, PluginSettingTab, Setting } from 'obsidian'

interface MyPluginSettings {
  setting1: string
  setting2: boolean
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  setting1: 'default',
  setting2: true
}

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings

  async onload() {
    await this.loadSettings()

    // Add settings tab
    this.addSettingTab(new MyPluginSettingTab(this.app, this))

    // Add ribbon icon
    const ribbonIconEl = this.addRibbonIcon(
      'dice',
      'My Plugin',
      (evt: MouseEvent) => {
        // Called when the user clicks the icon
        console.log('My Plugin was triggered')
      }
    )
  }

  onunload() {
    console.log('Unloading plugin')
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}

class MyPluginSettingTab extends PluginSettingTab {
  plugin: MyPlugin

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this
    containerEl.empty()

    containerEl.createEl('h2', { text: 'My Plugin Settings' })

    new Setting(containerEl)
      .setName('Setting 1')
      .setDesc('Description for setting 1')
      .addText((text) =>
        text
          .setPlaceholder('Enter setting 1')
          .setValue(this.plugin.settings.setting1)
          .onChange(async (value) => {
            this.plugin.settings.setting1 = value
            await this.plugin.saveSettings()
          })
      )

    new Setting(containerEl)
      .setName('Setting 2')
      .setDesc('Description for setting 2')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.setting2)
          .onChange(async (value) => {
            this.plugin.settings.setting2 = value
            await this.plugin.saveSettings()
          })
      )
  }
}
