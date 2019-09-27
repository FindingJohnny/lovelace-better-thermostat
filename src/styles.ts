import { css } from "lit-element";

const style = css`
  .hvac-heat-mode {
    --round-slider-bar-color: DarkOrange;
    --round-slider-handle-color: DarkOrange;
  }
  .hvac-cool-mode {
    --round-slider-bar-color: DeepSkyBlue;
    --round-slider-handle-color: DeepSkyBlue;
  }
  .hvac-auto-mode {
    --round-slider-bar-color: DarkGreen;
    --round-slider-handle-color: DarkGreen;
  }
  .thermostat-card {
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .center-items {
    align-items: center;
  }
  .center-self {
    align-self: center;
  }
  .space-evenly {
    justify-content: space-evenly;
  }
  .current-mode {
    font-size: 2em;
    padding: 1em;
    justify-content: center;
  }
  .climate-mode {
    flex-basis: 33%;
    padding: 0.25em;
    width: 1em;
  }
  .item25 {
    flex-basis: 25%;
  }
  .current-temp {
    width: 50%;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    text-align: center;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    margin-left: 0.1em;
  }
  .thermostat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .thermostat-current-temp {
    /* position: absolute; */
    font-size: 2.5em;
    margin-left: 0.25em;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
  }
  .thermostat-other-states {
    /* position: absolute; */
    /* left: 50%;
    top: 85%; */
    text-align: center;
    /* transform: translate(-50%, -50%); */
  }
  .thermostat-modes {
    color: blue;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 33%;
  }
  .thermostat-mode-icon {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--disabled-text-color);
  }
  .icon-label {
    font-size: 0.75em;
  }
  .icon-selected {
    color: var(--dark-primary-color);
  }
  .thermostat-item {
    position: relative;
    flex-basis: 33%;
  }
  .inline {
    display: inline;
  }
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }
  .clearfixold {
    overflow: auto;
  }
  .state-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-self: flex-end;
    margin-bottom: 2em;
  }
  .state-item {
    width: 50%;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    font-size: 2.5em;
    text-align: center;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: flex;
    margin-left: 0.1em;
  }
  .other-temp {
    width: 25%;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    text-align: center;
  }
  .temp-unit {
    font-size: 0.4em;
    align-self: start;
    margin-top: 0.25em;
    display: inline;
    margin-left: -0.75em;
    vertical-align: text-top;
  }
`;

export default style;
