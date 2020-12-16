DROP TABLE IF EXISTS tree_prereq cascade;
DROP TABLE IF EXISTS progress cascade;
DROP TABLE IF EXISTS completion cascade;
DROP TABLE IF EXISTS bar cascade;
DROP TABLE IF EXISTS tree_node cascade;

CREATE TABLE progress (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  user_id INT NOT NULL,
  bar_id INT NOT NULL,
  start_time TIMESTAMP(0) NOT NULL,
  end_time TIMESTAMP(0) NOT NULL
);

ALTER TABLE progress
ADD CONSTRAINT UQ_USER_ID_BAR_ID UNIQUE(user_id, bar_id);

--INSERT INTO progress (user_id, bar_id, start_time, end_time) VALUES
--  (1, 3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP + .001),
--  (1, 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP + .2);

CREATE TABLE completion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  count INT NOT NULL
);

--INSERT INTO completion (user_id, count) VALUES
--  (1, 0);

CREATE TABLE bar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bar_num INT NOT NULL,
    duration_sec INT NOT NULL,
    auto BOOLEAN NOT NULL,
    auto_count INT NOT NULL
);

INSERT INTO bar (user_id, bar_num, duration_sec, auto, auto_count) VALUES
    (1, 1, 10, FALSE, 0),
    (1, 2, 60, FALSE, 0),
    (1, 3, 3600, FALSE, 0);

CREATE TABLE tree_node (
    id INT AUTO_INCREMENT PRIMARY KEY,
    grid_position INT NOT NULL,
    color VARCHAR(10),
    name VARCHAR(25),
    image VARCHAR(2),
    description VARCHAR(255)
);

INSERT INTO tree_node (id, grid_position, color, name, image, description) VALUES
    (1, 2, 'green', 'Toughness', '20', 'Makes you harder to kill. Also makes you easier to not kill.'),
    (2, 4, 'green', 'Length of the Wurm', '22', 'Your entire body stretches increasing your height, melee range and movement speed.'),
    (3, 5, 'green', 'Carapace of the Beetle' , '24', 'Harden your skin and sprout two spiky pincers out your mouth. You can now speak beetle.'),
    (4, 6, 'green', 'Servitude of the Bee' , '06', 'You can now hover at a height of 4ft. Your carry capacity increases but you can no longer question authority of any kind.'),
    (5, 7, 'green', 'More Claws', '08', 'If you didn''t have claws before, you do now. If you did have claws before you have twice as many claws now.'),
    (6, 9, 'green', 'Eye Protection', '31', 'If you lose an eye it will grow back within one week. The location that it grows back is random but if you don''t like it you can remove it and try again next week.'),
    (7, 10, 'green', 'Nature''s Touch', '16', 'Striking any creature with an appendage or melee weapon instead heals for the damage that would have been dealt.'),
    (8, 11, 'green', 'Special Elk Guardian', '14', 'Once per season, you can summon a special elk guardian to help you in combat or with gardening.'),
    (9, 14, 'green', 'Tree', '27', 'Literally turns you into a tree.'),
    (10, 15, 'green', 'Fruit Bearing Tree', '33', 'As a tree, you can now bear fruit.');

CREATE TABLE tree_prereq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    node_id INT NOT NULL,
    prereq_id INT NOT NULL,
    prereq_level INT NOT NULL,
    foreign key (prereq_id) references tree_node(id)
);

INSERT INTO tree_prereq (id, node_id, prereq_id, prereq_level) VALUES
    (1, 2, 1, 5),
    (2, 3, 1, 5),
    (4, 4, 1, 5),
    (5, 5, 2, 5),
    (6, 5, 3, 5),
    (7, 6, 4, 5),
    (8, 7, 5, 5),
    (9, 8, 3, 5),
    (10, 8, 5, 5),
    (11, 8, 6, 5),
    (12, 9, 8, 5),
    (13, 10, 9, 5);