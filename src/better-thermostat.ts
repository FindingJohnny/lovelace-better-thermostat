import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  PropertyValues
} from "lit-element";
import {
  HomeAssistant,
  handleClick,
  longPress,
  hasConfigOrEntityChanged
} from "custom-card-helpers";

import { Icon } from "@material/mwc-icon";

import styles from "./styles";

import { BetterThermostatConfig, PresetClimateMode } from "./types";

const BETTER_THERMOSTAT_EDITOR = "./better-thermostat-editor.js";

// TODO Name your custom element
@customElement("better-thermostat")
class BetterThermostat extends LitElement {
  // TODO Add any properities that should cause your element to re-render here
  @property() public hass?: HomeAssistant;

  @property() private config?: BetterThermostatConfig;

  @property() private modes?: [string];

  @property() private leftModes?: [string];

  @property() private rightModes?: [string];

  @property() private currentTemp?: string;

  @property() private currentMode?: string;

  @property() private maxTemp?: string;

  @property() private minTemp?: string;

  @property() private targetTempLow?: string;

  @property() private targetTempHigh?: string;

  @property() private temperature?: string;

  @property() private friendlyName?: string;

  @property() private hvacAction?: string;

  @property() private currentHvacMode?: string;

  @property() private temporaryStateOverride: boolean = false;

  private readonly AUTO: string = "Auto";
  private readonly HEAT_COOL: string = "Heat_Cool";
  private readonly HEAT: string = "Heat";
  private readonly COOL: string = "Cool";
  private readonly POWER: string = "Power";

  public setConfig(config: BetterThermostatConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this.config = config;
    this.loadClimateModes();
  }

  public static async getConfigElement() {
    await import(BETTER_THERMOSTAT_EDITOR);
    return document.createElement("better-thermostat-editor");
  }

  public static getStubConfig() {
    return {};
  }

  private loadClimateModes() {
    if (!this.config || !this.hass || !this.config.entity) {
      return;
    }

    if (this.temporaryStateOverride) {
      this.temporaryStateOverride = false;
      return;
    }

    const entityId = this.config.entity;
    const state = this.hass.states[entityId];

    if (state === undefined) {
      return;
    }
    this.currentMode = state.attributes.preset_mode;
    this.currentTemp = state.attributes.current_temperature;
    this.targetTempHigh = state.attributes.target_temp_high;
    this.targetTempLow = state.attributes.target_temp_low;
    this.temperature = state.attributes.temperature;
    this.maxTemp = state.attributes.max_temp;
    this.minTemp = state.attributes.min_temp;
    this.friendlyName = state.attributes.friendly_name;
    this.hvacAction = state.attributes.hvac_action;
    this.currentHvacMode = state.state;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (hasConfigOrEntityChanged(this, changedProps, false)) {
      this.loadClimateModes();
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  private titleCase(txt: string) {
    return txt.replace(/\w\S*/g, (txt): string => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  private isCurrentMode(mode: string) {
    if (this.currentMode) {
      return this.shouldSelectIcon(mode, this.currentMode);
    }
    return "";
  }

  private isCurrentHvacMode(mode: string) {
    if (this.currentHvacMode) {
      return this.shouldSelectIcon(mode, this.currentHvacMode);
    }
    return "";
  }

  private shouldSelectIcon(string1: string, string2: string) {
    if (string1.toLowerCase() === string2.toLowerCase()) {
      return "icon-selected";
    }
    return "";
  }

  private getTargetTemp(): TemplateResult {
    if (this.currentHvacMode) {
      if (this.currentHvacMode.toLowerCase() === this.AUTO.toLowerCase()) {
        return html`
          ${this.targetTempLow + " - " + this.targetTempHigh}
        `;
      }
      if (this.currentHvacMode.toLowerCase() === this.COOL.toLowerCase()) {
        return html`
          ${this.temperature}
        `;
      }
      if (this.currentHvacMode.toLowerCase() === this.HEAT.toLowerCase()) {
        return html`
          ${this.temperature}
        `;
      }
    }
    return html``;
  }

  private getCorrectSlider(): TemplateResult {
    if (this.currentHvacMode) {
      if (this.currentHvacMode.toLowerCase() === this.AUTO.toLowerCase() ||
          this.currentHvacMode.toLowerCase() === this.HEAT_COOL.toLowerCase()) {
        return html`
          <round-slider
            class="thermostat-item hvac-auto-mode"
            low="${this.targetTempLow}"
            high="${this.targetTempHigh}"
            min="${this.minTemp}"
            max="${this.maxTemp}"
            step="1"
            @value-changing=${e => this._handleSliderValueChanging(e)}
            @value-changed=${e => this._handleSliderValueChanged(e)}
          >
          </round-slider>
        `;
      }
      if (
        this.currentHvacMode.toLocaleLowerCase() === this.COOL.toLowerCase()
      ) {
        return html`
          <round-slider
            class="thermostat-item hvac-cool-mode"
            value="${this.currentTemp}"
            min="${this.minTemp}"
            max="${this.maxTemp}"
            step="1"
            @value-changing=${e => this._handleSliderValueChanging(e)}
            @value-changed=${e => this._handleSliderValueChanged(e)}
          >
          </round-slider>
        `;
      }

      if (
        this.currentHvacMode.toLocaleLowerCase() === this.HEAT.toLowerCase()
      ) {
        return html`
          <round-slider
            class="thermostat-item hvac-heat-mode"
            value="${this.currentTemp}"
            min="${this.minTemp}"
            max="${this.maxTemp}"
            step="1"
            @value-changing=${e => this._handleSliderValueChanging(e)}
            @value-changed=${e => this._handleSliderValueChanged(e)}
          >
          </round-slider>
        `;
      }
    }
    return html``;
  }

  protected render(): TemplateResult | void {
    if (!this.config || !this.hass) {
      return html``;
    }

    // TODO Check for stateObj or other necessary things and render a warning if missing
    // if (this.config.show_warning) {
    //   return html`
    //     <ha-card>
    //       <div class="warning">Show Warning</div>
    //     </ha-card>
    //   `;
    // }

    // <ha-icon icon="mdi:bed-single"></ha-icon>

    return html`
      <ha-card class="thermostat-card">
        <div class="thermostat-container" @click="${() =>
          this._handleThermostatContainerTapped()}">
          <div class="thermostat-current-temp">
            ${this.currentTemp}
            <div class="temp-unit">°F</div>
          </div>
          <div class="thermostat-other-states">
            <div>
              ${this.getTargetTemp()}
            </div>
            <div>
              ${this.titleCase(this.hvacAction + " - " + this.currentMode)}
            </div>
          </div>
        </div>
        <div class="thermostat-modes">
          ${this.config.preset_climate_modes.map(mode => {
            return html`
              <div
                class="thermostat-mode-icon ${this.isCurrentMode(mode.mode_id)}"
                @click="${() => this._handleClimateModeTapped(mode.mode_id)}"
              >
                <ha-icon icon="${mode.mode_icon}"></ha-icon>
                <div class="icon-label">${mode.mode_id}</div>
              </div>
            `;
          })}
        </div>
        ${this.getCorrectSlider()}
        <div class="thermostat-modes">
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.AUTO)}"
          @click="${() => this._handleHvacModeTapped(this.AUTO)}"
          >
            <ha-icon
              icon="mdi:calendar-repeat"
            ></ha-icon>
            <div class="icon-label">${this.AUTO}</div>
          </div>
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.HEAT)}"
          @click="${() => this._handleHvacModeTapped(this.HEAT)}"
          >
            <ha-icon  icon="mdi:fire"></ha-icon>
            <div class="icon-label">${this.HEAT}</div>
          </div>
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(this.COOL)}"
          @click="${() => this._handleHvacModeTapped(this.COOL)}"
          >
            <ha-icon
              icon="mdi:snowflake"
            ></ha-icon>
            <div class="icon-label">${this.COOL}</div>
          </div>
          <div class="thermostat-mode-icon ${this.isCurrentHvacMode(
            this.POWER
          )}">
            <ha-icon icon="mdi:power"></ha-icon>
            <div class="icon-label">${this.POWER}</div>
          </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _handleClimateModeTapped(modeTapped: string): void {
    if (this.hass && this.config) {
      // handleClick(this, this.hass, this.config, false, false);
      var serviceData = {
        entity_id: this.config.entity, // eslint-disable-line camelcase
        preset_mode: modeTapped
      };
      this.hass.callService("climate", "set_preset_mode", serviceData);
    }
  }

  private _handleHvacModeTapped(modeTapped: string): void {
    if (this.hass && this.config) {
      var serviceData = {
        entity_id: this.config.entity,
        hvac_mode: modeTapped.toLowerCase()
      };
      this.hass.callService("climate", "set_hvac_mode", serviceData);
    }
  }

  private _handleThermostatContainerTapped() {}

  private _handleSliderValueChanged(e: any) {
    if (this.hass && this.config) {
      if (e.detail.low) {
        var serviceData1 = {
          entity_id: this.config.entity,
          target_temp_high: this.targetTempHigh,
          target_temp_low: e.detail.low
        };
        this.hass.callService("climate", "set_temperature", serviceData1);
      }
      if (e.detail.high) {
        var serviceData2 = {
          entity_id: this.config.entity,
          target_temp_high: e.detail.low,
          target_temp_low: this.targetTempLow
        };
        this.hass.callService("climate", "set_temperature", serviceData2);
      }
      if (e.detail.value) {
        var serviceData3 = {
          entity_id: this.config.entity,
          temperature: e.detail.value
        };
        this.hass.callService("climate", "set_temperature", serviceData3);
      }
    }
  }

  private _handleSliderValueChanging(e: any) {
    if (this.hass && this.config) {
      if (e.detail.low != null) {
        this.targetTempLow = e.detail.low;
      }
      if (e.detail.high) {
        this.targetTempLow = e.detail.high;
      }
      if (e.detail.value) {
        this.temperature = e.detail.value;
      }
      this.temporaryStateOverride = true;
      this.requestUpdate();
    }
  }

  private _handleHold(): void {
    if (this.hass && this.config) {
      handleClick(this, this.hass, this.config, true, false);
    }
  }

  public static get styles(): CSSResult {
    return styles;
  }

  private logger(message) {
    // if (!("debug" in (this as any).args(script))) return;

    let message2 = message;

    if (typeof message2 !== "string") message2 = JSON.stringify(message2);
    console.log(`%cDEBUG:%c ${message2}`, "color: blue; font-weight: bold", "");
  }
}
