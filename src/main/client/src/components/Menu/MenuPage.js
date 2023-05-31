import {Button, Card, Form, Input, List, Modal,message} from "antd";
import {useEffect, useRef, useState} from "react";
import useMenuItem from "../../hooks/use-menuItem";
import useSaveMenu from "../../hooks/use-save-menu";
import {useFetchCurrentUser} from "../../hooks";
import {useNavigate} from "react-router-dom";

//userId: 가게을 등록한 userId , currentId : 현재 로그인한 Id
const MenuPage = ({restaurantId , currentId , userId}) => {

    const [isMenuItem, menuItem] = useMenuItem();
    const [isSaveMenu, saveMenu] = useSaveMenu();
    const [isFetchingCurrentUser, fetchCurrentUser] = useFetchCurrentUser();

    const mounted = useRef(false);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal , setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [menuList, setMenuList] = useState([]);

    const [addMenu, setAddMenu] = useState({
        menuName:"",
        menuImg:"",
        menuPrice:"",
        menuInfo:"",
    })

    const { menuName, menuImg, menuPrice, menuInfo } = addMenu;

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onChangeMenuName = (e) => {
        setAddMenu({...addMenu, menuName: e.target.value});
    }

    const onChangeMenuImg = async (e) => {
        const fileInput = document.getElementById(e.target.id);
        const file = fileInput.files[0];
        const imageUrl = await uploadMenuImg(file);
        setAddMenu({...addMenu, menuImg: imageUrl});
    }

    const onChangeMenuPrice = (e) => {
        setAddMenu({...addMenu, menuPrice: e.target.value});
    }

    const onChangeMenuInfo = (e) => {
        setAddMenu({...addMenu, menuInfo: e.target.value});
    }

    const modalClick = async () => {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
        isModal == false ? setModal(true) : (isModal == true ? setModal(false) : console.log("모달"));
    }

    const onFinish = () => {
        console.log(addMenu);
        setIsModalOpen(false);
        onAddMenu();
    }

    const onAddMenu = async () => {
        const responseStatus = await saveMenu(menuName, menuImg, menuPrice, menuInfo, restaurantId);
        console.log(responseStatus);
        switch (responseStatus) {
            case 201:
                message.success("메뉴 추가 성공");
            case 500:
                message.error("현재 서버 문제로 메뉴를 추가할 수 없습니다.");
        }
    }

    async function uploadMenuImg(imageFile) {
        const apiKey = "6ea836ffc50696823b9566bfa44f6d78";

        const formData = new FormData();
        formData.append('image', imageFile);
        const test = formData.get('image');
        console.log(test);

        const response = await fetch('https://api.imgbb.com/1/upload?key='+apiKey, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);
        return data.data.url;
    }

    useEffect(() => {
        const fetchMenuItem = async () => {
            const menuItemList = await menuItem(restaurantId);
            setMenuList(menuItemList);
        };
        fetchMenuItem();
    }, [])

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }
        else if (!currentUser) {
            message.error("로그인이 필요합니다.");
            navigate("/login", {
                state: { form:window.location.pathname },
            });
            setCurrentUser(null);
        } else  {
            console.log("LandingFooter" , currentUser); //현재 이용자 데이터 확인하기
            currentUser.userId === userId ? showModal() : message.error("사장님만 사용할 수 있는 기능입니다.");
        }
    }, [isModal])

    return(
        <>
            <List className="rest-item">
                <List
                    style={{
                        width:1000,
                    }}
                    header={<div>
                        <div className="Meta-font">
                            메인 메뉴
                            {userId === currentId ? (<Button className="addMenu" type="primary" onClick={modalClick}>메뉴 추가하기</Button>) : (<div/>)}
                            <Modal
                                title="메뉴 등록"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                okButtonProps={{ style: {display:'none'}}}
                            >
                                <Form
                                    name="menuRegister"
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="메뉴 이름"
                                        name="menuName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "메뉴 이름을 입력해주세요",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="Menu-Item"
                                            placeholder="메뉴 이름을 입력해주세요"
                                            name="menuName"
                                            onChange={onChangeMenuName}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="메뉴 사진"
                                        name="menuImg"
                                        rules={[
                                            {
                                                required: true,
                                                message: "메뉴 사진을 등록해주세요",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="Menu-Item"
                                            placeholder="메뉴 사진을 등록해주세요"
                                            name="menuImg"
                                            type="file"
                                            id="file-Input"
                                            onChange={onChangeMenuImg}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="메뉴 가격"
                                        name="menuPrice"
                                        rules={[
                                            {
                                                required: true,
                                                message: "메뉴 가격을 입력해주세요",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="Menu-Item"
                                            placeholder="메뉴 가격을 입력해주세요"
                                            name="menuPrice"
                                            onChange={onChangeMenuPrice}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="메뉴 설명"
                                        name="menuInfo"
                                        rules={[
                                            {
                                                required: true,
                                                message: "메뉴 설명을 입력해주세요",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            className="Menu-Item"
                                            placeholder="메뉴 설명을 입력해주세요"
                                            name="menuInfo"
                                            rows={3}
                                            onChange={onChangeMenuInfo}
                                        ></Input.TextArea>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            className="addMenuModal"
                                            type="primary"
                                            onClick={onFinish}
                                        >추가하기</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                    }
                    bordered
                    dataSource={menuList}
                    renderItem={item => (
                        <div className="List-food">
                            <Card
                                className="Card-size"
                                cover={<img className="img-size" alt="example" src={item.menuImg}/>}
                            >
                                {/*<Meta className="Meta-font" title="김진영의 볼케이노 피자" description="15,000원"/>*/}
                                <div className="div-food-info">
                                    <h1 className="food-name">{item.menuName}</h1>
                                    <h1 className="food-info">{item.menuInfo}</h1>
                                    <h1 className="food-price">{item.menuPrice}원</h1>
                                </div>
                            </Card>
                        </div>
                    )}
                />
            </List>
        </>
    )
}


export default MenuPage;