-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 05:13 PM
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
-- Database: `arevalosclinic`
--
CREATE DATABASE IF NOT EXISTS `arevalosclinic` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `arevalosclinic`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles`
--

CREATE TABLE `admin_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_roles`
--

INSERT INTO `admin_roles` (`id`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Main Admin', '2024-10-18 04:03:38', '2024-10-18 04:03:38'),
(2, 'Veterinarian', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(3, 'Veterinary_Assistant', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(4, 'Secretary', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(5, 'Kennel_Assistant', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(6, 'Groomer', '2024-10-18 04:10:18', '2024-10-18 04:10:18');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` varchar(12) NOT NULL,
  `client` varchar(6) DEFAULT NULL,
  `pet` varchar(6) DEFAULT NULL,
  `service` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `approved_at` datetime DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `client`, `pet`, `service`, `date_time`, `approved_at`, `rejected_at`, `cancelled_at`, `reason`, `status`, `created_at`, `updated_at`) VALUES
('210310595343', '179411', '214709', 'grooming', '2024-10-28 00:00:00', NULL, NULL, '2024-10-22 11:57:43', 'wala lang', 'Cancelled', '2024-10-22 03:57:26', '2024-10-22 03:57:43'),
('258120170383', '179411', '110500', 'checkup', '2024-10-25 00:00:00', NULL, '2024-10-22 11:58:11', NULL, 'wal lang', 'Rejected', '2024-10-22 03:56:51', '2024-10-22 03:56:51'),
('751890687552', '179411', '214709', 'grooming', '2024-10-31 00:00:00', '2024-10-22 11:58:49', NULL, NULL, NULL, 'Approved', '2024-10-22 03:57:34', '2024-10-22 03:57:34'),
('800067960337', '179411', '110500', 'deworming', '2024-10-27 00:00:00', NULL, NULL, NULL, NULL, 'Completed', '2024-10-22 03:57:16', '2024-10-22 03:57:16'),
('857651850580', '179411', '214709', 'parasiticControl', '2024-10-26 10:30:00', NULL, NULL, NULL, NULL, 'Pending', '2024-10-22 03:57:06', '2024-10-22 03:57:06');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` varchar(6) NOT NULL,
  `client` varchar(6) DEFAULT NULL,
  `service` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `desc` longtext NOT NULL,
  `picture` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `category`, `name`, `qty`, `desc`, `picture`, `created_at`, `updated_at`) VALUES
(1, 2, 'Nexgard', 30, 'Remove ticks', 'sd2m2nvHCWUHr1FYowRKXjKv.webp', '2024-09-29 23:14:09', '2024-09-29 23:14:09'),
(2, 3, 'Yes', 23, 'Sana all', 'T9B4e02YxvTR0YCcLSQk0awq.jpg', '2024-09-30 08:37:38', '2024-09-30 08:37:38'),
(3, 1, 'yeah', 23, 'yeah', 'Rncuv5ddQqicaxf5y7THaMzJ.jpg', '2024-09-30 08:59:49', '2024-09-30 08:59:49');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_categories`
--

CREATE TABLE `inventory_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_categories`
--

INSERT INTO `inventory_categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'asdasdad', '2024-09-29 22:11:53', '2024-09-29 22:11:53'),
(2, 'Medicine', '2024-09-29 22:16:10', '2024-09-29 22:16:10'),
(3, 'Supplies', '2024-09-29 22:16:23', '2024-09-29 22:16:23'),
(4, 'Category3', '2024-09-30 08:38:33', '2024-09-30 08:38:33'),
(6, 'Test Cat 3', '2024-09-30 09:08:17', '2024-09-30 09:08:17'),
(7, 'asdawdasd', '2024-10-03 08:15:54', '2024-10-03 08:15:54'),
(8, 'asdaswdas', '2024-10-03 08:16:00', '2024-10-03 08:16:00'),
(9, 'Test3', '2024-10-10 22:12:54', '2024-10-10 22:12:54');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(6, '2024_08_21_091030_create_personal_access_tokens_table', 3),
(8, '2024_09_30_054506_create_inventory_categories_table', 5),
(9, '2024_09_29_140328_create_inventories_table', 6),
(17, '2024_09_30_090820_create_appointments_table', 9),
(20, '2024_08_21_050816_create_user_clients_table', 12),
(21, '2024_10_14_023210_create_feedback_table', 13),
(22, '2024_10_18_040010_create_admin_roles_table', 13),
(23, '2024_10_07_145653_create_user_admins_table', 14),
(25, '2024_10_01_032309_create_pets_table', 15);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\user_clients', 0, 'main', 'fa39e8cae1798cf219cb87b93d6ae66dc3baec27fd047a80ee6275b1ee0f938d', '[\"*\"]', NULL, NULL, '2024-08-21 01:42:14', '2024-08-21 01:42:14'),
(2, 'App\\Models\\user_clients', 0, 'main', '7f13a66d3c56425a4c3a28d53bb4004cc041386f7347fc8fd31466a46fbf2e33', '[\"*\"]', NULL, NULL, '2024-08-21 02:00:48', '2024-08-21 02:00:48'),
(3, 'App\\Models\\user_clients', 0, 'main', '0cf13fd6ceafeef7173755a1b6c1100e1ae3905d570b72e5806ed8e7297d2286', '[\"*\"]', NULL, NULL, '2024-08-21 02:02:08', '2024-08-21 02:02:08'),
(4, 'App\\Models\\user_clients', 0, 'main', '6f8b0e3d2818f83e0d7c8fa678ff289bc3471ac288283f26b6da0a23e8a0fff5', '[\"*\"]', NULL, NULL, '2024-08-21 02:03:03', '2024-08-21 02:03:03'),
(5, 'App\\Models\\user_clients', 0, 'main', '99ecebdbe1060b250a2eb3e3f1bdc839b06773b618dd1bca50403935911d09bc', '[\"*\"]', NULL, NULL, '2024-08-21 02:05:10', '2024-08-21 02:05:10'),
(6, 'App\\Models\\user_clients', 0, 'main', '8367529312b1eeee29e969355b9e09ed4ba916c4dd8e7a48e763ca66a852c463', '[\"*\"]', NULL, NULL, '2024-08-21 02:05:57', '2024-08-21 02:05:57'),
(7, 'App\\Models\\user_clients', 0, 'main', '20b9088d8974582b62fa7fe647aea90415b9211ddefe988d6a7f7213c652f092', '[\"*\"]', NULL, NULL, '2024-08-21 02:07:55', '2024-08-21 02:07:55'),
(8, 'App\\Models\\user_clients', 0, 'main', '4ee020a633196d6d662d347bd2455e57005463a1a26f4a6a672be2f324a556cb', '[\"*\"]', NULL, NULL, '2024-08-21 02:10:27', '2024-08-21 02:10:27'),
(9, 'App\\Models\\user_clients', 0, 'main', '4748719e288dc5eca57f31bd284a180298c2d537eba9ffe53ec6224031a63623', '[\"*\"]', NULL, NULL, '2024-08-21 02:14:42', '2024-08-21 02:14:42'),
(10, 'App\\Models\\user_clients', 0, 'main', '610486e402e03c8db567e951f1bf42c4654e39504a13c136bd4d2dfa5b4d4e3f', '[\"*\"]', NULL, NULL, '2024-08-21 02:16:01', '2024-08-21 02:16:01'),
(11, 'App\\Models\\user_clients', 0, 'main', 'db1078e858526e2e13ac67ba1cdcd3cee1f0511bfa6c124e4f620962a40ac7b5', '[\"*\"]', NULL, NULL, '2024-08-21 02:18:27', '2024-08-21 02:18:27'),
(12, 'App\\Models\\user_clients', 0, 'main', '2dd0f30ff0caac12cbda3360f1a46d9be0fd5a3ea997d7e955811fa25e4432e3', '[\"*\"]', NULL, NULL, '2024-08-21 02:21:51', '2024-08-21 02:21:51'),
(13, 'App\\Models\\user_clients', 0, 'main', 'f28683ffd1aecb9883131f28619278024d648b4ef469bbeca80a9ec519e3c011', '[\"*\"]', NULL, NULL, '2024-08-21 02:24:21', '2024-08-21 02:24:21'),
(14, 'App\\Models\\user_clients', 0, 'main', 'd6d733281b7891f80cd31dcd1b31284f86d6c28be90ed51f9f87e7d9eb10e4c3', '[\"*\"]', NULL, NULL, '2024-08-21 02:29:47', '2024-08-21 02:29:47'),
(15, 'App\\Models\\user_clients', 0, 'main', '861368387c36262792a9eae5bf8ab010e24c83709fe553b8f49264892b68ff6a', '[\"*\"]', NULL, NULL, '2024-08-21 02:32:04', '2024-08-21 02:32:04'),
(16, 'App\\Models\\user_clients', 0, 'main', '887076095c9a762369bd331d113340d31ec3fa9068fea6edd311b29336aa8b01', '[\"*\"]', NULL, NULL, '2024-08-21 02:32:45', '2024-08-21 02:32:45'),
(17, 'App\\Models\\user_clients', 0, 'main', 'b833e54edfff8b922eccb816944064d529b930e74dda1a937c6fa8bf2ef8a1b5', '[\"*\"]', NULL, NULL, '2024-08-21 02:39:28', '2024-08-21 02:39:28'),
(18, 'App\\Models\\user_clients', 0, 'main', '2c3053395d03bec5772a758a1bf279d8773071c9a20ff95ae43bbf38c9582972', '[\"*\"]', NULL, NULL, '2024-08-21 02:40:29', '2024-08-21 02:40:29'),
(19, 'App\\Models\\user_clients', 0, 'main', 'c79872dbff01d1c3935904a7b2568f77b8eec640d326c4ca9b4572169b25cf5a', '[\"*\"]', NULL, NULL, '2024-08-21 02:49:27', '2024-08-21 02:49:27'),
(20, 'App\\Models\\user_clients', 126373, 'main', '1792ae6274f04bb0e36b0a52566fbf820baf4b57d19938ce3866ec9594abdf8e', '[\"*\"]', '2024-08-21 02:57:36', NULL, '2024-08-21 02:53:51', '2024-08-21 02:57:36'),
(21, 'App\\Models\\user_clients', 0, 'main', '63fdba02d50457492dfd296e8d290917c2c0efb9625a367863e16d9d4cfacfe4', '[\"*\"]', NULL, NULL, '2024-08-21 02:59:44', '2024-08-21 02:59:44'),
(22, 'App\\Models\\user_clients', 185147, 'main', '5a100b4faaadfb32fe3256cad1caf3e6b9d2b15a0d9455b0202f7ac390c48545', '[\"*\"]', '2024-08-21 03:00:20', NULL, '2024-08-21 03:00:06', '2024-08-21 03:00:20'),
(41, 'App\\Models\\user_admins', 111111, 'main', 'f3cbff5892542009775bab515744c785fde450c95c5d86d305aecc548ffdf770', '[\"*\"]', '2024-10-17 21:36:37', NULL, '2024-10-17 19:55:13', '2024-10-17 21:36:37'),
(52, 'App\\Models\\user_clients', 179411, 'main', '01a7741e578ecd39ec1ce1185c5e60eb4f59c4ea4b1073fcc253abefe4f43046', '[\"*\"]', '2024-10-22 15:00:33', NULL, '2024-10-22 13:59:35', '2024-10-22 15:00:33');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` varchar(6) NOT NULL,
  `client` varchar(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `dob` date DEFAULT NULL,
  `picture` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `client`, `name`, `type`, `breed`, `gender`, `status`, `dob`, `picture`, `created_at`, `updated_at`) VALUES
('110500', '179411', 'Chuchay', 'Dog', 'Shih Tzu', 'Female', 'active', '2020-03-23', 'r1tBNVt0mjOCfeYzhWMeL04V.jpg', '2024-10-22 03:55:41', '2024-10-22 03:55:41'),
('214709', '179411', 'Piola', 'Dog', 'Shih Tzu', 'Female', 'active', '2023-02-22', 'HfSrFVufxmYTCIg0qZetx0QS.jpg', '2024-10-22 03:56:33', '2024-10-22 03:56:33');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_admins`
--

CREATE TABLE `user_admins` (
  `id` varchar(6) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `mname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bday` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `role` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `picture` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_admins`
--

INSERT INTO `user_admins` (`id`, `fname`, `mname`, `lname`, `email`, `password`, `bday`, `gender`, `address`, `phone`, `role`, `status`, `picture`, `created_at`, `updated_at`) VALUES
('111111', 'John', NULL, 'Tho', 'jtho@gmail.com', '$2y$12$l8ezeHSrUoGZxylSaYKhL.v0z15YXiK0Ym8VGY9R2JzWT3KHhcv4W', '2000-10-22', 'Male', 'Makati City', '09297463623', 1, 'active', NULL, '2024-10-07 06:59:04', '2024-10-07 06:59:04'),
('555555', 'Xander', NULL, 'Deloso', 'xagdeloso@gmail.com', '$2y$12$9Xv83N59bzRSzFY5fSbzdOpdPUtZGfQNJk9c6hshzaeO.yW064J5q', '2002-12-02', 'Female', 'aa', '009273915985', 1, 'active', NULL, NULL, NULL),
('983628', 'William', NULL, 'Smith', 'williamSmith@gmail.com', '$2y$12$eTdAcSbseE0dnw0RAUESD.80WB0nh85sHZ8PnBwm9IL54B9b8sMIO', '1998-10-16', 'Male', 'Makati City', '09398372632', 4, 'deleted', 'bLIoGmuxNcBHilxdT3N11luN.jpg', '2024-10-17 21:16:42', '2024-10-17 21:36:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_clients`
--

CREATE TABLE `user_clients` (
  `id` varchar(6) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `mname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bday` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `picture` longtext DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_clients`
--

INSERT INTO `user_clients` (`id`, `fname`, `mname`, `lname`, `email`, `password`, `bday`, `gender`, `address`, `phone`, `picture`, `status`, `created_at`, `updated_at`) VALUES
('179411', 'Xander Aleck Gwynnz', NULL, 'Deloso', 'xagdeloso02@gmail.com', '$2y$12$9Xv83N59bzRSzFY5fSbzdOpdPUtZGfQNJk9c6hshzaeO.yW064J5q', NULL, 'Female', NULL, '09273915985', 'r1tBNVt0mjOCfeYzhWMeL04V.jpg', 'active', '2024-09-29 10:19:58', '2024-10-17 19:57:14'),
('936822', 'Airich Jay', NULL, 'Diawan', 'airichjaydiawan@gmail.com', '$2y$12$l8ezeHSrUoGZxylSaYKhL.v0z15YXiK0Ym8VGY9R2JzWT3KHhcv4W', NULL, 'Male', NULL, '09677644695', NULL, 'active', '2024-08-20 11:01:53', '2024-10-10 20:51:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_client_foreign` (`client`),
  ADD KEY `appointments_pet_foreign` (`pet`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedback_client_foreign` (`client`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventories_category_foreign` (`category`);

--
-- Indexes for table `inventory_categories`
--
ALTER TABLE `inventory_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pets_client_foreign` (`client`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_admins`
--
ALTER TABLE `user_admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_admins_email_unique` (`email`),
  ADD UNIQUE KEY `user_admins_password_unique` (`password`),
  ADD KEY `user_admins_role_foreign` (`role`);

--
-- Indexes for table `user_clients`
--
ALTER TABLE `user_clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_clients_email_unique` (`email`),
  ADD UNIQUE KEY `user_clients_password_unique` (`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_roles`
--
ALTER TABLE `admin_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory_categories`
--
ALTER TABLE `inventory_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `inventories_category_foreign` FOREIGN KEY (`category`) REFERENCES `inventory_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_admins`
--
ALTER TABLE `user_admins`
  ADD CONSTRAINT `user_admins_role_foreign` FOREIGN KEY (`role`) REFERENCES `admin_roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;