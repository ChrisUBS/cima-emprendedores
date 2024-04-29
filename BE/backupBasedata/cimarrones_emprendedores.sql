-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 07:32 AM
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
-- Table structure for table `campus`
--

CREATE TABLE `campus` (
  `idcampus` int(5) NOT NULL,
  `campus` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campus`
--

INSERT INTO `campus` (`idcampus`, `campus`) VALUES
(1, 'Tijuana'),
(2, 'Mexicali'),
(3, 'Ensenada');

-- --------------------------------------------------------

--
-- Table structure for table `conferencistas`
--

CREATE TABLE `conferencistas` (
  `idlecturer` int(5) NOT NULL,
  `name` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `middlename` varchar(25) NOT NULL,
  `info` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conferencistas`
--

INSERT INTO `conferencistas` (`idlecturer`, `name`, `lastname`, `middlename`, `info`) VALUES
(1, 'ÀBC', 'ABC', 'ABC', '1');

-- --------------------------------------------------------

--
-- Table structure for table `facultades`
--

CREATE TABLE `facultades` (
  `idfacultad` int(5) NOT NULL,
  `facultad` varchar(50) NOT NULL,
  `idcampus` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facultades`
--

INSERT INTO `facultades` (`idfacultad`, `facultad`, `idcampus`) VALUES
(1, 'Facultad de Artes', 1),
(2, 'Facultad de Ciencias Químicas e Ingeniería', 1),
(3, 'Facultad de Contaduría y Administración', 1),
(4, 'Facultad de Ciencias de la Salud, Valle de las Pal', 1),
(5, 'Facultad de Deportes', 1),
(6, 'Facultad de Derecho', 1),
(7, 'Facultad de Economía y Relaciones Internacionales', 1),
(8, 'Facultad de Humanidades y Ciencias Sociales', 1),
(9, 'Facultad de Idiomas', 1),
(10, 'Facultad de Ingeniería y Tecnología', 1),
(11, 'Facultad de Medicina y Psicología', 1),
(12, 'Facultad de Odontología', 1),
(13, 'Facultad de Turismo y Mercadotecnia', 1),
(14, 'Instituto de Investigaciones Históricas', 1),
(15, 'Facultad de Ciencias de la Ingeniería, Administrat', 1),
(16, 'Facultad de Artes', 2),
(17, 'Facultad de Arquitectura y Diseño', 2),
(18, 'Instituto de Ciencias Agrícolas', 2),
(19, 'Facultad de Ciencias Sociales y Políticas', 2),
(20, 'Facultad de Ciencias Humanas', 2),
(21, 'Facultad de Ciencias Administrativas', 2),
(22, 'Facultad de Deportes', 2),
(23, 'Facultad de Derecho', 2),
(24, 'Facultad de Enfermería', 2),
(25, 'Facultad de Idiomas', 2),
(26, 'Facultad de Ingeniería', 2),
(27, 'Facultad de Ingeniería y Negocios Guadalupe Victor', 2),
(28, 'Instituto de Investigaciones en Ciencias Veterinar', 2),
(29, 'Instituto de Investigaciones Culturales (IIC Museo', 2),
(30, 'Instituto de Investigaciones Sociales', 2),
(31, 'Instituto de Ingeniería', 2),
(32, 'Facultad de Medicina', 2),
(33, 'Facultad de Odontología', 2),
(34, 'Facultad de Pedagogía e Innovación Educativa', 2),
(35, 'Facultad de Artes', 3),
(36, 'Escuela de Ciencias de la Salud', 3),
(37, 'Facultad de Ciencias', 3),
(38, 'Facultad de Ciencias Administrativas y Sociales', 3),
(39, 'Facultad de Ciencias Marinas', 3),
(40, 'Facultad de Deportes', 3),
(41, 'Facultad de Enología y Gastronomía', 3),
(42, 'Facultad de Idiomas', 3),
(43, 'Facultad de Ingeniería y Negocios - San Quintín', 3),
(44, 'Facultad de Ingeniería, Arquitectura y Diseño', 3),
(45, 'Instituto de Investigación y Desarrollo Educativo', 3),
(46, 'Instituto de Investigaciones Oceanológicas', 3);

-- --------------------------------------------------------

--
-- Table structure for table `licenciaturas`
--

CREATE TABLE `licenciaturas` (
  `idlic` int(5) NOT NULL,
  `namelic` varchar(30) NOT NULL,
  `idfacultad` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `licenciaturas`
--

INSERT INTO `licenciaturas` (`idlic`, `namelic`, `idfacultad`) VALUES
(1, '1', 2),
(2, '2', 34),
(3, '3', 13),
(4, '4', 45),
(5, '5', 24),
(6, '6', 3),
(7, '7', 35),
(8, '8', 14),
(9, '9', 46),
(10, '10', 25),
(11, '11', 4),
(12, '12', 36),
(13, '13', 15),
(14, '14', 26),
(15, '15', 5),
(16, '16', 37),
(17, '17', 16),
(18, '18', 27),
(19, '19', 6),
(20, '20', 38),
(21, '21', 17),
(22, '22', 28),
(23, '23', 7),
(24, '24', 39),
(25, '25', 18),
(26, '26', 29),
(27, '27', 8),
(28, '28', 40),
(29, '29', 19),
(30, '30', 30),
(31, '31', 9),
(32, '32', 41),
(33, '33', 20),
(34, '34', 31),
(35, '35', 10),
(36, '36', 42),
(37, '37', 21),
(38, '38', 32),
(39, '39', 11),
(40, '40', 43),
(41, '41', 22),
(42, '42', 1),
(43, '43', 33),
(44, '44', 12),
(45, '45', 44),
(46, '46', 23);

-- --------------------------------------------------------

--
-- Table structure for table `registro`
--

CREATE TABLE `registro` (
  `idregistro` int(5) NOT NULL,
  `iduabc` int(15) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `idworkshop` int(5) NOT NULL,
  `idfacultad` int(5) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `assist` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `talleres`
--

CREATE TABLE `talleres` (
  `idworkshop` int(5) NOT NULL,
  `nameworkshop` varchar(50) NOT NULL,
  `idlecturer` int(5) NOT NULL,
  `idfacultad` int(5) NOT NULL,
  `idcampus` int(5) NOT NULL,
  `descriptionworkshop` varchar(250) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `ability` int(10) NOT NULL,
  `post` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `talleres`
--

INSERT INTO `talleres` (`idworkshop`, `nameworkshop`, `idlecturer`, `idfacultad`, `idcampus`, `descriptionworkshop`, `time`, `date`, `ability`, `post`, `status`) VALUES
(15, 'AB', 1, 1, 1, 'ABCVC', '20:50:00', '2024-04-30', 1, 'HOLA MUNDO', 0),
(17, 'Telecom', 1, 33, 2, 'C', '20:38:56', '2024-04-29', 1, 'HOLA MUNDO', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `iduabc` int(15) NOT NULL,
  `idfacultad` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `middlename` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` varchar(10) NOT NULL,
  `idlic` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`iduabc`, `idfacultad`, `name`, `lastname`, `middlename`, `email`, `type`, `idlic`) VALUES
(1, 1, 'A', 'A', 'A', 'A@gmail.com', 'Alumno', 42);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`iduser`);

--
-- Indexes for table `campus`
--
ALTER TABLE `campus`
  ADD PRIMARY KEY (`idcampus`);

--
-- Indexes for table `conferencistas`
--
ALTER TABLE `conferencistas`
  ADD PRIMARY KEY (`idlecturer`);

--
-- Indexes for table `facultades`
--
ALTER TABLE `facultades`
  ADD PRIMARY KEY (`idfacultad`),
  ADD KEY `fk_idcampus` (`idcampus`);

--
-- Indexes for table `licenciaturas`
--
ALTER TABLE `licenciaturas`
  ADD PRIMARY KEY (`idlic`),
  ADD KEY `fk_licenciaturas_facultades` (`idfacultad`);

--
-- Indexes for table `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`idregistro`),
  ADD KEY `fk_registro_facultades` (`idfacultad`),
  ADD KEY `fk_registro_usuarios` (`iduabc`);

--
-- Indexes for table `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`idworkshop`),
  ADD KEY `fk_talleres_campus` (`idcampus`),
  ADD KEY `fk_talleres_facultades` (`idfacultad`) USING BTREE,
  ADD KEY `fk_talleres_lecturer` (`idlecturer`) USING BTREE;

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD KEY `iduabc` (`iduabc`) USING BTREE,
  ADD KEY `idfacultad` (`idfacultad`),
  ADD KEY `idlic` (`idlic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `iduser` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `campus`
--
ALTER TABLE `campus`
  MODIFY `idcampus` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `conferencistas`
--
ALTER TABLE `conferencistas`
  MODIFY `idlecturer` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `facultades`
--
ALTER TABLE `facultades`
  MODIFY `idfacultad` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `licenciaturas`
--
ALTER TABLE `licenciaturas`
  MODIFY `idlic` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `idregistro` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `talleres`
--
ALTER TABLE `talleres`
  MODIFY `idworkshop` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `facultades`
--
ALTER TABLE `facultades`
  ADD CONSTRAINT `fk_idcampus` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`);

--
-- Constraints for table `licenciaturas`
--
ALTER TABLE `licenciaturas`
  ADD CONSTRAINT `fk_licenciaturas_facultades` FOREIGN KEY (`idfacultad`) REFERENCES `facultades` (`idfacultad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `fk_registro_facultades` FOREIGN KEY (`idfacultad`) REFERENCES `facultades` (`idfacultad`),
  ADD CONSTRAINT `fk_registro_idfacultad` FOREIGN KEY (`idfacultad`) REFERENCES `usuarios` (`idfacultad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_iduabc` FOREIGN KEY (`iduabc`) REFERENCES `usuarios` (`iduabc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_usuarios` FOREIGN KEY (`iduabc`) REFERENCES `usuarios` (`iduabc`);

--
-- Constraints for table `talleres`
--
ALTER TABLE `talleres`
  ADD CONSTRAINT `fk_talleres_campus` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`),
  ADD CONSTRAINT `fk_talleres_facultades` FOREIGN KEY (`idcampus`) REFERENCES `facultades` (`idcampus`),
  ADD CONSTRAINT `talleres_ibfk_1` FOREIGN KEY (`idfacultad`) REFERENCES `facultades` (`idfacultad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_ibfk_2` FOREIGN KEY (`idlecturer`) REFERENCES `conferencistas` (`idlecturer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idfacultad`) REFERENCES `facultades` (`idfacultad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`idlic`) REFERENCES `licenciaturas` (`idlic`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
