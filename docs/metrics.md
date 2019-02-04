# Metrics Schema for Fx Concepts

## Inbound Parameters

* `rc`: required -> Recruitment Channel (`facebook`, `snippet`, `heartbeat`, etc.)
* `rv`: required -> Recruitment Variant (`variant-1`, `variant-2`, etc.)
* `debug`: optional -> Debugging Flag (`boolean`)

## Event Schema

### Custom Dimensions

* `cd1`: `rc`: *pass thru from inbound URL - required* -> Recruitment Channel
* `cd2`: `rv`: *pass thru from inbound URL - required* -> Recruitment Variant
* `cd3`: `aid` Acquisition ID (`scroll`)
* `cd4`: `av` Acquisition Variant (`variant-1`, `variant-2`, etc.)
* `cd5`: `debug`: *pass thru from inbound URL - optional* ->  Debugging Flag (`boolean`)

### Events

#### Recorded on visit
```
ec: Page
ea: visit
cd1
cd2,
cd3,
cd4,
cd5
```

#### Recorded on CTA button click
```
ec: CTA
ea: click
el: one of `nav`, `primary`, `header`
cd1
cd2,
cd3,
cd4,
cd5
```

### Note

In order to de-noise events, we should only send them for people who have not already visited a particular acquisition experiment. We should init each session with something like the following:

```
//check if user has seen this experiment before:
const hasSeenId = localStorage.getItem(aid);

// if they're not debugging, set a localstorage item that says they have
if (!debug) {
  localStorage.setItem(aid, true)
}

// if they've seen this experiment, don't send stuff
const filterEvent = (event) => {
  if (hasSeenId) return;
  send(event)
  ...
}
```

## Outbound Parameters

* `rc`: *pass thru from inbound URL - required* -> Recruitment Channel
* `rv`: *pass thru from inbound URL - required* -> Recruitment Variant
* `aid`: required -> Acquisition ID
* `av`: required -> Acquisition Variant
* `t`: required -> Does user have DNT set (`boolean`)
* `debug`: *pass thru from inbound URL - optional* -> Debugging Flag
