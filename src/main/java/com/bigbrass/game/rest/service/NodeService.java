package com.bigbrass.game.rest.service;

import com.bigbrass.game.rest.model.TreeNode;
import com.bigbrass.game.rest.repository.TreeNodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NodeService {

    @Autowired
    TreeNodeRepository treeNodeRepository;

    public List<TreeNode> findAllTreeNodes() {
        return treeNodeRepository.findAll();
    }
}
