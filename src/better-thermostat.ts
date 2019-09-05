import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  PropertyValues
} from "lit-element";
import {
  HomeAssistant,
  handleClick,
  longPress,
  hasConfigOrEntityChanged
} from "custom-card-helpers";

import { BetterThermostatConfig } from "./types";

// TODO Name your custom element
@customElement("better-thermostat")
class BetterThermostat extends LitElement {
  // TODO Add any properities that should cause your element to re-render here
  @property() public hass?: HomeAssistant;

  @property() private config?: BetterThermostatConfig;

  @property() private modes?: [];

  public setConfig(config: BetterThermostatConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config || config.show_error) {
      throw new Error("Invalid configuration");
    }

    this.config = config;
    this.loadClimateModes();
  }

  private loadClimateModes() {
    this.logger("--loadClimateModes---");
    this.logger(this.config);
    this.logger(this.hass);
    if (!this.config || !this.hass) {
      return;
    }

    const entityId = this.config.entity;
    // const state = this.hass.states[entityId];
    this.logger("entityId");
    // console.log(state);
    // this.modes = state.attributes.preset_modes;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    this.logger("- shouldUpdate() Called");
    this.logger(hasConfigOrEntityChanged(this, changedProps, false));
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected render(): TemplateResult | void {
    if (!this.config || !this.hass) {
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
        .header=${this.config.name ? this.config.name : "Boilerplate"}
        @ha-click="${this._handleTap}"
        @ha-hold="${this._handleHold}"
        .longpress="${longPress()}"
      >
        <ul></ul>
      </ha-card>
    `;
  }

  private _handleTap(): void {
    handleClick(this, this.hass!, this.config!, false, false);
  }

  private _handleHold(): void {
    handleClick(this, this.hass!, this.config!, true, false);
  }

  static get styles(): CSSResult {
    return css`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }
    `;
  }

  logger(message) {
    // if (!("debug" in (this as any).args(script))) return;

    let message2 = message;

    if (typeof message2 !== "string") message2 = JSON.stringify(message2);
    console.log(`%cDEBUG:%c ${message2}`, "color: blue; font-weight: bold", "");
  }
}
