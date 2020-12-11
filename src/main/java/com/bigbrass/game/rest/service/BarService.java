package com.bigbrass.game.rest.service;

import com.bigbrass.game.rest.model.Bar;
import com.bigbrass.game.rest.repository.BarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BarService {

    @Autowired
    BarRepository barRepository;

    public List<Bar> findByUserId(int userId) {
        List<Bar> result = barRepository.findByUserId(userId);
        if (result.size() != 3) {
            result = new ArrayList<>();
            result.add(barRepository.save(new Bar(userId, 1, 10, false, 0)));
            result.add(barRepository.save(new Bar(userId, 2, 60, false, 0)));
            result.add(barRepository.save(new Bar(userId, 3, 3600, false, 0)));
        }
        return result;
    }

    public List<Bar> saveBars(List<Bar> bars) {
        bars.forEach((bar) ->
            barRepository.save(bar));
        return bars;
    }
}
