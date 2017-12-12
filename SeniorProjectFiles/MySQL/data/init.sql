CREATE DATABASE IF NOT EXISTS invisibleink;

use invisibleink;

CREATE TABLE IF NOT EXISTS `stories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `author` varchar(128) NOT NULL,
  `body` longtext NOT NULL,
  `story_type` tinytext NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tick_rate` decimal(10,2) NOT NULL,
  `influence_rate` decimal(10,2) NOT NULL,
  `next_event` int(11) NOT NULL,
  `cycles` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `views` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `stories` (`id`, `title`, `author`, `body`, `story_type`, `date_created`, `tick_rate`, `influence_rate`, `next_event`, `cycles`, `likes`, `views`) VALUES
(1, 'This is an example title (1)', 'This is an example author (1)', 'This is an example body', 'Poems & Sonnets', '2017-12-07 03:11:25', '0.25', '0.25', 1, 1, 1, 1),
(2, 'This is an example title (2)', 'This is an example author (2)', 'This is an example body', 'Flash Fiction', '2017-12-07 03:11:25', '0.50', '0.50', 2, 2, 2, 2),
(3, 'This is an example title (3)', 'This is an example author (3)', 'This is an example body', 'Short Stories', '2017-12-07 03:11:25', '0.75', '0.75', 3, 3, 3, 3),
(4, 'This is an example title (4)', 'This is an example author (4)', 'This is an example body(4)', 'Novella', '2017-12-07 03:14:26', '1.00', '1.00', 4, 4, 4, 4),
(5, 'This is an example title (5)', 'This is an example author (5)', 'This is an example body(5)', 'Example Piece', '2017-12-07 03:14:26', '2.00', '2.00', 5, 5, 5, 5),
(6, 'This is an example title (6)', 'This is an example author (6)', 'This is an example body(6)', 'Poems & Sonnets', '2017-12-07 03:14:26', '5.00', '5.00', 6, 6, 6, 6),
(7, 'This is an example title (7)', 'This is an example author (7)', 'This is an example body(7)', 'Flash Fiction', '2017-12-07 03:14:26', '10.00', '10.00', 7, 7, 7, 7),
(8, 'This is an example title (8)', 'This is an example author (8)', 'This is an example body(8)', 'Short Stories', '2017-12-07 03:14:26', '0.25', '0.20', 8, 8, 8, 8),
(9, 'This is an example title (9)', 'This is an example author (9)', 'This is an example body(9)', 'Novella', '2017-12-07 03:14:26', '0.50', '0.50', 9, 9, 9, 9),
(10, 'This is an example title (10)', 'This is an example author (10)', 'This is an example body(10)', 'Example Piece', '2017-12-07 03:14:26', '0.75', '0.75', 10, 10, 10, 10);



/*
SAMPLE QUERY TO UPDATE

UPDATE `stories` SET `body` = 'This is an example body (3)' WHERE `stories`.`id` = 2
*/
