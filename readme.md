
# react-simple-multi-language

light weight package for building react multi language project

## Installation

```bash
npm install react-simple-multi-language
```
or
```bash
yarn add react-simple-multi-language
```

## basic usage

lang.json

```javascript
{
  "fr": {
    "greeting": "Bonjour {name}"
  },
  "en": {
    "greeting": "hello {name}"
  }
}
```
Title.js
```jsx
import React from "react";
import {
  I18nText,
} from "react-simple-multi-language";

const Title = ()=><h1>
        <I18nText
          id="greeting"
          params={{
            name: {
              fr: "Jean",
              en: "john",
            },
          }}
        ></I18nText>
</h1>
```

app.js
```jsx
import React from "react";
import {
  InternationalizationProvider,
} from "./api";
import lang from "./lang.json";

function App() {
  return (
      <InternationalizationProvider languagesSchema={lang}>
       // your routes and components
      </InternationalizationProvider>
  );
}

export default App;

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
