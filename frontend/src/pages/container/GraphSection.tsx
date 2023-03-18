import { createStyles, Title, useMantineTheme } from '@mantine/core';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limitToLast,
} from 'firebase/firestore';
import { FC, useState, useEffect, useMemo } from 'react';

import { db } from '../../lib/firebase';
import { GraphCardProps, GraphCard } from '../components/GraphCard';

const useStyles = createStyles((theme) => ({
  root: {
    width: 'auto',
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

export const GraphSection: FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [tempPercentage, setTempPercentage] = useState<number[]>([]);
  const [itemOnList, seItemOnList] = useState<boolean[]>([]);
  const [thermalImageUrl, setThermalImageUrl] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Date[]>([]);

  useEffect(() => {
    const qMainData = query(collection(db, 'mainData'));
    onSnapshot(qMainData, (querySnapshot) => {
      seItemOnList([]);
      setTempPercentage([]);
      setThermalImageUrl([]);
      setStartTime([]);
      querySnapshot.forEach((doc) => {
        seItemOnList((prev) => [...prev, doc.data().itemOn]);
        setTempPercentage((prev) => [...prev, Number(doc.data().tempDelta)]);
        setThermalImageUrl((prev) => [...prev, doc.data().imgUrl]);
        setStartTime((prev) => [
          ...prev,
          new Date(doc.data().startTime.seconds * 1000),
        ]);
      });
    });
  }, []);

  const [tempData1, setTempData1] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    if (startTime.length != 0) {
      const qTempData1 = query(
        collection(db, 'tempCrop1'),
        where('time', '>=', startTime[0]),
        orderBy('time', 'asc'),
        limitToLast(5),
      );
      const unsubscribe = onSnapshot(qTempData1, (querySnapshot) => {
        setTempData1([]);
        querySnapshot.docChanges().forEach((change) =>
          setTempData1((tempData1) => [
            ...tempData1,
            {
              time: new Date(
                (change.doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: change.doc.data().temp,
            },
          ]),
        );
      });
      return () => {
        unsubscribe();
      };
    }
    return;
  }, [startTime]);

  const [tempData2, setTempData2] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    console.log('run!');
    if (startTime.length != 0) {
      const qTempData2 = query(
        collection(db, 'tempCrop2'),
        where('time', '>=', startTime[1]),
        orderBy('time', 'asc'),
        limitToLast(5),
      );
      const unsubscribe = onSnapshot(qTempData2, (querySnapshot) => {
        setTempData2([]);
        querySnapshot.docChanges().forEach((change) =>
          setTempData2((tempData2) => [
            ...tempData2,
            {
              time: new Date(
                (change.doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: change.doc.data().temp,
            },
          ]),
        );
      });
      return () => {
        unsubscribe();
      };
    }
    return;
  }, [startTime]);

  const [tempData3, setTempData3] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    if (startTime.length != 0) {
      const qTempData3 = query(
        collection(db, 'tempCrop3'),
        where('time', '>=', startTime[2]),
        orderBy('time', 'asc'),
        limitToLast(5),
      );
      const unsubscribe = onSnapshot(qTempData3, (querySnapshot) => {
        setTempData3([]);
        querySnapshot.docChanges().forEach((change) =>
          setTempData3((tempData3) => [
            ...tempData3,
            {
              time: new Date(
                (change.doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: change.doc.data().temp,
            },
          ]),
        );
      });
      return () => {
        unsubscribe();
      };
    }
    return;
  }, [startTime]);

  const [tempData4, setTempData4] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    if (startTime.length != 0) {
      const qTempData4 = query(
        collection(db, 'tempCrop3'),
        where('time', '>=', startTime[3]),
        orderBy('time', 'asc'),
        limitToLast(5),
      );
      const unsubscribe = onSnapshot(qTempData4, (querySnapshot) => {
        setTempData4([]);
        querySnapshot.docChanges().forEach((change) =>
          setTempData4((tempData4) => [
            ...tempData4,
            {
              time: new Date(
                (change.doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: change.doc.data().temp,
            },
          ]),
        );
      });
      return () => {
        unsubscribe();
      };
    }
    return;
  }, [startTime]);

  const crop1Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[0],
      cropIndex: 1,
      tempPercentage: tempPercentage[0],
      tableId: 'D',
      menuImage: thermalImageUrl[0],
      chartData: tempData1,
    };
  }, [itemOnList, tempData1, tempPercentage, thermalImageUrl]);

  const crop2Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[1],
      cropIndex: 2,
      tempPercentage: tempPercentage[1],
      tableId: 'A',
      menuImage: thermalImageUrl[1],
      chartData: tempData2,
    };
  }, [itemOnList, tempData2, tempPercentage, thermalImageUrl]);

  const crop3Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[2],
      cropIndex: 3,
      tempPercentage: tempPercentage[2],
      tableId: 'B',
      menuImage: thermalImageUrl[2],
      chartData: tempData3,
    };
  }, [itemOnList, tempData3, tempPercentage, thermalImageUrl]);

  const crop4Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[3],
      cropIndex: 4,
      tempPercentage: tempPercentage[3],
      tableId: 'D',
      menuImage: thermalImageUrl[3],
      chartData: tempData4,
    };
  }, [itemOnList, tempData4, tempPercentage, thermalImageUrl]);

  return (
    <div className={classes.root}>
      <Title order={1} color={theme.colors.gray[8]}>
        Real Time Log
      </Title>
      <div className={classes.container}>
        <div className={classes.box}>
          <GraphCard {...crop1Data} />
          <GraphCard {...crop2Data} />
        </div>
        <div className={classes.box}>
          <GraphCard {...crop3Data} />
          <GraphCard {...crop4Data} />
        </div>
      </div>
    </div>
  );
};
