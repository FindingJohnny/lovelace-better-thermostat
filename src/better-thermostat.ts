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

import styles from "./styles";

import { BetterThermostatConfig } from "./types";

// TODO Name your custom element
@customElement("better-thermostat")
class BetterThermostat extends LitElement {
  // TODO Add any properities that should cause your element to re-render here
  @property() public hass?: HomeAssistant;

  @property() private config?: BetterThermostatConfig;

  @property() private modes?: [string];

  @property() private currentTemp?: string;

  @property() private currentMode?: string;

  @property() private maxTemp?: string;

  @property() private minTemp?: string;

  @property() private friendlyName?: string;

  public setConfig(config: BetterThermostatConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config || config.show_error) {
      throw new Error("Invalid configuration");
    }

    this.config = config;
    this.loadClimateModes();
  }

  private loadClimateModes() {
    if (!this.config || !this.hass) {
      return;
    }

    const entityId = this.config.entity;
    // this.logger(entityId);
    const state = this.hass.states[entityId];
    this.logger(state);
    this.modes = state.attributes.preset_modes;
    this.currentMode = state.attributes.preset_mode;
    this.currentTemp = state.attributes.current_temperature;
    this.maxTemp = state.attributes.target_temp_high;
    this.minTemp = state.attributes.target_temp_low;
    this.friendlyName = state.attributes.friendly_name;
    // this.logger(this.modes);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (hasConfigOrEntityChanged(this, changedProps, false)) {
      this.loadClimateModes();
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected render(): TemplateResult | void {
    if (!this.config || !this.hass || !this.modes) {
      return html``;
    }

    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return html`
        <ha-card>
          <div class="warning">Show Warning</div>
        </ha-card>
      `;
    }

    return html`
      <ha-card
        class="thermostat-card"
      >
        <div class="container center-items">
          <div class="item other-temp">${this.minTemp}</div>
          <div class="item current-temp">${this.currentTemp}</div>
          <div class="item other-temp">${this.maxTemp}</div>
        </div>
        <div class="container center-items center-self">
          <div class="current-mode">${this.currentMode}</div>
        </div>
        <div class="container space-evenly center-self">
          ${this.modes.map(
          mode =>
            html`
              <mwc-button raised class="climate-mode" @click="${() => this._handleClimateModeTapped(mode)}">${mode}</mwc-button>
            `
        )}
        </div>
      </ha-card>
    `;
  }

  private _handleClimateModeTapped(modeTapped: string): void {
    if (this.hass && this.config) {
      // handleClick(this, this.hass, this.config, false, false);
      var serviceData = {
        entity_id: this.config.entity,
        preset_mode: modeTapped
      }
      console.log(serviceData);
      this.hass.callService('climate', 'set_preset_mode', serviceData);
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
