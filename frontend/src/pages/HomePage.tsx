import { FC } from 'react';

import { FirebaseTestSection } from './container/FirebaseTestSection';
import { PrioritySection } from './container/PrioritySection';

const HomePage: FC = () => {
  return (
    <>
      <FirebaseTestSection/>
      <PrioritySection />
    </>
  );
};

export default HomePage;
