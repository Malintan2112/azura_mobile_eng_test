# My Boiler Plate Apps

After Pull:<br>
1. `yarn install`

<br>

Additional step (for iOS):<br>

2. `cd ios`

3. `pod install`

4. `cd ..`

5. `react-native run-ios` / `react-native run-android`

<br>

Project information:<br>
1. React Native v.0.63.0

<br>

Packages Include:<br>
1. [Native Base v.2.15.2](https://nativebase.io)
2. [React Native Vector Icons v.8.1.0](https://github.com/oblador/react-native-vector-icons)
3. [React Native Image Crop Picker v.0.36.0](https://github.com/ivpusic/react-native-image-crop-picker)
4. [React Navigation v.5.9.3](https://reactnavigation.org/docs/4.x/getting-started)
5. [Redux v4.0.5](https://github.com/reduxjs/redux)
6. [React-redux v7.2.3](github.com/reduxjs/react-redux)
7. [Redux-logger v3.0.6](https://github.com/theaqua/redux-logger)
8. [Redux-thunk v2.3.0](https://github.com/reduxjs/redux-thunk)
10. [React Native Camera v3.43.3](https://github.com/react-native-community/react-native-camera)
11. [React Native Global Props v1.1.5](https://github.com/Ajackster/react-native-global-props)
12. [React Native Async Storage v1.14.1](https://github.com/react-native-community/async-storage)

<!-- Included Examples:<br>
1. Navigator Examples
2. Redux Action & Reducers Example + Redux Store Configuration
3. Separate Styles Example

Custom Libraries:
  * Language Helpers for multi languages app support<br>
  Code Example:<br>

  ```javascript
    /**
     * Load / Display registered label
     */
    ...
    import lang from 'path/to/Helpers/Language';
    ...

    ...
    render() {
      return(
        <Text>{ lang('title.home') }</Text>
      );      
    }
    ...
  ```
  ```javascript
    /**
     * Set current language
     */
    ...
    import { setLanguage } from 'path/to/Helpers/Language';
    ...

    ...
      changeLanguage() {
        setLanguage('id');
      }
    ...
  ```
  ```javascript
    /**
     * Get current language
     */
    ...
    import { getLanguage } from 'path/to/Helpers/Language';
    ...

    ...
      getCurrentLang() {
        let currentLang = getLanguage();
      }
    ...
  ```
    If you want to add another language (eg. French), here the steps:<br>
    1. Create file `fr.js` with JSON variables inside Folder `Helpers/Language`
      ```javascript
        export const encoding = 'fr';
        export const lang = {
          label1: 'Label 1',
          nestedLabel: {
            label2: 'Nested Label 2'
          }
        }
      ```
    2. Import `fr.js` to `Helpers/Language/index.js`
      ```javascript
      import * as french from './fr';
      ```
    3. add `french` into `availLang`'s array
      ```javascript
      export const availLang = [
        ...
        ...
        french
      ];
      ```
    4. Ta da, your new language is available to be displayed

  * Hooks helpers, helper for your own custom functions<br>Code Examples:<br>
  ```javascript
    // Import all
    import * as Hooks from 'path/to/Helpers/Hooks';

    ...
    let myValue = Hooks.yourCustomFunctionName(yourParams);
    let myOtherValue = Hooks.yourOtherCustomFunctionName(yourOtherParams);
    ...

    // Or

    import {
      yourCustomFunctionName,
      yourOtherCustomFunctionName
    } from 'path/to/Helpers/Hooks';

    ...
    let myValue = yourCustomFunctionName(yourParams);
    let myOtherValue = yourOtherCustomFunctionName(yourOtherParams);
    ...
  ```

  * Session Helpers, use to store detail of current session<br>Code Example:<br>
  ```javascript
    // Always Prepare Session when the app is started (usually in Splash Screen)
    import * as Session from 'path/to/Helpers/Session';

    ...
    Session.prepare().then((sessionData) => {
      // Do something with existed sessionData
    }).catch((err) => {
      console.log("Session Prepare Error", err.message);
    });
    ...
  ```
  ```javascript
    // Set Session Value
    ...
    let yourValue = 'my Name is Ajul';
    Session.setValue(Session.YOUR_KEY, yourValue);
    ...
    ```
    ```javascript
    // Get Session Value
    ...
    let myName = Session.getValue(Session.YOUR_KEY, 'default value');
    ...
  ```

  * Http Helpers, to handle Http Requests<br>Usage Example:<br>
  ```javascript
    ...
    import HttpRequest from 'path/to/Helpers/Http';
    ...

    ...
    let myRequest = {
      link: 'myapi/endpoints',
      method: 'POST',
      data: {
        id: 1,
        name: 'my name is'
      }
    }

    HttpRequest(myRequest).then((response) => {
      // Do something with the response
    }).catch((error) => {
      // Do something with the error
    });
    ...
  ``` -->