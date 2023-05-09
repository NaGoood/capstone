package project.capstone.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReservationDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String restaurantId;

    private String reservDate;

    private String reservTime;

    private int reservNumber;

    private String restaurantName;

    ReservationDto() {}

    public ReservationDto(String userId, String restaurantId, String reservTime,String reservDate,int reservNumber) {
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.reservDate = reservDate;
        this.reservTime = reservTime;
        this.reservNumber = reservNumber;
    }
}
