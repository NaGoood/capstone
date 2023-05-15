package project.capstone.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
 public class MenuDto {

    private String restaurantId;
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

    public MenuDto() {}

    public MenuDto(String restaurantId, String menuImg, String menuName, String menuPrice, String menuInfo, int menuId) {
        this.restaurantId = restaurantId;
        this.menuImg = menuImg;
        this.menuName = menuName;
        this.menuPrice = menuPrice;
        this.menuInfo = menuInfo;
        this.menuId = menuId;
    }
}
