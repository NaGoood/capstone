import {useMemo, useRef, useState} from "react";
import {Button, Input, Space, Table} from "antd";
import {RESERVATION_LIST_COLUMNS, RESERVATION_LIST_DATASOURCE} from "../../constants/constants";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words"

const ManagerReservation = ({restaurantId}) =>{

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
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

    const dataSource = RESERVATION_LIST_DATASOURCE;
    const columns = [
        {
            title: '고객이름',
            dataIndex: 'userName',
            key: 'userName',
            ...getColumnSearchProps('userName')
        },
        {
            title: '고객 전화번호',
            dataIndex: 'userPhoneNumber',
            key: 'userPhoneNumber',
            ...getColumnSearchProps('userPhoneNumber')
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
        }];

    return(
        <div className="reservation-List">
            <Table dataSource={dataSource} columns={columns}/>;
        </div>
    );
};

export default ManagerReservation;