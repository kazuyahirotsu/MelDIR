import { MantineProvider } from '@mantine/core';
import { FC } from 'react';

import HomePage from './pages/HomePage';
import { lightTheme } from './styles/theme';

const App: FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={lightTheme}>
      <HomePage />
    </MantineProvider>
  );
};

export default App;
