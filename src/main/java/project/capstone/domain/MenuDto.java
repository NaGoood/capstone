package project.capstone.domain;

import javax.validation.constraints.NotBlank;

public class MenuDto {
    @NotBlank
    private String menuImg;
    @NotBlank
    private String menuName;
    @NotBlank
    private String menuPrice;
    @NotBlank
    private String menuInfo;
    @NotBlank
    private int menuId;

    public MenuDto(String menuImg, String menuName, String menuPrice, String menuInfo, int menuId) {
        this.menuImg = menuImg;
        this.menuName = menuName;
        this.menuPrice = menuPrice;
        this.menuInfo = menuInfo;
        this.menuId = menuId;
    }

    public String getMenuImg() {
        return menuImg;
    }

    public void setMenuImg(String menuImg) {
        this.menuImg = menuImg;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuPrice() {
        return menuPrice;
    }

    public void setMenuPrice(String menuPrice) {
        this.menuPrice = menuPrice;
    }

    public String getMenuInfo() {
        return menuInfo;
    }

    public void setMenuInfo(String menuInfo) {
        this.menuInfo = menuInfo;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }
}
