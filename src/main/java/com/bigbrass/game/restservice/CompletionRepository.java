package com.bigbrass.game.restservice;

import org.springframework.data.repository.CrudRepository;

public interface CompletionRepository extends CrudRepository<Completion, Long> {

    Completion findByUserId(int userId);

    Completion save(Completion completion);
}
