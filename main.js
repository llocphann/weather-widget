const { Plugin, ItemView, WorkspaceLeaf, Notice } = require("obsidian");
const VIEW_TYPE_WEATHER = "weather-view";

class WeatherView extends ItemView {
  constructor(leaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_WEATHER;
  }
  getDisplayText() {
    return "Weather";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    const apiKey = "a9e5efabf088c3375702924bf0903e63"; 
    const city = "Can Tho, VN"; 
    const units = "metric"; 
    const widgetContainer = container.createDiv({ cls: "weather-widget" });
    this.renderWeatherWidget(widgetContainer, apiKey, city, units);
  }

  async renderWeatherWidget(el, apiKey, city, units) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    console.log("Fetching weather data from:", url);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      console.log("Weather data received:", data);
      const { main, weather, dt, timezone } = data;
      const temperature = Math.round(main.temp);
      const description =weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
      const localTime = new Date((dt + timezone) * 1000);
      const hours = localTime.getUTCHours();
      const isMorning = hours >= 6 && hours < 18;
      const container = containerEl.createEl('div');

      // Day section
      const day = container.createEl('div', { cls: 'day' });
      day.createEl('span', { cls: 'sun' });
      day.createEl('span', { cls: 'sunx' });
      // Cloudy weather variations
      const mbCloudy = container.createEl('div', { cls: 'mbcloudy' });
      mbCloudy.createEl('span', { cls: 'cloud' });
      mbCloudy.createEl('span', { cls: 'cloudx' });
      mbCloudy.createEl('span', { cls: 'cloudz' });

      const msCloudy = container.createEl('div', { cls: 'mscloudy' });
      msCloudy.createEl('span', { cls: 'sunc' });
      msCloudy.createEl('span', { cls: 'suncx' });
      msCloudy.createEl('span', { cls: 'scloud' });
      msCloudy.createEl('span', { cls: 'scloudx' });
      const mfCloudy = container.createEl('div', { cls: 'mfcloudy' });
      mfCloudy.createEl('span', { cls: 'sunc' });
      mfCloudy.createEl('span', { cls: 'suncx' });
      mfCloudy.createEl('span', { cls: 'scloud' });
      const ebCloudy = container.createEl('div', { cls: 'ebcloudy' });
      ebCloudy.createEl('span', { cls: 'cloud' });
      ebCloudy.createEl('span', { cls: 'cloudx' });
      ebCloudy.createEl('span', { cls: 'cloudz' });
      // Night scene
      const night = container.createEl('div', { cls: 'night' });
      night.createEl('span', { cls: 'moon' });
      night.createEl('span', { cls: 'spot1' });
      night.createEl('span', { cls: 'spot2' });
      const nightStars = night.createEl('ul');
      for (let i = 0; i < 5; i++) {
        nightStars.createEl('li');
      }

      // Misty weather
      const mmist = container.createEl('div', { cls: 'mmist' });
      mmist.createEl('span', { cls: 'mcloudtl' });
      mmist.createEl('span', { cls: 'mcloudtr' });
      mmist.createEl('span', { cls: 'mcloudbr' });
      mmist.createEl('span', { cls: 'sunc' });
      mmist.createEl('span', { cls: 'suncx' });

      const emist = container.createEl('div', { cls: 'emist' });
      emist.createEl('span', { cls: 'mcloudtl' });
      emist.createEl('span', { cls: 'mcloudtr' });
      emist.createEl('span', { cls: 'mcloudbr' });
      emist.createEl('span', { cls: 'moon' });
      emist.createEl('span', { cls: 'spot1' });
      emist.createEl('span', { cls: 'spot2' });
      const emistList = emist.createEl('ul');
      for (let i = 0; i < 5; i++) {
        emistList.createEl('li');
      }

      // Snowy weather
      const msnowy = container.createEl('div', { cls: 'msnowy' });
      const msnowySnow = msnowy.createEl('ul');
      for (let i = 0; i < 8; i++) {
        msnowySnow.createEl('li');
      }
      msnowy.createEl('span', { cls: 'snowe' });
      msnowy.createEl('span', { cls: 'snowex' });
      msnowy.createEl('span', { cls: 'stick' });
      msnowy.createEl('span', { cls: 'stick2' });

      let weatherHTML = `
    <div class="weather-info">
      <p>${temperature}°C</p>
      <p>${description}</p>`;
  
  if (description.includes("Clear sky")) {
    weatherHTML += isMorning
      ? `<div class="day">
          <span class="sun"></span>
          <span class="sunx"></span>
        </div>`
      : `<div class="night">
          <span class="moon"></span>
          <span class="spot1"></span>
          <span class="spot2"></span>
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>    
          </ul>
        </div>`;
  } else if (description.includes("Few clouds")) {
    weatherHTML += isMorning
      ? `<div class="mfcloudy">
          <span class="sunc"></span>
          <span class="suncx"></span>  
          <span class="scloud"></span>
        </div>`
      : `<div class="efcloudy">
          <span class="moon"></span>
          <span class="scloud"></span>
        </div>`;
  } else if (description.includes("Scattered clouds")) {
    weatherHTML += isMorning
      ? `<div class="mscloudy">
          <span class="sunc"></span>
          <span class="suncx"></span>  
          <span class="scloud"></span>
          <span class="scloudx"></span>
        </div>`
      : `<div class="escloudy">
          <span class="moon"></span>  
          <span class="scloud"></span>
          <span class="scloudx"></span>
        </div>`;
  } else if (description.includes("Broken clouds")) {
    weatherHTML += isMorning
      ? `<div class="mbcloudy">
            <span class="cloud"></span>
            <span class="cloudx"></span>
            <span class="cloudz"></span>
        </div>`
      : `<div class="ebcloudy">
            <span class="cloud"></span>
            <span class="cloudx"></span>
            <span class="cloudz"></span>
        </div>`;
  } else if (description.includes("Shower rain")) {
    weatherHTML += isMorning
      ? `<div class="msrain">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>    
          </ul>
          <span class="cloudr"></span>
        </div>`
      : `<div class="esrain">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>    
          </ul>
          <span class="cloudrz"></span>
          <span class="moon"></span>
        </div>`;
  } else if (description.includes("Rain")) {
    weatherHTML += isMorning
      ? `<div class="mrainy">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>  
          </ul>
          <span class="cloudr"></span>
          <span class="cloudrx"></span>
        </div>`
      : `<div class="erainy">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>  
          </ul>
          <span class="cloudr"></span>
          <span class="moon"></span>
          <span class="cloudrx"></span>
        </div>`;
  } else if (description.includes("Thunderstorm")) {
    weatherHTML += isMorning
      ? `<div class="mrainz">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>      
          </ul>
          <span class="cloudrt"></span>
          <span class="cloudrtx"></span>
          <span class="cloudrty"></span>
        </div>`
      : `<div class="erainz">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>      
          </ul>
          <span class="cloudrt"></span>
          <span class="cloudrtx"></span>
          <span class="cloudrty"></span>
          <span class="moon"></span>
        </div>`;
  } else if (description.includes("Snow")) {
    weatherHTML += isMorning
      ? `<div class="msnowy">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <span class="snowe"></span>
          <span class="snowex"></span>
          <span class="stick"></span>
          <span class="stick2"></span>
        </div>`
      : `<div class="esnowy">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <span class="snowe"></span>
          <span class="snowex"></span>
          <span class="stick"></span>
          <span class="stick2"></span>
        </div>`;
  } else if (description.includes("Mist")) {
    weatherHTML += isMorning
      ? `<div class="mmist">
          <span class="mcloudtl"></span>
          <span class="mcloudtr"></span>
          <span class="mcloudbr"></span>
          <span class="sunc"></span>
          <span class="suncx"></span>
        </div>`
      : `<div class="emist">
          <span class="mcloudtl"></span>
          <span class="mcloudtr"></span>
          <span class="mcloudbr"></span>
          <span class="moon"></span>
          <span class="spot1"></span>
          <span class="spot2"></span>
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>    
          </ul>
        </div>`;
  } else {
    weatherHTML += isMorning
      ? `<div class="morning-default">Good morning! The weather condition is unclear.</div>`
      : `<div class="evening-default">Good evening! The weather condition is unclear.</div>`;
  }
  

  weatherHTML += `</div>`;
  el.innerHTML = weatherHTML;
    } catch (error) {
      new Notice("Failed to load weather data.");
      console.error("Weather widget error:", error);
      el.innerHTML = `<p style="color: red; text-align: center;">Failed to load weather data. Check the console for details.</p>`;
    }
  }

  async onClose() {
  }
}

module.exports = class WeatherPlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_WEATHER, (leaf) => new WeatherView(leaf));
    this.addCommand({
      id: 'open-weather-view',
      name: 'Open Weather View',
      callback: () => this.activateView(),
    });
  }

  async activateView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_WEATHER);
    this.app.workspace.getLeftLeaf(false).setViewState({
      type: VIEW_TYPE_WEATHER,
      active: true,
    });
  }
  
  async onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_WEATHER);
  }
};
