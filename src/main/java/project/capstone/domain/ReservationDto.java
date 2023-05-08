package project.capstone.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReservationDto {

    @NotBlank
    private String reservationName;
    @NotBlank
    private String reservationPhoneNumber;
    @NotBlank
    private String reservationDate;

    private int count;

    public ReservationDto(String reservationName, String reservationPhoneNumber, String reservationDate,int count) {
        this.reservationName = reservationName;
        this.reservationPhoneNumber = reservationPhoneNumber;
        this.reservationDate = reservationDate;
        this.count = count;
    }
}
