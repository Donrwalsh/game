package com.bigbrass.game.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TreeNode {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String color;
    private int gridPosition;
    private String name;
    private String image;
    private String description;
    public TreeNode() {

    }
    public TreeNode(Long id, int gridPosition, String name, String image, String description) {
        this.id = id;
        this.gridPosition = gridPosition;
        this.name = name;
        this.image = image;
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getGridPosition() {
        return gridPosition;
    }

    public void setGridPosition(int gridPosition) {
        this.gridPosition = gridPosition;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
