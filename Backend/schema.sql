-- Hirezy Database Schema
-- Import this file into Railway MySQL

CREATE TABLE `users` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `name` varchar(100) NOT NULL,
   `email` varchar(50) NOT NULL,
   `password_hash` varchar(255) NOT NULL,
   `role` varchar(250) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `jobs` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `job_url` text,
   `title` varchar(300) NOT NULL,
   `company` varchar(250) DEFAULT NULL,
   `location` varchar(250) DEFAULT NULL,
   `date_posted` date DEFAULT NULL,
   `job_type` varchar(200) DEFAULT 'Not_Provided',
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `saved_posts` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `user_id` int(11) NOT NULL,
   `job_id` int(11) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `user_id` (`user_id`,`job_id`),
   KEY `saved_posts_ibfk_2` (`job_id`),
   CONSTRAINT `saved_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
   CONSTRAINT `saved_posts_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;