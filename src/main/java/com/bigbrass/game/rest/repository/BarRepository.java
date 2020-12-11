package com.bigbrass.game.rest.repository;

import com.bigbrass.game.rest.model.Bar;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BarRepository extends CrudRepository<Bar, Long> {

    List<Bar> findByUserId(int userId);

    Bar findByUserIdAndBarNum(int userId, int barNum);

    Bar save(Bar bar);
}
