import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Router } from './routing/Router';
import { theme } from './theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </MantineProvider>
  );
}
