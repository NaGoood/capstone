package project.capstone.domain;

import lombok.Data;

@Data
public class RestaurantDto {

    private Integer restaurantId;
    private String restaurantName;
    private int reviewCount;
    private String address;
    private String categories;
    private String avgRating;
    private String open;
    private String imageUrl;
    private double latitude;
    private double longitude;

    RestaurantDto(){}

    public RestaurantDto(Integer restaurantId, String restaurantName, int reviewCount, String address, String categories, String avgRating, String open, String imageUrl,double latitude,double longitude){
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.reviewCount = reviewCount;
        this.address = address;
        this.categories = categories;
        this.avgRating = avgRating;
        this.open = open;
        this.imageUrl = imageUrl;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
