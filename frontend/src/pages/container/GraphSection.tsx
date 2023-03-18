import { createStyles, Title, useMantineTheme } from '@mantine/core';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { FC, useState, useEffect } from 'react';

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

  // this listens the time-series temp data documentation of collection of tempCrop1
  const start = new Date('2023-03-01T00:00:00.000z');
  const end = new Date('2023-03-31T23:59:59.000z');
  const qTempData = query(
    collection(db, 'tempCrop1'),
    where('time', '>=', start),
    where('time', '<=', end),
    orderBy('time', 'asc'),
  );

  const [tempData1, setTempData1] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    const unsubscribeTempData = onSnapshot(qTempData, (querySnapshot) => {
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
      console.log(tempData1);
      console.log(dummyData);
    });
  }, []);
  const [tempData2, setTempData2] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    const unsubscribeTempData = onSnapshot(qTempData, (querySnapshot) => {
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
      console.log(tempData2);
      console.log(dummyData);
    });
  }, []);
  const [tempData3, setTempData3] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    const unsubscribeTempData = onSnapshot(qTempData, (querySnapshot) => {
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
      console.log(tempData3);
      console.log(dummyData);
    });
  }, []);
  const [tempData4, setTempData4] = useState<
    Array<{
      time: string;
      temperature: number;
    }>
  >([]);
  useEffect(() => {
    const unsubscribeTempData = onSnapshot(qTempData, (querySnapshot) => {
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
  }, []);

  const crop1Data: GraphCardProps = {
    cropIndex: 1,
    tempPercentage: tempPercentage[0],
    tableNumber: 4,
    menuImage:
      'https://d1u3tvp6g3hoxn.cloudfront.net/media/wysiwyg/cookingstudio/recipe/34/34_steak_00.jpg',
    chartData: tempData1,
  };

  const crop2Data: GraphCardProps = {
    cropIndex: 2,
    tempPercentage: tempPercentage[1],
    tableNumber: 1,
    menuImage:
      'https://img.freepik.com/free-photo/tasty-appetizing-classic-italian-spaghetti-pasta-with-tomato-sauce-cheese-parmesan-and-basil-on-plate-and-ingredients-for-cooking-pasta-on-white-marble-table_1150-45638.jpg',
    chartData: tempData2,
  };

  const crop3Data: GraphCardProps = {
    cropIndex: 3,
    tempPercentage: tempPercentage[2],
    tableNumber: 2,
    menuImage:
      'https://t4.ftcdn.net/jpg/01/64/95/35/360_F_164953558_Km5oiWKID0PbHDwkeHR137TBcI7f9tRJ.jpg',
    chartData: tempData3,
  };

  const crop4Data: GraphCardProps = {
    cropIndex: 4,
    tempPercentage: tempPercentage[3],
    tableNumber: 4,
    menuImage:
      'https://image.excite.co.jp/jp/erecipe/recipe/9/1/91e4ba3667cde1e9111b51d2d6665fc1/147e90fc3c338c69b76b80d7f59b0853.jpeg',
    chartData: tempData4,
  };

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
