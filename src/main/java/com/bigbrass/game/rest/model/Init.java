package com.bigbrass.game.rest.model;

import java.util.List;

public class Init {

    public List<Progress> getProgresses() {
        return progresses;
    }

    public void setProgresses(List<Progress> progresses) {
        this.progresses = progresses;
    }

    public List<Bar> getBars() {
        return bars;
    }

    public void setBars(List<Bar> bars) {
        this.bars = bars;
    }

    private List<Progress> progresses;
    private List<Bar> bars;


}
