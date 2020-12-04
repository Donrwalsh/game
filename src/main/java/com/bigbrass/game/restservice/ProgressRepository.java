package com.bigbrass.game.restservice;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProgressRepository extends CrudRepository<Progress, Long> {

    List<Progress> findByUserId(int userId);
}
