package com.bigbrass.game.rest.mediation;

import com.bigbrass.game.rest.model.NodeDelegate;
import com.bigbrass.game.rest.model.TreeNode;
import com.bigbrass.game.rest.service.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TreeMediation {

    @Autowired
    NodeService nodeService;

    public List<NodeDelegate> getGreenNodes() {
        List<NodeDelegate> result = new ArrayList<NodeDelegate>();

        List<TreeNode> treeNodes = nodeService.findByColor("green");

        treeNodes.forEach((treeNode) -> {
           result.add(new NodeDelegate(treeNode));
        });
        return result;
    }

}
