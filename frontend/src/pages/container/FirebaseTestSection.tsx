import { createStyles, getStylesRef } from '@mantine/core';
import { doc, onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { FC } from 'react';

import { db } from '../../lib/firebase';


const useStyles = createStyles((theme) => ({
  root: {
    ref: getStylesRef('root'),
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: `${theme.spacing.xl}px`,
    gap: `${theme.spacing.md}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'start',
    color: theme.black,
  },
}));

export const FirebaseTestSection: FC = () => {
  const { classes } = useStyles();

  // this listens just one document in collection
  // const unsub = onSnapshot(doc(db, "mainData", "crop1"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });
  
  // this listens all the document in collection of mainData
  // this will updated in real-time!
  const qMainData = query(collection(db, "mainData"));
  const unsubscribeMainData = onSnapshot(qMainData, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("Current data: ", doc.data());
    });
  });

  // this listens the time-series temp data documentation of collection of tempCrop1
  const start = new Date('2023-03-01T00:00:00.000z');
  const end = new Date('2023-03-31T23:59:59.000z');
  const qTempData = query(collection(db, "tempCrop1"), orderBy("time", "desc"), where('time', '>=', start), where('time', '<=', end));
  const unsubscribeTempData = onSnapshot(qTempData, (querySnapshot) => {
    const tempData1: any[][] = [];
    querySnapshot.forEach((doc) => {
      tempData1.push([doc.data().time, doc.data().temp]);
    });
    console.log(tempData1);
  });

  return (
    <div className={classes.root}>
      <p>hello</p>
    </div>
  );
};
