import { createStyles, Title, useMantineTheme } from '@mantine/core';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { FC, useState, useEffect } from 'react';

import { db } from '../../lib/firebase';
import { PriorityCard, PriorityCardProps } from '../components/PriorityCard';

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

  type PriorityData = Pick<PriorityCardProps, 'itemOn' | 'temp'>;

  const [itemOnList, seItemOnList] = useState<boolean[]>([]);
  const [tempList, setTempList] = useState<number[]>([]);

  useEffect(() => {
    const qMainData = query(collection(db, 'mainData'));
    onSnapshot(qMainData, (querySnapshot) => {
      seItemOnList([]);
      setTempList([]);
      querySnapshot.forEach((doc) => {
        seItemOnList((prev) => [...prev, doc.data().itemOn]);
        setTempList((prev) => [...prev, doc.data().temp]);
      });
    });
  }, []);
  console.log({ tempPercentage: itemOnList });

  const crop1Data: PriorityCardProps = {
    itemOn: itemOnList[0],
    cropIndex: 1,
    temp: tempList[0],
    tableNumber: 4,
    menuImage:
      'https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg',
  };

  const crop2Data: PriorityCardProps = {
    itemOn: itemOnList[1],
    cropIndex: 2,
    temp: tempList[1],
    tableNumber: 1,
    menuImage:
      'https://img.freepik.com/free-photo/tasty-appetizing-classic-italian-spaghetti-pasta-with-tomato-sauce-cheese-parmesan-and-basil-on-plate-and-ingredients-for-cooking-pasta-on-white-marble-table_1150-45638.jpg',
  };

  const crop3Data: PriorityCardProps = {
    itemOn: itemOnList[2],
    cropIndex: 3,
    temp: tempList[2],
    tableNumber: 2,
    menuImage:
      'https://t4.ftcdn.net/jpg/01/64/95/35/360_F_164953558_Km5oiWKID0PbHDwkeHR137TBcI7f9tRJ.jpg',
  };

  const crop4Data: PriorityCardProps = {
    itemOn: itemOnList[3],
    cropIndex: 4,
    temp: tempList[3],
    tableNumber: 4,
    menuImage:
      'https://image.excite.co.jp/jp/erecipe/recipe/9/1/91e4ba3667cde1e9111b51d2d6665fc1/147e90fc3c338c69b76b80d7f59b0853.jpeg',
  };

  return (
    <div className={classes.root}>
      <Title order={1} color={theme.colors.gray[8]}>
        Priority
      </Title>
      <div className={classes.container}>
        <PriorityCard {...crop1Data} />
        <PriorityCard {...crop2Data} />
        <PriorityCard {...crop3Data} />
        <PriorityCard {...crop4Data} />
      </div>
    </div>
  );
};
