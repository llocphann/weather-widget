Weather Widget Plugin for Obsidian

<p align="justify" The Weather Widget Plugin for Obsidian allows you to easily display live weather information directly within your notes. With customizable settings, you can tailor the widget's appearance, choose the unit of temperature, and specify your location. Whether you want to track your local weather or view a different city's conditions, this plugin brings weather data into your Obsidian workspace in a clean, intuitive format.</p>
Features:
Customizable Appearance: Adjust the font size, color, background, and widget layout to match your notes’ style.
Real-Time Weather Data: Displays temperature, humidity, wind speed, and more from OpenWeatherMap API.
Multiple Data Points: Shows temperature, feels like, min/max temperatures, humidity, wind speed, sunrise/sunset times, and weather description.
Dynamic Updates: Automatically refreshes the widget whenever you change settings, ensuring you always see the latest weather data.

How to Use the Weather Widget Plugin
1. Install the Plugin

    Open Obsidian and go to Settings > Community Plugins.
    Enable Safe Mode if it's not already enabled.
    Click on Browse and search for "Weather Widget Plugin".
    Click Install and then enable it after installation.

2. Get Your API Key

    Create an account on OpenWeatherMap.
    Navigate to API Keys on your account page and create a new API key.
    Copy the API key for use in the plugin.

3. Configure Plugin Settings

    Go to Settings > Weather Plugin.
    Paste your OpenWeatherMap API Key into the field.
    Set your City for weather information.
    Choose your preferred Units (Celsius or Fahrenheit).
    Customize the appearance of the widget by adjusting font size, color, and other style settings.

4. Insert Weather Widget into Notes

    To add the weather widget to a note, type a code block like so:

```weather
city: [Your City]
units: [metric/imperial]
apiKey: [Your API Key]
```

Replace `[Your City]`, `[metric/imperial]`, and `[Your API Key]` with your preferred values.

#### 5. **View the Weather Widget**
- The weather widget will automatically display in your preview pane when you view the note. It will show the current temperature, weather description, humidity, wind speed, and more.
- The widget will update whenever the settings are changed in the plugin’s settings page, ensuring real-time accuracy.

---

### Example:
Here’s how the weather widget would look when inserted into a note:

```markdown
```weather
city: London
units: metric
apiKey: your-api-key-here

