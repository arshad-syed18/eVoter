-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2023 at 05:09 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_voting`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `candidate_id` bigint(12) NOT NULL,
  `name` varchar(30) NOT NULL,
  `currentPosition` varchar(30) DEFAULT NULL,
  `partyName` varchar(30) NOT NULL,
  `partyImage` varchar(5000) DEFAULT NULL,
  `City` varchar(30) NOT NULL,
  `introDetails` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `election`
--

CREATE TABLE `election` (
  `election_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `positionName` varchar(30) NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `currentlyActive` tinyint(4) NOT NULL,
  `victor` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `election_candidates`
--

CREATE TABLE `election_candidates` (
  `election_id` int(11) NOT NULL,
  `candidate_id` bigint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `election_id` int(11) NOT NULL,
  `candidate_id` bigint(12) NOT NULL,
  `dateOfEnding` date NOT NULL,
  `votes` int(11) NOT NULL,
  `victor` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `voter_id` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `DOB` date NOT NULL,
  `nationality` varchar(20) NOT NULL,
  `userType` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `user_id` varchar(10) NOT NULL,
  `election_id` int(11) NOT NULL,
  `candidate_id` bigint(12) NOT NULL,
  `dateOfVote` datetime NOT NULL,
  `electionCurrentlyActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`candidate_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `election`
--
ALTER TABLE `election`
  ADD PRIMARY KEY (`election_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `victor` (`victor`);

--
-- Indexes for table `election_candidates`
--
ALTER TABLE `election_candidates`
  ADD PRIMARY KEY (`election_id`,`candidate_id`),
  ADD KEY `election_candidates_ibfk_2` (`candidate_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`election_id`,`candidate_id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`voter_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`user_id`,`election_id`),
  ADD KEY `election_id` (`election_id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `election`
--
ALTER TABLE `election`
  MODIFY `election_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `election`
--
ALTER TABLE `election`
  ADD CONSTRAINT `election_ibfk_1` FOREIGN KEY (`victor`) REFERENCES `candidate` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `election_candidates`
--
ALTER TABLE `election_candidates`
  ADD CONSTRAINT `election_candidates_ibfk_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`election_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `election_candidates_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`election_id`) REFERENCES `election` (`election_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`voter_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`election_id`) REFERENCES `election` (`election_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_ibfk_3` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`candidate_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
