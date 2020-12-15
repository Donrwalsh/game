package com.bigbrass.game.rest.repository;

import com.bigbrass.game.rest.model.TreeNode;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TreeNodeRepository extends CrudRepository<TreeNode, Long> {

    List<TreeNode> findAll();

    List<TreeNode> findByColor(String color);
}
