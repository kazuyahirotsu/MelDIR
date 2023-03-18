import { createStyles, Title, useMantineTheme } from '@mantine/core';
import { FC } from 'react';

import { dummyData } from '../components/Chart';
import { GraphCardProps, GraphCard } from '../components/GraphCard';

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    padding: `${theme.spacing.xl}px`,
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    color: theme.black,
  },
  title: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-between',
    alignItems: 'start',
    color: theme.black,
  },
  container: {
    width: '100%',
    height: '100%',
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
  },
  box: {
    width: '100%',
    height: '100%',
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
  },
}));

const dummy1: GraphCardProps = {
  cropIndex: 1,
  tempPercentage: 30,
  tableNumber: 4,
  menuImage:
    'https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg',
  chartData: dummyData,
};

const dummy2: GraphCardProps = {
    cropIndex: 2,
    tempPercentage: 20,
    tableNumber: 1,
    menuImage:
      'https://img.freepik.com/free-photo/tasty-appetizing-classic-italian-spaghetti-pasta-with-tomato-sauce-cheese-parmesan-and-basil-on-plate-and-ingredients-for-cooking-pasta-on-white-marble-table_1150-45638.jpg',
    chartData: dummyData,
  };

  const dummy3: GraphCardProps = {
    cropIndex: 3,
    tempPercentage: 30,
    tableNumber: 2,
    menuImage:
      'https://t4.ftcdn.net/jpg/01/64/95/35/360_F_164953558_Km5oiWKID0PbHDwkeHR137TBcI7f9tRJ.jpg',
    chartData: dummyData,
  };

  const dummy4: GraphCardProps = {
    cropIndex: 4,
    tempPercentage: 10,
    tableNumber: 4,
    menuImage:
      'https://image.excite.co.jp/jp/erecipe/recipe/9/1/91e4ba3667cde1e9111b51d2d6665fc1/147e90fc3c338c69b76b80d7f59b0853.jpeg',
    chartData: dummyData,
  };

export const GraphSection: FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.root}>
      <Title order={1} color={theme.colors.gray[8]}>
        Real Time Log
      </Title>
      <div className={classes.container}>
        <div className={classes.box}>
          <GraphCard {...dummy1} />
          <GraphCard {...dummy2} />
        </div>
        <div className={classes.box}>
          <GraphCard {...dummy3} />
          <GraphCard {...dummy4} />
        </div>
      </div>
    </div>
  );
};
