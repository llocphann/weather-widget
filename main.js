const { Plugin, PluginSettingTab, Setting, Notice } = require("obsidian");

module.exports = class WeatherPlugin extends Plugin {
  async onload() {
    console.log("Weather Plugin loaded");
    await this.loadSettings();
    this.addSettingTab(new WeatherSettingTab(this.app, this));
    this.addCommand({
      id: "insert-weather-codeblock",
      name: "Insert Weather Codeblock",
      callback: () => this.insertWeatherCodeblock(),
    });

    this.registerMarkdownCodeBlockProcessor("weather", (source, el) => {
      this.renderWeatherWidget(el);
    });
  }

  async loadSettings() {
    this.settings = Object.assign(
      {
        apiKey: "",
        city: "None",
        units: "metric",
        fontSize: "1em",
        fontColor: "#fff",
        backgroundColor: "#0A1519z",
        temperatureColor: "#fff",
        feelsLikeColor: "#fff",
        minMaxColor: "#fff",
        humidityColor: "#fff",
        windColor: "#fff",
        sunriseSunsetColor: "#fff",
        showTemperature: true,
        showFeelsLike: true,
        showMinMax: true,
        showHumidity: true,
        showWind: true,
        showSunriseSunset: true,
        iconCloud: "Left",
        temperaturePosition: "",
        temperatureFlexDirection: "column",
        feelsLikePosition: "center",
        minMaxPosition: "center",
        humidityPosition: "center",
        windPosition: "center",
        sunriseSunsetPosition: "center",
        fontFamily: "Arial",
      },
      await this.loadData()
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.reloadWeatherWidget();
  }

  async insertWeatherCodeblock() {
    const activeLeaf = this.app.workspace.activeLeaf;
    if (!activeLeaf) {
      new Notice("No active note open to insert codeblock.");
      return;
    }

    const editor = activeLeaf.view.sourceMode.cmEditor;
    const codeBlock = `
\`\`\`weather
city: ${this.settings.city}
units: ${this.settings.units}
apiKey: ${this.settings.apiKey}
\`\`\`
    `;
    editor.replaceSelection(codeBlock);
  }

  async renderWeatherWidget(el) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.settings.city}&units=${this.settings.units}&appid=${this.settings.apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Weather data fetch failed");
      const data = await response.json();
      const { main, weather, wind, sys } = data;

      const temperature = Math.round(main.temp);
      const feelsLike = Math.round(main.feels_like);
      const tempMin = Math.round(main.temp_min);
      const tempMax = Math.round(main.temp_max);
      const humidity = main.humidity;
      const windSpeed = Math.round(wind.speed);
      const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
      const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const iconCode = weather[0].icon;
      const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const weatherHtml = `
      <div style="background-color: ${this.settings.backgroundColor}; 
                  border-radius: 10px; padding: 20px; width: 100%; max-width: 100%; box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); font-family: '${
                    this.settings.fontFamily
                  }', sans-serif; color: ${this.settings.fontColor}; display: flex; flex-direction: column; align-items: ${
        this.settings.temperaturePosition
      } line-height: 1.5; font-size: ${this.settings.fontSize}; height: auto; max-height: 550px;">
        <h2 style="font-size: 1.8em; color: ${
          this.settings.temperatureColor
        }; font-weight: bold; margin-bottom: 15px;align-items: center; justify-content: center; display: "flex", flex-direction: "${
        this.settings.temperatureFlexDirection
      }">
          <img src="${weatherIcon}" alt="${description}" style="width: 80px; height: 80px; display: ${
        this.settings.iconCloud === "Left" ? "" : "none"
      }"/>
          <div>
            <strong style="font-size: 2.5em; color: ${this.settings.temperatureColor};">${temperature}°${
        this.settings.units === "metric" ? "C" : "F"
      }</strong>
            <p style="margin: 0; font-size: 1.1em; color: ${this.settings.fontColor}; margin-top: 8px; text-align: ${
        this.settings.descriptionAlignment
      };">${description}</p>
            <p style="margin: 0; font-size: 1em; color: ${this.settings.feelsLikeColor}; margin-top: 8px; text-align: ${
        this.settings.feelsLikePosition
      };">Feels like: ${feelsLike}°</p>
          </div>
          <img src="${weatherIcon}" alt="${description}" style="width: 80px; height: 80px; display: ${
        this.settings.iconCloud === "Right" ? "" : "none"
      }"/>
        </h2>
        <div style="margin-top: 15px; font-size: 0.95em; color: ${
          this.settings.fontColor
        }; display: grid; gap: 10px; grid-template-columns: 1fr 1fr; padding: 0 15px; font-weight: 400;">
          ${
            this.settings.showMinMax
              ? `<p style="margin: 0; font-size: 0.95em; color: ${this.settings.minMaxColor}; text-align: ${this.settings.minMaxPosition}">🌡️ Min: ${tempMin}° | Max: ${tempMax}°</p>`
              : ""
          }
          ${
            this.settings.showHumidity
              ? `<p style="margin: 0; font-size: 0.95em; color: ${this.settings.humidityColor}; text-align: ${this.settings.humidityPosition}">💧 Humidity: ${humidity}%</p>`
              : ""
          }
          ${
            this.settings.showWind
              ? `<p style="margin: 0; font-size: 0.95em; color: ${this.settings.windColor}; text-align: ${
                  this.settings.windPosition
                }">💨 Wind: ${windSpeed} ${this.settings.units === "metric" ? "m/s" : "mph"}</p>`
              : ""
          }
          ${
            this.settings.showSunriseSunset
              ? `<p style="margin: 0; font-size: 0.95em; color: ${this.settings.sunriseSunsetColor}; text-align: ${this.settings.sunriseSunsetPosition}">🌅 Sunrise: ${sunrise} | 🌇 Sunset: ${sunset}</p>`
              : ""
          }
        </div>
      </div>
    `;
      el.innerHTML = weatherHtml;
    } catch (error) {
      new Notice("Failed to load weather data.");
      console.error(error);
    }
  }

  reloadWeatherWidget() {
    this.app.workspace.getLeavesOfType("markdown").forEach((leaf) => {
      const view = leaf.view;
      if (view.getMode() === "source") return;

      const markdownEl = view.containerEl.querySelector(".markdown-preview-view");
      if (markdownEl) {
        markdownEl.querySelectorAll(".weather-container").forEach((weatherContainer) => {
          this.renderWeatherWidget(weatherContainer);
        });
      }
    });
  }
};

class WeatherSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
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

    new Setting(containerEl).setName("Temperature Position").addDropdown((dropdown) =>
      dropdown
        .addOption("start;", "Left")
        .addOption("", "Center")
        .addOption("end;", "Right")
        .setValue(this.plugin.settings.temperaturePosition)
        .onChange(async (value) => {
          this.plugin.settings.temperaturePosition = value;
          if (value !== "") {
            this.plugin.settings.temperatureFlexDirection = "row";
            this.plugin.settings.showMinMax = false;
            this.plugin.settings.showHumidity = false;
            this.plugin.settings.showWind = false;
            this.plugin.settings.showSunriseSunse = false;
            this.plugin.settings.iconCloud = value !== "start" ? "Right" : "Left";
          }
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Min/Max Position").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.minMaxPosition)
        .onChange(async (value) => {
          this.plugin.settings.minMaxPosition = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Wind Position").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.windPosition)
        .onChange(async (value) => {
          this.plugin.settings.windPosition = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Humidity Position").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.humidityPosition)
        .onChange(async (value) => {
          this.plugin.settings.humidityPosition = value;
          await this.plugin.saveSettings();
        })
    );

    new Setting(containerEl).setName("Sunrise/Sunset Position").addDropdown((dropdown) =>
      dropdown
        .addOption("left", "Left")
        .addOption("center", "Center")
        .addOption("right", "Right")
        .setValue(this.plugin.settings.sunriseSunsetPosition)
        .onChange(async (value) => {
          this.plugin.settings.sunriseSunsetPosition = value;
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
