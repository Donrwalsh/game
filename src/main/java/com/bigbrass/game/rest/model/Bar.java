package com.bigbrass.game.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bar {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private int userId;
    private int barNum;
    private int durationSec;
    private boolean auto;
    private int autoCount;

    public Bar() {

    }

    public Bar(int userId, int barNum, int durationSec, boolean auto, int autoCount) {
        this.userId = userId;
        this.barNum = barNum;
        this.durationSec = durationSec;
        this.auto = auto;
        this.autoCount = autoCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBarNum() {
        return barNum;
    }

    public void setBarNum(int barNum) {
        this.barNum = barNum;
    }

    public int getDurationSec() {
        return durationSec;
    }

    public void setDurationSec(int durationSec) {
        this.durationSec = durationSec;
    }

    public boolean isAuto() {
        return auto;
    }

    public void setAuto(boolean auto) {
        this.auto = auto;
    }

    public int getAutoCount() {
        return autoCount;
    }

    public void setAutoCount(int autoCount) {
        this.autoCount = autoCount;
    }
}
