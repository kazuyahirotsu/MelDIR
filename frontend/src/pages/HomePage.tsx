import { FC } from 'react';

import { FirebaseTestSection } from './container/FirebaseTestSection';
import { GraphSection } from './container/GraphSection';
import { PrioritySection } from './container/PrioritySection';

const HomePage: FC = () => {
  return (
    <>
      <FirebaseTestSection />
      <PrioritySection />
      <GraphSection />
    </>
  );
};

export default HomePage;
