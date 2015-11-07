-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Szerver verzió: 5.5.46-0ubuntu0.14.04.2
-- PHP verzió: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Adatbázis: `lab_coop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `calories`
--

CREATE TABLE IF NOT EXISTS `calories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- A tábla adatainak kiíratása `calories`
--

INSERT INTO `calories` (`id`, `user_id`, `food_id`, `timestamp`) VALUES
(12, 1, 1, '2015-11-05 11:24:56'),
(14, 1, 3, '2015-11-06 12:23:48'),
(16, 1, 2, '2015-11-07 12:45:41'),
(18, 1, 1, '2015-11-07 12:57:20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foods`
--

CREATE TABLE IF NOT EXISTS `foods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `name` text NOT NULL,
  `calories` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- A tábla adatainak kiíratása `foods`
--

INSERT INTO `foods` (`id`, `user_id`, `type`, `name`, `calories`) VALUES
(1, 1, 0, 'Mekis hamburger', 1234),
(2, 1, 1, 'Mekis kÃ³la', 522),
(3, 1, 2, 'FutÃ¡s', 300),
(4, 1, 2, 'EdzÃ©s', 567),
(7, 1, 2, 'Kondi', 2000),
(12, 1, 2, 'Test Sport', 560);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facebook_id` text NOT NULL,
  `daily_calories` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `facebook_id`, `daily_calories`) VALUES
(1, '10205511607086597', 1300);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
