import 'styled-components';
import type { AppTheme } from './theme';

// Makes the custom theme strongly typed everywhere `props.theme` is used.
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
