-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2024 at 10:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cimarrones_emprendedores`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `iduser` int(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `name` varchar(20) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `level` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `facultades`
--

CREATE TABLE `facultades` (
  `idfacultad` int(5) NOT NULL,
  `campus` varchar(20) NOT NULL,
  `facultad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registro`
--

CREATE TABLE `registro` (
  `idregistro` int(5) NOT NULL,
  `idusers` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `idtaller` varchar(30) NOT NULL,
  `idfacultad` varchar(30) NOT NULL,
  `assist` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `talleres`
--

CREATE TABLE `talleres` (
  `idworkshop` int(11) NOT NULL,
  `nameworkshop` varchar(50) NOT NULL,
  `idlecturer` varchar(5) NOT NULL,
  `idfacultad` varchar(50) NOT NULL,
  `descriptionworkshop` varchar(250) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `ability` int(10) NOT NULL,
  `post` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idusers` int(10) NOT NULL,
  `iduabc` varchar(15) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `middlename` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idusers`, `iduabc`, `name`, `lastname`, `middlename`, `email`, `type`) VALUES
(1, '1', 'Alex', 'Hernandez', 'Flores', 'abc@gmail.com', ''),
(4, '1272547', 'Alejandro Johan', 'Barragan', 'Flores', 'johan.barragan@uabc.edu.mx', 'Alumno'),
(6, '1279098', 'Jose Eduardo', 'De Anda', 'Rivera', 'jdeanda@uabc.edu.mx', 'Alumno');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`iduser`);

--
-- Indexes for table `facultades`
--
ALTER TABLE `facultades`
  ADD PRIMARY KEY (`idfacultad`);

--
-- Indexes for table `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`idregistro`);

--
-- Indexes for table `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`idworkshop`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusers`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `iduser` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `facultades`
--
ALTER TABLE `facultades`
  MODIFY `idfacultad` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `idregistro` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `talleres`
--
ALTER TABLE `talleres`
  MODIFY `idworkshop` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusers` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
