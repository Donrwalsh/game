package com.bigbrass.game.rest.model;

import javax.persistence.*;

@Entity
public class TreePrereq {

    @Id
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "prereq_id", referencedColumnName = "id")
    private TreeNode prereq;
    private int prereqLevel;

    public TreePrereq() {

    }

    public TreePrereq(Long id, TreeNode prereq, int prereqLevel) {
        this.id = id;
        this.prereq = prereq;
        this.prereqLevel = prereqLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TreeNode getPrereq() {
        return prereq;
    }

    public void setPrereq(TreeNode prereq) {
        this.prereq = prereq;
    }

    public int getPrereqLevel() {
        return prereqLevel;
    }

    public void setPrereqLevel(int prereqLevel) {
        this.prereqLevel = prereqLevel;
    }
}
