import { createStyles, Title, useMantineTheme } from '@mantine/core';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { FC, useState, useEffect, useMemo } from 'react';

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

  const [itemOnList, seItemOnList] = useState<boolean[]>([]);
  const [waitingTimeList, setWatingTimeList] = useState<number[]>([]);
  const [priorityList, setPriorityList] = useState<number[]>([]);

  useEffect(() => {
    const qMainData = query(collection(db, 'mainData'));
    onSnapshot(qMainData, (querySnapshot) => {
      seItemOnList([]);
      setWatingTimeList([]);
      setPriorityList([]);
      querySnapshot.forEach((doc) => {
        seItemOnList((prev) => [...prev, doc.data().itemOn]);
        setWatingTimeList((prev) => [...prev, doc.data().waitingTime]);
        setPriorityList((prev) => [...prev, doc.data().priority]);
      });
    });
  }, []);

  const crop1Data: PriorityCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[0],
      priority: priorityList[0],
      cropIndex: 1,
      waitingTime: waitingTimeList[0],
      tableId: 'D',
      menuImage:
        'https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg',
    };
  }, [itemOnList, priorityList, waitingTimeList]);

  const crop2Data: PriorityCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[1],
      priority: priorityList[1],
      cropIndex: 2,
      waitingTime: waitingTimeList[1],
      tableId: 'A',
      menuImage:
        'https://img.freepik.com/free-photo/tasty-appetizing-classic-italian-spaghetti-pasta-with-tomato-sauce-cheese-parmesan-and-basil-on-plate-and-ingredients-for-cooking-pasta-on-white-marble-table_1150-45638.jpg',
    };
  }, [itemOnList, priorityList, waitingTimeList]);

  const crop3Data: PriorityCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[2],
      priority: priorityList[2],
      cropIndex: 3,
      waitingTime: waitingTimeList[2],
      tableId: 'B',
      menuImage:
        'https://t4.ftcdn.net/jpg/01/64/95/35/360_F_164953558_Km5oiWKID0PbHDwkeHR137TBcI7f9tRJ.jpg',
    };
  }, [itemOnList, priorityList, waitingTimeList]);

  const crop4Data: PriorityCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[3],
      priority: priorityList[3],
      cropIndex: 4,
      waitingTime: waitingTimeList[3],
      tableId: 'D',
      menuImage:
        'https://image.excite.co.jp/jp/erecipe/recipe/9/1/91e4ba3667cde1e9111b51d2d6665fc1/147e90fc3c338c69b76b80d7f59b0853.jpeg',
    };
  }, [itemOnList, priorityList, waitingTimeList]);

  const cropDataList: PriorityCardProps[] = useMemo(() => {
    const list = [crop1Data, crop2Data, crop3Data, crop4Data];
    list.sort((a, b) => {
      return a.priority < b.priority ? -1 : 1;
    });
    return list;
  }, [crop1Data, crop2Data, crop3Data, crop4Data]);

  return (
    <div className={classes.root}>
      <Title order={1} color={theme.colors.gray[8]}>
        Priority
      </Title>
      <div className={classes.container}>
        {cropDataList.map((cropData, index) => {
          return cropData.itemOn ? (
            <PriorityCard key={index} {...cropData} />
          ) : null;
        })}
      </div>
    </div>
  );
};
