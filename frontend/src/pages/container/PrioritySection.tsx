import { createStyles, Title, useMantineTheme } from '@mantine/core';
import { FC } from 'react';

import { PriorityCard } from '../components/PriorityCard';

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    padding: `${theme.spacing.xl}px ${theme.spacing.xl}px  0px ${theme.spacing.xl}px`,
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    color: theme.black,
  },
  container: {
    width: '100%',
    height: '100%',
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
  },
}));

export const PrioritySection: FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.root}>
      <Title order={1} color={theme.colors.gray[8]}>
        Priority
      </Title>
      <div className={classes.container}>
        <PriorityCard />
        <PriorityCard />
        <PriorityCard />
        <PriorityCard />
      </div>
    </div>
  );
};
