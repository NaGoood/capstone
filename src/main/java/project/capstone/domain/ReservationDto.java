package project.capstone.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReservationDto {

    private String reservationId;
    @NotBlank
    private String userId;
    @NotBlank
    private String restaurantId;
    @NotBlank
    private String menuId;

    private String reservDate;

    private String reservTime;

    private int reservNumber;

    private String restaurantName;

    private String userName;

    private String phoneNumber;

    private int cancelCount;

    ReservationDto() {}

    public ReservationDto(String reservationId, String userId, String restaurantId, String reservTime, String reservDate, int reservNumber, String menuId) {
        this.reservationId = reservationId;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.reservDate = reservDate;
        this.reservTime = reservTime;
        this.reservNumber = reservNumber;
        this.menuId = menuId;
    }
}