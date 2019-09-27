# Better Thermostat Card

## Release v0.5

## Example Card Config Yaml

**Note:** 'preset_climate_modes' must have a mode_id: that matches an existing mode in your climate's list of 'preset_modes'.
This can be found by looking at the attributes for your climate entity in the developer tools.

``` yaml
entity: climate.myhouse
preset_climate_modes:
  - mode_icon: 'mdi:home'
    mode_id: Home
  - mode_icon: 'mdi:briefcase'
    mode_id: Away
  - mode_icon: 'mdi:sleep'
    mode_id: Sleep
  - mode_icon: 'mdi:party-popper'
    mode_id: Party
  - mode_icon: 'mdi:shield-airplane'
    mode_id: Vacation
  - mode_icon: 'mdi:weather-sunset'
    mode_id: Wake Up
type: 'custom:better-thermostat'
```

## Raw Yaml Configuration for [HACS](https://hacs.netlify.com/)

```
resources:
  - url: /community_plugin/lovelace-better-thermostat/better-thermostat.js
    type: js
```

## Special Thanks

Templated from [boilerplate-card](https://github.com/custom-cards/boilerplate-card)