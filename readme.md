
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
    "greeting": {say_hi:"Bonjour {name}"}
  },
  "en": {
    "greeting": {say_hi:"hello {name}"}
  }
}
```


app.js
```jsx
import React from "react";
import {
  languageStore,
} from "react-simple-multi-language";
import lang from "./lang.json";



function App() {

useEffect(()=>{
languageStore.setState({ currentLanguage: "en", translations: locales });
},[])

  return <YourComponent />
}

export default App;

```

Title.js
```jsx
import React from "react";
import {
  I18nText,
} from "react-simple-multi-language";

const Title = ()=><h1>
        <I18nText
          id="greeting.say_hi"
          params={{
            name: {
              fr: "Jean",
              en: "john",
            },
          }}
        ></I18nText>
</h1>
```
you can use "t" function to parse text if you want to translate a text out of a component

```jsx
import React from "react";
import {
  t
} from "react-simple-multi-language";

const greetingText = t("greeting.say_hi",{name: {fr: "Jean",en: "john"}})
```

you can also use this function in component if you don't will to use I18Text.However, there is one thing that you must consider: <br/>
> "I18nText" component will be re-rendered if currentLanguage or translations change.but when you use "t" parent component has no idea that language data is changed and your text won't be updated.

to solve this problem we provide ``` useUpdateComponentWhenLanguageChange ``` hook that updates your component when currentLanguage or translations changed.you can even put this hooks at top-level component to re-render whole app when language data changed if you want to use "t" in your whole app.


```jsx
import React from "react";
import {
  languageStore,
} from "react-simple-multi-language";
import lang from "./lang.json";

function App() {
useUpdateComponentWhenLanguageChange();

useEffect(()=>{
languageStore.setState({ currentLanguage: "en", translations: locales });
},[])

  return <>
  // your routes and components
  <h1>{t("greeting.say_hi",{name: {fr: "Jean",en: "john"}})}</h1>
  </>
}

export default App;

```





## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
