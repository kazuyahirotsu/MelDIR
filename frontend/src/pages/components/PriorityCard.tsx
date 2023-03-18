import {
  createStyles,
  useMantineTheme,
  Text,
  Title,
  RingProgress,
} from '@mantine/core';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    width: 'auto',
    height: '100%',
    padding: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: `${theme.spacing.sm}px`,
    color: theme.black,
    backgroundColor: theme.colors.gray[0],
  },
  right: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    padding: `${theme.spacing.xs}px`,
    gap: `${theme.spacing.xs}px`,
  },
  left: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  image: {
    borderRadius: `${theme.spacing.xs}px`,
  },
}));

export const PriorityCard: FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.root}>
      <div className={classes.right}>
        <div className={classes.tableBox}>
          <Title order={4}>Table</Title>
          <Title order={1}>5</Title>
        </div>
        <div className={classes.tableBox}>
          <Title order={4}>Menu</Title>
          <img
            src="https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg"
            height={60}
            alt="steak"
            className={classes.image}
          />
        </div>
      </div>
      <div className={classes.left}>
        <RingProgress
          label={
            <Text size="xs" align="center">
              Application data usage
            </Text>
          }
          sections={[
            { value: 40, color: 'cyan' },
            { value: 15, color: 'orange' },
            { value: 15, color: 'grape' },
          ]}
        />
      </div>
    </div>
  );
};
