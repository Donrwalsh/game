package com.bigbrass.game.rest.model;

import java.util.List;

public class NodeDelegate {

    private TreeNode treeNode;

    public NodeDelegate(TreeNode treeNode) {
        this.treeNode = treeNode;
    }

    public TreeNode getTreeNode() {
        return treeNode;
    }

    public void setTreeNode(TreeNode treeNode) {
        this.treeNode = treeNode;
    }

    public Integer getGridPosition() {
        return treeNode.getGridPosition();
    }

    public String getImage() {
        return treeNode.getImage();
    }

    public String getName() {
        return treeNode.getName();
    }

    public String getDescription() {
        return treeNode.getDescription();
    }

    public List<TreePrereq> treePrereqs() {
        return treeNode.getTreePrereqs();
    }
}
