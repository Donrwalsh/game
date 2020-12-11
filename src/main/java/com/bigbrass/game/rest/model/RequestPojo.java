package com.bigbrass.game.rest.model;

public class RequestPojo {

    private int barId;
    private int userId;

    public RequestPojo(int barId, int userId) {
        this.barId = barId;
        this.userId = userId;
    }

    public int getBarId() {
        return barId;
    }

    public void setBarId(int barId) {
        this.barId = barId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "RequestPojo{" +
                "barId=" + barId +
                ", userId=" + userId +
                '}';
    }
}
