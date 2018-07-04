CREATE TABLE   IF NOT EXISTS  `needs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `typeName` varchar(20) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `url` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

-- INSERT INTO `user` set email='1@example.com', password='123456';

INSERT INTO needs set name='1', create_time='2018-07-03', typeName='类型名称',type=1, url='www.baidu.com'