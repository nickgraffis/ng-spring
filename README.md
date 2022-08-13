A set of functions for working with US states.

## Installation

### Node
```bash
yarn add @nickgraffis/us-states
```

_or use npm or pnpm_

### CDN 
```html
<script src="https://unpkg.com/@nickgraffis/us-states@latest/dist/us-states.min.js"></script>
```

## Usage

The two main functions are `autocomplete` and `states`. Both take a single argument, `query`, which is a string and both return a state object with the following properties:
* `name`: The name of the state
* `abv`: The state's abbreviation
* `code`: The state's numerical code

```ts
import { autocomplete, states } from '@nickgraffis/us-states'

// Autocomplete
autocomplete('mar') // { name: 'Maryland', abv: 'MD', code: '24' }
// also works
autocomplete('md') // { name: 'Maryland', abv: 'MD', code: '24' }

// States
states('MD') // { name: 'Maryland', abv: 'MD', code: '24' }
// also works
states('Maryland') // { name: 'Maryland', abv: 'MD', code: '24' }
```

There are also more specific functions for getting the state's name, abbreviation, and numerical code.

* `stateNameToAbbreviation`: Takes a state name and returns the abbreviation
* `stateAbbreviationToName`: Takes a state abbreviation and returns the name
* `stateAbbreviationToCode`: Takes a state abbreviation and returns the numerical code
* `stateCodeToName`: Takes a state numerical code and returns the name
* `stateCodeToAbbreviation`: Takes a state numerical code and returns the abbreviation
* `stateNameToCode`: Takes a state name and returns the numerical code

Each of these returns the state object.