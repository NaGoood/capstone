export const restaurantCityOptions = [
  {
    value: "",
    label: "All",
  },
  {
    value: "Phoenix",
    label: "Phoenix",
  },
  {
    value: "Scottsdale",
    label: "Scottsdale",
  },
  {
    value: "Tempe",
    label: "Tempe",
  },
  {
    value: "Mesa",
    label: "Mesa",
  },
  {
    value: "Chandler",
    label: "Chandler",
  },
  {
    value: "Glendale",
    label: "Glendale",
  },
  {
    value: "Gilbert",
    label: "Gilbert",
  },
  {
    value: "Peoria",
    label: "Peoria",
  },
  {
    value: "Surprise",
    label: "Surprise",
  },
  {
    value: "Avondale",
    label: "Avondale",
  },
  {
    value: "Goodyear",
    label: "Goodyear",
  },
  {
    value: "Queen Creek",
    label: "Queen Creek",
  },
  {
    value: "Cave Creek",
    label: "Cave Creek",
  },
  {
    value: "Paradise Valley",
    label: "Paradise Valley",
  },
  {
    value: "Casa Grande",
    label: "Casa Grande",
  },
  {
    value: "Fountain Hills",
    label: "Fountain Hills",
  },
  {
    value: "Apache Junction",
    label: "Apache Junction",
  },
  {
    value: "Anthem",
    label: "Anthem",
  },
  {
    value: "Buckeye",
    label: "Buckeye",
  },
  {
    value: "Maricopa",
    label: "Maricopa",
  },
];

export const restaurantCategoryOptions = [
  {
    value: "",
    label: "All",
  },
  {
    value: "Mexican",
    label: "Mexican",
  },
  {
    value: "Pizza",
    label: "Pizza",
  },
  {
    value: "Coffee & Tea",
    label: "Coffee & Tea",
  },
  {
    value: "Chinese",
    label: "Chinese",
  },
  {
    value: "American (Traditional)",
    label: "American (Traditional)",
  },
  {
    value: "Ice Cream & Frozen Yogurt",
    label: "Ice Cream & Frozen Yogurt",
  },
  {
    value: "Sandwiches",
    label: "Sandwiches",
  },
  {
    value: "American (New)",
    label: "American (New)",
  },
  {
    value: "Fast Food",
    label: "Fast Food",
  },
  {
    value: "Italian",
    label: "Italian",
  },
  {
    value: "Burgers",
    label: "Burgers",
  },
  {
    value: "Breakfast & Brunch",
    label: "Breakfast & Brunch",
  },
  {
    value: "Thai",
    label: "Thai",
  },
  {
    value: "Bakeries",
    label: "Bakeries",
  },
  {
    value: "Japanese",
    label: "Japanese",
  },
];

export const restaurantRatingOptions = [
  {
    value: "1",
    label: "All",
  },
  {
    value: "4.5",
    label: "Excellent 4.5+",
  },
  {
    value: "4",
    label: "Very Good 4+",
  },
  {
    value: "3.5",
    label: "Good 3.5+",
  },
];

export const restaurantOpenOptions = [
  {
    value: "Y",
    label: "Open",
  },
  {
    value: "All",
    label: "All",
  },
  {
    value: "N",
    label: "Closed",
  },
];

export const restaurantSortOptions = [
  {
    value: "avgRating",
    label: "Highest Rated",
  },
  {
    value: "reviewCount",
    label: "Most Reviewed",
  },
];

export const reviewRatingOptions = [
  {
    value: "",
    label: "All Ratings",
  },
  {
    value: "5",
    label: "5 Stars",
  },
  {
    value: "4",
    label: "4 Stars",
  },
  {
    value: "3",
    label: "3 Stars",
  },
  {
    value: "2",
    label: "2 Stars",
  },
  {
    value: "1",
    label: "1 Star",
  },
];

export const reviewSortOptions = [
  {
    value: "date",
    label: "Date",
  },
  {
    value: "rating",
    label: "Rating",
  },
  {
    value: "usefulCount",
    label: "Useful",
  },
  {
    value: "funnyCount",
    label: "Funny",
  },
  {
    value: "coolCount",
    label: "Cool",
  },
];

export const savedRestaurantSortOptions = [
  {
    value: "lastUpdated",
    label: "Recently Added",
  },
  {
    value: "restaurantName",
    label: "Name",
  },
];

export const DEFAULT_COORDS = {
  lat: 36.339303,
  lng: 127.394143, // 대전
};

export const PAGE_SIZE = 10;

export const RESERVATION_LIST_COLUMNS = [
  {
    title: '고객이름',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '고객 전화번호',
    dataIndex: 'userPhoneNumber',
    key: 'userPhoneNumber',
  },
  {
    title: '예약시간',
    dataIndex: 'reservationDate',
    filters: [
      {
        text: '1월',
        value: '-01-',
      },
      {
        text: '2월',
        value: '-02-',
      },
      {
        text: '3월',
        value: '-03-',
      },
      {
        text: '4월',
        value: '-04-',
      },
      {
        text: '5월',
        value: '-05-',
      },
      {
        text: '6월',
        value: '-06-',
      },
      {
        text: '7월',
        value: '-07-',
      },
      {
        text: '8월',
        value: '-08-',
      },
      {
        text: '9월',
        value: '-09-',
      },
      {
        text: '10월',
        value: '-10-',
      },
      {
        text: '11월',
        value: '-11-',
      },
      {
        text: '12월',
        value: '-12-',
      },
    ],
    onFilter: (value, record) => record.reservationDate.includes(value),
    filterSearch: true,
    width: '40%'
  },
  {
    title: '인원수',
    dataIndex: 'ReservationPeopleCount',
    key: 'ReservationPeopleCount',
  },
  {
    title: '메뉴',
    dataIndex: 'Menu',
    key: 'Menu',
  },
  {
    title: '취소 횟수',
    dataIndex: 'CancelCount',
    key: 'CancelCount',
  }
];

export const RESERVATION_LIST_DATASOURCE = [
  {
    key: '1',
    userName: '나용준',
    userPhoneNumber: '010-1111-1111',
    reservationDate: '2023-05-03',
    ReservationPeopleCount:'3',
    Menu:'나용준피자',
    CancelCount:'1'

  },
  {
    key: '2',
    userName: '김진영',
    userPhoneNumber: '010-2222-2222',
    reservationDate: '2023-04-13',
    ReservationPeopleCount:'3',
    Menu:'김진영피자',
    CancelCount:'1'
  },
  {
    key: '3',
    userName: '양호신',
    userPhoneNumber: '010-3333-3333',
    reservationDate: '2023-03-23',
    ReservationPeopleCount:'3',
    Menu:'양호신피자',
    CancelCount:'1'
  },
  {
    key: '4',
    userName: '김민건',
    userPhoneNumber: '010-4444-4444',
    reservationDate: '2023-12-03',
    ReservationPeopleCount:'3',
    Menu:'김민건피자',
    CancelCount:'1'
  },
  {
    key: '5',
    userName: '최대욱',
    userPhoneNumber: '010-5555-5555',
    reservationDate: '2023-09-21',
    ReservationPeopleCount:'3',
    Menu:'최대욱피자',
    CancelCount:'1'
  },
  {
    key: '6',
    userName: '김용직',
    userPhoneNumber: '010-6666-6666',
    reservationDate: '2023-06-18',
    ReservationPeopleCount:'3',
    Menu:'김용직피자',
    CancelCount:'1'
  },
];
