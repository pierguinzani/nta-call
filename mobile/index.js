/**
 * @format
 */

import {AppRegistry} from 'react-native';
import routes from './src/routes';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => routes);
