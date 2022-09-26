import 'styled-components';
import {defaultTheme} from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

//Sobrescrevendo uma tipagem para o styled components
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}