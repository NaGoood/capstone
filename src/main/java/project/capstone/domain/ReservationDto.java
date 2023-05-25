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

    private String reservDate;

    private String reservTime;

    private int reservNumber;

    private String restaurantName;

    private int tableNumber;

    private Integer tableType;

    ReservationDto() {}

    public ReservationDto(String reservationId, String userId, String restaurantId, String reservDate, String reservTime, int reservNumber, String restaurantName, int tableNumber, Integer tableType) {
        this.reservationId = reservationId;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.reservDate = reservDate;
        this.reservTime = reservTime;
        this.reservNumber = reservNumber;
        this.restaurantName = restaurantName;
        this.tableNumber = tableNumber;
        this.tableType = tableType;
    }
}