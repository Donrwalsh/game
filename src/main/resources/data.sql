DROP TABLE IF EXISTS progress;

CREATE TABLE progress (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  user_id INT NOT NULL,
  bar_id INT NOT NULL,
  start_time TIMESTAMP(0) NOT NULL,
  end_time TIMESTAMP(0) NOT NULL
);

INSERT INTO progress (user_id, bar_id, start_time, end_time) VALUES
  (1, 3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP + .001),
  (1, 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP + .2);