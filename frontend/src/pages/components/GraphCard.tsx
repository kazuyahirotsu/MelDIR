import { createStyles, useMantineTheme, Title } from '@mantine/core';
import { FC } from 'react';

import { Data, Chart } from './Chart';

const useStyles = createStyles((theme) => ({
  root: {
    width: 'auto',
    height: '100%',
    padding: `${theme.spacing.md}px`,
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: `${theme.spacing.sm}px`,
    color: theme.black,
    backgroundColor: theme.colors.gray[0],
  },
  title: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.black,
  },
  container: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
    padding: `${theme.spacing.xs}px`,
    gap: `${theme.spacing.md}px`,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing.md}px`,
  },
  tableBox: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 0,
  },
  image: {
    borderRadius: `${theme.spacing.xs}px`,
  },
}));

export interface GraphCardProps {
  itemOn: boolean;
  cropIndex: number;
  tempPercentage: number;
  tableId: string;
  menuImage: string;
  chartData: Data[];
}

export const GraphCard: FC<GraphCardProps> = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const {
    itemOn,
    cropIndex,
    tempPercentage,
    tableId,
    menuImage,
    chartData,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Title order={1} color={theme.colors.gray[7]}>
          Crop{cropIndex}
        </Title>
        <Title order={1} color={theme.colors.blue[5]}>
          {itemOn && tempPercentage ? tempPercentage.toFixed(2) : '-'}%
        </Title>
      </div>
      <div className={classes.container}>
        <div className={classes.box}>
          <div className={classes.tableBox}>
            <Title order={3} color={theme.colors.gray[7]}>
              Table
            </Title>
            <Title order={1} color={theme.colors.blue[5]}>
              {itemOn ? tableId : "-"}
            </Title>
          </div>
          <div className={classes.tableBox}>
            <Title order={3} color={theme.colors.gray[7]}>
              Menu
            </Title>
            <img
              src={
                itemOn ? (menuImage
                  ? menuImage
                  : 'https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg')
                  : "https://jitanda.com/j/j458_2/tnimg_j458_2.png"
              }
              height={120}
              width={180}
              alt="steak"
              className={classes.image}
            />
          </div>
        </div>
        <div className={classes.box}>
          <Chart data={itemOn ? chartData: []} />
        </div>
      </div>
    </div>
  );
};
