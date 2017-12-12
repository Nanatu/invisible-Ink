-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 12, 2017 at 07:14 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invisibleink`
--

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `title`, `author`, `body`, `story_type`, `date_created`, `tick_rate`, `influence_rate`, `next_event`, `cycles`, `likes`, `views`) VALUES
(9, 'This is an example title (9)', 'This is an example author (9)', 'This is an example body(9)', 'Novella', '2017-12-07 09:14:26', '0.50', '0.50', 9, 9, 9, 9),
(8, 'This is an example title (8)', 'This is an example author (8)', 'This is an example body(8)', 'Short Stories', '2017-12-07 09:14:26', '0.25', '0.20', 8, 8, 8, 8),
(7, 'This is an example title (7)', 'This is an example author (7)', 'This is an example body(7)', 'Flash Fiction', '2017-12-07 09:14:26', '10.00', '10.00', 7, 7, 7, 7),
(6, 'This is an example title (6)', 'This is an example author (6)', 'This is an example body(6)', 'Poems & Sonnets', '2017-12-07 09:14:26', '5.00', '5.00', 6, 6, 6, 6),
(5, 'This is an example title (5)', 'This is an example author (5)', 'This is an example body(5)', 'Example Piece', '2017-12-07 09:14:26', '2.00', '2.00', 5, 5, 5, 5),
(4, 'This is an example title (4)', 'This is an example author (4)', 'This is an example body(4)', 'Novella', '2017-12-07 09:14:26', '1.00', '1.00', 4, 4, 4, 4),
(3, 'This is an example title (3)', 'This is an example author (3)', 'This is an example body (3)', 'Short Stories', '2017-12-07 09:11:25', '0.75', '0.75', 3, 3, 3, 3),
(2, 'This is an example title (2)', 'This is an example author (2)', 'This is an example body (2)', 'Flash Fiction', '2017-12-07 09:11:25', '0.50', '0.50', 2, 2, 2, 2),
(1, 'This is an example title (1)', 'This is an example author (1)', 'This is an example body (1)', 'Poems & Sonnets', '2017-12-07 09:11:25', '0.25', '0.25', 1, 1, 1, 1),
(10, 'This is an example title (10)', 'This is an example author (10)', 'This is an example body(10)', 'Example Piece', '2017-12-07 09:14:26', '0.75', '0.75', 10, 10, 10, 10);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
