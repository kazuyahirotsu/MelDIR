import { createStyles, useMantineTheme, Title } from '@mantine/core';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    width: 'auto',
    height: '100%',
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.md}px`,
    gap: `${theme.spacing.sm}px`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: `${theme.spacing.sm}px`,
    boxShadow: `2px 2px 2px ${theme.colors.gray[2]}`,
    color: theme.black,
    backgroundColor: theme.colors.gray[0],
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: `${theme.spacing.md}px`,
  },
  right: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gap: `${theme.spacing.xs}px`,
  },
  left: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableBox: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 0,
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  imageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing.xs}px`,
  },
  image: {
    borderRadius: `${theme.spacing.xs}px`,
    objectFit: "contain",
  },
}));

export interface PriorityCardProps {
  itemOn: boolean;
  priority: number;
  cropIndex: number;
  waitingTime: number;
  tableId: string;
  menuImage: string;
}

export const PriorityCard: FC<PriorityCardProps> = (props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { itemOn, cropIndex, waitingTime, tableId, menuImage } = props;

  return (
    <div className={classes.root}>
      <Title order={2} color={theme.colors.gray[7]}>
        Crop{cropIndex}
      </Title>
      <div className={classes.container}>
        <div className={classes.right}>
          <div className={classes.tableBox}>
            <Title order={4} color={theme.colors.gray[7]}>
              Table
            </Title>
            <Title order={1} color={theme.colors.blue[7]}>
              {itemOn ? tableId : '-'}
            </Title>
          </div>
          <div className={classes.tableBox}>
            <Title order={4} color={theme.colors.gray[7]}>
              Waiting
              <br />
              Time
            </Title>
            <Title order={1} color={theme.colors.blue[7]}>
              {waitingTime.toFixed(2)}
            </Title>
          </div>
        </div>
        <div className={classes.left}>
          <div className={classes.imageBox}>
            <Title order={4} color={theme.colors.gray[7]}>
              Menu
            </Title>
            <img
              src={menuImage}
              height={120}
              width={180}
              alt="steak"
              className={classes.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
