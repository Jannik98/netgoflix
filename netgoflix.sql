-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Feb 2019 um 08:04
-- Server-Version: 10.1.37-MariaDB
-- PHP-Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `netgoflix`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `BenutzerID` int(11) NOT NULL,
  `email` text NOT NULL,
  `passwort` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`BenutzerID`, `email`, `passwort`) VALUES
(1, '12@netgo.de', '12121212');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `filme`
--

CREATE TABLE `filme` (
  `FilmID` int(11) NOT NULL,
  `Titel` text NOT NULL,
  `Beschreibung` text NOT NULL,
  `Erscheinungsjahr` int(11) NOT NULL,
  `Genre` text NOT NULL,
  `Dauer` int(11) NOT NULL,
  `Teil` int(11) NOT NULL,
  `ErstellerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `filmfavoriten`
--

CREATE TABLE `filmfavoriten` (
  `BID` int(11) NOT NULL,
  `FID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `serien`
--

CREATE TABLE `serien` (
  `SerienID` int(11) NOT NULL,
  `Titel` text NOT NULL,
  `Beschreibung` text NOT NULL,
  `Erscheinungsjahr` int(11) NOT NULL,
  `Genre` text NOT NULL,
  `Dauer` int(11) NOT NULL,
  `Folgen` int(11) NOT NULL,
  `Staffeln` int(11) NOT NULL,
  `ErstellerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `serienfavoriten`
--

CREATE TABLE `serienfavoriten` (
  `BID` int(11) NOT NULL,
  `SID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`BenutzerID`);

--
-- Indizes für die Tabelle `filme`
--
ALTER TABLE `filme`
  ADD PRIMARY KEY (`FilmID`);

--
-- Indizes für die Tabelle `filmfavoriten`
--
ALTER TABLE `filmfavoriten`
  ADD PRIMARY KEY (`BID`,`FID`);

--
-- Indizes für die Tabelle `serien`
--
ALTER TABLE `serien`
  ADD PRIMARY KEY (`SerienID`);

--
-- Indizes für die Tabelle `serienfavoriten`
--
ALTER TABLE `serienfavoriten`
  ADD PRIMARY KEY (`BID`,`SID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  MODIFY `BenutzerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `filme`
--
ALTER TABLE `filme`
  MODIFY `FilmID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT für Tabelle `serien`
--
ALTER TABLE `serien`
  MODIFY `SerienID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
