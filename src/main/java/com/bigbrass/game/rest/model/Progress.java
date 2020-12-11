package com.bigbrass.game.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private int userId;
    private int barId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    protected Progress() {

    }

    public Progress(Bar bar) {
        this.userId = bar.getUserId();
        this.barId = bar.getBarNum();
        this.startTime = getRoundedNow();
        this.endTime = calculateEndTime(bar, startTime).truncatedTo(ChronoUnit.SECONDS);
    }

    public int getUserId() {
        return userId;
    }

    @Override
    public String toString() {
        return String.format(
                "Progress[id=%d, userId='%d', barId='%d', startTime='%s', endTime='%s']",
                id, userId, barId, startTime, endTime);
    }

    public Long getId() {
        return id;
    }

    public int getBarId() {
        return barId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    private LocalDateTime getRoundedNow() {
        LocalDateTime roundedTime = LocalDateTime.now();
        int nano = roundedTime.getNano();
        if (nano > 500000000) {
            roundedTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).plusSeconds(1L);
        } else {
            roundedTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        }
        return roundedTime;
    }

    private LocalDateTime calculateEndTime(Bar bar, LocalDateTime startTime) {
        LocalDateTime endTime = startTime.plusSeconds(Long.valueOf(bar.getDurationSec()));
        return endTime;
    }
}
