
CREATE TABLE `testdata` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `distance` double(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `testdata` (`id`, `date`, `name`, `count`, `distance`) VALUES
(1, '1990-01-01', 'Grodno', 6, 22.40),
(3, '1990-02-01', 'Minsk', 6, 19.45),
(4, '1990-03-01', 'Moscow', 8, 800.43),
(5, '1990-04-01', 'St. Petersburg', 6, 900.00),
(6, '1990-05-01', 'Norilsk', 14, 67.22),
(7, '1990-06-01', 'Gomel', 5, 123.12),
(8, '1990-07-01', 'Vitebsk', 5, 15.15),
(9, '1990-08-01', 'Riazan', 2, 78.68),
(10, '1990-09-01', 'Kazan', 2, 122.16),
(11, '1990-10-01', 'Warshawa', 18, 16.60),
(12, '1990-11-01', 'Berlin', 13, 1.67),
(13, '1990-12-01', 'New York', 15, 1234.50),
(14, '1991-01-01', 'Paris', 9, 2.20),
(15, '1992-01-01', 'Vladivostok', 7, 45.03),
(16, '1993-01-01', 'Murmansk', 5, 67.75);

ALTER TABLE `testdata`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `testdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;