import { ItemView, Plugin, WorkspaceLeaf, PluginSettingTab, Setting } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";

// import { DayComponent } from "./component/day/";
import DiceRoller from "./ui/DicerRoller.js";
import { DEFAULT_SETTING, ISetting } from "./utils/const";
import { getDataWeather } from "./API/weather.js";

const VIEW_TYPE = "react-view";

export class MyReactView extends ItemView {
  private reactComponent: React.ReactElement;
  settings: ISetting;

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Dice Roller";
  }

  getIcon(): string {
    return "calendar-with-checkmark";
  }

  async onOpen(): Promise<void> {
    // this.reactComponent = React.createElement(DayComponent);
    this.reactComponent = React.createElement(DiceRoller);

    ReactDOM.render(this.reactComponent, (this as any).contentEl);
  }
}

export default class WeatherPlugin extends Plugin {
  private view: MyReactView;
  settings: ISetting;
  async onload(): Promise<void> {
    console.log("load settings");
    await this.loadSettings;
    const dataWeather = await getDataWeather(this.settings);
    this.registerView(VIEW_TYPE, (leaf: WorkspaceLeaf) => (this.view = new MyReactView(leaf)));
    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
  }

  onLayoutReady(): void {
    if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length) {
      return;
    }
    this.app.workspace.getRightLeaf(false)?.setViewState({
      type: VIEW_TYPE,
      active: true,
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTING, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.reloadWeatherWidget();
  }

  reloadWeatherWidget() {
    this.app.workspace.getLeavesOfType("markdown").forEach((leaf) => {});
  }
}
