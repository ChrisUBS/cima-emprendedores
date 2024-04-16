-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2024 at 02:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`iduser`, `username`, `name`, `lastname`, `password`, `level`) VALUES
(1, 'root', 'Alejandro', 'Barragan', '$2y$10$ut/eTOZfSZGEMBbCSq86VOZvWD56AymnN3gVcNPvA8TyRsoxOkwba', '1');

-- --------------------------------------------------------

--
-- Table structure for table `facultades`
--

CREATE TABLE `facultades` (
  `idfacultad` int(5) NOT NULL,
  `campus` varchar(20) NOT NULL,
  `facultad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facultades`
--

INSERT INTO `facultades` (`idfacultad`, `campus`, `facultad`) VALUES
(1, 'Tijuana', 'Facultad de Artes'),
(2, 'Tijuana', 'Facultad de Ciencias Químicas e Ingeniería'),
(3, 'Tijuana', 'Facultad de Contaduría y Administración'),
(4, 'Tijuana', 'Facultad de Ciencias de la Salud, Valle de las Pal'),
(5, 'Tijuana', 'Facultad de Deportes'),
(6, 'Tijuana', 'Facultad de Derecho'),
(7, 'Tijuana', 'Facultad de Economía y Relaciones Internacionales'),
(8, 'Tijuana', 'Facultad de Humanidades y Ciencias Sociales'),
(9, 'Tijuana', 'Facultad de Idiomas'),
(10, 'Tijuana', 'Facultad de la Ingeniería y Tecnología'),
(11, 'Tijuana', 'Facultad de Medicina y Psicología'),
(12, 'Tijuana', 'Facultad de Odontología'),
(13, 'Tijuana', 'Facultad de Turismo y Mercadotecnia'),
(14, 'Tijuana', 'Instituto de Investigaciones Históricas'),
(15, 'Tijuana', 'Facultad de Ciencias de la Ingeniería, Administrat'),
(16, 'Mexicali', 'Facultad de Artes'),
(17, 'Mexicali', 'Facultad de Arquitectura y Diseño'),
(18, 'Mexicali', 'Instituto de Ciencias Agrícolas'),
(19, 'Mexicali', 'Facultad de Ciencias Sociales y Políticas'),
(20, 'Mexicali', 'Facultad de Ciencias Humanas'),
(21, 'Mexicali', 'Facultad de Ciencias Administrativas'),
(22, 'Mexicali', 'Facultad de Deportes'),
(23, 'Mexicali', 'Facultad de Derecho'),
(24, 'Mexicali', 'Facultad de Enfermería'),
(25, 'Mexicali', 'Facultad de Idiomas'),
(26, 'Mexicali', 'Facultad de Ingeniería'),
(27, 'Mexicali', 'Facultad de Ingeniería y Negocios Guadalupe Victor'),
(28, 'Mexicali', 'Instituto de Investigaciones en Ciencias Veterinar'),
(29, 'Mexicali', 'Instituto de Investigaciones Culturales (IIC Museo'),
(30, 'Mexicali', 'Instituto de Investigaciones Sociales'),
(31, 'Mexicali', 'Instituto de Ingeniería'),
(32, 'Mexicali', 'Facultad de Medicina'),
(33, 'Mexicali', 'Facultad de Odontología'),
(34, 'Mexicali', 'Facultad de Pedagogía e Innovación Educativa'),
(35, 'Ensenada', 'Facultad de Artes'),
(36, 'Ensenada', 'Escuela de Ciencias de la Salud'),
(37, 'Ensenada', 'Facultad de Ciencias'),
(38, 'Ensenada', 'Facultad de Ciencias Administrativas y Sociales'),
(39, 'Ensenada', 'Facultad de Ciencias Marinas'),
(40, 'Ensenada', 'Facultad de Deportes'),
(41, 'Ensenada', 'Facultad de Enología y Gastronomía'),
(42, 'Ensenada', 'Facultad de Idiomas'),
(43, 'Ensenada', 'Facultad de Ingeniería y Negocios - San Quintín'),
(44, 'Ensenada', 'Facultad de Ingeniería, Arquitectura y Diseño'),
(45, 'Ensenada', 'Instituto de Investigación y Desarrollo Educativo'),
(46, 'Ensenada', 'Instituto de Investigaciones Oceanológicas');

-- --------------------------------------------------------

--
-- Table structure for table `registro`
--

CREATE TABLE `registro` (
  `idregistro` int(5) NOT NULL,
  `iduabc` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `idtaller` varchar(30) NOT NULL,
  `idfacultad` varchar(30) NOT NULL,
  `assist` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registro`
--

INSERT INTO `registro` (`idregistro`, `iduabc`, `name`, `lastname`, `middlename`, `type`, `idtaller`, `idfacultad`, `assist`) VALUES
(1, 1, '', '', '', '', '', '', '0'),
(2, 1, '', '', '', '', '', '', '0'),
(3, 1, '', '', '', '', '', '', '0'),
(4, 1272547, '', '', '', '', '', '', '0'),
(5, 1, '', '', '', '', '', '', '0'),
(6, 1, '', '', '', '', '', '', '0'),
(7, 1, '', '', '', '', '', '', '0'),
(8, 1, '', '', '', '', '', '', '0'),
(9, 1, '', '', '', '', '', '', '0'),
(10, 1, '', '', '', '', '', '', '0'),
(11, 1, '', '', '', '', '', '', '0'),
(12, 1, '', '', '', '', '', '', '0');

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
  `iduabc` varchar(15) NOT NULL,
  `idfacultad` int(3) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `middlename` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`iduabc`, `idfacultad`, `name`, `lastname`, `middlename`, `email`, `type`) VALUES
('1272547', 0, 'Alejandro', 'Barragan', 'Flores', 'johan.barragan@uabc.edu.mx', 'Alumno'),
('1', 0, 'Alex', 'Hernandez', 'Flores', 'abc123@gmail.com', 'Alumno');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `iduser` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `facultades`
--
ALTER TABLE `facultades`
  MODIFY `idfacultad` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `idregistro` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `talleres`
--
ALTER TABLE `talleres`
  MODIFY `idworkshop` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
