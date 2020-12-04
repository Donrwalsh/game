DROP TABLE IF EXISTS progress;
DROP TABLE IF EXISTS completion;

CREATE TABLE progress (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  user_id INT NOT NULL,
  bar_id INT NOT NULL,
  start_time TIMESTAMP(0) NOT NULL,
  end_time TIMESTAMP(0) NOT NULL
);

ALTER TABLE progress
ADD CONSTRAINT UQ_USER_ID_BAR_ID UNIQUE(user_id, bar_id);

INSERT INTO progress (user_id, bar_id, start_time, end_time) VALUES
  (1, 3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP + .001),
  (1, 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP + .2);

CREATE TABLE completion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  count INT NOT NULL
);

INSERT INTO completion (user_id, count) VALUES
  (1, 0);