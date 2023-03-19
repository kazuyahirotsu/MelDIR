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
        'https://dw4dgbtzbcxdk.cloudfront.net/img/goods/2/S00031_2.jpg',
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
        'https://item-shopping.c.yimg.jp/i/l/mashimo_10160158',
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
        'https://c.superdelivery.com/ip/n/sa/1200/630/www.superdelivery.com/product_image/820/8/8208357_s_1000.jpg',
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
        'https://www.lawson.co.jp/recommend/original/detail/img/l720252.png',
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
