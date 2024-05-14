-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2024 at 05:49 AM
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
(1, 'ÀBC', 'ABC', 'ABC', '1'),
(3, 'DD', 'DD', 'DD', '1');

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
(1, 'Licenciado en Administración d', 38),
(2, 'Licenciado en Administración d', 43),
(3, 'Licenciado en Administración d', 21),
(4, 'Licenciado en Administración d', 40),
(5, 'Licenciado en Ciencias de la E', 40),
(6, 'Licenciado en Administración d', 39),
(7, 'Licenciado en Administración d', 38),
(8, 'Licenciado en Administración d', 44),
(9, 'Licenciado en Administración d', 23),
(10, 'Licenciado en Contaduría', 38),
(11, 'Licenciado en Contaduría', 43),
(12, 'Ingeniero en Agronegocios', 43),
(13, 'Licenciado en Contaduría', 21),
(14, 'Licenciado en Contaduría', 38),
(15, 'Licenciado en Contaduría', 44),
(16, 'Licenciado en Contaduría', 23),
(17, 'Licenciado en Economía', 19),
(18, 'Licenciado en Economía', 24),
(19, 'Licenciado en Enología', 41),
(20, 'Licenciado en Gastronomía', 41),
(21, 'Licenciado en Gestión Turístic', 21),
(22, 'Licenciado en Gestión Turístic', 13),
(23, 'Licenciado en Informática', 38),
(24, 'Licenciado en Informática', 21),
(25, 'Licenciado en Informática', 23),
(26, 'Licenciado en Inteligencia de ', 38),
(27, 'Licenciado en Inteligencia de ', 21),
(28, 'Licenciado en Inteligencia de ', 44),
(29, 'Licenciado en Inteligencia de ', 23),
(30, 'Licenciado en Mercadotecnia', 21),
(31, 'Licenciado en Mercadotecnia', 13),
(32, 'Licenciado en Gastronomía', 13),
(33, 'Licenciado en Negocios Interna', 21),
(34, 'Licenciado en Negocios Interna', 23),
(35, 'Ingeniero Agrónomo', 18),
(36, 'Ingeniero Agrónomo Zootecnista', 18),
(37, 'Ingeniero en Agronegocios', 43),
(38, 'Ingeniero en Agronegocios', 18),
(39, 'Ingeniero Biotecnologo Agropec', 18),
(40, 'Médico Veterinario Zootecnista', 28),
(41, 'Licenciado en Asesoría Psicope', 20),
(42, 'Licenciado en Asesoría Psicope', 37),
(43, 'Licenciado en Asesoría Psicope', 38),
(44, 'Licenciado en Ciencias de la E', 38),
(45, 'Licenciado en Ciencias de la E', 20),
(46, 'Licenciado en Ciencias de la E', 20),
(47, 'Licenciado en Docencia de la L', 20),
(48, 'Licenciado en Docencia de la L', 37),
(49, 'Licenciado en Docencia de la M', 20),
(50, 'Licenciado en Docencia de la M', 37),
(51, 'Licenciado en Docencia de las ', 20),
(52, 'Licenciado en Enseñanza de Len', 9),
(53, 'Licenciado en Enseñanza de Len', 10),
(54, 'Licenciado en Historia', 37),
(55, 'Licenciado en Historia', 20),
(56, 'Licenciado en Traducción', 9),
(57, 'Licenciado en Traducción', 10),
(58, 'Arquitecto', 35),
(59, 'Arquitecto', 16),
(60, 'Bioingeniero', 16),
(61, 'Bioingeniero', 35),
(62, 'Bioingeniero', 10),
(63, 'Diseño Grafico', 16),
(64, 'Diseño Grafico', 10),
(65, 'Diseño Grafico', 35),
(66, 'Diseño Industrial', 16),
(67, 'Diseño Industrial', 10),
(68, 'Diseño Industrial', 35),
(69, 'Ingeniero Aeroespacial', 10),
(70, 'Ingeniero Aeroespacial', 16),
(71, 'Ingeniero Aeroespacial', 35),
(72, 'Ingeniero Civil', 10),
(73, 'Ingeniero Civil', 35),
(74, 'Ingeniero Civil', 16),
(75, 'Ingeniero Eléctrico', 10),
(76, 'Ingeniero Eléctrico', 35),
(77, 'Ingeniero en Computación', 10),
(78, 'Ingeniero en Computación', 16),
(79, 'Ingeniero en Computación', 35),
(80, 'Ingeniero en Electrónica', 10),
(81, 'Ingeniero en Electrónica', 16),
(82, 'Ingeniero en Electrónica', 35),
(83, 'Ingeniero en Electrónica', 36),
(84, 'Ingeniero en Energías Renovabl', 10),
(85, 'Ingeniero en Energías Renovabl', 16),
(86, 'Ingeniero en Energías Renovabl', 35),
(87, 'Ingeniero en Mecatrónica', 10),
(88, 'Ingeniero en Mecatrónica', 16),
(89, 'Ingeniero en Mecatrónica', 35),
(90, 'Ingeniero en Mecatrónica', 44),
(91, 'Ingeniero en Nanotecnología', 10),
(92, 'Ingeniero en Nanotecnología', 16),
(93, 'Ingeniero en Software y Tecnol', 10),
(94, 'Ingeniero en Software y Tecnol', 16),
(95, 'Ingeniero en Software y Tecnol', 35),
(96, 'Ingeniero en Software y Tecnol', 36),
(97, 'Ingeniero Industrial', 10),
(98, 'Ingeniero Industrial', 16),
(99, 'Ingeniero Industrial', 35),
(100, 'Ingeniero Industrial', 44),
(101, 'Ingeniero Industrial', 36),
(102, 'Ingeniero Mecánico', 10),
(103, 'Ingeniero Mecánico', 35),
(104, 'Ingeniero Mecánico', 36),
(105, 'Ingeniero Químico', 36),
(106, 'Licenciado en Diseño Grafico', 35),
(107, 'Licenciado en Diseño Industria', 35),
(108, 'Licenciado en Sistemas Computa', 10),
(109, 'Químico Industrial', 36),
(110, 'Cirujano Dentista', 25),
(111, 'Cirujano Dentista', 11),
(112, 'Cirujano Dentista', 31),
(113, 'Licenciado en Actividad Física', 32),
(114, 'Licenciado en Actividad Física', 26),
(115, 'Licenciado en Actividad Física', 33),
(116, 'Licenciado en Enfermería', 17),
(117, 'Licenciado en Enfermería', 23),
(118, 'Licenciado en Enfermería', 17),
(119, 'Licenciado en Nutrición', 17),
(120, 'Licenciado en Psicología', 17),
(121, 'Licenciado en Psicología', 22),
(122, 'Médico', 17),
(123, 'Médico', 11),
(124, 'Médico', 31),
(125, 'Médico', 11),
(126, 'Licenciado en Nutrición', 36),
(127, 'Biólogo', 36),
(128, 'Físico', 36),
(129, 'Licenciado en Biotecnología en', 31),
(130, 'Licenciado en Ciencia de Datos', 36),
(131, 'Licenciado en Ciencias Ambient', 31),
(132, 'Licenciado en Ciencias Computa', 36),
(133, 'Licenciado en Matemáticas Apli', 36),
(134, 'Oceanólogo', 31),
(135, 'Licenciado en Administración d', 38),
(136, 'Licenciado en Administración P', 19),
(137, 'Licenciado en Administración P', 24),
(138, 'Licenciado en Animación Digita', 37),
(139, 'Licenciado en Artes Plásticas', 37),
(140, 'Licenciado en Artes Plásticas', 38),
(141, 'Licenciado en Ciencias de la C', 37),
(142, 'Licenciado en Ciencias de la C', 38),
(143, 'Licenciado en Ciencias de la C', 20),
(144, 'Licenciado en Ciencias de la C', 20),
(145, 'Licenciado en Danza', 38),
(146, 'Licenciado en Derecho', 39),
(147, 'Licenciado en Derecho', 19),
(148, 'Licenciado en Derecho', 22),
(149, 'Licenciado en Filosofía', 20),
(150, 'Licenciado en Lengua y Literat', 20),
(151, 'Licenciado en Medios Audiovisu', 20),
(152, 'Licenciado en Música', 20),
(153, 'Licenciado en Psicología', 20),
(154, 'Licenciado en Relaciones Inter', 20),
(155, 'Licenciado en Sociología', 20),
(156, 'Licenciado en Teatro', 20),
(157, 'Licenciado Psicología Semiesco', 20),
(158, 'Especialidad en Dirección Fina', 20),
(159, 'Especialidad en Vinicultura y ', 20),
(160, 'Especialidad en Traducción e I', 20),
(161, 'Especialidad en Endodoncia', 20),
(162, 'Especialidad en Medicina Famil', 20),
(163, 'Especialidad en Odontología Pe', 20),
(164, 'Especialidad en Ortodoncia', 20),
(165, 'Especialidad en Periodoncia', 20),
(166, 'Especialidad en Prostodoncia', 20),
(167, 'Especialidad en Gestión Ambien', 20),
(168, 'Maestría en Administración', 20),
(169, 'Maestría en Gastronomía', 20),
(170, 'Maestría en Gestión de Tecnolo', 20),
(171, 'Maestría en Impuestos', 20),
(172, 'Maestría en Valuación', 20),
(173, 'Maestría en Ciencias en Sistem', 20),
(174, 'Maestría en Ciencias Veterinar', 20),
(175, 'Maestría en Ciencias Educativa', 20),
(176, 'Maestría en Dramaturgia Escéni', 20),
(177, 'Maestría en Educación', 20),
(178, 'Maestría en Estudios Sociocult', 20),
(179, 'Maestría en Lenguas Modernas', 20),
(180, 'Maestría en Psicología Aplicad', 20),
(181, 'Maestría en Arquitectura, Urba', 20),
(182, 'Maestría en Ciencias e Ingenie', 20),
(183, 'Maestría en Gestión de la Inge', 20),
(184, 'Maestría en Ciencias Clínicas ', 20),
(185, 'Maestría en Ciencias de la Sal', 20),
(186, 'Maestría en Ciencias en Biomed', 20),
(187, 'Maestría en Educación Física y', 20),
(188, 'Maestría en Enfermería en Salu', 20),
(189, 'Maestría en Nutrición', 20),
(190, 'Maestría en Psicología de la S', 20),
(191, 'Maestría en Salud Publica', 20),
(192, 'Maestría en Ciencias en Ecolog', 20),
(193, 'Maestría en Ciencias en Manejo', 20),
(194, 'Maestría en Ciencias en Oceano', 20),
(195, 'Maestría en Ciencias Jurídicas', 20),
(196, 'Maestría en Estudios del Desar', 20),
(197, 'Maestría en Negocios Sociales', 20),
(198, 'Maestría en Planeación y Desar', 20),
(199, 'Maestría en Proyectos Sociales', 20),
(200, 'Maestría en Psicología', 20),
(201, 'Doctorado en Ciencias Administ', 20),
(202, 'Doctorado en Turismo', 20),
(203, 'Doctorado en Valuación', 20),
(204, 'Doctorado en Ciencias Agropecu', 20),
(205, 'Doctorado en Ciencias Educativ', 20),
(206, 'Doctorado en Estudios Sociocul', 20),
(207, 'Doctorado en Historia', 20),
(208, 'Doctorado en Ciencias e Ingeni', 20),
(209, 'Doctorado en Ciencias Jurídica', 20),
(210, 'Doctorado en Estudios del Desa', 20),
(211, 'Doctorado en Estudios Sociales', 20),
(212, 'Doctorado en Negocios Sociales', 20),
(213, 'Doctorado en Planeación y Desa', 20),
(214, 'Doctorado en Sociedad, Espacio', 20);

-- --------------------------------------------------------

--
-- Table structure for table `registro`
--

CREATE TABLE `registro` (
  `idregistro` int(5) NOT NULL,
  `iduabc` int(15) NOT NULL DEFAULT 0,
  `idcampus` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `idworkshop` int(5) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `assist` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registro`
--

INSERT INTO `registro` (`idregistro`, `iduabc`, `idcampus`, `name`, `lastname`, `middlename`, `type`, `idworkshop`, `date`, `assist`) VALUES
(6, 1, 3, 'A', 'A', 'A', 'Alumno', 23, '2024-05-10', 1),
(8, 1, 3, 'A', 'A', 'A', 'Alumno', 23, '2024-05-10', 1);

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
  `ability` varchar(100) NOT NULL,
  `post` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `talleres`
--

INSERT INTO `talleres` (`idworkshop`, `nameworkshop`, `idlecturer`, `idfacultad`, `idcampus`, `descriptionworkshop`, `time`, `date`, `ability`, `post`, `status`) VALUES
(23, 'a', 3, 35, 3, 'a', '12:46:00', '2024-05-25', 'a', 'a', 1),
(24, 'Toy', 1, 38, 3, 'toy', '10:00:00', '2024-12-31', 'a', 'example2.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `iduabc` int(15) NOT NULL,
  `idfacultad` int(5) DEFAULT NULL,
  `idcampus` int(5) NOT NULL,
  `idlic` int(5) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `middlename` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`iduabc`, `idfacultad`, `idcampus`, `idlic`, `name`, `lastname`, `middlename`, `email`, `type`) VALUES
(1, 35, 3, 82, 'A', 'A', 'A', 'johan.barragan@uabc.edu.mx', 'Alumno');

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
  ADD KEY `fk_registro_usuarios` (`iduabc`),
  ADD KEY `fk_registro_campus` (`idcampus`),
  ADD KEY `fk_registro_talleres` (`idworkshop`);

--
-- Indexes for table `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`idworkshop`),
  ADD KEY `fk_talleres_campus` (`idcampus`),
  ADD KEY `fk_talleres_lecturer` (`idlecturer`) USING BTREE,
  ADD KEY `fk_talleres_facultades` (`idfacultad`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD KEY `iduabc` (`iduabc`) USING BTREE,
  ADD KEY `idfacultad` (`idfacultad`),
  ADD KEY `fk_usuarios_campus` (`idcampus`),
  ADD KEY `fk_usuarios_licenciaturas` (`idlic`);

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
  MODIFY `idlecturer` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `facultades`
--
ALTER TABLE `facultades`
  MODIFY `idfacultad` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `licenciaturas`
--
ALTER TABLE `licenciaturas`
  MODIFY `idlic` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `idregistro` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `talleres`
--
ALTER TABLE `talleres`
  MODIFY `idworkshop` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  ADD CONSTRAINT `fk_registro_campus` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_iduabc` FOREIGN KEY (`iduabc`) REFERENCES `usuarios` (`iduabc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_talleres` FOREIGN KEY (`idworkshop`) REFERENCES `talleres` (`idworkshop`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_registro_usuarios` FOREIGN KEY (`iduabc`) REFERENCES `usuarios` (`iduabc`);

--
-- Constraints for table `talleres`
--
ALTER TABLE `talleres`
  ADD CONSTRAINT `fk_talleres_campus` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`),
  ADD CONSTRAINT `fk_talleres_facultades` FOREIGN KEY (`idfacultad`) REFERENCES `facultades` (`idfacultad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_ibfk_2` FOREIGN KEY (`idlecturer`) REFERENCES `conferencistas` (`idlecturer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_campus` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuarios_licenciaturas` FOREIGN KEY (`idlic`) REFERENCES `licenciaturas` (`idlic`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idfacultad`) REFERENCES `facultades` (`idfacultad`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
