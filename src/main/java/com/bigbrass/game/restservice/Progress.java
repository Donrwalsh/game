package com.bigbrass.game.restservice;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private int userId;
    private int barId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Progress() {

    }

    public Progress(int barId) {
        this.userId = 1;
        this.barId = barId;
        this.startTime = LocalDateTime.now();
        this.endTime = LocalDateTime.now().plusMinutes(1L);
    }

    public int getUserId() {
        return userId;
    }

    @Override
    public String toString() {
        return String.format(
                "Progress[id=%d, userId='%d', barId='%d', startTime='%t', endTime='%t']",
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

    public LocalDateTime getEndTime() {
        return endTime;
    }
}
