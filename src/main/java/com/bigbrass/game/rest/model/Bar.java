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
    private boolean autoComplete;
    private int autoCompletions;

    public Bar() {

    }

    public Bar(int userId, int barNum, int durationSec, boolean autoComplete, int autoCompletions) {
        this.userId = userId;
        this.barNum = barNum;
        this.durationSec = durationSec;
        this.autoComplete = autoComplete;
        this.autoCompletions = autoCompletions;
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

    public boolean isAutoComplete() {
        return autoComplete;
    }

    public void setAutoComplete(boolean autoComplete) {
        this.autoComplete = autoComplete;
    }

    public int getAutoCompletions() {
        return autoCompletions;
    }

    public void setAutoCompletions(int autoCompletions) {
        this.autoCompletions = autoCompletions;
    }
}
