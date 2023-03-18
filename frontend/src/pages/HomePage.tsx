import { FC } from 'react';

import { GraphSection } from './container/GraphSection';
import { PrioritySection } from './container/PrioritySection';

const HomePage: FC = () => {
  return (
    <>
      <PrioritySection />
      <GraphSection />
    </>
  );
};

export default HomePage;
