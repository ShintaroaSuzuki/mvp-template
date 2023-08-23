'use client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as DefaultApolloProvider,
} from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

const client = new ApolloClient({
  uri: 'http://localhost:8080/api',
  cache: new InMemoryCache(),
});

if (process.env.NODE_ENV === 'development') {
  loadDevMessages();
  loadErrorMessages();
}

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultApolloProvider client={client}>{children}</DefaultApolloProvider>
  );
}
