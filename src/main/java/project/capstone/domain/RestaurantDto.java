package project.capstone.domain;

import lombok.Data;
import org.springframework.stereotype.Repository;

import java.time.Duration;


@Data
public class RestaurantDto {
    String restaurantId;
    String restaurantName;
    int reviewCount;

    String address;

    String categories;
    String open;
    String avgRating;
    String imageUrl;

    Double latitude;
    Double longitude;

    public RestaurantDto() {}

    public RestaurantDto(String restaurantId, String restaurantName, int reviewCount, String address, String categories,String avgRating, String open,  String imageUrl, Double latitude, Double longitude) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.reviewCount = reviewCount;
        this.address = address;
        this.categories = categories;
        this.avgRating = avgRating;
        this.open = open;
        this.imageUrl = imageUrl;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getOpen() {
        return open;
    }

    public void setOpen(String open) {
        this.open = open;
    }

    public String getRestaurantId() {
        return restaurantId;
    }



    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(String avgRating) {
        this.avgRating = avgRating;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
