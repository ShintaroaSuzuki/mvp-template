import { FC, ReactNode } from 'react';

import ApolloProvider from '@/app/_providers/ApolloProvider';

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return <ApolloProvider>{children}</ApolloProvider>;
};

export default AppProvider;
