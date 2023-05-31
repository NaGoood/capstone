import {useMemo, useRef, useState} from "react";
import {Button, Input, message, Space, Table} from "antd";
import {RESERVATION_LIST_COLUMNS, RESERVATION_LIST_DATASOURCE} from "../../constants/constants";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words"
import {useEffect} from "react";
import {useFetchCurrentUser, useStoreReservationList} from "../../hooks";
import {useNavigate} from "react-router-dom";

const ManagerReservation = ({restaurantId}) =>{

    //region 변수
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();
    const [isStoreReservationList, fetchstoreReservationList] = useStoreReservationList();
    const searchInput = useRef(null);

    const [dataSource,setDataSource] = useState([]);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    //endregion

    //region uesEffect
    useEffect(() => {
        const fetchRservationList = async () => {
            const user = await fetchCurrentUser();
            if (!user) {
                message.error("로그인이 필요합니다.")
                navigate("/login", {
                    state: { form:window.location.pathname },
                });
            } else  {
                const reservationList = await fetchstoreReservationList(restaurantId);
                setDataSource(reservationList.data);
                console.log("ManagerReservation=" , dataSource);
                console.log("ManagerReservation=" , reservationList);
            }
        }
        fetchRservationList();
    }, [])

    //endregion

    //region 테이블 필터
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    className="filter-input"
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        className="filter-input"
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        검색
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        리셋
                    </Button>
                    <Button
                        className="filter-input"
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        필터
                    </Button>
                    <Button
                        className="filter-input"
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        닫기
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    //endregion

    //region 테이블 컬럼
    const columns = [
        {
            title: '고객이름',
            dataIndex: 'userName',
            key: 'userName',
            ...getColumnSearchProps('userName')
        },
        {
            title: '고객 전화번호',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber')
        },
        {
            title: '예약날짜',
            dataIndex: 'reservDate',
            key: 'reservDate',
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
            onFilter: (value, record) => record.reservDate.includes(value),
            filterSearch: true,

            filteredValue: filteredInfo.reservDate || null,
            sorter: (a, b) => a.reservDate.length - b.reservDate.length,
            sortOrder: sortedInfo.columnKey === 'reservDate' ? sortedInfo.order : null,
            ellipsis: true,

            width: '40%'
        },
        {
            title: '예약시간',
            dataIndex: 'reservTime',
            key: 'reservTime',
        }
        ,
        {
            title: '인원수',
            dataIndex: 'reservNumber',
            key: 'reservNumber',
        },
        {
            title: '메뉴',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: '취소 횟수',
            dataIndex: 'cancelCount',
            key: 'cancelCount',
        }];
    //endregion

    return(
        <div className="reservation-List">
            <Table dataSource={dataSource} columns={columns} onChange={handleChange} />
        </div>
    );
};

export default ManagerReservation;