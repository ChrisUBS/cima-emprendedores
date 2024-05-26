-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2024 at 12:46 PM
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
  `facultad` varchar(255) NOT NULL,
  `idcampus` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facultades`
--

INSERT INTO `facultades` (`idfacultad`, `facultad`, `idcampus`) VALUES
(1, 'Facultad de Ciencias Administrativas y Sociales', 3),
(2, 'Escuela de Ciencias de la Salud', 3),
(3, 'Facultad de Ciencias', 3),
(4, 'Facultad de Artes', 3),
(5, 'Instituto de Investigación y Desarrollo Educativo', 3),
(6, 'Facultad de Idiomas', 3),
(7, 'Facultad de Ciencias Marinas', 3),
(8, 'Facultad de Enología y Gastronomía', 3),
(9, 'Facultad de Ingeniería y Negocios, San Quintín', 3),
(10, 'Instituto de Investigaciones Oceanológicas', 3),
(11, 'Facultad de Ingeniería, Arquitectura y Diseño', 3),
(12, 'Facultad de Deportes', 3),
(13, 'Facultad de Humanidades y Ciencias Sociales', 1),
(14, 'Facultad de Medicina y Psicología', 1),
(15, 'Facultad de Ciencias Químicas e Ingeniería', 1),
(16, 'Facultad de Odontología', 1),
(17, 'Facultad de Ciencias de la Salud, Valle de las Palmas', 1),
(18, 'Facultad de Derecho', 1),
(19, 'Instituto de Investigaciones Históricas', 1),
(20, 'Facultad de Contaduría y Administración', 1),
(21, 'Facultad de Idiomas, Tecate', 1),
(22, 'Facultad de Ciencias de la Ingeniería y Tecnología, Valle de las Palmas', 1),
(23, 'Facultad de Turismo y Mercadotecnia', 1),
(24, 'Facultad de Ciencias de la Ingeniería, Administrativas y Sociales, Tecate', 1),
(25, 'Unidad Universitaria, Rosarito', 1),
(26, 'Facultad de Artes', 1),
(27, 'Facultad de Deportes', 1),
(28, 'Facultad de Economía y Relaciones Internacionales', 1),
(29, 'Facultad de Idiomas', 1),
(30, 'Facultad de Ingeniería y Negocios, Guadalupe Victoria', 2),
(31, 'Facultad de Deportes', 2),
(32, 'Unidad Universitaria San Felipe', 2),
(33, 'Facultad de Ciencias Administrativas', 2),
(34, 'Facultad de Enfermería', 2),
(35, 'Facultad de Odontología', 2),
(36, 'Instituto de Investigaciones en Ciencias Veterinarias', 2),
(37, 'Instituto de Investigaciones Culturales-Museo', 2),
(38, 'Unidad Universitaria Ciudad Morelos', 2),
(39, 'Facultad de Derecho', 2),
(40, 'Facultad de Idiomas', 2),
(41, 'Facultad de Medicina', 2),
(42, 'Instituto de Investigaciones Sociales', 2),
(43, 'Instituto de Ingeniería', 2),
(44, 'Facultad de Ciencias Humanas', 2),
(45, 'Facultad de Ciencias Sociales y Políticas', 2),
(46, 'Facultad de Artes', 2),
(47, 'Facultad de Pedagogía e Innovación Educativa', 2),
(48, 'Facultad de Ingeniería', 2),
(49, 'Instituto de Ciencias Agrícolas', 2),
(50, 'Facultad de Arquitectura y Diseño', 2);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `idfeedback` int(5) NOT NULL,
  `idworkshop` int(5) NOT NULL,
  `idcampus` int(5) NOT NULL,
  `q1` int(1) NOT NULL,
  `q2` int(1) NOT NULL,
  `q3` int(1) NOT NULL,
  `q4` varchar(255) NOT NULL,
  `q5` varchar(255) NOT NULL,
  `q6` int(1) NOT NULL,
  `q7` int(1) NOT NULL,
  `q8` varchar(255) NOT NULL,
  `q9` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `licenciaturas`
--

CREATE TABLE `licenciaturas` (
  `idlic` int(5) NOT NULL,
  `namelic` varchar(255) NOT NULL,
  `idfacultad` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `licenciaturas`
--

INSERT INTO `licenciaturas` (`idlic`, `namelic`, `idfacultad`) VALUES
(1, 'Licenciado en Administración de Empresas', 1),
(2, 'Licenciado en Administración de Empresas', 9),
(3, 'Licenciado en Administración de Empresas', 33),
(4, 'Licenciado en Administración de Empresas', 30),
(5, 'Licenciado en Ciencias de la Educación', 30),
(6, 'Licenciado en Administración de Empresas', 38),
(7, 'Licenciado en Administración de Empresas', 32),
(8, 'Licenciado en Administración de Empresas', 24),
(9, 'Licenciado en Administración de Empresas', 20),
(10, 'Licenciado en Contaduría', 1),
(11, 'Licenciado en Contaduría', 9),
(12, 'Ingeniero en Agronegocios', 9),
(13, 'Licenciado en Contaduría', 33),
(14, 'Licenciado en Contaduría', 32),
(15, 'Licenciado en Contaduría', 24),
(16, 'Licenciado en Contaduría', 20),
(17, 'Licenciado en Economía', 45),
(18, 'Licenciado en Economía', 28),
(19, 'Licenciado en Enología', 8),
(20, 'Licenciado en Gastronomía', 8),
(21, 'Licenciado en Gestión Turística', 33),
(22, 'Licenciado en Gestión Turística', 23),
(23, 'Licenciado en Informática', 1),
(24, 'Licenciado en Informática', 33),
(25, 'Licenciado en Informática', 20),
(26, 'Licenciado en Inteligencia de Negocios', 1),
(27, 'Licenciado en Inteligencia de Negocios', 33),
(28, 'Licenciado en Inteligencia de Negocios', 24),
(29, 'Licenciado en Inteligencia de Negocios', 20),
(30, 'Licenciado en Mercadotecnia', 33),
(31, 'Licenciado en Mercadotecnia', 23),
(32, 'Licenciado en Gastronomía', 23),
(33, 'Licenciado en Negocios Internacionales', 33),
(34, 'Licenciado en Negocios Internacionales', 20),
(35, 'Ingeniero Agrónomo', 9),
(36, 'Ingeniero Agrónomo', 49),
(37, 'Ingeniero Agrónomo Zootecnista', 49),
(38, 'Ingeniero en Agronegocios', 49),
(39, 'Ingeniero Biotecnologo Agropecuario', 49),
(40, 'Médico Veterinario Zootecnista', 36),
(41, 'Licenciado en Asesoría Psicopedagógica', 47),
(42, 'Licenciado en Asesoría Psicopedagógica', 13),
(43, 'Licenciado en Asesoría Psicopedagógica', 25),
(44, 'Licenciado en Ciencias de la Educación', 1),
(45, 'Licenciado en Ciencias de la Educación', 44),
(46, 'Licenciado en Ciencias de la Educación Semiescolarizada', 44),
(47, 'Licenciado en Docencia de la Lengua y Literatura', 47),
(48, 'Licenciado en Docencia de la Lengua y Literatura', 13),
(49, 'Licenciado en Docencia de la Matemática', 47),
(50, 'Licenciado en Docencia de la Matemática', 13),
(51, 'Licenciado en Docencia de las Ciencias', 47),
(52, 'Licenciado en Enseñanza de Lenguas', 6),
(53, 'Licenciado en Enseñanza de Lenguas', 40),
(54, 'Licenciado en Enseñanza de Lenguas', 29),
(55, 'Licenciado en Enseñanza de Lenguas', 21),
(56, 'Licenciado en Historia', 44),
(57, 'Licenciado en Historia', 13),
(58, 'Licenciado en Traducción', 6),
(59, 'Licenciado en Traducción', 40),
(60, 'Licenciado en Traducción', 29),
(61, 'Arquitecto', 11),
(62, 'Arquitecto', 50),
(63, 'Arquitecto', 22),
(64, 'Bioingeniero', 11),
(65, 'Bioingeniero', 48),
(66, 'Bioingeniero', 22),
(67, 'Diseño Grafico', 50),
(68, 'Diseño Industrial', 50),
(69, 'Ingeniero Aeroespacial', 48),
(70, 'Ingeniero Aeroespacial', 22),
(71, 'Ingeniero Civil', 11),
(72, 'Ingeniero Civil', 48),
(73, 'Ingeniero Civil', 22),
(74, 'Ingeniero Eléctrico', 48),
(75, 'Ingeniero Eléctrico', 22),
(76, 'Ingeniero en Computación', 11),
(77, 'Ingeniero en Computación', 48),
(78, 'Ingeniero en Computación', 15),
(79, 'Ingeniero en Electrónica', 11),
(80, 'Ingeniero en Electrónica', 48),
(81, 'Ingeniero en Electrónica', 22),
(82, 'Ingeniero en Electrónica', 15),
(83, 'Ingeniero en Energías Renovables', 48),
(84, 'Ingeniero en Energías Renovables', 22),
(85, 'Ingeniero en Mecatrónica', 48),
(86, 'Ingeniero en Mecatrónica', 22),
(87, 'Ingeniero en Mecatrónica', 24),
(88, 'Ingeniero en Nanotecnología', 11),
(89, 'Ingeniero en Software y Tecnologías Emergentes', 11),
(90, 'Ingeniero en Software y Tecnologías Emergentes', 22),
(91, 'Ingeniero en Software y Tecnologías Emergentes', 15),
(92, 'Ingeniero Industrial', 11),
(93, 'Ingeniero Industrial', 48),
(94, 'Ingeniero Industrial', 22),
(95, 'Ingeniero Industrial', 24),
(96, 'Ingeniero Industrial', 15),
(97, 'Ingeniero Mecánico', 48),
(98, 'Ingeniero Mecánico', 22),
(99, 'Ingeniero Químico', 15),
(100, 'Licenciado en Diseño Grafico', 22),
(101, 'Licenciado en Diseño Industrial', 22),
(102, 'Licenciado en Sistemas Computacionales', 48),
(103, 'Químico Industrial', 15),
(104, 'Cirujano Dentista', 35),
(105, 'Cirujano Dentista', 17),
(106, 'Cirujano Dentista', 16),
(107, 'Licenciado en Actividad Física y Deporte', 12),
(108, 'Licenciado en Actividad Física y Deporte', 31),
(109, 'Licenciado en Actividad Física y Deporte', 27),
(110, 'Licenciado en Enfermería', 2),
(111, 'Licenciado en Enfermería', 34),
(112, 'Licenciado en Enfermería', 17),
(113, 'Licenciado en Nutrición', 41),
(114, 'Licenciado en Psicología', 17),
(115, 'Licenciado en Psicología', 14),
(116, 'Médico', 2),
(117, 'Médico', 41),
(118, 'Médico', 17),
(119, 'Médico', 14),
(120, 'Licenciado en Nutrición', 14),
(121, 'Químico Farmacobiólogo', 15),
(122, 'Biólogo', 3),
(123, 'Físico', 3),
(124, 'Licenciado en Biotecnología en Acuacultura', 7),
(125, 'Licenciado en Ciencia de Datos', 3),
(126, 'Licenciado en Ciencias Ambientales', 7),
(127, 'Licenciado en Ciencias Computacionales', 3),
(128, 'Licenciado en Matemáticas Aplicadas', 3),
(129, 'Oceanólogo', 7),
(130, 'Licenciado en Administración de Empresas Semiescolarizada', 1),
(131, 'Licenciado en Administración Pública y Ciencias Políticas', 45),
(132, 'Licenciado en Administración Pública y Ciencias Políticas', 28),
(133, 'Licenciado en Animación Digital y Efectos Visuales', 46),
(134, 'Licenciado en Artes Plásticas', 4),
(135, 'Licenciado en Artes Plásticas', 46),
(136, 'Licenciado en Artes Plásticas', 26),
(137, 'Licenciado en Ciencias de la Comunicación', 1),
(138, 'Licenciado en Ciencias de la Comunicación', 44),
(139, 'Licenciado en Ciencias de la Comunicación', 13),
(140, 'Licenciado en Ciencias de la Comunicación Semiescolarizada', 44),
(141, 'Licenciado en Danza', 46),
(142, 'Licenciado en Derecho', 1),
(143, 'Licenciado en Derecho', 39),
(144, 'Licenciado en Derecho', 24),
(145, 'Licenciado en Derecho', 18),
(146, 'Licenciado en Derecho', 25),
(147, 'Licenciado en Derecho Semiescolarizada', 1),
(148, 'Licenciado en Filosofía', 13),
(149, 'Licenciado en Lengua y Literatura de Hispanoamérica', 13),
(150, 'Licenciado en Medios Audiovisuales', 46),
(151, 'Licenciado en Música', 4),
(152, 'Licenciado en Psicología', 1),
(153, 'Licenciado en Psicología', 44),
(154, 'Licenciado en Psicología', 30),
(155, 'Licenciado en Relaciones Internacionales', 45),
(156, 'Licenciado en Relaciones Internacionales', 28),
(157, 'Licenciado en Sociología', 1),
(158, 'Licenciado en Sociología', 13),
(159, 'Licenciado en Sociología Semiescolarizada', 44),
(160, 'Licenciado en Teatro', 26),
(161, 'Licenciado Psicología Semiescolarizada', 44),
(162, 'Especialidad en Dirección Financiera', 33),
(163, 'Especialidad en Dirección Financiera', 20),
(164, 'Especialidad en Vinicultura y Enología', 8),
(165, 'Especialidad en Traducción e Interpretación', 40),
(166, 'Especialidad en Endodoncia', 16),
(167, 'Especialidad en Medicina Familiar', 41),
(168, 'Especialidad en Medicina Familiar', 14),
(169, 'Especialidad en Odontología Pediátrica', 16),
(170, 'Especialidad en Ortodoncia', 35),
(171, 'Especialidad en Ortodoncia', 16),
(172, 'Especialidad en Periodoncia', 35),
(173, 'Especialidad en Prostodoncia', 35),
(174, 'Especialidad en Gestión Ambiental', 7),
(175, 'Especialidad en Derecho', 39),
(176, 'Especialidad en Derecho', 18),
(177, 'Maestría en Administración', 1),
(178, 'Maestría en Administración', 33),
(179, 'Maestría en Administración', 24),
(180, 'Maestría en Administración', 20),
(181, 'Maestría en Administración', 23),
(182, 'Maestría en Ciencias Económicas', 28),
(183, 'Maestría en Gastronomía', 8),
(184, 'Maestría en Gestión de Tecnologías de la Información y la Comunicación', 1),
(185, 'Maestría en Gestión de Tecnologías de la Información y la Comunicación', 33),
(186, 'Maestría en Gestión de Tecnologías de la Información y la Comunicación', 20),
(187, 'Maestría en Impuestos', 1),
(188, 'Maestría en Impuestos', 33),
(189, 'Maestría en Impuestos', 20),
(190, 'Maestría en Valuación', 28),
(191, 'Maestría en Ciencias en Sistemas de Producción Animal', 49),
(192, 'Maestría en Ciencias Veterinarias', 36),
(193, 'Maestría en Ciencias Educativas', 5),
(194, 'Maestría en Dramaturgia Escénica y Literaria', 26),
(195, 'Maestría en Educación', 1),
(196, 'Maestría en Educación', 44),
(197, 'Maestría en Educación', 47),
(198, 'Maestría en Educación', 13),
(199, 'Maestría en Estudios Socioculturales', 37),
(200, 'Maestría en Historia', 19),
(201, 'Maestría en Lenguas Modernas', 40),
(202, 'Maestría en Psicología Aplicada', 17),
(203, 'Maestría en Arquitectura, Urbanismo y Diseño', 11),
(204, 'Maestría en Arquitectura, Urbanismo y Diseño', 50),
(205, 'Maestría en Arquitectura, Urbanismo y Diseño', 22),
(206, 'Maestría en Ciencias e Ingeniería', 3),
(207, 'Maestría en Ciencias e Ingeniería', 11),
(208, 'Maestría en Ciencias e Ingeniería', 48),
(209, 'Maestría en Ciencias e Ingeniería', 43),
(210, 'Maestría en Ciencias e Ingeniería', 24),
(211, 'Maestría en Ciencias e Ingeniería', 15),
(212, 'Maestría en Gestión de la Ingeniería', 24),
(213, 'Maestría en Ciencias Clínicas Odontológicas', 35),
(214, 'Maestría en Ciencias de la Salud', 41),
(215, 'Maestría en Ciencias de la Salud', 15),
(216, 'Maestría en Ciencias de la Salud', 14),
(217, 'Maestría en Ciencias en Biomedicina', 41),
(218, 'Maestría en Ciencias Médicas', 14),
(219, 'Maestría en Educación Física y Deporte Escolar', 31),
(220, 'Maestría en Enfermería en Salud Comunitaria', 34),
(221, 'Maestría en Nutrición', 14),
(222, 'Maestría en Psicología de la Salud', 14),
(223, 'Maestría en Salud Publica', 14),
(224, 'Maestría en Ciencias en Ecología Molecular y Biotecnología', 7),
(225, 'Maestría en Ciencias en Manejo de Ecosistemas de Zonas Áridas', 3),
(226, 'Maestría en Ciencias en Oceanografía Costera', 7),
(227, 'Maestría en Administración Pública', 45),
(228, 'Maestría en Ciencias Jurídicas', 1),
(229, 'Maestría en Ciencias Jurídicas', 39),
(230, 'Maestría en Ciencias Jurídicas', 18),
(231, 'Maestría en Estudios Del Desarrollo Global', 28),
(232, 'Maestría en Negocios Sociales', 28),
(233, 'Maestría en Planeación y Desarrollo Sustentable', 50),
(234, 'Maestría en Proyectos Sociales', 1),
(235, 'Maestría en Proyectos Sociales', 44),
(236, 'Maestría en Proyectos Sociales', 13),
(237, 'Maestría en Psicología', 1),
(238, 'Maestría en Psicología', 44),
(239, 'Maestría en Psicología', 30),
(240, 'Doctorado en Ciencias Administrativas', 33),
(241, 'Doctorado en Ciencias Administrativas', 20),
(242, 'Doctorado en Ciencias Administrativas', 1),
(243, 'Doctorado en Ciencias Económicas', 28),
(244, 'Doctorado en Turismo', 23),
(245, 'Doctorado en Valuación', 28),
(246, 'Doctorado en Ciencias Agropecuarias', 49),
(247, 'Doctorado en Ciencias Educativas', 5),
(248, 'Doctorado en Estudios Socioculturales', 37),
(249, 'Doctorado en Historia', 19),
(250, 'Doctorado en Arquitectura, Urbanismo y Diseño', 11),
(251, 'Doctorado en Arquitectura, Urbanismo y Diseño', 50),
(252, 'Doctorado en Arquitectura, Urbanismo y Diseño', 22),
(253, 'Doctorado en Ciencias e Ingeniería', 3),
(254, 'Doctorado en Ciencias e Ingeniería', 11),
(255, 'Doctorado en Ciencias e Ingeniería', 48),
(256, 'Doctorado en Ciencias e Ingeniería', 43),
(257, 'Doctorado en Ciencias e Ingeniería', 15),
(258, 'Doctorado en Gestión de la Ingeniería', 24),
(259, 'Doctorado en Ciencias Clínicas Odontológicas', 35),
(260, 'Doctorado en Ciencias en Biomedicina', 41),
(261, 'Doctorado en Nutrición y Ciencias de la Conducta', 14),
(262, 'Doctorado en Ciencias en Ecología Molecular y Biotecnología', 7),
(263, 'Doctorado en Ciencias en Oceanografía Costera', 7),
(264, 'Doctorado en Medio Ambiente y Desarrollo', 10),
(265, 'Doctorado en Ciencias Del Lenguaje', 40),
(266, 'Doctorado en Ciencias Jurídicas', 39),
(267, 'Doctorado en Estudios Del Desarrollo Global', 28),
(268, 'Doctorado en Estudios Sociales', 42),
(269, 'Doctorado en Negocios Sociales', 28),
(270, 'Doctorado en Planeación y Desarrollo Sustentable', 50),
(271, 'Doctorado en Sociedad, Espacio y Poder', 44);

-- --------------------------------------------------------

--
-- Table structure for table `registro`
--

CREATE TABLE `registro` (
  `idregistro` int(5) NOT NULL,
  `iduabc` int(15) DEFAULT NULL,
  `idcampus` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `idworkshop` int(5) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `assist` int(1) NOT NULL DEFAULT 0
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
  `ability` varchar(100) NOT NULL,
  `post` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 6, 3, 52, '1', '1', '1', '1@gmail.com', 'Alumno');

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
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`idfeedback`),
  ADD KEY `idworkshop` (`idworkshop`),
  ADD KEY `idcampus` (`idcampus`);

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
  MODIFY `iduser` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `idfacultad` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `idfeedback` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `licenciaturas`
--
ALTER TABLE `licenciaturas`
  MODIFY `idlic` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT for table `registro`
--
ALTER TABLE `registro`
  MODIFY `idregistro` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `talleres`
--
ALTER TABLE `talleres`
  MODIFY `idworkshop` int(5) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `facultades`
--
ALTER TABLE `facultades`
  ADD CONSTRAINT `fk_idcampus` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`idworkshop`) REFERENCES `talleres` (`idworkshop`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`idcampus`) REFERENCES `campus` (`idcampus`) ON DELETE CASCADE ON UPDATE CASCADE;

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
