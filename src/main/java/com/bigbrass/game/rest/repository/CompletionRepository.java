package com.bigbrass.game.rest.repository;

import com.bigbrass.game.rest.model.Completion;
import org.springframework.data.repository.CrudRepository;

public interface CompletionRepository extends CrudRepository<Completion, Long> {

    Completion findByUserId(int userId);

    Completion save(Completion completion);
}
