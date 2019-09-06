import { css } from "lit-element";

const style = css`
  .thermostat-card {
    display: flex;
    padding: 15px;
    flex-direction: column;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .center-items {
    align-items: center;
  }
  .item50 {
    flex-basis: 50%;
  }
  .item25 {
    flex-basis: 25%;
  }
  .current-temp {
    width: 50%;
    align-items: center;
    justify-content: center;
    font-size: 12rem;
  }
  .other-temp {
    width: 25%;
    align-items: center;
    justify-content: center;
    font-size: 6rem;
  }
  .loader {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header {
    font-family: var(--paper-font-headline_-_font-family);
    -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
    font-size: var(--paper-font-headline_-_font-size);
    font-weight: var(--paper-font-headline_-_font-weight);
    letter-spacing: var(--paper-font-headline_-_letter-spacing);
    line-height: var(--paper-font-headline_-_line-height);
    text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
    opacity: var(--dark-primary-opacity);
    padding: 24px 0px 0px;
  }
  table {
    border-spacing: 0;
    margin-bottom: 10px;
    width: 100%;
  }
  .day-wrapper td {
    padding-top: 10px;
    cursor: pointer;
  }
  .day-wrapper.day-wrapper-last > td {
    padding-bottom: 10px;
    border-bottom: 1px solid;
  }
  .day-wrapper.day-wrapper-last:last-child > td {
    border-bottom: 0 !important;
  }
  .day-wrapper .overview {
    padding-left: 10px;
    cursor: pointer;
  }
  .day-wrapper .overview .time,
  .day-wrapper .location ha-icon {
    color: var(--secondary-text-color);
  }
  .day-wrapper hr.progress-bar {
    border-style: solid;
    border-color: var(--accent-color);
    border-width: 1px 0 0 0;
    margin-top: -7px;
    margin-left: 0px;
    color: var(--primary-color);
    width: 100%;
  }
  .day-wrapper ha-icon.progress-bar {
    height: 9px;
    width: 9px;
    margin-top: 2px;
    color: var(--accent-color);
  }
  .day-wrapper .location a {
    text-decoration: none;
    display: flex;
    color: var(--accent-color);
  }
  .event-origin {
    float: right;
  }
  .event-origin span {
    color: var(--accent-color);
    margin-right: -4px;
  }
  .event-origin ha-icon {
    height: 13px;
    margin-top: -3px;
    color: var(--accent-color);
  }
`;

export default style;
