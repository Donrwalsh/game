package com.bigbrass.game.restservice;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Completion {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private int userId;
    private int count;

    public Completion() {

    }

    public Completion(int userId) {
        this.userId = userId;
        this.count = 0;
    }

    public Long getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public int getCount() {
        return count;
    }

        public void setCount(int count) {
            this.count = count;
        }
}
