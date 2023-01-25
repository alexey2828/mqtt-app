interface listCategory1 {
  [id: number, title: string, value: any];
}
export const ListStructure = (jsonFromServer: any) => {
  const listCategory1: listCategory1 = [
    {
      id: 1,
      title: 'T1 з котла 1',
      value: jsonFromServer?.d?.T1,
    },
    {
      id: 2,
      title: 'T2 з котла 2',
      value: jsonFromServer?.d?.T2,
    },
    {
      id: 3,
      title: 'T3 з котлів',
      value: jsonFromServer?.d?.T3,
    },
    {
      id: 4,
      title: 'T4 обр. з підж.',
      value: jsonFromServer?.d?.T4,
    },
    {
      id: 5,
      title: 'T5 з котлів',
      value: jsonFromServer?.d?.T5,
    },
    {
      id: 6,
      title: 'T6 ближн.',
      value: jsonFromServer?.d?.T6,
    },
    {
      id: 7,
      title: 'T7 П. 1 ближ. К',
      value: jsonFromServer?.d?.T7,
    },
    {
      id: 8,
      title: 'T8 Опал. Водопост. 2345',
      value: jsonFromServer?.d?.T8,
    },
    {
      id: 9,
      title: 'T9 дальній К 234',
      value: jsonFromServer?.d?.T9,
    },
    {
      id: 10,
      title: 'T10 Опал. котельн',
      value: jsonFromServer?.d?.T10,
    },
    {
      id: 11,
      title: 'T11 П. 1, дальн. К',
      value: jsonFromServer?.d?.T11,
    },
    {
      id: 12,
      title: 'T12 Загал. обр',
      value: jsonFromServer?.d?.T12,
    },
    {
      id: 13,
      title: 'T13 Підживл. вода',
      value: jsonFromServer?.d?.T13,
    },
    {
      id: 14,
      title: 'T14 Повітря',
      value: jsonFromServer?.d?.T14,
    },
    {
      id: 15,
      title: 'T15 Поверх 1',
      value: jsonFromServer?.d?.T15,
    },
    {
      id: 16,
      title: 'T16 Поверх 2',
      value: jsonFromServer?.d?.T16,
    },
    {
      id: 17,
      title: 'T17 Поверх 5',
      value: jsonFromServer?.d?.T16,
    },
    {
      id: 18,
      title: 'T18 Душова',
      value: jsonFromServer?.d?.T17,
    },
  ];

  const listCategory2: listCategory1 = [
    {
      id: 1,
      title: 'P1 подачі тепл',
      value: jsonFromServer?.d?.P1,
    },
    {
      id: 2,
      title: 'P2 після циркул. н',
      value: jsonFromServer?.d?.P2,
    },
    {
      id: 3,
      title: 'P3 звор. колектор',
      value: jsonFromServer?.d?.P3,
    },
    {
      id: 4,
      title: 'P4 обр. піджив',
      value: jsonFromServer?.d?.P4,
    },
  ];

  return listCategory1, listCategory2;
};
