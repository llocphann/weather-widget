import { PluginSettingTab, Setting } from "obsidian";
import WeatherPlugin from "./index";

export class WeatherSettingTab extends PluginSettingTab {
  plugin: WeatherPlugin;
  constructor(app: any, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    const addBiggerSpace = () => containerEl.createEl("div", { text: "", attr: { style: "margin-bottom: 20px;" } });

    containerEl.createEl("h1", { text: "Weather Plugin Settings" });

    addBiggerSpace();
    containerEl.createEl("h3", { text: "API Configuration" });
    new Setting(containerEl)
      .setName("API Key")
      .setDesc("Enter your OpenWeatherMap API Key.")
      .addText((text) =>
        text
          .setPlaceholder("Enter API Key")
          .setValue(this.plugin.settings.apiKey)
          .onChange(async (value) => {
            this.plugin.settings.apiKey = value;
            await this.plugin.saveSettings();
          })
      );

    addBiggerSpace();
    containerEl.createEl("h3", { text: "City and Units" });
    new Setting(containerEl).setName("City").addText((text) =>
      text.setValue(this.plugin.settings.city).onChange(async (value) => {
        this.plugin.settings.city = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Units").addDropdown((dropdown) =>
      dropdown
        .addOption("metric", "Metric (°C)")
        .addOption("imperial", "Imperial (°F)")
        .setValue(this.plugin.settings.units)
        .onChange(async (value) => {
          this.plugin.settings.units = value;
          await this.plugin.saveSettings();
        })
    );

    addBiggerSpace();
    containerEl.createEl("h3", { text: "Display Settings" });
    ["showTemperature", "showFeelsLike", "showMinMax", "showHumidity", "showWind", "showSunriseSunset"].forEach((key) => {
      new Setting(containerEl).setName(key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")).addToggle((toggle) =>
        toggle.setValue(this.plugin.settings[key]).onChange(async (value) => {
          this.plugin.settings[key] = value;
          await this.plugin.saveSettings();
        })
      );
    });

    addBiggerSpace();
    containerEl.createEl("h3", { text: "Styling Settings" });

    addBiggerSpace();
    containerEl.createEl("h4", { text: "Font Settings" });

    new Setting(containerEl).setName("Font Size").addText((text) =>
      text.setValue(this.plugin.settings.fontSize).onChange(async (value) => {
        this.plugin.settings.fontSize = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Font Family").addText((text) =>
      text.setValue(this.plugin.settings.fontFamily).onChange(async (value) => {
        this.plugin.settings.fontFamily = value;
        await this.plugin.saveSettings();
      })
    );

    addBiggerSpace();
    containerEl.createEl("h4", { text: "Color Settings" });

    new Setting(containerEl).setName("Status Color").addText((text) =>
      text.setValue(this.plugin.settings.fontColor).onChange(async (value) => {
        this.plugin.settings.fontColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Feels Like Color").addText((text) =>
      text.setValue(this.plugin.settings.feelsLikeColor).onChange(async (value) => {
        this.plugin.settings.feelsLikeColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Humidity Color").addText((text) =>
      text.setValue(this.plugin.settings.humidityColor).onChange(async (value) => {
        this.plugin.settings.humidityColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Wind Color").addText((text) =>
      text.setValue(this.plugin.settings.windColor).onChange(async (value) => {
        this.plugin.settings.windColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Sunrise Sunset Color").addText((text) =>
      text.setValue(this.plugin.settings.sunriseSunsetColor).onChange(async (value) => {
        this.plugin.settings.sunriseSunsetColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Min/Max Color").addText((text) =>
      text.setValue(this.plugin.settings.minMaxColor).onChange(async (value) => {
        this.plugin.settings.minMaxColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Background Color").addText((text) =>
      text.setValue(this.plugin.settings.backgroundColor).onChange(async (value) => {
        this.plugin.settings.backgroundColor = value;
        await this.plugin.saveSettings();
      })
    );

    new Setting(containerEl).setName("Temperature Color").addText((text) =>
      text.setValue(this.plugin.settings.temperatureColor).onChange(async (value) => {
        this.plugin.settings.temperatureColor = value;
        await this.plugin.saveSettings();
      })
    );

    addBiggerSpace();
    containerEl.createEl("h3", { text: "Text Alignment Settings" });

    new Setting(containerEl).setName("Feels Like Alignment").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.feelsLikeAlignment)
        .onChange(async (value) => {
          this.plugin.settings.feelsLikeAlignment = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Min/Max Alignment").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.minMaxAlignment)
        .onChange(async (value) => {
          this.plugin.settings.minMaxAlignment = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Wind Alignment").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.windAlignment)
        .onChange(async (value) => {
          this.plugin.settings.windAlignment = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Humidity Alignment").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.humidityAlignment)
        .onChange(async (value) => {
          this.plugin.settings.humidityAlignment = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Sunrise/Sunset Alignment").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.sunriseSunsetAlignment)
        .onChange(async (value) => {
          this.plugin.settings.sunriseSunsetAlignment = value;
          await this.plugin.saveSettings();
        })
    );

    addBiggerSpace();
    new Setting(containerEl)
      .setName("Support the Plugin")
      .setDesc("If you like this plugin, consider buying me a coffee!")
      .addButton((button) =>
        button
          .setButtonText(" Buy Me a Coffee") // Text next to the icon
          .onClick(() => {
            window.open("https://buymeacoffee.com/llocphann", "_blank");
          })
      );
  }
}
