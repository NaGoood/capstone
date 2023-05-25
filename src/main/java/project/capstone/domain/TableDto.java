package project.capstone.domain;

import lombok.Data;

@Data
public class TableDto {
    private int tableId;
    private int restaurantId;

    private boolean tableValue;

    private int tableType;

    private int tableNumber;

    public TableDto() {}

    public TableDto(int tableId, int restaurantId, boolean tableValue, int tableType, int tableNumber) {
        this.tableId = tableId;
        this.restaurantId = restaurantId;
        this.tableValue = tableValue;
        this.tableType = tableType;
        this.tableNumber = tableNumber;
    }
}