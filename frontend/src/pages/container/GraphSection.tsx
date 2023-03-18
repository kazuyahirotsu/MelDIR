import { createStyles, Title, useMantineTheme } from '@mantine/core';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { FC, useState, useEffect, useMemo } from 'react';

import { db } from '../../lib/firebase';
import { dummyData } from '../components/Chart';
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

  useEffect(() => {
    const qMainData = query(collection(db, 'mainData'));
    onSnapshot(qMainData, (querySnapshot) => {
      seItemOnList([]);
      querySnapshot.forEach((doc) => {
        seItemOnList((prev) => [...prev, doc.data().itemOn]);
      });
    });
  }, []);

  useEffect(() => {
    const qMainData = query(collection(db, 'mainData'));
    onSnapshot(qMainData, (querySnapshot) => {
      setTempPercentage([]);
      querySnapshot.forEach((doc) => {
        setTempPercentage((prev) => [...prev, Number(doc.data().tempDelta)]);
      });
    });
  }, []);
  console.log({ tempPercentage });

  const [startTime, setStartTime] = useState<Date[]>([]);

  useEffect(() => {
    const qMainData = query(collection(db, 'mainData'));
    onSnapshot(qMainData, (querySnapshot) => {
      setStartTime([]);
      querySnapshot.forEach((doc) => {
        setStartTime((prev) => [
          ...prev,
          new Date(doc.data().startTime.seconds * 1000),
        ]);
      });
    });
  }, []);
  console.log({ startTime });

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
      );

      const unsubscribeTempData = onSnapshot(qTempData1, (querySnapshot) => {
        setTempData1([]);
        querySnapshot.forEach((doc) =>
          setTempData1((tempData1) => [
            ...tempData1,
            {
              time: new Date(
                (doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: doc.data().temp,
            },
          ]),
        );
      });
    }
  }, [startTime]);

  const [tempData2, setTempData2] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    if (startTime.length != 0) {
      const qTempData2 = query(
        collection(db, 'tempCrop2'),
        where('time', '>=', startTime[1]),
        orderBy('time', 'asc'),
      );

      const unsubscribeTempData = onSnapshot(qTempData2, (querySnapshot) => {
        setTempData2([]);
        querySnapshot.forEach((doc) =>
          setTempData2((tempData2) => [
            ...tempData2,
            {
              time: new Date(
                (doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: doc.data().temp,
            },
          ]),
        );
      });
    }
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
      );

      const unsubscribeTempData = onSnapshot(qTempData3, (querySnapshot) => {
        setTempData3([]);
        querySnapshot.forEach((doc) =>
          setTempData3((tempData3) => [
            ...tempData3,
            {
              time: new Date(
                (doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: doc.data().temp,
            },
          ]),
        );
      });
    }
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
      );
      const unsubscribeTempData = onSnapshot(qTempData4, (querySnapshot) => {
        // tempData4.splice(0);
        setTempData4([]);
        querySnapshot.forEach((doc) =>
          setTempData4((tempData4) => [
            ...tempData4,
            {
              time: new Date(
                (doc.data().time.seconds + 32400) * 1000,
              ).toLocaleTimeString('ja-JP'),
              temperature: doc.data().temp,
            },
          ]),
        );
        console.log(tempData4);
        console.log(dummyData);
      });
    }
  }, []);

  const crop1Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[0],
      cropIndex: 1,
      tempPercentage: tempPercentage[0],
      tableId: 'D',
      menuImage:
        'https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg',
      chartData: tempData1,
    };
  }, [itemOnList, tempData1, tempPercentage]);

  const crop2Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[1],
      cropIndex: 2,
      tempPercentage: tempPercentage[1],
      tableId: 'A',
      menuImage:
        'https://img.freepik.com/free-photo/tasty-appetizing-classic-italian-spaghetti-pasta-with-tomato-sauce-cheese-parmesan-and-basil-on-plate-and-ingredients-for-cooking-pasta-on-white-marble-table_1150-45638.jpg',
      chartData: tempData2,
    };
  }, [itemOnList, tempData2, tempPercentage]);

  const crop3Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[2],
      cropIndex: 3,
      tempPercentage: tempPercentage[2],
      tableId: 'B',
      menuImage:
        'https://t4.ftcdn.net/jpg/01/64/95/35/360_F_164953558_Km5oiWKID0PbHDwkeHR137TBcI7f9tRJ.jpg',
      chartData: tempData3,
    };
  }, [itemOnList, tempData3, tempPercentage]);

  const crop4Data: GraphCardProps = useMemo(() => {
    return {
      itemOn: itemOnList[3],
      cropIndex: 4,
      tempPercentage: tempPercentage[3],
      tableId: 'D',
      menuImage:
        'https://image.excite.co.jp/jp/erecipe/recipe/9/1/91e4ba3667cde1e9111b51d2d6665fc1/147e90fc3c338c69b76b80d7f59b0853.jpeg',
      chartData: tempData4,
    };
  }, [itemOnList, tempData4, tempPercentage]);

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
