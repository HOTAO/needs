CREATE TABLE   IF NOT EXISTS  `needs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `path` varchar(128) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `wordPath` varchar(128) DEFAULT NULL,
  `downloadPath` varchar(128) DEFAULT NULL,
  `classifys` varchar(128) DEFAULT NULL,
  `update_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;