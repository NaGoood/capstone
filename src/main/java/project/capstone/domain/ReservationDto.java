package project.capstone.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReservationDto {

    @NotBlank
    private String reservationName;
    @NotBlank
    private String reservationPhone;
    @NotBlank
    private String reservationDate;

    public ReservationDto(String reservationName, String reservationPhone, String reservationDate) {
        this.reservationName = reservationName;
        this.reservationPhone = reservationPhone;
        this.reservationDate = reservationDate;
    }
}
