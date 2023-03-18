import { createStyles, getStylesRef } from '@mantine/core';
import { FC } from 'react';

import { PriorityCard } from '../components/PriorityCard';

const useStyles = createStyles((theme) => ({
  root: {
    ref: getStylesRef('root'),
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: `${theme.spacing.xl}px`,
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
    color: theme.black,
  },
}));

export const PrioritySection: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <PriorityCard />
      <PriorityCard />
      <PriorityCard />
      <PriorityCard />
    </div>
  );
};
