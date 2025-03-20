-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2025 at 02:35 AM
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
  `service` bigint(20) UNSIGNED DEFAULT NULL,
  `date_time` datetime NOT NULL,
  `approved_at` datetime DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `note` longtext DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `client`, `pet`, `service`, `date_time`, `approved_at`, `rejected_at`, `cancelled_at`, `reason`, `note`, `status`, `created_at`, `updated_at`) VALUES
('396313663909', '936822', '396881', 2, '2025-03-21 00:00:00', NULL, NULL, NULL, NULL, 'Sana all', 'Pending', '2025-03-18 02:19:11', '2025-03-18 02:19:11');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_assigned_items`
--

CREATE TABLE `appointment_assigned_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment` varchar(12) DEFAULT NULL,
  `item` varchar(12) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_assigned_staffs`
--

CREATE TABLE `appointment_assigned_staffs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `appointment` varchar(12) DEFAULT NULL,
  `staff` varchar(6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `cat_breeds`
--

CREATE TABLE `cat_breeds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_breed` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clinic_services`
--

CREATE TABLE `clinic_services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clinic_services`
--

INSERT INTO `clinic_services` (`id`, `service`, `created_at`, `updated_at`) VALUES
(1, 'Check-up', '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(2, 'Deworming', '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(3, 'Grooming', '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(4, 'Parasitic Control', '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(5, 'Vaccination', '2025-03-18 09:50:03', '2025-03-18 09:50:03');

-- --------------------------------------------------------

--
-- Table structure for table `email_otps`
--

CREATE TABLE `email_otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `otp` varchar(6) NOT NULL,
  `for` varchar(255) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_otps`
--

INSERT INTO `email_otps` (`id`, `otp`, `for`, `client`, `status`, `created_at`, `updated_at`) VALUES
(27, '095646', 'forgot password', '936822', 'Expired', '2025-03-14 06:28:36', '2025-03-14 06:28:43'),
(28, '547016', 'forgot password', '936822', 'Expired', '2025-03-14 06:28:43', '2025-03-14 06:29:03'),
(29, '038943', 'forgot password', '936822', 'Expired', '2025-03-14 06:29:03', '2025-03-14 06:35:28'),
(30, '412194', 'forgot password', '936822', 'Expired', '2025-03-14 06:35:28', '2025-03-14 06:57:56'),
(31, '092757', 'forgot password', '936822', 'Expired', '2025-03-14 06:57:56', '2025-03-19 16:20:29'),
(32, '801863', 'forgot password', '936822', 'Active', '2025-03-19 16:20:29', '2025-03-19 16:20:29');

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
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client` varchar(6) DEFAULT NULL,
  `appointment` varchar(12) DEFAULT NULL,
  `content` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'not-processed',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `client`, `appointment`, `content`, `status`, `created_at`, `updated_at`) VALUES
(2, '936822', '427842914862', 'Sample Feedback', 'processed', '2025-01-08 23:10:22', '2025-01-13 02:46:46'),
(3, '936822', '265648932507', 'Malinis ang kapaligiran', 'processed', '2025-01-12 23:18:39', '2025-01-13 02:46:46');

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
  `measurement_value` int(11) DEFAULT NULL,
  `measurement_unit` varchar(255) DEFAULT NULL,
  `price` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `category`, `name`, `qty`, `desc`, `picture`, `measurement_value`, `measurement_unit`, `price`, `created_at`, `updated_at`) VALUES
(1, 3, 'Nexgard Chewable Tablets Dogs>10-25kg', 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae lorem a eros lacinia dapibus et vitae mi. Donec vulputate felis diam. Nulla feugiat nisl vitae viverra scelerisque. Aenean ultricies ultrices pharetra. Cras felis diam, tristique quis enim sit amet, vulputate egestas nulla. Nulla facilisi. Aenean rhoncus porttitor leo venenatis aliquet.', 'i7TXxt2VQZEUjeOTtrdvqEv1.webp', 68, 'mg', 2067, '2024-12-17 13:44:06', '2024-12-20 21:52:23'),
(2, 3, 'Nexgard Chewable Tablets Dogs>4-10kg', 9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae lorem a eros lacinia dapibus et vitae mi. Donec vulputate felis diam. Nulla feugiat nisl vitae viverra scelerisque. Aenean ultricies ultrices pharetra. Cras felis diam, tristique quis enim sit amet, vulputate egestas nulla. Nulla facilisi. Aenean rhoncus porttitor leo venenatis aliquet.', 'K8ozaxWlCHC3vhccnZ4O5TFf.webp', 28, 'mg', 1947, '2024-12-17 14:00:04', '2025-01-12 23:17:46'),
(3, 3, 'Saint Roche Premium Happiness Scent Dog Shampoo', 16, 'Shampoo', 'BvQacQZEYQ8oBRFgyD1SBHZY.webp', 250, 'ml', 179, '2024-12-20 11:59:19', '2025-02-24 08:40:48'),
(4, 3, 'The Fur Life Anti Mange 3-in-1 Pet Shampoo, Conditioner and Treatment', 5, 'Shampoo', 'gGrx6SyMFUNEklyKyV47YP49.webp', 250, 'ml', 169, '2024-12-20 20:21:37', '2024-12-20 21:54:39');

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
(3, 'Supplies', '2024-09-29 22:16:23', '2024-09-29 22:16:23');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_histories`
--

CREATE TABLE `inventory_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `operator` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_histories`
--

INSERT INTO `inventory_histories` (`id`, `item_name`, `operator`, `qty`, `created_at`, `updated_at`) VALUES
(1, 'Saint Roche Premium Happiness Scent Dog Shampoo', '+', '10', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
(2, 'Saint Roche Premium Happiness Scent Dog Shampoo', '-', '1', '2025-02-24 08:40:48', '2025-02-24 08:40:48');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_items`
--

CREATE TABLE `inventory_items` (
  `id` varchar(12) NOT NULL,
  `inventory` bigint(20) UNSIGNED DEFAULT NULL,
  `expiration_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_items`
--

INSERT INTO `inventory_items` (`id`, `inventory`, `expiration_date`, `created_at`, `updated_at`) VALUES
('159033964314', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('178002368104', 2, '2026-12-31', '2024-12-20 21:53:39', '2024-12-20 21:53:39'),
('210304032098', 2, '2026-12-31', '2024-12-20 21:53:40', '2024-12-20 21:53:40'),
('240941811915', 2, '2026-12-31', '2024-12-20 21:53:38', '2024-12-20 21:53:38'),
('250891225906', 4, '2026-12-31', '2024-12-20 21:54:37', '2024-12-20 21:54:37'),
('25341451089', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('260949422998', 3, '2026-12-31', '2024-12-20 21:54:08', '2024-12-20 21:54:08'),
('281408698509', 2, '2026-12-31', '2024-12-20 21:53:40', '2024-12-20 21:53:40'),
('322547463794', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('34233874557', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('342655569460', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('354967159326', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('357199370169', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('42281796751', 1, '2025-12-31', '2024-12-20 21:52:10', '2024-12-20 21:52:10'),
('454421751998', 4, '2025-12-31', '2024-12-20 21:54:31', '2024-12-20 21:54:31'),
('487180666684', 2, '2026-12-31', '2024-12-20 21:53:38', '2024-12-20 21:53:38'),
('493364427689', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('543744880033', 4, '2026-12-31', '2024-12-20 21:54:38', '2024-12-20 21:54:38'),
('554904300848', 2, '2026-12-31', '2024-12-20 21:53:39', '2024-12-20 21:53:39'),
('556817306149', 1, '2026-12-31', '2024-12-20 21:52:20', '2024-12-20 21:52:20'),
('581453351989', 1, '2026-12-31', '2024-12-20 21:52:20', '2024-12-20 21:52:20'),
('582628968335', 2, '2025-12-31', '2024-12-20 21:53:32', '2024-12-20 21:53:32'),
('595771343232', 4, '2026-12-31', '2024-12-20 21:54:39', '2024-12-20 21:54:39'),
('59887421571', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('651003557110', 1, '2026-12-31', '2024-12-20 21:52:19', '2024-12-20 21:52:19'),
('663262095586', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('666732046741', 1, '2025-12-31', '2024-12-20 21:52:09', '2024-12-20 21:52:09'),
('674726241834', 1, '2025-12-31', '2024-12-20 21:52:08', '2024-12-20 21:52:08'),
('676079167723', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('746061886740', 2, '2025-12-31', '2024-12-20 21:53:32', '2024-12-20 21:53:32'),
('746597337659', 1, '2026-12-31', '2024-12-20 21:52:23', '2024-12-20 21:52:23'),
('798831105944', 2, '2025-12-31', '2024-12-20 21:53:33', '2024-12-20 21:53:33'),
('800940192048', 1, '2026-12-31', '2024-12-20 21:52:19', '2024-12-20 21:52:19'),
('850421904496', 3, '2026-12-31', '2024-12-20 21:54:13', '2024-12-20 21:54:13'),
('858845533378', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('870605163274', 1, '2026-12-31', '2024-12-20 21:52:21', '2024-12-20 21:52:21'),
('904123355985', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('968444821041', 1, '2026-12-31', '2024-12-20 21:52:22', '2024-12-20 21:52:22'),
('968964529180', 4, '2025-12-31', '2024-12-20 21:54:31', '2024-12-20 21:54:31'),
('982701118590', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_items_useds`
--

CREATE TABLE `inventory_items_useds` (
  `id` varchar(12) NOT NULL,
  `inventory` bigint(20) UNSIGNED DEFAULT NULL,
  `expiration_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_items_useds`
--

INSERT INTO `inventory_items_useds` (`id`, `inventory`, `expiration_date`, `created_at`, `updated_at`) VALUES
('566985344266', 2, '2025-12-31', '2024-12-20 21:53:31', '2024-12-20 21:53:31'),
('672162452845', 3, '2025-12-31', '2024-12-20 21:54:00', '2024-12-20 21:54:00');

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
(20, '2024_08_21_050816_create_user_clients_table', 12),
(22, '2024_10_18_040010_create_admin_roles_table', 13),
(23, '2024_10_07_145653_create_user_admins_table', 14),
(24, '2024_10_01_032309_create_pets_table', 15),
(27, '2024_12_06_105705_create_appointment_assigned_staffs_table', 18),
(33, '2024_09_29_140328_create_inventories_table', 21),
(34, '2024_12_21_052647_create_inventory_items_useds_table', 22),
(36, '2024_12_14_141656_create_appointment_assigned_items_table', 24),
(37, '2024_12_14_151231_create_inventory_items_table', 25),
(38, '2025_01_07_043223_create_sentiment_analyses_table', 26),
(42, '2025_01_09_125629_create_feedbacks_table', 28),
(43, '2025_02_17_194346_create_cat_breeds_table', 29),
(45, '2025_02_24_140148_create_inventory_histories_table', 30),
(46, '2025_03_13_144754_create_email_otps_table', 31),
(47, '2025_03_18_091220_create_clinic_services_table', 32),
(48, '2024_09_30_090820_create_appointments_table', 33),
(49, '2025_03_20_010050_create_pet_medical_history_medications_table', 34),
(50, '2025_03_20_010423_create_pet_medical_history_allergies_table', 34),
(51, '2025_03_20_010542_create_pet_medical_history_diseases_table', 34),
(52, '2025_03_20_011002_create_pet_medical_history_vaccinations_table', 34);

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
(31, 'App\\Models\\user_clients', 179411, 'main', 'f454e5fdb8699ae57be06d632b559ecc4a93a3731be03ac84ee2bb6257bfdf70', '[\"*\"]', '2024-10-07 05:08:52', NULL, '2024-10-03 08:29:53', '2024-10-07 05:08:52'),
(81, 'App\\Models\\user_clients', 936822, 'main', 'bd39eed5a31d52411b372d2890e3b70e191f81cf0fc6017091e2cd28b302b337', '[\"*\"]', '2025-03-19 17:34:11', NULL, '2025-03-19 16:21:14', '2025-03-19 17:34:11');

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
('396881', '936822', 'Lucky', 'Dog', 'Shiranian', 'Male', 'active', '2020-09-16', 'ZOVJgroAJvlGO1E3ekAQW4vW.png', '2024-11-29 07:31:49', '2024-11-29 07:31:49'),
('996845', '936822', 'Heart', 'Dog', 'Shih Apso', 'Female', 'active', '2022-10-16', 'gB4Mk9HFhKDj1AuRB2Qi7AKe.png', '2025-01-10 18:10:44', '2025-01-10 18:10:44');

-- --------------------------------------------------------

--
-- Table structure for table `pet_medical_history_allergies`
--

CREATE TABLE `pet_medical_history_allergies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pet` varchar(6) DEFAULT NULL,
  `allergy` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_medical_history_diseases`
--

CREATE TABLE `pet_medical_history_diseases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pet` varchar(6) DEFAULT NULL,
  `disease` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_medical_history_medications`
--

CREATE TABLE `pet_medical_history_medications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pet` varchar(6) DEFAULT NULL,
  `medication` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_medical_history_vaccinations`
--

CREATE TABLE `pet_medical_history_vaccinations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pet` varchar(6) DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sentiment_analyses`
--

CREATE TABLE `sentiment_analyses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `aspect` varchar(255) NOT NULL,
  `positive_percent` double NOT NULL,
  `neutral_percent` double NOT NULL,
  `negative_percent` double NOT NULL,
  `positive_count` int(11) NOT NULL,
  `neutral_count` int(11) NOT NULL,
  `negative_count` int(11) NOT NULL,
  `positive_comments` longtext NOT NULL,
  `neutral_comments` longtext NOT NULL,
  `negative_comments` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sentiment_analyses`
--

INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(1, 'Hygiene', 10.16949152542373, 64.40677966101694, 25.423728813559322, 12, 76, 30, '[[\"sa ngayon maayos naman naman lahat ay palakaibigan matulungin mahusay at propesyonal\",2],[\"sa ngayon maayos naman lahat ay matulungin at propesyonal\",0],[\"sa ngayon maayos naman lahat ay palakaibigan matulungin mahusay at propesyonal\",0],[\"the place was neat orderly and pleasant smelling\",0],[\"sa ngayon maayos naman lahat ay magaling mabait at maaasahan\",0],[\"sa ngayon maayos naman lahat ay matulungin mahusay at propesyonal\",0],[\"extremely clean pleasant and orderly place wouldnt think of taking my pets anywhere else\",0],[\"very organized clean and neat\",0],[\"the place is spotless tidy and has a pleasant smell\",0],[\"sa ngayon maayos naman ang lahat ay palakaibigan matulungin mahusay at propesyonal\",0],[\"the facility has this neat friendly and welcoming atmosphere\",0],[\"the facility is clean and well organized with a welcoming atmosphere\",0]]', '[[\"napaka malinis at napaka maayos ng kanilang lugar\",2],[\"the inside has a distinct smell\",0],[\"maayos ang aking pagbisita\",0],[\"there are aspects related to cleanliness that could be improved\",0],[\"maaring maayos pa ang kanilang lugar\",0],[\"the equipment in this clinic is so clean\",0],[\"ako ay pumunta para ipagupit at magpashampoo ng aso ko at maayos ang kanilang trabaho\",0],[\"the place is really clean\",0],[\"trixie needed her teeth cleaned and the procedure was completed\",0],[\"ang kanilang pag aalaga ay maayos\",0],[\"si nala at ako ay nagkaroon ng maayos na karanasan sa inyong veterinary hospital\",0],[\"maayos ang staff\",0],[\"sasalubungin ka nang maayos ng mga tauhan\",0],[\"maayos ang aking karanasan mula sa unang tawag para sa impormasyon\",0],[\"extremely clean clinic\",0],[\"maayos ang lugar\",0],[\"maayos at malinis ang lugar\",0],[\"maayos at katanggap-tanggap ang serbisyo\",0],[\"ang mga tauhan ay magiliw at maayos makitungo sa aking aso\",0],[\"kinailangan ni trixie na ayusin ang kanyang mga ngipin at pagkatapos ng bisita naging mas maayos ang mga ito\",0],[\"the clinic is a clean facility\",0],[\"ang mga pagsusuri at mga test ay palaging tinitingnan nang maayos\",0],[\"ang kalidad ng pag aalaga ay maayos\",0],[\"their clinic was very organized and had a fresh smell as opposed to most clinics\",0],[\"gumaling nang maayos ang aking alaga\",0],[\"tinatrato ng doktor nang maayos ang alaga ko\",0],[\"maayos ang serbisyo\",0],[\"maayos na serbisyo\",0],[\"maayos na vet\",0],[\"mabilis at maayos sila gumawa\",0],[\"the clinic is always clean and pristine i feel comfortable bringing my pets here\",0],[\"everything is neat and spotless ensuring the best environment for the recovery of our pets \",0],[\"malinis ang klinika at laging maayos at kaaya aya ang amoy\",0],[\"the clinic is impeccably clean which shows their commitement to hygiene\",0],[\"naramdaman ko na makakatanggap si justice ng maayos na pangangalaga\",0],[\"the facility is clean\",0],[\"their cages were clean and well maintained\",0],[\"ang mga kulungan ay malinis\",0],[\"maayos ang pasilidad\",0],[\"lahat ay magiliw at ang serbisyo ay laging maayos\",0],[\"maayos ang karanasan\",0],[\"their facilities are all extremely neat and smell good\",0],[\"the clinic is always clean and welcoming and the staff is fantastic\",0],[\"laging malinis at kaaya aya sa mata ang kanilang mga pasilidad\",0],[\"maayos na pagaalaga\",0],[\"madumi ang sahig\",0],[\"malinis at propesyonal ang lugar\",0],[\"maayos ang mga beterinaryo\",0],[\"their clinic really smells good\",0],[\"their clinic is really clean\",0],[\"very clean environment\",0],[\"i like how they sanitized everything\",0],[\"ang mga tauhan ay maayos at maingat sa pagbibigay ng pangangalaga\",0],[\"pinapanatili nilang malinis ang kanilang kapaligiran\",0],[\"pinapahalagahan ko ang staff para sa kanilang maayos na pag aalaga\",0],[\"clean environment\",0],[\"maayos ang staff\",0],[\"sanitized clinic\",0],[\"sanitized equipment\",0],[\"maayos ang serbisyo\",0],[\"maayos ang serbisyo\",0],[\"the place was clean\",0],[\"sila ay maayos at maingat sa pag aalaga ng aking aso\",0],[\"the clinic smelled like rotten food which is nauseating\",0],[\"the clinic smells so fresh\",0],[\"their clinic smells so good\",0],[\"ang kapaligiran ay maayos\",0],[\"maayos ang pasilidad\",0],[\"their environment is really clean\",0],[\"clean equipment\",0],[\"ito ay isang maayos na pasilidad\",0],[\"i love how they regularly clean their environment\",0],[\"maayos ang kanilang pasilidad\",0],[\"they always sanitize their equipments after use\",0],[\"i love the smell of their clinic\",0],[\"everyone was really cleaning their place which is good\",0]]', '[[\"hindi maayos at hindi malinis ang lugar\",2],[\"the floors looked so old and dirty there were so many stains\",2],[\"parang hindi naglilinis nang maayos ang veterinaryo\",0],[\"hindi sila maayos kausap tungkol sa kalagayan ng aso ko\",0],[\"the pet scales is definitely not cleaned every use as it were dirty and covered in fur\",0],[\"hindi maayos ang pag gamot sa aking alaga\",0],[\"hindi maayos ang system pag dating sa pagbook\",0],[\"the facility is so dirty\",0],[\"the place is dirty\",0],[\"napansin ko na ang mga doktor dito ay maayos at propesyonal\",0],[\"hindi maayos kausap ang mga tauhan sa loob\",0],[\"hindi nalinisan nang maayos ang mga gamit\",0],[\"the reception area had cobwebs in the corners which makes it looks dirty\",0],[\"the rugs in the waiting area were dirty and smelled awful\",0],[\"hindi nagamot nang maayos ang aking alaga\",0],[\"hindi maayos magbigay ng payo ang doktor\",0],[\"hindi naipaliwanag nang maayos ang operasyon sa aking alaga\",0],[\"unacceptable hygiene standards\",0],[\"the trash bins were overflowing and smelled awful\",0],[\"the clinic is always clean and smells fresh even in high traffic areas\",0],[\"shouldnt a clinic not smell like mold its so musty in here its concerning\",0],[\"hindi maayos ang sistema sa pagpila kaya ang tagal\",0],[\"the pricing for cleanings is way above average and not justified so expensive\",0],[\"hindi maayos mag alaga ang vet dito\",0],[\"the examination table was not cleaned after the previous pet which is unhygienic\",0],[\"the bathroom was filthy and smelled terrible\",0],[\"the staff did not sanitize the tools before using them on my pet and that is so unhygienic\",0],[\"the water bowl provided for pets was dirty and had algae buildup\",0],[\"very unclean environment\",0],[\"hindi maayos ang check up kaya nakakagalit\",0]]', '2025-01-10 00:00:07', '2025-01-10 00:00:07'),
(2, 'Waiting Time', 4.49438202247191, 41.57303370786517, 53.93258426966292, 4, 37, 48, '[[\"lahat sa staff nila ay mabait at matulungin mabilis nilang natugunan ang mga problema namin\",0],[\"very fast efficient and commendable work ethic\",0],[\"the staff are very responsive and quick to act and the veterinarians are skilled and knowledgeable\",0],[\"the service was fast and efficient with great attention to detail\",0]]', '[[\"ang mga tauhan ay mabilis sumagot sa mga katanungan kaya mabilis ang proseso\",2],[\"mabilis lang ang pila kaya nakakatuwa\",0],[\"karaniwang karanasan at mayroong oras tuwing linggo\",0],[\"ang kanilang system ay may mga aspeto na nangangailangan ng oras upang matutunan\",0],[\"minsan may pagkaantala sa oras\",0],[\"kinakailangan ng oras pag nagbbook\",0],[\"sila ay sumusunod sa mga pamantayan ng kanilang trabaho\",0],[\"ang tauhan ay palaging mabilis sumagot\",0],[\"the wait time was within the expected range\",0],[\"kailangan maglaan ng oras sa paghihintay\",0],[\"there are delays that may impact customers schedule\",0],[\"service could be improved with quicker response times\",0],[\"binabati ka sa oras ng iyong appointment\",0],[\"ang mga nakaiskedyul na appointment ay sumusunod sa itinakdang oras\",0],[\"sila ay sumusunod sa mga pamantayan ng kanilang tungkulin\",0],[\"maikling oras lang ang paghihintay\",0],[\"ang oras ay madalas na naaantala\",0],[\"staff is very fast yet attentive and efficient\",0],[\"extremely fast quick and efficient staff wouldnt think of taking my pets anywhere else\",0],[\"very short waiting time\",0],[\"mabilis at maayos sila gumawa\",0],[\"the booking process is quick and responsive\",0],[\"scheduling an appointment is always quick and easy\",0],[\"despite the number of patients they always keep waiting times minimal\",0],[\"kahit maraming pasyente sa klinika mabilis at dekalidad parin ang kanilang serbisyo\",0],[\"i appreciate their short waiting time for getting appointments\",0],[\"mahirap magbook online at nauubos ang oras\",0],[\"ang aking alaga ay gumaling nang mabilis\",0],[\"mabilis at tapat ang kanilang serbisyong inaalok\",0],[\"the staff could benefit from more focus as they were chatting behind the counter while i was waiting to be served\",0],[\"napakaayos mabilis at husay ng kanilang sistema\",0],[\"my kitten was better 24 hours after the visit.\",0],[\"i had to wait for hours for our turn\",0],[\"i spent some time waiting\",0],[\"ang presyo ay ayon sa pamantayan\",0],[\"short waiting time\",0],[\"ang beterinaryo ay nagbibigay oras sa iyong alaga\",0]]', '[[\"they ignored me at the front desk and made me wait for ages\",2],[\"i had a very long wait because of the long line\",2],[\"their dedicated behavior in their work ensures our pets live long happy lives\",2],[\"the line was barely moving i had to wait for so long even though i came here early\",2],[\"too many people too much waiting\",2],[\"the loading time for the booking page was too long i ended up not booking\",2],[\"we waited for so long before we could get into the doctors room\",2],[\"the clinic has a great time management which is why there is little to no wait time\",2],[\"hindi worth it ang oras sa pagpila\",0],[\"unacceptable wait times its showing us that you dont respect our time\",0],[\"it took to too long for them to approve my appointment request\",0],[\"the waiting area has a noticeable odor\",0],[\"i have to wait for a very long time despite having an appoinment\",0],[\"the booking form is too long and asks for unnecessary details\",0],[\"there is a need to allot an extra time when waiting\",0],[\"my dog started to get restless at how long we have been waiting in the lobby\",0],[\"incredibly long wait before we could see the vet\",0],[\"the visit to the clinic took longer than expected\",0],[\"the staff are so rude as no one apologized when they made me wait for over an hour\",0],[\"the wait was very long\",0],[\"matagal magreply sa booking request\",0],[\"nakakaubos ng oras ang waiting time sa sobrang bagal\",0],[\"laging hindi nasusunod ang binigay na oras\",0],[\"hindi flexible ang oras sa pagrereschedule kaya ang hirap magbook ulit\",0],[\"if this werent the only clinic near us then we wouldnt be going here the wait is ridiculous\",0],[\"the staff failed to update me on my pets progress during a long procedure\",0],[\"the rugs in the waiting area were dirty and smelled awful\",0],[\"walang respeto sa oras ng mga customer\",0],[\"hindi kami binibigyan ng oras\",0],[\"the transaction through their booking system was very smooth and fast\",0],[\"hindi nasusunod ang tamang oras ng appoinment\",0],[\"i dont understand why it takes so long for them to finish an appointment\",0],[\"the staff is very thorough yet fast and efficient\",0],[\"the appointments here are very timely and swift no long waiting time\",0],[\"we waited longer than the scheduled time\",0],[\"mabagal ang proseso kaya tumatagal\",0],[\"handa lagi silang tumulong\",0],[\"i waited for a very long time\",0],[\"walang konsiderasyon sa oras ng customer\",0],[\"i feel like the clinic is very inefficient as the waiting time is too long\",0],[\"you have to wait for a long time despite having a schedule\",0],[\"hindi vina value ng clinic ang iyong oras\",0],[\"waiting for hours to see the vet is not reasonable please fix this\",0],[\"our appointment got delayed and we had to wait forever which is ridiculous\",0],[\"matagal ang aking paghihintay\",0],[\"i have to wait for a very long time which is not good\",0],[\"im very disappointed with how long they made me wait for my babys checkup\",0],[\"this clinic has very poor time management we waited for almost an hour\",0]]', '2025-01-10 00:00:07', '2025-01-10 00:00:07');
INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(3, 'Customer Service', 8.601216333622936, 74.63075586446568, 16.76802780191138, 99, 859, 193, '[[\"so far so good good everyone friendly was helpful efficient and professional\",4],[\"so far so good everyone friendly was friendly helpful efficient professional\",4],[\"everyone was friendly caring and very professional they answered all my questions and good took care of my two kittens\",2],[\"i am so grateful so to the professional and greatly knowledgeable staff\",2],[\"so far so good everyone was friendly and professional\",2],[\"ang tauhan ay palaging mabait taospusong nakikiramay nakikiramay at nagmamalasakit sa lahat ng ating mga hayop\",2],[\"ocvh was so welcoming and helpful they answered all my questions so respectful\",2],[\"was ocvh so understanding and helpful they answered all my questions so respectful\",2],[\"so far so good everyone was friendly helpful efficient and professional\",2],[\"everyone was very friendly caring and professional they answered all my questions and and took good care of my two kittens\",2],[\"ocvh was so understanding and helpful they answered all my questions so respectful\",2],[\"the service service is terrific and professional the staff and the facility are welcoming and helpful\",2],[\"everyone is very friendly and took their time with each animal very caring and knowledgeable\",2],[\"doctors and staff staff are always very helpful and caring keep up the good work\",2],[\"so far so good everyone was friendly helpful efficient professional\",2],[\"they were very welcoming and attentive with what i had to say and ask im very satisfied\",2],[\"everyone was understanding helpful and compassionate they answered all my questions and took good care of my two kittens\",2],[\"everyone was attentive responsive and knowledgeable they answered all my questions and took good care of my kittens\",2],[\"everyone was friendly caring and very professional answered all my questions and took good care of my two kittens\",2],[\"sa ngayon maayos naman naman lahat ay palakaibigan matulungin mahusay at propesyonal\",2],[\"doctors and staff are always very gentle and caring keep keep up the good work\",2],[\"everyone was friendly caring and very professional they answered all my questions and took good care of my two kittens\",2],[\"their service is terrific and their staff is professional welcoming and helpful\",2],[\"the staff and physicians excellent very caring and professional\",0],[\"the staff was super nice professional and caring\",0],[\"great friendly and very professional staff\",0],[\"i am so grateful the to professional and greatly knowledgeable staff\",0],[\"the staff and physicians are excellent as they are very a caring professional\",0],[\"the staffs are excellent as they are very caring and professional\",0],[\"the staff are always very helpful and caring keep up the good work\",0],[\"the staff is very professional yet friendly and caring\",0],[\"i am so greatful to the nice staff and proactive doctors\",0],[\"so far good everyone was friendly and helpful\",0],[\"sa ngayon maayos naman lahat ay matulungin at propesyonal\",0],[\"the staff is very helpful and the veterinarians are knowledgeable and compassionate\",0],[\"the staff are excellent very caring and professional\",0],[\"i am so grateful to the professional and greatly knowledgeable staff\",0],[\"i am so grateful to the welcoming and greatly knowledgeable staff\",0],[\"the staff is very helpful and the veterinarians knowledgeable and compassionate\",0],[\"nice and caring staff very friendly and knowledgeable i would recommend\",0],[\"the staff is very helpful the and veterinarians are efficient and compassionate\",0],[\"the staff and physicians are amazing as they are very caring and professional\",0],[\"nice and caring staff very friendly and knowledgeable i would recommend\",0],[\"the staff is very helpful and the veterinarians are knowledgeable and compassionate\",0],[\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my pets anywhere else\",0],[\"doctors and staff are always very helpful and caring keep up the good work\",0],[\"very friendly caring and knowledgeable staff\",0],[\"the staff have a very professional attitude while maintaining a friendly and caring demeanor with their clients\",0],[\"extremely friendly compassionate caring skilled and sincere staff wouldnt think of taking my pets anywhere else\",0],[\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my pets anywhere else\",0],[\"dr danowitz is an excellent veterinarian he is dedicated and attentive\",0],[\"sa ngayon maayos naman lahat ay palakaibigan matulungin mahusay at propesyonal\",0],[\"lahat sa staff nila ay mabait at matulungin mabilis nilang natugunan ang mga problema namin\",0],[\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my anywhere else\",0],[\"the staff and physicians are excellent very caring and and professional\",0],[\"doctors and staff are always very helpful and caring keep up the the good work\",0],[\"dr danowitz is an excellent veterinarian he is attentive and compassionate\",0],[\"sa ngayon maayos naman lahat ay matulungin mahusay at propesyonal\",0],[\"the staff is very supportive and the veterinarians are gentle and compassionate\",0],[\"skilled professional and very efficient staff\",0],[\"i am grateful to the skilled and greatly efficient staff\",0],[\"i am so grateful to the awesome and greatly skilled staff\",0],[\"the doctor was understanding attentive and empathetic\",0],[\"the staff are very responsive and quick to act and the veterinarians are skilled and knowledgeable\",0],[\"the staff is professional friendly and caring\",0],[\"the service is amazing the staff and the facility are welcoming and pleasant\",0],[\"the staff and physicians are excellent very dedicated and skilled\",0],[\"very friendly caring and professional manner\",0],[\"i so am grateful to the professional and greatly knowledgeable staff\",0],[\"great friendly and very professional staff\",0],[\"ang kanilang tauhan ay palaging mabait taos pusong nakikiramay at nagmamalasakit lahat ng ating mga hayop\",0],[\"everyone at the clinic especially their doctor is very professional friendly and caring\",0],[\"this clinic has a great friendly and very professional staff\",0],[\"napakamatulungin nagmamalasakit at mabait sa amin ang kanilang tauhan\",0],[\"sa ngayon maayos naman ang lahat ay palakaibigan matulungin mahusay at propesyonal\",0],[\"overall its great everyone was friendly helpful efficient and professional\",0],[\"their doctors were very friendly caring and knowledgeable\",0],[\"the people at ocvh were so understanding and helpful and they answered all my questions in a respectful tone\",0],[\"everyone at this clinic carries themselves in a very friendly caring and professional manner\",0],[\"everyone was friendly caring very professional and considerate of my two kittens\",0],[\"all of them are friendly caring and work in a professional manner\",0],[\"the staff and physicians of this clinic are excellent very caring and professional\",0],[\"i wouldnt think of taking my pets elsewhere since their staff is friendly extremely compassionate sincere and skilled\",0],[\"the staff is great as they are very friendly and professional\",0],[\"this clinic has extremely friendly compassionate caring sincere and skilled staff\",0],[\"the facility has this neat friendly and welcoming atmosphere\",0],[\"overall everyone was extremely friendly helpful efficient and professional\",0],[\"their staff is very helpful and the veterinarians are knowledgeable and compassionate\",0],[\"their staff works professionally and is very friendly and caring\",0],[\"silang lahat naman ay napakapalakaibigan matulungin mahusay at propesyonal\",0],[\"everyone was very friendly caring and professional they even answered my questions in a respectful manner\",0],[\"i am very grateful to the professional and greatly knowledgeable staff of this clinic\",0],[\"the doctor that served my pet was very friendly caring knowledgeable\",0],[\"ang kanilang tauhan ay palaging palakaibigan masayahin at malasakit\",0],[\"lahat ay palakaibigan matulungin mahusay maalaga maalam at propesyonal\",0],[\"this clinic has very caring friendly and knowledgeable staff and doctors\",0],[\"great clinic with an amazing team of skilled and caring professionals\",0],[\"the service was fast and efficient with great attention to detail\",0],[\"the staff is very professional friendly and caring\",0]]', '[[\"so so far so good everyone was accommodating and helpful\",3],[\"very caring and very friendly staff\",2],[\"the staff is very very helpful\",2],[\"the staff is very very professional\",2],[\"the reception staff greets you when you arrived\",2],[\"ang mga tauhan ay mabilis sumagot sa mga katanungan kaya mabilis ang proseso\",2],[\"so far so good everyone was attentive\",2],[\"so far so good the service is worthwhile\",2],[\"the staff at the front was very courteous and the doctor was very skilled amazing facility\",2],[\"the doctor was very attentive to details and his explanations were very prompt so it was easy to understand\",2],[\"they were so gentle with handling my easily frightened dog the doctors and staff are so professional\",2],[\"ocvh was so understanding and helpful they answered all my questions so reliable\",2],[\"their service is always timely despite how packed their schedules are\",2],[\"napakamatulungin at na angkop sa amin kaagad kaagad na tunay na nagmamalasakit\",2],[\"every staff member was very friendly playful and you could really tell they were happy to serve you\",2],[\"staff provided loving care which is heartwarming\",0],[\"napakamatulungin at mabait ng mga tauhan\",0],[\"ang tauhan ay palaging taospusong nakikiramay sa iyong alaga\",0],[\"the staff is very friendly\",0],[\"the staff is very efficient\",0],[\"ang tauhan ay palaging mabait\",0],[\"very professional staff\",0],[\"the staff is so efficient\",0],[\"ang mga tauhan ay matulungin\",0],[\"the staff is very friendly and caring\",0],[\"staff is also great\",0],[\"staff are always very helpful\",0],[\"napaka pala kaibigan ng mga tauhan\",0],[\"napakamatulungin ng mga tauhan\",0],[\"ang tauhan ay taospusong nagmamalasakit sa lahat ng ating mga hayop\",0],[\"excellent service\",0],[\"napakamatulungin at mabait ng mga tauhan\",0],[\"ang staff ay napaka magiliw at matulungin\",0],[\"friendly staff that truly cares about my dog\",0],[\"the staff is very helpful\",0],[\"ang tauhan ay napaka bait\",0],[\"napakamatulungin ng mga doktor\",0],[\"everyone was very friendly and took their with with each animal\",0],[\"the staffs are very honest\",0],[\"i like how they provide a very prompt service\",0],[\"i absolutely love the staff\",0],[\"the staff are always very helpful and courteous\",0],[\"the staff is awesome\",0],[\"ang mga tauhan ay napakagaling\",0],[\"all of the staff took great care of our puppy\",0],[\"the staff is very professional\",0],[\"very friendly and caring staffs\",0],[\"napaka maasikaso ng mga tauhan\",0],[\"ang mga tauhan ay napaka galing\",0],[\"ang mga tauhan ay marespeto\",0],[\"everyone is so friendly  and caring\",0],[\"the staff is very compassionate\",0],[\"napakamatulungin at mabait ng doctor\",0],[\"the staffs are very supportive\",0],[\"the staff are really a great support\",0],[\"nakikitungo ang mga tauhan sa iyong hayop\",0],[\"very nice and caring staff\",0],[\"ang serbisyo ng staff ay ayos lang\",0],[\"the staff is very skilled\",0],[\"everyone was very helpful and efficient\",0],[\"the staff is very caring\",0],[\"the doctors and staffs are really awesome\",0],[\"the service is terrific and the staff are very professional\",0],[\"napakahusay ng mga tauhan\",0],[\"lahat ng staff ay napaka matulungin\",0],[\"the doctor is very friendly\",0],[\"the staff are welcoming\",0],[\"the staffs are very professional\",0],[\"mula sa mga doktor hanggang sa mga tauhan nakakatanggap ka ng pangangalaga\",0],[\"the staffs are very dedicated\",0],[\"the staff are always very helpful\",0],[\"the staff provide care for my pet\",0],[\"the staff are very attentive\",0],[\"the staff are very awesome\",0],[\"the staffs are extremely friendly\",0],[\"ang tauhan ay palaging mabait\",0],[\"doctors and staff are very helpful\",0],[\"ang mga tauhan ay palaging magalang at kompetente\",0],[\"the staff are very dedicated\",0],[\"i am so grateful to the competetive staffs\",0],[\"ito ang unang beses ko at naranasan ko ang mga serbisyo nila\",0],[\"the staff are very reputable\",0],[\"the staff are doing their job\",0],[\"ang mga tauhan ay napakamaasikaso\",0],[\"the staff are really welcoming\",0],[\"the staffs are very diligent\",0],[\"the staff are really committed\",0],[\"the staff is very compassionate\",0],[\"nagbigay ng serbisyo ang staff at doktor\",0],[\"the service is terrific\",0],[\"the service was provided as expected\",0],[\"napakasipag ng mga tauhan\",0],[\"the staffs are very thoughtful\",0],[\"the staffs are very efficient\",0],[\"ang tauhan ay talagang may malasakit\",0],[\"the doctors are very helpful\",0],[\"i am so grateful to the reliable staffs\",0],[\"ang tauhan ay talagang maasahan\",0],[\"the staff is considerate\",0],[\"alam ng mga tauhan ang pangalan ng aking aso\",0],[\"the staffs are very caring\",0],[\"the doctos was so understanding and helpful answered all my questions\",0],[\"this clinic is really competetive when it comes to service\",0],[\"doctors and staff are always very helpful\",0],[\"ang mga tauhan ay may sapat na kaalaman\",0],[\"ocvh was so understanding and helpful they answered all my questions\",0],[\"the staffs was super nice and caring\",0],[\"napakamatulungin ng mga tauhan\",0],[\"the staffs are very hard working\",0],[\"the doctors and staff are very caring\",0],[\"everyone was very friendly\",0],[\"they provide adequate quality service\",0],[\"the staff was extremely compassionate\",0],[\"the doctors and staff are very organized\",0],[\"they are very friendly\",0],[\"ang tauhan ay palaging maingat\",0],[\"ocvh was so understanding and helpful\",0],[\"the staff was so helpful\",0],[\"the doctors and staff are always caring\",0],[\"the staffs are so efficient\",0],[\"the staffs and doctors are excellent\",0],[\"ang tauhan ay palaging taospusong nakikiramay\",0],[\"ang mga tauhan ay talagang masipag\",0],[\"doctors and staff are very skillful\",0],[\"the staff was extremely compassionate\",0],[\"very professional staff\",0],[\"the service is really excellent\",0],[\"the staff was really courteous\",0],[\"napaka husay nga mga tauhan\",0],[\"the staff was really professional and the facility are welcoming\",0],[\"the staff was really friendly\",0],[\"they deliver the service as required\",0],[\"ang tauhan palaging madaling lapitan\",0],[\"the staff was working really efficient\",0],[\"the staffs are extremely skilled\",0],[\"the staffs are very caring\",0],[\"the staffs are commendable\",0],[\"the staff is very sweet with my pet\",0],[\"the staff provide assistance and support\",0],[\"i am really happy with their service\",0],[\"the doctors and staff provided care for my two pets\",0],[\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",0],[\"ang mga tauhan ay tunay na nagmamalasakit sa alaga mo\",0],[\"the staff is very caring\",0],[\"the staff is very sociable\",0],[\"the staffs are really understanding\",0],[\"ang mga tauhan ay nagbigay ng tulong at suporta\",0],[\"the staff is very punctual\",0],[\"doctors and staff are accountable\",0],[\"staff in lakewood and toms river care for both my dogs\",0],[\"the staffs are friendly and very professional\",0],[\"the staffs are really considerate\",0],[\"the staff are really calm even in times of emergency\",0],[\"the service was adequate\",0],[\"i am so grateful to the hard working staffs\",0],[\"courteous and professional staff\",0],[\"very caring staff\",0],[\"the staff is very detailed\",0],[\"the staff is so empathetic\",0],[\"ang mga tauhan ay talagang mapag aruga\",0],[\"the staff is really efficient\",0],[\"the staff is so responsible\",0],[\"they are really attentive\",0],[\"the service is impressive\",0],[\"the staff are really reliable\",0],[\"the staff is so flexible\",0],[\"extremely supportive staff\",0],[\"napaka matulungin ng mga tauhan\",0],[\"the staff is very caring\",0],[\"great service\",0],[\"the staff are great\",0],[\"the staff are really helpful\",0],[\"ang serbisyo ay naaayon sa mga kinakailangan\",0],[\"very compassionate staff\",0],[\"compassionate staff\",0],[\"very courteous staff\",0],[\"the staffs are really professional\",0],[\"napaka matulungin ng mga tauhan\",0],[\"the staff is very helpfulpositive\",0],[\"they are very helpful\",0],[\"doctors and staff are enthusiastic\",0],[\"ang tauhan ay palaging mabait\",0],[\"ang serbisyong natanggap ng aking alaga ay naaayon sa inaasahan\",0],[\"extremely reliable staff\",0],[\"the staff is very goal oriented\",0],[\"very goal oriented staff\",0],[\"i am so grateful to these professional staff\",0],[\"the staff and the doctors are able to prioritize\",0],[\"marunong magpahalaga ang mga tauhan\",0],[\"ang tauhan ay palaging mabilis sumagot\",0],[\"the staff is very helpful and compassionate\",0],[\"excellent service\",0],[\"great staff\",0],[\"the service meets expectations\",0],[\"ang tauhan ay nagmamalasakit sa lahat ng ating mga hayop\",0],[\"very pleasant staff\",0],[\"the staff and physicians are very caring and professional\",0],[\"the staff and the facility are welcoming\",0],[\"the staff is very helpful\",0],[\"everyone was friendly\",0],[\"the staff and the doctors are excellent\",0],[\"the staff is very conscientious\",0],[\"the service is extremely good\",0],[\"napakamatulungin at mabait ng mga tauhan\",0],[\"the experience with the staff are acceptable\",0],[\"extremely helpful staff\",0],[\"ang tauhan ay talagang matulungin\",0],[\"ang tauhan ay talagang marespeto\",0],[\"the staffs provided assistance\",0],[\"they are so welcoming and helpful\",0],[\"very supportive staffs\",0],[\"the service is terrific\",0],[\"ang tauhan ay nagmamalasakit sa lahat ng ating mga hayop\",0],[\"very friendly and professional staffs\",0],[\"doctors and staff are caring\",0],[\"everyone was friendly\",0],[\"the staff provided the necessary care and attention\",0],[\"the staff is very friendly and caring\",0],[\"the staff is extremely friendly\",0],[\"the staff meet the needs of the situation\",0],[\"the staffs provide excellent service\",0],[\"doctors and staff are always empathetic\",0],[\"the staff is very approachable\",0],[\"the staffs are committed to their job\",0],[\"they are very helpful\",0],[\"the prices is so budget friendly\",0],[\"the staff and physicians are organized\",0],[\"the staff are so understanding\",0],[\"the staff is helpful with things\",0],[\"the staff is very dedicated\",0],[\"the staff is very sincere\",0],[\"the staffs are excellent\",0],[\"the staff is so consistent\",0],[\"exceptional service\",0],[\"the staff is so admirable\",0],[\"outstanding staffs\",0],[\"wonderful service\",0],[\"ang mga tauhan ay masigasig\",0],[\"the staffs are so enthusiastic\",0],[\"enthusiastic staffs\",0],[\"ang mga tauhan ay sabik mapagaling ang alaga mo\",0],[\"the staff is very organized\",0],[\"ang mga tauhan ay sumusunod sa tamang asal\",0],[\"great staffs\",0],[\"ang mga tauhan ay nagbibigay ng mga kasagutan\",0],[\"the service is fantastic\",0],[\"the doctors and staff are trustworthy\",0],[\"the staff and physicians are excellent\",0],[\"the staff is awesome\",0],[\"nice and caring staff\",0],[\"adequate service\",0],[\"ang mga tauhan ay nagbibigay ng tulong\",0],[\"ang tauhan ay palaging handang tumulong\",0],[\"ang serbisyo ay tumugon sa mga kinakailangan\",0],[\"ocvh was so understanding and helpful\",0],[\"the staff here take their time\",0],[\"outstanding service\",0],[\"napaka matapat ng mga tauhan\",0],[\"the staff is very dependable\",0],[\"ocvh was helpful they answered all my questions so respectful\",0],[\"the staff is really good\",0],[\"the staffs are trustworthy\",0],[\"extremely dedicated staffs\",0],[\"the staffs are dedicated on providing good service\",0],[\"marvelous service\",0],[\"doctors and staff are always very helpful and caring\",0],[\"the staffs are very gentle\",0],[\"service could be improved with quicker response times\",0],[\"gentle staffs\",0],[\"the staff addresses customer needs as they arise\",0],[\"the staff is very professional\",0],[\"the customer service is just okay\",0],[\"the staff and physicians are excellent\",0],[\"the service is outstanding\",0],[\"napakamatulungin at mabait ng doctor\",0],[\"very professional staff\",0],[\"the vet and office staff responds to your queries\",0],[\"the staff was friendly\",0],[\"the staff was competent\",0],[\"the staffs are welcoming and helpful\",0],[\"the staffs are very friendly and professional\",0],[\"prompt service\",0],[\"the staff is extremely sincere\",0],[\"the service is great\",0],[\"napakamatulungin at mabait ng mga tauhan\",0],[\"nice and caring staff\",0],[\"the staff is very professional and caring\",0],[\"the staff is very friendly\",0],[\"the staff is caring\",0],[\"the reception staff assisted with my needs\",0],[\"doctors and staff are always very helpful and welcoming\",0],[\"napakamatulungin ng mga tauhan\",0],[\"nice staff\",0],[\"their service is admirable\",0],[\"staff performed their duties\",0],[\"the staffs was so accommodating\",0],[\"the staff is very professional and accommodating\",0],[\"the staff is very attentive\",0],[\"the staff is very attentive to our needs\",0],[\"the service is superb\",0],[\"the staff is so respectful\",0],[\"the staff and physicians are excellent\",0],[\"the staff is extremely attentive\",0],[\"the service is impeccable\",0],[\"ang mga tauhan ay naibibigay ang kailangan mo nang tama\",0],[\"the service is awesome\",0],[\"the staff is very friendly\",0],[\"the staff is considerate\",0],[\"the staff is very compassionate\",0],[\"the facility are welcoming and helpful\",0],[\"their service is exemplary\",0],[\"the staff is awesome\",0],[\"extremely flawless service\",0],[\"the staff are exceptional\",0],[\"the staff is nice and speedy\",0],[\"appreciate the service provided\",0],[\"the staff and physicians are excellent and admirable\",0],[\"ang tauhan ay may paki alam sa iyong alaga\",0],[\"doctors and staff are always very supportive\",0],[\"the staffs are so friendly\",0],[\"i love how skilled the staffs are at providing care\",0],[\"they are very friendly\",0],[\"the staff is very compassionate\",0],[\"ang tauhan ay palaging handang magbigay tulong\",0],[\"the service is top tier\",0],[\"the service is the best out there\",0],[\"very professional staff\",0],[\"very considerate staffs\",0],[\"ang mga tauhan ay matulungin\",0],[\"the staff are excellent\",0],[\"the staff are caring\",0],[\"courteous staff\",0],[\"doctors and staff are always very helpful and caring\",0],[\"extremely skilled staff\",0],[\"doctors and staff are always very organized\",0],[\"prompt service and great staff\",0],[\"very trustworthy staffs\",0],[\"everyone was so friendly and trustworthy\",0],[\"and staff are always very warm and caring\",0],[\"ang serbisyo na natanggap ay naayon sa inaasahan\",0],[\"everyone was friendly\",0],[\"nice and welcoming staff\",0],[\"commendable staff\",0],[\"the staff is attentive and considerate to all our animals\",0],[\"ang mga tauhan ay talagang susuportahan ka sa iyong desisyon\",0],[\"very empathetic staff\",0],[\"their service is so consistent\",0],[\"courteous staff\",0],[\"doctors and staff are always kind hearted\",0],[\"the staffs are really kind hearted\",0],[\"ang tauhan ay handang gawin ang lahat mapasaya ka lamang\",0],[\"the staff is caring\",0],[\"the service is great\",0],[\"the staff are approachable and provide adequate care\",0],[\"from the doctors to the staff you receive proper care\",0],[\"the service is the best\",0],[\"the staffs are amazing in terms of customer service\",0],[\"the staffs are really hands on which made me happy\",0],[\"the staff are trustworthy\",0],[\"ang tauhan ay matapat\",0],[\"the staff are empathetic\",0],[\"the doctor is attentive\",0],[\"the staff is reputable\",0],[\"ang tauhan ay madaling lapitan\",0],[\"i am happy with the staff\",0],[\"the staff is welcoming and helpful\",0],[\"the staff and doctors are mindful\",0],[\"the staffs are mindful\",0],[\"the service is perfect\",0],[\"perfect service\",0],[\"ang tauhan ay talagang may pakialam sa iyong alaga\",0],[\"they provide perfect service\",0],[\"the staff and physicians are first class\",0],[\"the staffs provide well polished service\",0],[\"very accommodating staffs\",0],[\"very accommodating and considerate staff\",0],[\"very considerate and accommodating staff\",0],[\"the team takes care of your pet with attention and effort\",0],[\"the staff is accommodating and considerate\",0],[\"the staff is really skilled and professional\",0],[\"masaya ako sa binigay nilang serbisyo\",0],[\"their service is seamless\",0],[\"the service is seamless and perfect\",0],[\"the staff is approachable and accommodating\",0],[\"staff provided good service\",0],[\"the staff is sincere\",0],[\"the staff and physicians are perfect\",0],[\"the staff is meticulous\",0],[\"the service here is special\",0],[\"they provide a detailed oriented service\",0],[\"sasalubungin ka nang maayos ng mga tauhan\",0],[\"very diligent and cooperative staff\",0],[\"staff is very empathetic\",0],[\"very competent staff\",0],[\"salamat sa staff para sa kanilang serbisyo\",0],[\"very competent staffs\",0],[\"the staff was accommodating\",0],[\"the vets and staff were helpful\",0],[\"i love the results of the service provided\",0],[\"their staff is genius\",0],[\"very caring and reliable staff\",0],[\"i love how thoughtful the staffs are\",0],[\"their group is very consistent at provide good quality service\",0],[\"extremely good customer service\",0],[\"mula sa reception area hanggang sa mga tech at doktor mahusay ang serbisyo para sa aming aso at pusa\",0],[\"i love how affordable their services\",0],[\"the staffs are really flexible and detail oriented\",0],[\"the staff provides refined service\",0],[\"nakapasama ng ugali ng tauhan\",0],[\"extremely refined customer service\",0],[\"mahusay ang mga tauhan rito\",0],[\"the staff is very uplifting\",0],[\"everyone provides heartfelt service\",0],[\"the staff is very genuine\",0],[\"the service is remarkable\",0],[\"doctors and staff always provide remarkable care\",0],[\"ang mga tauhan ay nagbibigay ng mabisang serbisyo\",0],[\"the staff handled my pet very warm and tender\",0],[\"the service is terrific and the facility are welcoming and helpful\",0],[\"exemplary staff\",0],[\"the staff and physicians are really good\",0],[\"the staff is professional and attentive to my pets\",0],[\"very accommodating and professional staff\",0],[\"the service is terrific and the doctor is thoughtful\",0],[\"the service is heartwarming\",0],[\"the staff is very careful and tender at handling pets\",0],[\"everyone provided humane service\",0],[\"very friendly and accommodating\",0],[\"ang mga tauhan ay napaka husay\",0],[\"very committed staffs\",0],[\"the staff is so accommodating\",0],[\"the staff is polite and professional\",0],[\"the staffs are so supportive\",0],[\"supportive and proactive staff\",0],[\"tumawag ako at sila ay magalang\",0],[\"doctors and staff are always detail oriented\",0],[\"ocvh was understanding and they are helpful\",0],[\"professional staff\",0],[\"very friendly and accommodating professionals\",0],[\"lahat ay magalang at propesyonal sa kanilang trabaho\",0],[\"lahat ng staff ay magalang at mahusay sa kanilang trabaho\",0],[\"napakamatulungin at mabait na angkop sa bawat customer\",0],[\"napaka maaruga ng mga tauhan\",0],[\"napaka ayos ng serbisyong binibigay\",0],[\"the staff were kind and gentle with bugsy\",0],[\"everyone was helpful and worked well together as a team\",0],[\"very accommodating and committed staff\",0],[\"maayos at katanggap-tanggap ang serbisyo\",0],[\"good service\",0],[\"the service is magnificent\",0],[\"ang mga tauhan ay magiliw at maayos makitungo sa aking aso\",0],[\"doctors and staff are always gentle\",0],[\"doctors and staff are always very helpful and accommodating keep up the good work\",0],[\"they try to provide service\",0],[\"napakatalino at napakamabait ng mga tauhan\",0],[\"caring and reliable staff\",0],[\"the staff is kind\",0],[\"ang tauhan ay handang gawin ang lahat\",0],[\"the service is so reliable\",0],[\"the staff is approachable\",0],[\"napakaganda ng binibigay na serbisyo\",0],[\"nice and skillful staff\",0],[\"madaling lapitan ang tauhan\",0],[\"the staff and doctor were great with my dog keaton\",0],[\"great and accommodating staff\",0],[\"excellent and professional staff\",0],[\"unpleasant staff\",0],[\"the staff is very warm\",0],[\"very professional staff\",0],[\"the facility are accommodating and helpful\",0],[\"helpful and committed staff\",0],[\"the staff is commendable\",0],[\"the staff and physicians outstanding\",0],[\"extremely efficient service\",0],[\"the staff takes care of our 5 animals\",0],[\"napaka husay ng mga tauhan\",0],[\"the staff and physicians are very efficient\",0],[\"their services were speedy\",0],[\"the staff provided efficient service\",0],[\"the service is wonderful\",0],[\"the staff were nice and outstanding\",0],[\"the service was very efficient\",0],[\"the service was seamless and exceeded our expectations in every way\",0],[\"i am so grateful to the accommodating staff\",0],[\"the staff were very outstanding\",0],[\"the staff were extremely considerate of my pets\",0],[\"the staff provided the necessary assistance when needed\",0],[\"the staff is competent and provides the necessary service\",0],[\"the prices of their services were extremely affordable\",0],[\"the services available are really affordable\",0],[\"terrific service\",0],[\"ang tauhan ay napaka bait at laging handang tumulong sa mga pangangailangan ng kliyente\",0],[\"ang mga doktor ay propesyunal at magalang\",0],[\"the staff and the doctors are one of the best\",0],[\"the entire staff is confident to take any pet here\",0],[\"the service they provided was efficient\",0],[\"the clinic staff were very accommodating and meticulous\",0],[\"the clinic staff are accommodating and well equipped\",0],[\"the staff of this clinic was very thoughtful and accommodating\",0],[\"this clinics staff were exceptional\",0],[\"the staff were efficient and i am so grateful to them\",0],[\"the services offered here are exemplary\",0],[\"the staff and physicians are all exceptional\",0],[\"the staff is friendly and accommodating\",0],[\"all of their staff is skilled\",0],[\"they have such an accommodating staff\",0],[\"the staff is very accommodating and always willing to assist with any needs\",0],[\"i truly appreciate the helpful and accommodating staff\",0],[\"napakaganda ng mga serbisyong meron sa klinika na ito\",0],[\"the staff and physicians are skilled\",0],[\"ang beterinaryong ito ay puno ng magagaling na tauhan\",0],[\"the staff is very skillful\",0],[\"the service they provided was very efficient\",0],[\"ocvh provides efficient service\",0],[\"the service they provided is perfect\",0],[\"maganda ang serbisyo at mairerrekomenda ko sa aking lugar\",0],[\"they perfected every service provided\",0],[\"masungit ang mga tauhan\",0],[\"perpekto ang mga serbisyo nila\",0],[\"ako ay namangha sa kanilang kagalingan sa pagbibigay ng serbisyo\",0],[\"the staff of the clinic is all friendly and warm\",0],[\"they are all a capable staff\",0],[\"the staff are really understanding and listen well to your requests\",0],[\"napaka masayahin ng mga tauhan ng klinikang ito\",0],[\"napaka masayahin ng mga tauhan at laging nagbibigay ng magaan na pakiramdam sa mga alaga at kanilang may ari\",0],[\"doctors and staff are always very responsive\",0],[\"ipaparamdam sayo ng mga tauhan na may kasama ka\",0],[\"they provide outstanding services\",0],[\"the clinic staff is very friendly and responsive\",0],[\"the services provided are all fantastic\",0],[\"the service was exceptional and exceeded my expectations\",0],[\"they are all extremely skilled staff and i wouldnt think of my taking pets anywhere else\",0],[\"the staff is very thoughtful and accommodating\",0],[\"the staff and physicians are all affectionate towards your pets\",0],[\"the clinic staff is extremely diligent\",0],[\"the service provided was personalized which is amazing\",0],[\"the staff were friendly\",0],[\"the doctor and staff provided amazing service\",0],[\"the staff and physicians consistently provide great care\",0],[\"the service was okay\",0],[\"the services of this clinic are reasonably priced\",0],[\"their staff is pleasant and professional\",0],[\"the service is consistently great\",0],[\"their services are top tier\",0],[\"nangunguna sila sa pagbibigay ng pinakamagandang serbisyo\",0],[\"their team is number one when it comes to the quality of service\",0],[\"this clinic offers top tier services\",0],[\"their staff is attentive and approachable\",0],[\"the staff is very cheerful\",0],[\"the clinic staff are cheerful and friendly\",0],[\"the process of their services is one of the best\",0],[\"maalaga at mabait ang kanilang mga tauhan\",0],[\"napakamatulungin ng doktor\",0],[\"their staff is caring and cheerful\",0],[\"their staff is always sarcastic in answering my questions\",0],[\"the staff was cooperative and polite\",0],[\"ang tauhan ay palaging nagaalala para sa iyong alaga\",0],[\"the staff are cheerful and accommodating\",0],[\"cheerful and supportive staff\",0],[\"the service is consistently on top\",0],[\"i love how cheerful the staff is\",0],[\"nagustuhan ko ang serbisyo na binigay nila\",0],[\"nagpapasalamat sa mga tauhan sa kanilang suporta\",0],[\"the staff is very dependable\",0],[\"the staff is hardworking\",0],[\"extremely hardworking staff\",0],[\"ang mga tauhan ay may sapat na kaalaman\",0],[\"napaka sipag magalaga ng mga tauhan\",0],[\"the service is amazing since everyone was working hard\",0],[\"the staff is working hard and very helpful\",0],[\"resourceful staffs\",0],[\"the staffs are really resourceful\",0],[\"doctors and staff are resourceful\",0],[\"the staff is very resourceful\",0],[\"ang mga tauhan ay nagpakita ng pasensya\",0],[\"the service is really smooth\",0],[\"the staff and physicians are on top\",0],[\"doctors and staff are working hard to give the best service\",0],[\"napakamatulungin at bait ng staff rito talagang may malasakit sila sa kanilang kliyente\",0],[\"ang dami kong problema sa serbisyo nila\",0],[\"they care for you your pets and their staff wonderful work from them\",0],[\"everyone was very friendly and took their time in treating each animal\",0],[\"the doctors and staff are doing their jobs very well i recommmend them to all furparents\",0],[\"this clinic treated me and my babies amazingly everyone does their best from the staff to the doctors\",0],[\"you can tell that the staff are very dedicated to their work and providing quality animal healthcare\",0],[\"the doctor and staff are okay\",0],[\"so far they gave amazing results from their services and they were patient focused\",0],[\"the staff is approachable\",0],[\"maayos ang serbisyo\",0],[\"staff is very fast yet attentive and efficient\",0],[\"magiliw na mga tauhan\",0],[\"excellent friendly and very reliable staff\",0],[\"napakamatulungin at masipag ng lahat nagpapasalamat ako sa serbisyo\",0],[\"maayos na serbisyo\",0],[\"the staff and physicians are nice helpful and understanding\",0],[\"siya ay magalang at mahinahong sinagot ang lahat ng tanong ko\",0],[\"napakabait ng mga tauhan rito at masinop sa paggawa\",0],[\"budget friendly prices for their services\",0],[\"i am so grateful to the staff of this clinic they were professional and understanding\",0],[\"the service is dependable\",0],[\"extremely fast quick and efficient staff wouldnt think of taking my pets anywhere else\",0],[\"ang tauhan ay palaging mapag unawa at mapagmalasakit taospusong nakikiramay sa lahat ng ating mga hayop\",0],[\"ang mga doktor at nurse ay magalang at nakakatulong\",0],[\"napakagaling at mabait ang mga tauhan rito\",0],[\"they were very responsive and attentive to my concerns\",0],[\"the staff is pleasant and dedicated\",0],[\"they were kind and helpful\",0],[\"they really are attentive responsive to your concerns\",0],[\"the staff and doctors are very reliable and responsive to my pets needs\",0],[\"i appreaciate how empathetic and understanding the staff is\",0],[\"ang mga tauhan nila ay napakabait at laging handang tumulong\",0],[\"the staff is always respectful and makes you feel at ease during visits\",0],[\"i always feel welcomed and respected by their professional team of staff\",0],[\"magalang ang front office staff\",0],[\"the staff and physicians are so good at what they do they are very dedicated to their work\",0],[\"the staff are so gentle and compassionate truly amazing service\",0],[\"the staff was polite and professional\",0],[\"the staff is very welcoming and reliable\",0],[\"the staff is incredibly understanding and listens to every concern\",0],[\"ang mga staff ay magalang at propesyonal\",0],[\"ang mga tauhan at doktor rito ay napakagaling at maasikaso\",0],[\"the staffs gentle and compassionate nature makes a big difference during treatments\",0],[\"their dedicated service keeps me coming back\",0],[\"the staffs friendly attitude makes every visit a pleasure\",0],[\"kahit maraming pasyente sa klinika mabilis at dekalidad parin ang kanilang serbisyo\",0],[\"lahat ng tauhan rito ay mga propesyunal at magaling\",0],[\"their attentive and proactive nature reassured me during my pet\'s visit\",0],[\"they services are very patient focused\",0],[\"ang staff ay matulungin at magiliw\",0],[\"the staff here is so kind and has a genuine love for animals\",0],[\"they staff complains when they are given work\",0],[\"their process is very helpful in finding the best time for appointments\",0],[\"their dedication to providing the best service is evident in every visit\",0],[\"they explain every treatment in detail always attentive in whether we understood what they say\",0],[\"their skilled team ensures every treatment is done with precision\",0],[\"their prices are very budget friendly\",0],[\"the staff is very gentle and caring\",0],[\"caring and gentle staff\",0],[\"very gentle staff\",0],[\"very professional staff\",0],[\"the staff is so very helpful\",0],[\"extremely awesome staff\",0],[\"they have the very nice staff\",0],[\"everyone was really friendly and warm\",0],[\"excellent staff as they are prompt in answering question\",0],[\"very prompt staff\",0],[\"very courteous staff\",0],[\"bukal sa loob ng mga tauhan ang pag tulong\",0],[\"the staff is so passionate\",0],[\"doctors and staff are always respectful\",0],[\"helpful and warm loving staff\",0],[\"their staff loves my pet\",0],[\"loving and caring staff\",0],[\"the staff is loving yet professional\",0],[\"ang mga tauhan ay mahuhusay\",0],[\"ang mga tauhan ay napaka matulungin\",0],[\"professional and skilled staff\",0],[\"the staff and physicians are always willing to help\",0],[\"i am so grateful to the helpful staff\",0],[\"very helpful and willing staff\",0],[\"the staff and physicians are both awesome\",0],[\"the staff and physicians are always there to help you\",0],[\"the staff was proficient\",0],[\"proficient staff\",0],[\"maraming nalalaman ang kanilang mga tauhan\",0],[\"lahat ay magiliw at ang serbisyo ay laging maayos\",0],[\"the doctors and staff are always responsive\",0],[\"nice and supportive staff\",0],[\"their group is awesome as they have the best staff\",0],[\"their doctors and staff are the best\",0],[\"the staff is very dependable and helpful\",0],[\"nice and eager staff\",0],[\"excellent service since everyone is earger to help\",0],[\"the staff is very eager to help\",0],[\"extremely eager to help staffs\",0],[\"ocvh staffs are skilled\",0],[\"the staff is very professional and skilled\",0],[\"skillful and nice staff\",0],[\"i am so grateful to their skilled staff\",0],[\"thanks to the staff for their supportive care\",0],[\"extremely friendly doctor and staff\",0],[\"nice and supportive staffs\",0],[\"all staff members are kind\",0],[\"so friendly and warm staff\",0],[\"the staff and and physicians are so easy to talk to\",0],[\"extremely mindful staff\",0],[\"very friendly and mindful staff\",0],[\"magaling na doktor at matulungin na staff\",0],[\"i am so grateful to the mindful staff\",0],[\"laging inaalala ng mga tauhan ang iyong alaga\",0],[\"the staff and physicians are very mindful\",0],[\"the staff was mindful and professional\",0],[\"you are greeted by office staff\",0],[\"the staff and physicians are humane\",0],[\"magalang at propesyonal na staff\",0],[\"extremely humane staff\",0],[\"helpful and humane staff\",0],[\"ang tauhan ay napaka makatao\",0],[\"the staff is very humane\",0],[\"very proactive and diligent staff\",0],[\"the staff is very humane and warm\",0],[\"excellent staffs\",0],[\"ang mga tauhan ay nakakapanatag ng loob\",0],[\"great staff and excellent doctors\",0],[\"the staff was really reassuring\",0],[\"extremely communicative staff\",0],[\"ang mga tauhan ay matulungin\",0],[\"their service was excellent\",0],[\"everyone at ocvh was so understanding and helpful in answering all of my questions\",0],[\"ako ay kontento sa mga tauhan at mga doktor\",0],[\"ang kanilang tauhan ay laging malugod sa pagtanggap ng mga kliyente\",0],[\"everyone is very considerate and friendly with my pets\",0],[\"napakatamad ng mga tauhan\",0],[\"the staff is consistently helpful\",0],[\"napakamatulungin at mabait ng mga tao sa klinikang ito\",0],[\"i am very satisfied with the work of their staff and doctors\",0],[\"the doctors and staff are always very considerate and caring\",0],[\"their doctors and staff are always very considerate and respectful\",0],[\"they have extremely skilled staff and doctors i wouldnt think of taking my pets anywhere else\",0],[\"they are caring and attentive with all their patients\",0],[\"i was very impressed with the professionalism and efficiency of the staff\",0],[\"the clinic is always clean and welcoming and the staff is fantastic\",0],[\"the staff and doctors are extremely skilled and made my pet feel safe\",0],[\"the doctor was very attentive and made sure all my concerns were addressed\",0],[\"the care provided was outstanding and the staff is always friendly and caring\",0],[\"great team of professionals always ready to help and care for pets\",0],[\"friendly and helpful staff\",0],[\"the clinic offers excellent care and the staff is very responsive to needs\",0],[\"palaging maaasahan ang kanilang serbisyo\",0],[\"the staff is very compassionate and dedicated to providing the best care\",0],[\"i was very impressed by the level of care and attention to detail given by their staff and doctors\",0],[\"mabilis at tapat ang kanilang serbisyong inaalok\",0],[\"the staff could benefit from more focus as they were chatting behind the counter while i was waiting to be served\",0],[\"i am very satisfied with the level of service provided by the clinic\",0],[\"the clinic offers fantastic care with skilled staff and a welcoming environment\",0],[\"their team is extremely professional and truly cares for your pets\",0],[\"the doctor and staff are always attentive and ensure the best care for pets\",0],[\"the care at this clinic is outstanding and everyone is so helpful\",0],[\"excellent service from a professional team of doctors and staff\",0],[\"their staff is so kind and truly cares about the well being of animals\",0],[\"the clinic’s service is amazing and the staff makes you feel at ease\",0],[\"a caring and friendly office\",0],[\"the staff made sure to answer all my questions with respect and care\",0],[\"their team is very professional and makes sure to treat your pets well\",0],[\"their service is really great\",0],[\"i am grateful to the skilled and attentive staffs\",0],[\"friendly and very skilled staff\",0],[\"their staffs are very gentle and reassuring\",0],[\"very gentle and reassuring staffs\",0],[\"the doctors and support staff are competent\",0],[\"the staff is very detailed and kind\",0],[\"their staff is very dependable\",0],[\"the staff and physicians are accommodating and caring\",0],[\"their prices are so budget friendly\",0],[\"ang mga tauhan ay maayos at maingat sa pagbibigay ng pangangalaga\",0],[\"very skilled staffs\",0],[\"gentle doctors and staffs\",0],[\"satisfactory service\",0],[\"they provide a very efficient service\",0],[\"they provide a very reliable service\",0],[\"reliable staff\",0],[\"attentive doctor\",0],[\"friendly doctor\",0],[\"napaka maagap ng mga tauhan\",0],[\"very budget friendly prices\",0],[\"staff addresses requests in a timely manner\",0],[\"apatnapung taon na akong umaasa sa kanila dahil ang kanilang serbisyo\",0],[\"loving staffs\",0],[\"skilled staffs\",0],[\"attentive staffs\",0],[\"patient staff\",0],[\"very experienced staffs\",0],[\"the doctor is professional and attentive\",0],[\"ang mga tauhan ay may sapat na kaalaman\",0],[\"exceptional staffs\",0],[\"reassuring staffs\",0],[\"the staff are decent\",0],[\"the staff was very good\",0],[\"the staff is so skilled\",0],[\"ang mga tauhan ay talagang napaka sanay\",0],[\"the staff assist customers as needed\",0],[\"the staff is very courteous and kind\",0],[\"maayos ang serbisyo\",0],[\"the service is very satisfactory\",0],[\"the staff is very warm on our pets\",0],[\"excellent service as it is prompt\",0],[\"ang mga tauhan ay talagang maraming kaalaman\",0],[\"maayos ang serbisyo\",0],[\"very caring and efficient staff\",0],[\"excellent service was provided to us\",0],[\"helpful and very reliable doctors\",0],[\"napaka maasahan ang mga tauhan nila\",0],[\"very friendly doctors\",0],[\"the staff and doctor take good care with my dog\",0],[\"they are helpful and take the time to address our questions\",0],[\"very friendly and approachable doctor\",0],[\"doctors and staff are always very helpful to us\",0],[\"the doctors and staff are always kind\",0],[\"masasabi nating ang mga tauhan ay magagaling\",0],[\"their doctor is very attentive to what is happening\",0],[\"very attentive staffs\",0],[\"ang mga tauhan ay nagbibigay ng serbisyo\",0],[\"ang mga tauhan ay tumanggap ng customer\",0],[\"the staff are available to help customers\",0],[\"the staff provides care as necessary\",0],[\"the staff and physicians are very caring and welcoming\",0],[\"the staff performs their role\",0],[\"the staff is very compassionate and helpful\",0],[\"the doctor is very helpful and compassionate\",0],[\"the staff is very kind\",0],[\"the staff did a wonderful job\",0],[\"ang mga doktor at kawani ay may kaalaman\",0],[\"ang tauhan ay kahanga hanga\",0],[\"i love how caring the staffs\",0],[\"the staff answers your questions\",0],[\"i love the service here\",0],[\"the staff was very understanding\",0],[\"the staff are respectful\",0],[\"the service is terrific as they are organized\",0],[\"they are so friendly\",0],[\"the staff really loves animals\",0],[\"the staff are very proactive which i really like\",0],[\"maganda ang serbisyo dahil may malasakit ang tauhan\",0],[\"the staff is very responsive to my questions\",0],[\"the staff are extremely reliable\",0],[\"the staff respond to customer concerns\",0],[\"the staff show empathy\",0],[\"their service is excellent\",0],[\"their staffs are so friendly\",0],[\"the service is terrific and very competitive\",0],[\"the staff are very efficient\",0],[\"the doctor is so helpful\",0],[\"the staff are very welcoming\",0],[\"their service is really good\",0],[\"the staff are very patient focused\",0],[\"the staff is friendly\",0],[\"the staff is very prompt\",0],[\"the staff provides care\",0],[\"and staff are reputable\",0],[\"i love how they provide service to their client\",0],[\"may sapat na kaalaman ang mga tauhan\",0],[\"doctors and staff are always supportive\",0],[\"their staffs are talented\",0],[\"the staff is nice\",0],[\"very warm and welcoming staff\",0],[\"napaka mapagunawain ang mga tauhan\",0],[\"their staffs are so kind\",0],[\"the service is terrific as they are very welcoming\",0],[\"very competitive staffs\",0],[\"their services is really so affordable\",0],[\"their services is affordable\",0],[\"extremely affordable services\",0],[\"the cost of their services aligns with market standards\",0],[\"their services are priced reasonably\",0],[\"ang mga tauhan ay talagang subok na ng panahon\",0],[\"the staff provide support to customers\",0],[\"napakagaling mag alaga ng kanilang tauhan\",0],[\"napakaganda ng pagkakaayos ng kanilang tauhan sa aking alaga\",0],[\"the staff was good\",0]]', '[[\"the staff made me feel like a burden for asking too many questions which made me feel bad\",6],[\"so far so good as the service is top notch\",2],[\"the doctor is not friendly and does not care about my pet\",2],[\"i am so grateful to the professional and knowledgeable staff\",0],[\"helpful caring knowledgeable\",0],[\"the staff is very thorough\",0],[\"the staffs are knowledgeable\",0],[\"the staffs are greatly knowledgeable\",0],[\"hindi makatuwiran ng presyo ng serbisyo nila nakakadismaya\",0],[\"the staff is very thorough\",0],[\"i am so grateful to the knowledgeable staff\",0],[\"i am grateful to the professional and knowledgeable staff\",0],[\"the staff did not follow up after the procedure which is unprofessional\",0],[\"napaka maalagain ng mga tauhan dito\",0],[\"hindi propesyunal ang mga tauhan\",0],[\"the staffs are knowledgeable and compassionate\",0],[\"ang daming problema sa serbisyo pero ang mahal\",0],[\"napaka bait ng mga tauhan dito\",0],[\"the staffs are extremely innovative\",0],[\"ang staff ay bastos din\",0],[\"napaka ayos ng serbisyo dito\",0],[\"napaka propesyunal ng mga tauhan dito\",0],[\"doctors and staff are very aligned in terms of knowledge\",0],[\"the staff is inconsiderate\",0],[\"hindi mapagkakatiwalaan ang mga tauhan\",0],[\"the staff is very helpful and knowledgeable\",0],[\"prices are ridiculously high for some services\",0],[\"they are very helpful and knowledgeable\",0],[\"their fees for emergency services are outrageously high\",0],[\"the service is high level\",0],[\"the staff is knowledgeable\",0],[\"i did not like having to pay a premium for emergency service\",0],[\"the receptionist was dismissive and unhelpful when I asked questions\",0],[\"i would recommend this clinic since they are so budget friendly\",0],[\"the staff rushed during my consultation which made me disappointed\",0],[\"their service is high quality\",0],[\"the staffs are not knowledgeable\",0],[\"the staff was rude and did not seem to care about my concerns\",0],[\"hindi pala kaibigan ang mga tauhan\",0],[\"knowledgeable staff\",0],[\"they are inattentive\",0],[\"they have hidden fees that are not mentioned until after the service is done which is so unfair\",0],[\"the staff is knowledgeable and compassionate\",0],[\"the staff is greatly knowledgeable\",0],[\"the staff are so rude as no one apologized when they made me wait for over an hour\",0],[\"ang tauhan ay sobrang mahusay at propesyonal\",0],[\"the staffs are very friendly and knowledgeable\",0],[\"top notch staffs\",0],[\"the service is worst\",0],[\"worst customer service\",0],[\"the staff are negligent\",0],[\"very friendly and knowledgeable doctor\",0],[\"the staff is knowledgeable\",0],[\"the vet barely spent any time examining my pet and seemed in a hurry which felt rude\",0],[\"unreliable staff\",0],[\"staff the is very thorough\",0],[\"the staffs provide phenomenal service\",0],[\"the staff is unhelpful\",0],[\"sobrang magalang ang mga tauhan\",0],[\"parang hindi sanay sa pakikisalamuha ang ibang tauhan\",0],[\"hindi sulit ang presyo ng kanilang serbisyo\",0],[\"hindi marunong makitungo ang ibang tauhan\",0],[\"nakakatuwa dahil napakagaling ng mga tauhan dito\",0],[\"the knowledge of the staffs are first class\",0],[\"they knowledge of the staffs are competent\",0],[\"the cost of services here is higher compared to others\",0],[\"the staff provides top notch service\",0],[\"the staff and doctors provide top not service\",0],[\"ang mga tauhan ay nagbibigay ng pinakamataas na antas ng alaga\",0],[\"ang tauhan ay walang alam sa medisina\",0],[\"mas mataas ang presyo ng serbisyo kumpara sa iba\",0],[\"hindi maayos kausap ang mga tauhan sa loob\",0],[\"the staff did not explain the procedures clearly which is unacceptable\",0],[\"ang pangit ng serbisyo\",0],[\"their spaying and neutering services are overpriced compared to other clinics\",0],[\"the staff are highly trained\",0],[\"their group provides high quality service\",0],[\"ang mga tao ay magalang at dedikado sa kanilang trabaho\",0],[\"i am grateful to the highly trained staffs\",0],[\"hindi ko nagustuhan na kailangan magbayad para sa emergency na serbisyo\",0],[\"napaka taas ng presyo kahit wala namang special na serbisyo\",0],[\"helpful and knowledgeable doctors\",0],[\"the staff is very accommodating and the veterinarians are knowledgeable and compassionate\",0],[\"the staff failed to update me on my pets progress during a long procedure\",0],[\"hindi tugma ang presyo at serbisyo\",0],[\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",0],[\"the staff is very thoughtful and the veterinarians are thorough and compassionate\",0],[\"the service is the worst\",0],[\"the staff is very reliable and the veterinarians are knowledgeable and compassionate\",0],[\"very high quality service\",0],[\"the staff are impatient\",0],[\"sobrang mahal at bagal ng serbisyo nila\",0],[\"hindi sulit ang presyo sa kalidad ng serbisyo na binibigay nila\",0],[\"costs are very high for some services\",0],[\"sobrang mahal ng serbisyo\",0],[\"the staff was nice and thorough with their work\",0],[\"the doctors and staff were thoughtful throughout the whole visit\",0],[\"sobrang marespeto ng mga tauhan\",0],[\"sobrang maalaga ng mga tauhan\",0],[\"the staff lacked basic knowledge and could not answer my questions so unhelpful\",0],[\"the team here is highly skilled and knowledgeable\",0],[\"the services they provide are very expensive\",0],[\"nakakainis ang kabagalan ng kanilang mga tauhan sa pag aasikaso\",0],[\"ang mga tauhan ay mapagmahal sa iyong alaga\",0],[\"mararamdaman mong mahal din ng mga tauhan ang iyong alaga\",0],[\"the service was speedy and thorough\",0],[\"the clinic staff is diligent and thorough\",0],[\"everyone was very thorough in providing the service i wanted\",0],[\"dr danowitz consistently provides us with excellent service\",0],[\"i am so grateful to the cheerful and greatly knowledgeable staff\",0],[\"i have never seen a clinic charge this much for basic services so unacceptable\",0],[\"i acknowledge the support provided by the entire staff\",0],[\"bastos kausap ang mga tauhan\",0],[\"helpful caring and and knowledgeable\",0],[\"the staff is very hardworking and the veterinarians are knowledgeable and compassionate\",0],[\"the people here know what they are doing and are providing their clients with excellent service\",0],[\"ang presyo ng kanilang serbisyo ay medyo mataas\",0],[\"the doctors were very knowledgeable and knew right away how to treat my pets illness thankful for their service\",0],[\"their services are extremely expensive\",0],[\"walang malasakit ang tauhan\",0],[\"their services were very affordable yet of high quality\",0],[\"the staff is very helpful and are the knowledgeable and compassionate\",0],[\"i heard a staff in the back with bad behavior tell her to shut up\",0],[\"the staff is very thorough yet fast and efficient\",0],[\"the staff is very efficient and the veterinarians are skilled and thorough\",0],[\"nakakadismaya ang ugali ng mga tauhan\",0],[\"my dog is better now thanks to their reliable and compassionate service\",0],[\"i think the staff does not know their job is sensitive\",0],[\"walang pakikiramay ang tauhan\",0],[\"i am disappointed on the staff\",0],[\"i trust their knowledgeable team to provide the best care for my pet\",0],[\"its rare to find such fair fees for high quality veterinary services\",0],[\"the staff did not notify or update me about the current happening so unhelpful\",0],[\"they are not just helpful they are also incredibly empathetic\",0],[\"hindi ko nagustuhan na kailan magbayad para sa emergency na serbisyo\",0],[\"i love the demeanor of the staff\",0],[\"the clinic staff acted annoyed when I asked for clarification which is rude\",0],[\"i would highly recommend this because of their loving staffs\",0],[\"the staff handled my girl so roughly we are home now and she still hasnt stopped shaking\",0],[\"the staff is very proficient and the veterinarians are knowledgeable and compassionate\",0],[\"the service is really the best because everyone knows their job\",0],[\"excellent service since everyone knows what to do\",0],[\"very knowledge doctor and staff\",0],[\"napaka baba ng kalidad ng serbisyo pero sobrang mahal\",0],[\"the staff did not handle my pet gently which made the experience stressful\",0],[\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",0],[\"the staff lied about calling back\",0],[\"the clinic staff was highly communicative and kept me well informed\",0],[\"everyone in this clinic was very professional friendly and caring throughout my visit\",0],[\"their staff was very friendly caring and highly professional\",0],[\"the staff was unreliable\",0],[\"the staff were not empathetic when I expressed concerns about my pets health\",0],[\"hindi sulit sa bulsa ang mahal para sa binigay nilang serbisyo\",0],[\"i highly recommend this clinic as their staff is always nice caring very friendly and knowledgeable\",0],[\"everyone in this clinic works in a highly professional caring and attentive manner\",0],[\"the receptionist was on their phone instead of helping customers which is rude\",0],[\"i would recommend this clinic as they have highly knowledgeable and caring staff\",0],[\"everyone was very friendly and made sure that you and your pet were comfortable throughout the visit\",0],[\"their doctors were very helpful and knowledgeable\",0],[\"worst customer service i had ever received in my life\",0],[\"everyone was friendly and made me feel at ease throughout the visit\",0],[\"the staff are inconsiderate\",0],[\"the clinic staff is always welcoming and very helpful whenever i visit\",0],[\"the entire staff is friendly knowledgeable and genuinely loves animals\",0],[\"the doctors and staff were kind patient and very professional throughout my visit\",0],[\"wonderful staff who are knowledgeable and really care about their clients\",0],[\"i highly recommend this clinic the staff is very accommodating and skilled\",0],[\"everyone here is very friendly and they always go the extra mile\",0],[\"the staff did not sanitize the tools before using them on my pet and that is so unhygienic\",0],[\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",0],[\"the clinic staff seemed unorganized and lost my appointment booking\",0],[\"hindi ko nagustuhan ang customer service dahil nakakainis ang mga tauhan\",0],[\"hindi matulungin ang mga tauhan sa pag book\",0],[\"the staff are laughing and chatting loudly while ignoring customers which is rude\",0],[\"napaka mapagkakatiwalaan ang kanilang mga tauhan\",0],[\"very nice and knowledgeable staff\",0],[\"the staff is very thorough and knowledgeable\",0],[\"hindi propesyunal ang mga tauhan dito\",0],[\"extremely attentive and thorough staff\",0],[\"mukhang napilitan lang magtrabaho ang mga tauhan kaya nakakainis magpagamot dito\",0],[\"i did not like having to pay a premium for emergency service\",0],[\"the staff was very nice and knowledgeable\",0],[\"the staff is very thorough on their job\",0],[\"the staff was very knowledgeable and thorough\",0],[\"very helpful and knowledgeable people\",0],[\"parang walang alam ang mga tauhan kaya nakakabahala\",0],[\"napakapangit ng serbisyo\",0],[\"the staff is very knowledgeable\",0],[\"the staff are slow\",0],[\"the staffs are not friendly\",0],[\"the staff are unprofessional\",0],[\"hindi palabati ang mga tauhan\",0],[\"the staff has a rough behavior towards us\",0]]', '2025-01-10 00:00:07', '2025-01-10 00:00:07');
INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(4, 'Booking Experience', 0, 61.904761904761905, 38.095238095238095, 0, 52, 32, '[]', '[[\"we had a very sick chihuahua and they were fantastic with her saved her life basically\",2],[\"i called earlier in the day and meds were ready when i arrived to pick them up\",2],[\"their service is always timely despite how packed their schedules are\",2],[\"when I had to book I had to call them 34 times\",2],[\"napakahirap tumawag para mag book\",0],[\"napakahirap magbook\",0],[\"there is a timer for booking and the process needs to be restarted each time\",0],[\"the time slots are limited\",0],[\"i called and they answered as expected\",0],[\"canceling or rescheduling online requires several steps\",0],[\"there are delays that may impact customers schedule\",0],[\"ang mga nakaiskedyul na appointment ay sumusunod sa itinakdang oras\",0],[\"the process for making an appointment was clear\",0],[\"the people in the office were available to help\",0],[\"their booking system is the best\",0],[\"i have a speedy transaction on their booking system\",0],[\"their booking system is so polished\",0],[\"the visits typically require a few hundred dollars\",0],[\"appointments are generally available\",0],[\"the appointment scheduling was efficient\",0],[\"the booking system is trash\",0],[\"maayos ang aking karanasan mula sa unang tawag para sa impormasyon\",0],[\"appointments are available on the same day as the call\",0],[\"hindi naa access ang system para magbook kaya walang kwenta\",0],[\"the services available are really affordable\",0],[\"i recently moved to the area and chose this facility based on online information\",0],[\"i needed to call multiple times when booking\",0],[\"this clinic is full of skilled people\",0],[\"ang beterinaryong ito ay puno ng magagaling na tauhan\",0],[\"their booking system is amazing\",0],[\"their booking system is very intuitive and responsive\",0],[\"may ilang hamon sa pagtatakda ng iskedyul\",0],[\"the booking process needs improvement\",0],[\"they are always available when needed\",0],[\"the booking process is quick and responsive\",0],[\"scheduling an appointment is always quick and easy\",0],[\"i appreciate their short waiting time for getting appointments\",0],[\"their process is very helpful in finding the best time for appointments\",0],[\"they are always able to schedule an appointment for us\",0],[\"i wasnt informed that my booked appointment was approved\",0],[\"the clinic appears to be overbooking their schedule\",0],[\"we are often unable to book a schedule here\",0],[\"an okay experience from my first phone call for basic information\",0],[\"palaging available kapag kailangan sila\",0],[\"lagi kang makakakuha ng iskedyul\",0],[\"the website experienced issues while I was trying to book an appointment\",0],[\"the scheduled appointments are usually on time\",0],[\"I received a prompt appointment\",0],[\"the booking process lacks some features such as the ability to cancel appointment requests\",0],[\"the staff are available to help customers\",0],[\"the booking system lacks clear instructions\",0],[\"the booking systems user interface is complex\",0]]', '[[\"even if you book an appointment you are not prioritized\",2],[\"i was late to my job because the clinic didnt honor my appointment schedule\",2],[\"out of the many times we have gone here not once did we get to have our appointment on time\",2],[\"the loading time for the booking page was too long i ended up not booking\",2],[\"the booking process was too complicated which is frustrating\",0],[\"the process of getting an appointment is neither difficult nor easy\",0],[\"all my requests for an appointment are being ignored\",0],[\"laging puno ang schedule kaya hindi makabook\",0],[\"the online booking system was not working totally useless\",0],[\"it took to too long for them to approve my appointment request\",0],[\"the system is always malfunctioning so i was not able to book properly\",0],[\"the booking form is too long and asks for unnecessary details\",0],[\"i dont think the clinic checks their online booking system as they never respond to my requests\",0],[\"i couldnt book an appointment on my because the ui was not optimized\",0],[\"the clinic charges a premium so we can call it overpriced\",0],[\"no one picked up the phone when I called multiple times for assistance which is unacceptable\",0],[\"the transaction through their booking system was very smooth and fast\",0],[\"its frustrating that i cant book multiple pets in one appointment\",0],[\"i dont understand why it takes so long for them to finish an appointment\",0],[\"the appointments here are very timely and swift no long waiting time\",0],[\"i had no trouble booking an appointment everything was timely\",0],[\"we waited longer than the scheduled time\",0],[\"the booking system is unreliable\",0],[\"this booking system is inconvenient as there is not enough functions which is disappointing\",0],[\"the staff lied about calling back\",0],[\"the receptionist was on their phone instead of helping customers which is rude\",0],[\"the clinic staff seemed unorganized and lost my appointment booking\",0],[\"you have to wait for a long time despite having a schedule\",0],[\"the system does not allow modifications to an appointment after it has been scheduled\",0],[\"i couldnt leave a note during the booking process which is not good\",0],[\"our appointment got delayed and we had to wait forever which is ridiculous\",0],[\"the booking system crashed midway through\",0]]', '2025-01-10 00:00:07', '2025-01-10 00:00:07'),
(5, 'Vet Care', 6.159895150720838, 73.78768020969856, 20.0524246395806, 47, 563, 153, '[[\"everyone was friendly caring and very professional they answered all my questions and good took care of my two kittens\",2],[\"everyone was very friendly caring and professional they answered all my questions and and took good care of my two kittens\",2],[\"dr danowitz is an excellent excellent veterinarian he is knowledgeable caring\",2],[\"doctors and staff staff are always very helpful and caring keep up the good work\",2],[\"everyone was skilled compassionate and very professional they answered all my questions and took care of my two kittens\",2],[\"everyone was understanding helpful and compassionate they answered all my questions and took good care of my two kittens\",2],[\"everyone was attentive responsive and knowledgeable they answered all my questions and took good care of my kittens\",2],[\"everyone was friendly caring and very professional answered all my questions and took good care of my two kittens\",2],[\"everyone was understanding and knowledgeable they answered all my questions and took good of care my two kittens\",2],[\"doctors and staff are always very gentle and caring keep keep up the good work\",2],[\"everyone was friendly caring and very professional they answered all my questions and took good care of my two kittens\",2],[\"the staff and physicians excellent very caring and professional\",0],[\"the doctor is great since he is caring and compassionate\",0],[\"the staff and physicians are excellent as they are very a caring professional\",0],[\"the doctors are excellent very caring professional\",0],[\"i am so greatful to the nice staff and proactive doctors\",0],[\"the doctor is an excellent veterinarian he is knowledgeable and caring\",0],[\"the staff is very helpful and the veterinarians are knowledgeable and compassionate\",0],[\"the staff is very helpful and the veterinarians knowledgeable and compassionate\",0],[\"the doctor is the greatest caring and compassionate\",0],[\"the staff is very helpful the and veterinarians are efficient and compassionate\",0],[\"dr danowitz is an amazing veterinarian he is knowledgeable and caring\",0],[\"the staff and physicians are amazing as they are very caring and professional\",0],[\"the staff is very helpful and the veterinarians are knowledgeable and compassionate\",0],[\"the doctor is the greatest they are caring and compassionate\",0],[\"doctors and staff are always very helpful and caring keep up the good work\",0],[\"dr danowitz is an excellent veterinarian he is dedicated and attentive\",0],[\"the staff and physicians are excellent very caring and and professional\",0],[\"doctors and staff are always very helpful and caring keep up the the good work\",0],[\"dr danowitz is an excellent veterinarian he is attentive and compassionate\",0],[\"the staff is very supportive and the veterinarians are gentle and compassionate\",0],[\"the doctor was understanding attentive and empathetic\",0],[\"the staff are very responsive and quick to act and the veterinarians are skilled and knowledgeable\",0],[\"filled with reputable skilled and knowledgeable doctors\",0],[\"their work is commendable everyone was skilled and the doctor was very dedicated\",0],[\"dr danowitz is an excellent veterinarian he is dedicated and respectful\",0],[\"i can see why they are held as a reputable clinic all the doctors are skilled and trustworthy\",0],[\"i am so grateful to the professional and greatly skilled veterinarians\",0],[\"the staff and physicians are excellent very dedicated and skilled\",0],[\"everyone at the clinic especially their doctor is very professional friendly and caring\",0],[\"their doctors were very friendly caring and knowledgeable\",0],[\"the staff and physicians of this clinic are excellent very caring and professional\",0],[\"their physicians are excellent very caring and professional\",0],[\"their staff is very helpful and the veterinarians are knowledgeable and compassionate\",0],[\"the doctor that served my pet was very friendly caring knowledgeable\",0],[\"lahat ay palakaibigan matulungin mahusay maalaga maalam at propesyonal\",0],[\"this clinic has very caring friendly and knowledgeable staff and doctors\",0]]', '[[\"my cats been better compared to my other vet of 4 years\",2],[\"ako ay masaya dahil pinakinggan ako ng doktor\",2],[\"everyone answered all my questions and took good care of my two kittens\",2],[\"they answered all my questions and take good care of my two kittens\",2],[\"tumawag ako kanina at ang mga gamot ay handa na nang dumating ako upang kunin ang mga ito\",2],[\"the doctor is far ahead of any other doctor i have seen\",2],[\"the staff at the front was very courteous and the doctor was very skilled amazing facility\",2],[\"the doctor was very attentive to details and his explanations were very prompt so it was easy to understand\",2],[\"they were so gentle with handling my easily frightened dog the doctors and staff are so professional\",2],[\"i was content with the treatment i received\",2],[\"everyone was so cooperative and considerate in answering all my questions and took good care of my two kittens\",2],[\"their doctors did their very best\",2],[\"staff provided loving care which is heartwarming\",0],[\"ang tauhan ay palaging taospusong nakikiramay sa iyong alaga\",0],[\"may mga nakatalagang presyo sa mga gamot\",0],[\"the doctor is the best\",0],[\"the doctor is very reliable\",0],[\"the vets are so kind and caring\",0],[\"ang mga doktor ay napakapropesyunal\",0],[\"the doctor is so sincere\",0],[\"may mga nakalistang presyo sa mga gamot\",0],[\"the doctor is an excellent veterinarian\",0],[\"friendly staff that truly cares about my dog\",0],[\"the level of information and care is fantastic\",0],[\"ang doktor ay mahabagin at pinanatag niya ang aming loob\",0],[\"napakamatulungin ng mga doktor\",0],[\"doctor is the very caring and compassionate\",0],[\"all of the staff took great care of our puppy\",0],[\"i love how caring the doctor is\",0],[\"the doctor is very understanding\",0],[\"i love how everyone took good care of my two kittens\",0],[\"the doctors are really great\",0],[\"the doctors are very professional\",0],[\"the doctors and staffs are really awesome\",0],[\"the doctors are very dedicated\",0],[\"nagbibigay ng pangangalaga ang kanilang mga doktor\",0],[\"the doctor is very friendly\",0],[\"mula sa mga doktor hanggang sa mga tauhan nakakatanggap ka ng pangangalaga\",0],[\"the staff provide care for my pet\",0],[\"doctors and staff are very helpful\",0],[\"nagbigay ng serbisyo ang staff at doktor\",0],[\"ocvh provides care for pets\",0],[\"the doctor is really dependable\",0],[\"the doctor is very meticulous which is really good\",0],[\"the doctor is extremely sincere\",0],[\"the doctor is so respectful\",0],[\"the doctor is very skilled\",0],[\"the doctor is extremely compassionate\",0],[\"ang tauhan ay talagang may malasakit\",0],[\"the doctors are very helpful\",0],[\"the doctors are very dependable\",0],[\"ang tauhan ay talagang maasahan\",0],[\"the doctor is very considerate\",0],[\"the doctor is very confident\",0],[\"the doctor is very detailed when explaining\",0],[\"ang doktor ay may sapat na kakayahan\",0],[\"the doctor is an excellent veterinarian\",0],[\"dr danowitz ay isang beterinaryo na may sapat na kaalaman\",0],[\"the doctor is really great\",0],[\"ang staff ang nangangalaga sa iyong alaga\",0],[\"the doctor is really passionate\",0],[\"the doctor is really dependable\",0],[\"the doctor in this clinic is talented\",0],[\"doctors and staff are always very helpful\",0],[\"the doctor is so professional\",0],[\"the doctor is really dependable\",0],[\"the doctor is very adept on his field\",0],[\"the doctor is caring and compassionate\",0],[\"the doctors and staff are very caring\",0],[\"the doctors and staff are very organized\",0],[\"the doctors and staff are always caring\",0],[\"the staffs and doctors are excellent\",0],[\"ang doktor ay nagbibigay ng nararapat na atensyon\",0],[\"ang mga tauhan ay talagang masipag\",0],[\"doctors and staff are very skillful\",0],[\"naalagaan ang aking mga ibon\",0],[\"the doctor is excellent\",0],[\"olivers surgeries were explained and he received care during the procedures\",0],[\"lahat ay tumulong at inalagaan si Chloe\",0],[\"inalagaan ng staff ang aking alaga\",0],[\"the doctors and staff provided care for my two pets\",0],[\"the doctor is the greatest man\",0],[\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",0],[\"ang mga tauhan ay tunay na nagmamalasakit sa alaga mo\",0],[\"the doctor very caring and professional\",0],[\"the doctor greatly helped us\",0],[\"the doctor is very perceptive\",0],[\"the doctor is really passionate\",0],[\"the prices are on par with all other vets\",0],[\"doctors and staff are accountable\",0],[\"staff in lakewood and toms river care for both my dogs\",0],[\"the doctor embraces challenges which is a good thing\",0],[\"ipinaliwanag ng doktor sa akin ang lahat ng gastos bago gumawa ng anuman\",0],[\"veterinarians was educated in all creatures\",0],[\"the doctor is careless\",0],[\"ang mga tauhan ay talagang mapag aruga\",0],[\"the doctor really took great care of my 2 kittens\",0],[\"everyone took care of my chloe\",0],[\"ang staff at doktor ay nagbigay ng pangangalaga sa aking aso na si Keaton\",0],[\"doctor is genuine\",0],[\"the doctor knew right away and prescribed something\",0],[\"the doctors provide care for all animals\",0],[\"the doctors provided support\",0],[\"ang aking alaga ay nabigyan ng atensyon\",0],[\"the ocean county veterinarian clinic addresses your animals health needs\",0],[\"doctors and staff are enthusiastic\",0],[\"ang serbisyong natanggap ng aking alaga ay naaayon sa inaasahan\",0],[\"the doctor is very goal oriented\",0],[\"the doctor caring and compassionate\",0],[\"the staff and the doctors are able to prioritize\",0],[\"marunong magpahalaga ang mga tauhan\",0],[\"dr briggs provided care for my dog maya\",0],[\"the staff and physicians are very caring and professional\",0],[\"the doctor provides the necessary care\",0],[\"the staff and the doctors are excellent\",0],[\"great doctors\",0],[\"i am so grateful to the professional doctors\",0],[\"ang tauhan ay talagang matulungin\",0],[\"ang tauhan ay talagang marespeto\",0],[\"the doctor provided care for my pet\",0],[\"sila ay nag aalaga ayon sa pangangailangan ng bawat isa\",0],[\"they provided the needed care\",0],[\"ang mga doktor at staff ay nagbibigay ng kinakailangang pangangalaga\",0],[\"the doctor is compassionate\",0],[\"the doctors provided information\",0],[\"doctors and staff are caring\",0],[\"the doctor took her time to answer all my questions\",0],[\"the doctor is really articulate\",0],[\"the staff provided the necessary care and attention\",0],[\"the doctor explains everything so well\",0],[\"the doctors provided care for our pet as expected\",0],[\"the doctor is caring\",0],[\"doctors and staff are always empathetic\",0],[\"doctors and nurses provided the needed assistance\",0],[\"the doctor is really resourceful\",0],[\"the staff and physicians are organized\",0],[\"the doctor really analayzes things so well\",0],[\"the doctor is skilled\",0],[\"ang doktor ay nagbibigay ng mga kasagutan sa mga tanong\",0],[\"ginagamot nila ang iyong alaga\",0],[\"the doctor is very nice to my pet\",0],[\"the doctor is exceptional\",0],[\"i am happy with the doctor\",0],[\"ang mga tauhan ay sabik mapagaling ang alaga mo\",0],[\"the doctors and staff are trustworthy\",0],[\"the staff and physicians are excellent\",0],[\"the doctor is caring and professional\",0],[\"ang doktor ay nagbibigay ng sapat ng alaga\",0],[\"extremely kind doctors\",0],[\"ang doktor ay nagpapakita ng tamang asal\",0],[\"ang beterinaryo ay inalagaan ang aking alaga\",0],[\"the doctor is outstanding\",0],[\"i am happy with the provided care\",0],[\"the doctor makes decisions for my dogd\",0],[\"the doctor is very trustworthy\",0],[\"ang mga doktor ay nagsasagawa ng kanilang mga tungkulin\",0],[\"the vets listen\",0],[\"doctors and staff are always very helpful and caring\",0],[\"the doctor is so gentle\",0],[\"doctor is very great\",0],[\"the staff and physicians are excellent\",0],[\"the vet and office staff responds to your queries\",0],[\"the doctor is an excellent veterinarian\",0],[\"the doctor truly cares\",0],[\"the doctor is really commendable\",0],[\"the doctor addresses concerns appropriately\",0],[\"the doctor is the greatest\",0],[\"sila ay tumawag pagkatapos ng ilang araw para magtanong sa kalagayan ng aking alaga\",0],[\"doctors and staff are always very helpful and welcoming\",0],[\"they have provided good care for my pets\",0],[\"the staff and physicians are excellent\",0],[\"the doctor handled my two guinea pigs\",0],[\"the prices aligned with the treatment provided\",0],[\"the doctor is compassionate\",0],[\"ang doktor ay may sapat na kaalaman\",0],[\"the doctor is proficient\",0],[\"the staff and physicians are excellent and admirable\",0],[\"napaka galing ng mga doktor\",0],[\"the doctor is an outstanding vet\",0],[\"the doctor is exemplary\",0],[\"ang tauhan ay may paki alam sa iyong alaga\",0],[\"the doctor is so gentle and professional\",0],[\"adequate care was provided for my golden\",0],[\"doctors and staff are always very supportive\",0],[\"the doctor provides care for my dog\",0],[\"the doctor is perfect\",0],[\"tinitingnan nila ang iyong alaga\",0],[\"i have been bringing my pets here and the doctors provide care\",0],[\"i love how skilled the staffs are at providing care\",0],[\"the doctor are so skilled\",0],[\"the doctor is so skilled i admire him\",0],[\"ang doktor ay may kasanayan sa pag-aalaga ng mga hayop\",0],[\"ang pag aalaga na natanggap ko ay ayon sa inaasahan\",0],[\"the doctor is caring and compassionate\",0],[\"inalagaan nila ang aking mga kuneho\",0],[\"the physicians are very caring\",0],[\"doctors and staff are always very helpful and caring\",0],[\"delikado sila pahawakin ng alaga\",0],[\"masasabi kong sila ang pinaka magaling na doktor sa lahat\",0],[\"doctors and staff are always very organized\",0],[\"nailigtas nila ang buhay ng ilan sa aking mga alagang hayop\",0],[\"ang mga tauhan ay talagang susuportahan ka sa iyong desisyon\",0],[\"the prices are comparable to other vet\",0],[\"doctors and staff are always kind hearted\",0],[\"ang doktor ay magaling sa pagaalaga at maunawain\",0],[\"the staff are approachable and provide adequate care\",0],[\"from the doctors to the staff you receive proper care\",0],[\"they provided care for my lovebird\",0],[\"the doctors provide amazing care\",0],[\"the doctor provided care\",0],[\"gagamitin ko sila bilang aking regular na beterinaryo\",0],[\"the doctor is gentle\",0],[\"the doctor is supportive\",0],[\"the doctor is patient focused\",0],[\"the doctor is attentive\",0],[\"the doctor is polite and patient with us\",0],[\"ang kanilang pag aalaga ay maayos\",0],[\"we trust the doctors abilities\",0],[\"the doctor is superior in terms of providing great care\",0],[\"the staff and doctors are mindful\",0],[\"the doctor is mindful\",0],[\"ang pusa ko ay nagkaroon ng magandang resulta sa kanila kumpara sa ibang beterinaryo\",0],[\"they provide heartfelt care\",0],[\"ang tauhan ay talagang may pakialam sa iyong alaga\",0],[\"mukhang bago pa lamang ang doktor\",0],[\"the staff and physicians are first class\",0],[\"pinabayaan ng doktor ang aking alaga\",0],[\"the doctor is really admirable\",0],[\"the team takes care of your pet with attention and effort\",0],[\"doctors are first class\",0],[\"the staff and physicians are perfect\",0],[\"the provided care is specialized\",0],[\"the doctor is very diligent\",0],[\"ang doktor ay nagbibigay ng napakagandang payo kung paano ang dapat gawin\",0],[\"the doctor is very competent\",0],[\"the vets and staff were helpful\",0],[\"the vet is such an unpleasant person\",0],[\"the doctor is literally a genius\",0],[\"mula sa reception area hanggang sa mga tech at doktor mahusay ang serbisyo para sa aming aso at pusa\",0],[\"ang doktor ay may kaalaman at magaling sa paggawa ng mga desisyon para sa aking aso\",0],[\"the doctor is so cooperative\",0],[\"the doctors are a competent group who care for animals\",0],[\"the doctor is so respectful\",0],[\"the doctor handled my anxious dog well\",0],[\"the doctors are skilled and professiona\",0],[\"their group really provides specialized care\",0],[\"she treated him with care and professionalism\",0],[\"the doctor provides necessary care\",0],[\"doctors and staff always provide remarkable care\",0],[\"the staff and physicians are really good\",0],[\"the service is terrific and the doctor is thoughtful\",0],[\"everyone was really careful\",0],[\"the vet is skilled\",0],[\"the staff is very careful and tender at handling pets\",0],[\"ang mga doktor ay may kaalaman sa kanilang trabaho\",0],[\"doctors and staff are always detail oriented\",0],[\"the doctor is accommodating and compassionate\",0],[\"good care\",0],[\"very caring and professional doctor\",0],[\"everyone took great care of my two kittens\",0],[\"very accountable doctor\",0],[\"very considerate doctor\",0],[\"maalaga sila sa kalusugan ng iyong mga alagang hayop\",0],[\"doctors and staff are always gentle\",0],[\"doctors and staff are always very helpful and accommodating keep up the good work\",0],[\"naagapan agad ang aking alaga\",0],[\"they seem to care about the animals\",0],[\"the staff and doctor were great with my dog keaton\",0],[\"the doctor is skillful\",0],[\"the doctor is involved and observant\",0],[\"the doctor are excellent and professional\",0],[\"the doctor handled our cat mitten in a calm manner\",0],[\"they provide the best care\",0],[\"the staff and physicians outstanding\",0],[\"the staff takes care of our 5 animals\",0],[\"the doctor discusses our dogs needs\",0],[\"doktor na may sapat na kaalaman\",0],[\"the staff and physicians are very efficient\",0],[\"the doctor provided the care needed\",0],[\"everyone at ocean county veterinary hospital provided the care needed for my bunnies\",0],[\"i love how meticulous the doctor was when treating my pet\",0],[\"ang doktor ay tunay na nagmamalasakit sa iyong alaga\",0],[\"the doctor was one of the best doctors i have met\",0],[\"the care provided in this clinic was excellent\",0],[\"ang mga doktor ay may kaalaman at nagbibigay ng mga impormasyon na kailangan\",0],[\"ang mga doktor ay propesyunal at magalang\",0],[\"the people of this clinic were competent at providing care\",0],[\"the doctor present was very competent\",0],[\"the doctor is incomparable to others\",0],[\"the staff and the doctors are one of the best\",0],[\"the doctor did his job excellently\",0],[\"nilaro ng doktor ang aso ko hanggang sa maging komportable siya\",0],[\"the doctors here are some of the best\",0],[\"the staff and physicians are all exceptional\",0],[\"the veterinarians were good\",0],[\"the staff and physicians are skilled\",0],[\"ang beterinaryong ito ay puno ng magagaling na tauhan\",0],[\"they are very skilled in terms of pet care\",0],[\"sila ay talagang napakagaling sa larangan ng pagaalaga\",0],[\"napaka husay at talino ng doktor\",0],[\"napaka masayahin ng mga tauhan at laging nagbibigay ng magaan na pakiramdam sa mga alaga at kanilang may ari\",0],[\"they provide the necessary care\",0],[\"doctors and staff are always very responsive\",0],[\"napaka palakaibigan ng doktor sa alaga mo\",0],[\"meron silang grupo ng mga doktor na may kasanayan at handang tumulong\",0],[\"the doctor makes you feel uncomfortable due to their behavior\",0],[\"the staff and physicians are all affectionate towards your pets\",0],[\"the doctor and staff provided amazing service\",0],[\"the staff and physicians consistently provide great care\",0],[\"the doctor was polite and answered all my questions\",0],[\"ang doktor ay maalam at nakatulong sa pag aalaga ng limang pusa ko\",0],[\"tinitingnan nila nang maigi ang kapakanan at kalusugan ng aming alaga\",0],[\"maalaga at mabait ang kanilang mga tauhan\",0],[\"napakamatulungin ng doktor\",0],[\"ang tauhan ay palaging nagaalala para sa iyong alaga\",0],[\"the doctor is also very cheerful\",0],[\"ang kalidad ng pag aalaga ay maayos\",0],[\"the doctor is a dependable veterinarian\",0],[\"the doctor is dependable and supportive\",0],[\"napaka maasahan ang kanilang doktor\",0],[\"napaka sipag magalaga ng mga tauhan\",0],[\"doctors and staff are resourceful\",0],[\"the staff and physicians are on top\",0],[\"doctors and staff are working hard to give the best service\",0],[\"napakamatulungin at bait ng staff rito talagang may malasakit sila sa kanilang kliyente\",0],[\"they care for you your pets and their staff wonderful work from them\",0],[\"the doctors and staff are doing their jobs very well i recommmend them to all furparents\",0],[\"this clinic treated me and my babies amazingly everyone does their best from the staff to the doctors\",0],[\"you can tell that the staff are very dedicated to their work and providing quality animal healthcare\",0],[\"they catered us in a timely and professional manner the doctors were very skilled and were thorough in the assessment \",0],[\"they provide care for them\",0],[\"gumaling nang maayos ang aking alaga\",0],[\"the doctor and staff are okay\",0],[\"tinatrato ng doktor nang maayos ang alaga ko\",0],[\"the staff and physicians are nice helpful and understanding\",0],[\"the doctors have a proactive approach to treating their patients which is impressive\",0],[\"ang mga doktor at nurse ay magalang at nakakatulong\",0],[\"the doctor was the greatest weve ever consulted with\",0],[\"the vets here are caring and professional\",0],[\"tama lang ang kaalaman ng doktor\",0],[\"the staff and doctors are very reliable and responsive to my pets needs\",0],[\"nagkaroon ako ng karanasan sa beterinaryong ito\",0],[\"the doctors were caring and easy to talk to\",0],[\"the doctors are very professional and always dedicated to pet wellness\",0],[\"the staff and physicians are so good at what they do they are very dedicated to their work\",0],[\"naramdaman ko na makakatanggap si justice ng maayos na pangangalaga\",0],[\"ang mga tauhan at doktor rito ay napakagaling at maasikaso\",0],[\"their vets passionate approach to treatment is truly commendable\",0],[\"humahanga ako sa mga doktor rito sapagkat napakagaling at husay nila\",0],[\"the staffs gentle and compassionate nature makes a big difference during treatments\",0],[\"my pet feels the safest in with the doctors here shows how skilled they are\",0],[\"tapat at propesyunal ang doktor\",0],[\"the doctors skilled hands made the procedure so smooth for my pet\",0],[\"the treatment plan was well explained and affordable\",0],[\"ang mga doktor at support staff ay mahusay\",0],[\"maalaga na beterinaryo\",0],[\"masinop sila sa paggamot sa aming mga alaga\",0],[\"the doctor was kind and explained everything to me\",0],[\"may malasakit sa kalusugan ng alaga ang mga doktor rito\",0],[\"they explain every treatment in detail always attentive in whether we understood what they say\",0],[\"their skilled team ensures every treatment is done with precision\",0],[\"ang staff ay epektibo at si megan ay mahusay sa pag-aalaga kay momma\",0],[\"the vet was good\",0],[\"i really respect the doctor\",0],[\"very prompt doctor\",0],[\"doctors and staff are always respectful\",0],[\"ang doktor ay matiyaga sa aking alagang pagong\",0],[\"salamat ocean county veterinary hospital\",0],[\"doctors is really willing to help\",0],[\"the staff and physicians are always willing to help\",0],[\"the doctor is willing to help\",0],[\"ang kanilang grupo ay mahusay sa pag-aalaga at may magandang kaalaman\",0],[\"the staff and physicians are both awesome\",0],[\"the staff and physicians are always there to help you\",0],[\"the doctor treated my kittens with care\",0],[\"ang antas ng impormasyon at pangangalaga ay mahusay\",0],[\"their doctors are so proficient\",0],[\"ang aking alaga ay gumaling nang mabilis\",0],[\"the doctors and staff are always responsive\",0],[\"the doctor is great and understanding\",0],[\"their doctors and staff are the best\",0],[\"i am happy with their care\",0],[\"thanks to the staff for their supportive care\",0],[\"extremely friendly doctor and staff\",0],[\"napaka dali lapitan ng mga doktor\",0],[\"nakakatuwa na napakadaling kausapin ng doktor\",0],[\"the doctor is arrogant\",0],[\"the staff and and physicians are so easy to talk to\",0],[\"magaling na doktor at matulungin na staff\",0],[\"the doctor the is really mindful\",0],[\"they took good care of my puppy\",0],[\"the doctor the is caring and compassionate\",0],[\"laging inaalala ng mga tauhan ang iyong alaga\",0],[\"the staff and physicians are very mindful\",0],[\"i am so grateful for the reassuring doctor\",0],[\"nakakabahala ang kaalaman ng doktor\",0],[\"the doctor is really humane\",0],[\"the staff and physicians are humane\",0],[\"ang mga doktor ay nagbibigay ng impormasyon at maingat na pangangalaga anuman ang yugto ng buhay ng hayop\",0],[\"extremely resourceful doctors\",0],[\"excellent doctor\",0],[\"the physicians are excellent\",0],[\"great staff and excellent doctors\",0],[\"their doctor showed great care and compassion\",0],[\"professional at maaalaga\",0],[\"mabait at matiyaga ang doktor\",0],[\"ako ay kontento sa mga tauhan at mga doktor\",0],[\"nala and I had a good experience at your veterinary hospital\",0],[\"i have always been content with the doctors\",0],[\"the doctor seems uninterested about my pets health\",0],[\"ako ay kontento sa pagaalaga ng doktor sa aking ibon\",0],[\"ako ay laging kontento sa mga doktor\",0],[\"i am very satisfied with the work of their staff and doctors\",0],[\"the doctors and staff are always very considerate and caring\",0],[\"mahusay na pag aalaga at pagmamalasakit para sa aking golden\",0],[\"i feel like the doctors dont even try harder to heal my pet\",0],[\"my dog is comfortable with your care\",0],[\"their doctors and staff are always very considerate and respectful\",0],[\"napakapropesyunal at maalam ng kanilang mga doktor sa klinikang ito\",0],[\"they have extremely skilled staff and doctors i wouldnt think of taking my pets anywhere else\",0],[\"their doctors worked very efficiently and with precision\",0],[\"the clinic provides exceptional care for pets with a warm environment\",0],[\"the staff and doctors are extremely skilled and made my pet feel safe\",0],[\"maayos na pagaalaga\",0],[\"the doctor was very attentive and made sure all my concerns were addressed\",0],[\"the care provided was outstanding and the staff is always friendly and caring\",0],[\"the vet is professional and answers questions clearly and directly\",0],[\"great team of professionals always ready to help and care for pets\",0],[\"the clinic offers excellent care and the staff is very responsive to needs\",0],[\"the staff is very compassionate and dedicated to providing the best care\",0],[\"the doctor took great care in explaining my pets treatment options\",0],[\"i was very impressed by the level of care and attention to detail given by their staff and doctors\",0],[\"the clinic offers fantastic care with skilled staff and a welcoming environment\",0],[\"their team is extremely professional and truly cares for your pets\",0],[\"the doctor and staff are always attentive and ensure the best care for pets\",0],[\"the care at this clinic is outstanding and everyone is so helpful\",0],[\"excellent service from a professional team of doctors and staff\",0],[\"their staff is so kind and truly cares about the well being of animals\",0],[\"salamat sa pagaalaga\",0],[\"they took good care of our furbaby\",0],[\"the staff made sure to answer all my questions with respect and care\",0],[\"i feel confident with the care my pet receives at this clinic\",0],[\"their doctor is very considerate and welcoming\",0],[\"the doctors and support staff are competent\",0],[\"napakagaling mag paliwanag ng kanilang doktor\",0],[\"the doctor is very dependable and exceptional\",0],[\"dependable and exeptional doctor\",0],[\"their doctor is exceptional\",0],[\"maayos ang mga beterinaryo\",0],[\"their doctor is dependable\",0],[\"the care that Peanut received met expectations\",0],[\"their doctor is really experienced\",0],[\"the doctor is proactive\",0],[\"the doctor is reliable\",0],[\"the staff and physicians are accommodating and caring\",0],[\"ang mga tauhan ay maayos at maingat sa pagbibigay ng pangangalaga\",0],[\"pinapahalagahan ko ang staff para sa kanilang maayos na pag aalaga\",0],[\"very skilled doctor\",0],[\"tila kulang sa kaalaman ang doktor\",0],[\"gentle doctors and staffs\",0],[\"supportive doctors\",0],[\"caring doctors\",0],[\"laging sumusuporta sayo ang kanilang doktor\",0],[\"warm and loving doctors\",0],[\"attentive doctor\",0],[\"prompt doctor\",0],[\"friendly doctor\",0],[\"courteous doctor\",0],[\"accommodating doctor\",0],[\"the doctor spent time with my dog\",0],[\"reliable doctor\",0],[\"efficient doctor\",0],[\"approachable doctor\",0],[\"proactive doctor\",0],[\"warm doctor\",0],[\"reliable and supportive doctor\",0],[\"tapat na pag-aalaga ng staff\",0],[\"average doctors\",0],[\"compassionate doctor\",0],[\"gentle doctor\",0],[\"medyo pinagaan ng doktor ang kalagayan ng aking aso\",0],[\"empathetic doctor\",0],[\"kind doctor\",0],[\"the quality of care is good\",0],[\"trustworthy doctor\",0],[\"the doctor is professional and attentive\",0],[\"the doctors were professional and considerate\",0],[\"dependable doctor\",0],[\"the doctors are good\",0],[\"pakiramdam ko ay nasa maaasahang mga kamay ang alaga ko\",0],[\"ang mga tauhan ay talagang napaka sanay\",0],[\"very nice doctors\",0],[\"lahat doon ay maingat sa pag aalaga\",0],[\"i love how kind the doctor\",0],[\"i am so grateful to the kind doctor\",0],[\"very caring and proactive doctor\",0],[\"ang mga tauhan ay talagang maraming kaalaman\",0],[\"mapagmalasakit ang kanilang doktor\",0],[\"their doctors are really great\",0],[\"helpful and very reliable doctors\",0],[\"very caring doctors\",0],[\"very friendly doctors\",0],[\"the staff and doctor take good care with my dog\",0],[\"the doctor is a very excellent veterinarian\",0],[\"very friendly and approachable doctor\",0],[\"doctors and staff are always very helpful to us\",0],[\"the vet had a good report with my dogs and took his time examining them\",0],[\"the doctor is very professional\",0],[\"sila ay maayos at maingat sa pag aalaga ng aking aso\",0],[\"their doctors are very skilled\",0],[\"the doctors give attention to your pet\",0],[\"the doctors and staff are always kind\",0],[\"nagbibigay sila ng atensyon sa iyong alaga\",0],[\"their doctor is very attentive to what is happening\",0],[\"the staff provides care as necessary\",0],[\"their doctors are really passionate\",0],[\"the staff and physicians are very caring and welcoming\",0],[\"nakakatuwa na gusto talaga nilang mapabuti ang iyong alaga\",0],[\"they provided care to my pet\",0],[\"very professional doctors\",0],[\"the vet provided care for my lovebird\",0],[\"i was contented with the vet who took care of my lovebird\",0],[\"the doctor is very honest\",0],[\"the doctor is really genius\",0],[\"the doctor is really honest and caring\",0],[\"the doctor is very helpful and compassionate\",0],[\"ang mga doktor at kawani ay may kaalaman\",0],[\"the veterinarians does a wonderful job\",0],[\"everyone provided good care to my two kittens\",0],[\"they provide care for my dog\",0],[\"they care for animals\",0],[\"the doctor is very nice\",0],[\"the doctor is so helpful\",0],[\"napaka marespeto ng kanilang doktor\",0],[\"i am grateful to the kind doctors\",0],[\"the doctors are welcoming\",0],[\"they are the greatest pet care organization\",0],[\"the staff provides care\",0],[\"the doctor is very caring\",0],[\"mapag alaga ang kanilang doktor\",0],[\"doctors and staff are always supportive\",0],[\"ang mga doktor ay may kakayahan\",0],[\"i will be using them as my veterinary\",0],[\"they provided a perfect care to my pet\",0],[\"the doctor addressed all my questions\",0],[\"i bring my cat here for care\",0],[\"their doctors are so kind\",0],[\"ang doktor ay kalmado lamang\",0],[\"gumaling ang aking alaga nang sinunod ko ang mga payo ng doktor\",0],[\"ang doktor ay nagsisimula pa lamang sa kanyang karera\",0],[\"the doctor is so compassionate\",0],[\"magaling sa kanyang larangan ang doktor\",0],[\"their doctors are really experienced\",0],[\"ang mga tauhan ay talagang subok na ng panahon\",0],[\"care was provided during the interaction\",0],[\"napaka maagap ng kanilang doktor\",0],[\"i love the insights of the doctor\",0],[\"their doctors are insightful\",0],[\"napakagaling mag alaga ng kanilang tauhan\",0],[\"napakaganda ng pagkakaayos ng kanilang tauhan sa aking alaga\",0],[\"nagustuhan ko ang kinalabasan ng pagayos sa aking alaga\",0],[\"ang beterinaryo ay nagbibigay oras sa iyong alaga\",0],[\"i love how compassionate their doctors\",0]]', '[[\"hindi komportable sa beterinaryong ito dahil parang hindi maalam ang doktor\",2],[\"napakataas ng antas ng alaga ang natanggap ng aking alaga\",2],[\"their care for our pets is very gentle yet they are very efficient and thorough\",2],[\"we were surprised about the cost of euthanization as most vets does not charge for euthanization\",2],[\"the doctor is not friendly and does not care about my pet\",2],[\"we were surprised about the cost of euthanization as most vets does not charge for euthanization\",2],[\"the doctors are not knowledgeable and does not care about the health of their patients\",2],[\"i do not want that doctor to be the doctor of my pet\",2],[\"the doctors really knows a lot which is really great\",2],[\"we waited for so long before we could get into the doctors room\",2],[\"hindi magaling ang mga doktor\",0],[\"hindi pulido ang pag gamot sa iyong alaga\",0],[\"the doctor is very knowledgeable\",0],[\"sobrang maasahan ang mga doktor dito\",0],[\"sobrang mahal kahit maliit lang ang problema ng alaga mo\",0],[\"i have found that the doctors in this practice are not knowledgeable\",0],[\"the doctor is very knowledgeable\",0],[\"the knowledge of the doctors are unreliable\",0],[\"the doctor absolutely sucks on diagnosing\",0],[\"the doctor is highly skilled\",0],[\"the doctor let us know what procedure will be done before doing it\",0],[\"we found a smaller vet that is much less expensive\",0],[\"they upsell unnecessary treatments to inflate the bill so overpriced\",0],[\"dr danowitz is an excellent veterinarian\",0],[\"ang mga doktor dito ay sobrang matalino\",0],[\"mapagkakatiwalaan ang doktor sa taglay niyang talino\",0],[\"i love how procedural the doctor when diagnosing\",0],[\"napaka maalagain ng mga tauhan dito\",0],[\"the doctor is knowledgeable and caring\",0],[\"hindi sila maayos kausap tungkol sa kalagayan ng aso ko\",0],[\"the doctor is extremely knowledgeable\",0],[\"doctors and staff are very aligned in terms of knowledge\",0],[\"hindi maayos ang pag gamot sa aking alaga\",0],[\"napakapangit ang pagaalaga\",0],[\"my pet does not show signs of stress during visits to this vet\",0],[\"the provided care is high quality\",0],[\"ang mga doktor ay hindi maasahan\",0],[\"the staff was rude and did not seem to care about my concerns\",0],[\"very negligent doctor\",0],[\"parang hindi nagiisip ang mga doktor\",0],[\"pet care is very expensive\",0],[\"the doctor is knowledgeable\",0],[\"the doctor does not have any knowledge on my pet\",0],[\"dr danowitz is an excellent veterinarian\",0],[\"the veterinarians are knowledgeable and compassionate\",0],[\"the doctor is knowledgeable\",0],[\"incredibly long wait before we could see the vet\",0],[\"hindi sapat ang alagang nakuha ng aking alaga\",0],[\"their knowledge on giving care is top notch\",0],[\"walang pangangalaga sa iyong alaga\",0],[\"very friendly and knowledgeable doctor\",0],[\"the vet barely spent any time examining my pet and seemed in a hurry which felt rude\",0],[\"they are the worst doctors i have ever known\",0],[\"the doctor is inconsiderate with my turtle\",0],[\"ang mga doktor ay mapagsamantala\",0],[\"ang doktor ay gagawin ang lahat para intindihin ka\",0],[\"the doctor are very knowledgeable\",0],[\"napansin ko na ang mga doktor dito ay maayos at propesyonal\",0],[\"the staff and doctors provide top not service\",0],[\"ang kaalaman ng doktor ay pinakamataas\",0],[\"the doctor is extra ordinary\",0],[\"they provide top notch care\",0],[\"ang mga tauhan ay nagbibigay ng pinakamataas na antas ng alaga\",0],[\"my dog almost died with the wrong diagnosis\",0],[\"the doctor has an impressive knowledge about what care should be provided\",0],[\"this clinic provides high quality care\",0],[\"hindi naka focus ang doktor\",0],[\"ang doktor ay hindi nakikinig sayo\",0],[\"hindi marunong ang doktor\",0],[\"helpful and knowledgeable doctors\",0],[\"the staff is very accommodating and the veterinarians are knowledgeable and compassionate\",0],[\"dr danowitz is an excellent veterinarian he is accommodating and caring\",0],[\"the staff is very thoughtful and the veterinarians are thorough and compassionate\",0],[\"doctor is caring and thorough\",0],[\"the staff is very reliable and the veterinarians are knowledgeable and compassionate\",0],[\"the doctor is highly rated\",0],[\"she is the worst doctor i have ever met\",0],[\"hindi nagamot nang maayos ang aking alaga\",0],[\"the doctor was very thorough and considerate\",0],[\"they do not care about your pet\",0],[\"the doctor was nice and thorough\",0],[\"the doctors and staff were thoughtful throughout the whole visit\",0],[\"sobrang maalaga ng mga tauhan\",0],[\"dr danowitz is a perfect veterinarian\",0],[\"dr danowitz is a one of a kind vet as he is a genius\",0],[\"ang mga tauhan ay mapagmahal sa iyong alaga\",0],[\"hindi maayos magbigay ng payo ang doktor\",0],[\"mararamdaman mong mahal din ng mga tauhan ang iyong alaga\",0],[\"they tend to their patients too slowly and we ended up leaving without seeing the doctor\",0],[\"ang doktor ay hindi nakakapagbigay ng sapat na atensyon\",0],[\"the doctor is top tier in terms of knowledge\",0],[\"the doctors do not know what they are doing\",0],[\"hindi nagamot ang aso ko\",0],[\"i brought my pets to this veterinary hospital and took the vets opinion into consideration\",0],[\"the doctor does not care abuot my pet\",0],[\"the doctors always know what to do\",0],[\"hindi naipaliwanag nang maayos ang operasyon sa aking alaga\",0],[\"the staff is very hardworking and the veterinarians are knowledgeable and compassionate\",0],[\"hindi kami masaya sa pagaalaga nila\",0],[\"dr danowitz is an excellent veterinarian he is knowledgeable\",0],[\"dinala namin ang aming mga pusa dito at hindi bumuti ang kanilang kalagayan\",0],[\"napagaling nila ang alaga ko sobrang bait rin ng pakikitungo nila saamin kahit puro kami tanong\",0],[\"the doctors were very knowledgeable and knew right away how to treat my pets illness thankful for their service\",0],[\"i noticed dried blood on the examination tools so unhygienic\",0],[\"we found a smaller vet that is much less expensive\",0],[\"doctors were thorough with my pets examination and were proactive in preventing problems\",0],[\"the staff is very efficient and the veterinarians are skilled and thorough\",0],[\"the doctors thorough examination gave me confidence in my pets care\",0],[\"i trust their knowledgeable and skilled doctors completely\",0],[\"hindi maingat sa pagbibigay ng gamot\",0],[\"ang mga doktor ay hindi mahusay\",0],[\"worst vet clinic i have ever know\",0],[\"ako ay nabahala dahil parang walang interes ang doktor sa aking alaga\",0],[\"i trust their knowledgeable team to provide the best care for my pet\",0],[\"its rare to find such fair fees for high quality veterinary services\",0],[\"the doctor is not trustworthy\",0],[\"the examination process conducted by their vets are always thorough yet manageable\",0],[\"they prioritize keeping my pet comfortable throughout the treatment \",0],[\"they make sure to be thorough during my pets diagnosis\",0],[\"walang confidence ang doktor\",0],[\"the staff is very proficient and the veterinarians are knowledgeable and compassionate\",0],[\"the doctor is impatient\",0],[\"hindi maayos mag alaga ang vet dito\",0],[\"very knowledge doctor and staff\",0],[\"the doctor was knowledgeable about guinea pigs\",0],[\"parang wala silang pakialam sa kalagayan ng alaga mo\",0],[\"the examination table was not cleaned after the previous pet which is unhygienic\",0],[\"their doctors were very helpful and knowledgeable\",0],[\"dr danowitz is one of the best veterinarians i know he is highly knowledgeable and caring\",0],[\"the doctor was very patient in explaining everything clearly and thoroughly\",0],[\"the doctors and staff were kind patient and very professional throughout my visit\",0],[\"wonderful staff who are knowledgeable and really care about their clients\",0],[\"the doctors are highly skilled and caring towards every animal\",0],[\"ang doktor ay nagkamali sa pag diagnose sa aking alaga\",0],[\"their doctor is thorough\",0],[\"parang walang alam ang doktor\",0],[\"hindi ko sila mapagkakatiwalaan sa pagaalaga\",0],[\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",0],[\"mapagmahal na mga doctor sa iyong alaga\",0],[\"waiting for hours to see the vet is not reasonable please fix this\",0],[\"thorough doctor\",0],[\"knowledgeable doctor\",0],[\"hindi masusi ang pagtingin ng doktor sa aking alaga\",0],[\"sobrang bait ng kanilang doktor\",0],[\"the knowledge of the doctor is disappointing\",0],[\"the doctor did a thorough job in reviewing the findings\",0],[\"very knowledgeable doctors\",0],[\"mukhang napilitan lang magtrabaho ang mga tauhan kaya nakakainis magpagamot dito\",0],[\"the doctor is not confident on their work which is stressful\",0],[\"the knowledge of the doctor is very timely\",0],[\"the veterinarians did not clearly explained what is happening\",0],[\"gumaling ang aking alaga pagtapos ko dalhin dito\",0],[\"lahat ay sobrang mapag aruga sa mga alaga\",0]]', '2025-01-10 00:00:07', '2025-01-10 00:00:07');
INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(6, 'Pricing', 0.5128205128205128, 36.92307692307693, 62.56410256410256, 1, 72, 122, '[[\"their prices were fair and they do a great job at caring for your animals\",0]]', '[[\"my pet easily gets sick but the clinic is very sanitary i feel that my pet is safe here\",4],[\"i rated them 1 star because they make you feel uncertain and untrusting towards them\",2],[\"you will always feel like they give you their best efforts in treating your pets\",2],[\"what cost me 2400 for 2 tabs there i got 30 tabs at Costco for 1000\",2],[\"may mga nakatalagang presyo sa mga gamot\",0],[\"may mga nakalistang presyo sa mga gamot\",0],[\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",0],[\"the prices are on par with all other vets\",0],[\"ang mga presyo ay katulad ng iba\",0],[\"marunong magpahalaga ang mga tauhan\",0],[\"ang singil ay ayon sa kanilang itinakdang presyo\",0],[\"the prices is so budget friendly\",0],[\"mayroon silang listahan ng mga presyo\",0],[\"the prices aligned with the treatment provided\",0],[\"the prices are reasonable\",0],[\"the amount charged was different from the price listed on their website\",0],[\"the prices are comparable to other vet\",0],[\"the prices is justifiable\",0],[\"the pricing is really affordable\",0],[\"i love how affordable their services\",0],[\"reasonable ang presyo\",0],[\"their pricing is really affordable\",0],[\"the prices of their services were extremely affordable\",0],[\"the prices are competitive\",0],[\"napaka gaan sa bulsa ng presyo\",0],[\"the services available are really affordable\",0],[\"i am happy with how affordable the prices are\",0],[\"the doctor makes you feel uncomfortable due to their behavior\",0],[\"the services of this clinic are reasonably priced\",0],[\"reasonable prices\",0],[\"very affordable and accessible\",0],[\"budget friendly prices for their services\",0],[\"the clinic is always clean and pristine i feel comfortable bringing my pets here\",0],[\"the staff is always respectful and makes you feel at ease during visits\",0],[\"i always feel welcomed and respected by their professional team of staff\",0],[\"i love how fair and justifiable their prices are\",0],[\"my pet feels the safest in with the doctors here shows how skilled they are\",0],[\"the treatment plan was well explained and affordable\",0],[\"their fees are perfect for pet owners on a budget\",0],[\"i love how their prices are affordablet but doesnt compromise the quality\",0],[\"i wish the prices were more affordable\",0],[\"their prices are very budget friendly\",0],[\"you get the value for the price\",0],[\"i feel like the doctors dont even try harder to heal my pet\",0],[\"the procedure and medication were reasonably priced\",0],[\"the staff and doctors are extremely skilled and made my pet feel safe\",0],[\"the clinic’s service is amazing and the staff makes you feel at ease\",0],[\"i feel confident with the care my pet receives at this clinic\",0],[\"their prices are competitive\",0],[\"they are really transparent about the costs\",0],[\"their prices are so budget friendly\",0],[\"their prices are really advantageous\",0],[\"low cost clinic which is really great\",0],[\"napaka patas ng kanilang mga presyo\",0],[\"well priced clinic\",0],[\"extremely affordable prices\",0],[\"ang kanilang pagpresyo ay mura\",0],[\"pinapahalagahan ko ang staff para sa kanilang maayos na pag aalaga\",0],[\"well justified prices\",0],[\"very affordable prices\",0],[\"so affordable prices\",0],[\"very budget friendly prices\",0],[\"very cost effective pricing\",0],[\"very low cost prices\",0],[\"nakahanap kami ng ibang option na mas mura\",0],[\"they made me feel comfortable\",0],[\"ang presyo ay ayon sa pamantayan\",0],[\"their services is really so affordable\",0],[\"their services is affordable\",0],[\"extremely affordable services\",0],[\"the cost of their services aligns with market standards\",0],[\"their services are priced reasonably\",0]]', '[[\"the staff made me feel like a burden for asking too many questions which made me feel bad\",6],[\"nagulat kami sa presyo ng euthanization dahil ang ibang clinic ay hindi nagpapabayad sa euthanization\",2],[\"their prices are too expensive for the quality of their work\",2],[\"napakamura ng presyo kaya balik ako nang balik dito\",2],[\"we were surprised about the cost of euthanization as most vets does not charge for euthanization\",2],[\"we were surprised about the cost of euthanization as most vets does not charge for euthanization\",2],[\"hindi kayang abutin ang presyo para gawing buwan buwan sa sobrang mahal\",2],[\"i paid a huge amount but did not feel like I got value for my money which is disappointing\",2],[\"parang sobrang mahal kumpara sa ibang clinic\",0],[\"hindi makatuwiran ng presyo ng serbisyo nila nakakadismaya\",0],[\"i was charged extra fees without any explanation which is unacceptable\",0],[\"sobrang mahal kahit maliit lang ang problema ng alaga mo\",0],[\"nagulat kami sa presyo ng euthanization dahil ang mahal\",0],[\"they charge for every little thing which made it overpriced\",0],[\"we found a smaller vet that is much less expensive\",0],[\"they upsell unnecessary treatments to inflate the bill so overpriced\",0],[\"hindi praktical ang presyo\",0],[\"nakahanap kami ng iba na mas mura dahil sobrang mahal dito\",0],[\"ang daming problema sa serbisyo pero ang mahal\",0],[\"hindi sulit ang presyo\",0],[\"prices are ridiculously high for some services\",0],[\"their fees for emergency services are outrageously high\",0],[\"their pricing is outrageously expensive\",0],[\"sobrang abot kaya ang kanilang mga presyo\",0],[\"nakakabahala ang taas ng presyo\",0],[\"pet care is very expensive\",0],[\"the medications they sell are double the price of regular pharmacies\",0],[\"grabe ang taas ng presyo\",0],[\"the prices are higher compared to other which is unfair\",0],[\"they have hidden fees that are not mentioned until after the service is done which is so unfair\",0],[\"napakamahal ng presyo kumpara sa iba\",0],[\"it is really expensive than usual\",0],[\"they are charging me extra costs for a follow up consultation is unacceptable\",0],[\"hindi justified ang presyo\",0],[\"hindi sulit ang bayad sa kanila\",0],[\"it is so expensive\",0],[\"even basic pet supplies at their clinic are way overpriced\",0],[\"hindi praktical ang pagppresyo nila dito\",0],[\"their regular cost is too high\",0],[\"hindi sulit ang binayad ko ang mahal\",0],[\"medyo mataas ang presyo\",0],[\"hindi sulit ang presyo ng packages\",0],[\"medyo mataas ang presyo\",0],[\"hindi sulit ang presyo ng kanilang serbisyo\",0],[\"the clinic charges a premium so we can call it overpriced\",0],[\"sa sobrang mahal mas marami ka mahahanap na ibang mura\",0],[\"the cost of services here is higher compared to others\",0],[\"hindi tumutugma ang presyo sa aking inaasahan\",0],[\"mas mataas ang presyo ng serbisyo kumpara sa iba\",0],[\"expensive stuff\",0],[\"ang mahal ng presyo\",0],[\"their spaying and neutering services are overpriced compared to other clinics\",0],[\"parang mapepera lang ang makakapasok dito madalas sa sobrang mahal\",0],[\"it feels like they are just winging their scheduling system with how slow and inefficient\",0],[\"hindi ko nagustuhan na kailangan magbayad para sa emergency na serbisyo\",0],[\"napaka taas ng presyo kahit wala namang special na serbisyo\",0],[\"hindi tugma ang presyo at serbisyo\",0],[\"ang presyo para sa mga bakuna ay mas mataas kumpara sa iba\",0],[\"it is ridiculously expensive\",0],[\"hindi abot kaya ang presyo nila\",0],[\"the consultation fees are unreasonably high compared to other clinics in the area\",0],[\"sobrang mahal at bagal ng serbisyo nila\",0],[\"hindi sulit ang presyo sa kalidad ng serbisyo na binibigay nila\",0],[\"sobrang gaan sa bulsa ng presyo\",0],[\"costs are very high for some services\",0],[\"sobrang mahal ng serbisyo\",0],[\"the services they provide are very expensive\",0],[\"ang mga tauhan ay mapagmahal sa iyong alaga\",0],[\"mararamdaman mong mahal din ng mga tauhan ang iyong alaga\",0],[\"the prices keep on increasing every visit without any improvements in quality\",0],[\"hindi makatwiran ang presyo\",0],[\"the prices are unreasonable\",0],[\"i feel like they are taking advantage of pet owners with these sky high prices\",0],[\"it is so overpriced it felt like a scam\",0],[\"ang presyo ng kanilang serbisyo ay medyo mataas\",0],[\"their services are extremely expensive\",0],[\"their services were very affordable yet of high quality\",0],[\"laging mas mahal ang bill kaysa sa estimate\",0],[\"we found a smaller vet that is much less expensive\",0],[\"hindi abot kaya ang presyo para sa lahat\",0],[\"mataas ang kanilang presyo\",0],[\"even a routine checkup costs way too much\",0],[\"its rare to find such fair fees for high quality veterinary services\",0],[\"their medication is way overpriced\",0],[\"the overall cost is so much expensive than the other clinics\",0],[\"hindi ko nagustuhan na kailan magbayad para sa emergency na serbisyo\",0],[\"it is super expensive\",0],[\"hindi makatarungan ang pag ka mahal ng presyo\",0],[\"the prices for pet grooming here are insanely high\",0],[\"kahit madaling procedure mataas pa rin ang presyo\",0],[\"i had to pay a consultation fee just to get a prescription which is ridiculous\",0],[\"the pricing for cleanings is way above average and not justified so expensive\",0],[\"the prices are unbelievably high\",0],[\"the medication costs 124 which is expensive\",0],[\"napaka baba ng kalidad ng serbisyo pero sobrang mahal\",0],[\"medyo mataas ang presyo\",0],[\"laging may dagdag na bayad na napakamahal\",0],[\"hindi sulit sa bulsa ang mahal para sa binigay nilang serbisyo\",0],[\"may kataasan ang presyo\",0],[\"i feel like the clinic is very inefficient as the waiting time is too long\",0],[\"everyone was friendly and made me feel at ease throughout the visit\",0],[\"i am really grateful everything went smoothly from start to finish and my pet is now feeling better\",0],[\"the pricing for diagnostic tests is absurdly expensive\",0],[\"their prices are really economical\",0],[\"economical prices\",0],[\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",0],[\"mapagmahal na mga doctor sa iyong alaga\",0],[\"this clinic is very expensive\",0],[\"medyo mataas ang presyo\",0],[\"medyo may kataasan ang presyo\",0],[\"hindi worth it ang presyo dahil sobrang mahal\",0],[\"may kataasan ang presyo\",0],[\"the prices are very high\",0],[\"halos lahat ng ginagawa nila may dagdag bayad\",0],[\"sobrang mahal kala mo ginto ang binebenta\",0],[\"they refused to provide a detailed breakdown of the overpriced cost\",0],[\"hindi customer friendly ang presyo nila sa sobrang mahal\",0],[\"napakamahal ang lahat\",0],[\"quite expensive\",0],[\"mahal ng lahat ang kanilang trabaho\",0],[\"parang ginagatasan lang kami sa sobrang mahal\",0],[\"the cost of boarding my pet was so high I could not afford it\",0]]', '2025-01-10 00:00:07', '2025-01-10 00:00:07');

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

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1ggDaC22DRFJOTqwF53BKBD0bBCWyGU3bGjvO2lM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiakRrMVIxWkFNTDRrVEc4cDRRQjRXcEgxRHN5cW5jSXlhbzRXZW5XYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1734505426),
('2UPbMUSJolYkNIFclJEPrkQyNSAhcUjeNEO5yybq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiakxCbndwalNSSFAzMzJRdnBLQ3l0OHRFRWxTVjlEd0cwMk9BM0dGOSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736412784),
('4GB5W3tU6CE4llSVZGmpSuYFk5iIxDClXlMW5DaP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYUZUM1l6ckMxTFBlc1NFN0JTUHN0WHh2NVdZMTNmN08yMGFGQnBucyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734180026),
('A77ftPOCzr41A7Kiw8mWt1hVtJ1OC0zgNtt60krc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGVhdnRaTUgxcXpPWlhWMklFNDJsVDdoQ29rQXhkbmZnUG1HSHBoQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736252890),
('dislSNlMkqmU4l56sF9RpW0uPunImrUXw4Cad0IY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTDZtSnJYSkpncU9pbVRPSktJT0VzTTN2Zzc1Yzc2Q3pmcEljZGtQbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736315371),
('kTpgI9axhTeZlIjbiE91dxptxcRllnfglqROgwYW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid1UxZVpvalk3bzZ3ZVM5cGN6WUZMeE5hcUFHcDBWUDBvTnRxZHRwayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736260221),
('M6K4Zjc64ft8OvozEnWp4bWpY0q1WoYhyxY3B7bD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibDBhSTBxSU52dEE2Tm02SWZpMU5vMFZxaklZT2dSd3o5YlppUzQzdCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736493715),
('NvMLbhsPDEwc8wNxApSTfxk5FwjNv9CjQR1adSNd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieU10U2YxSnd0VVZqTVJOdFFJNTlQdUFUUzV1eFhBZWFyNXVZaDhBUSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736697294),
('rsH3i8xymvnOMZTk9tHf7YLLGxDKJrZMdtqbunAn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXhRZlNidXFhZjJBbVVORjA0Q1BRRkZNelljM1liVGQyM0taeHNyOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736235918);

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
('186775', 'Josephine', NULL, 'Balagtas', 'josephineBalagtas@gmail.com', '$2y$12$j5bD5fyUCxlYK3djTZUhKOAtPcyp9gApNUOyTNB0d.W/N.Lo5df3W', '2000-08-06', 'Female', 'Makati City', '09273421232', 2, 'active', 'hemkoCYUhqfCGZ5tG8E9gRzi.jpg', '2024-12-06 00:33:37', '2024-12-06 00:33:37'),
('907459', 'Sofia', NULL, 'Santos', 'sofiaSantos@gmail.com', '$2y$12$wJMY4R.QzHtxtv4W.9252.XxaulAAhnFy7i0Sqog.h1W4twKbD4pu', '1999-01-10', 'Female', 'Makati City', '09275439284', 6, 'active', 'Jt04YkHIhh9NicHDMzgjKJXR.jpg', '2024-12-06 00:40:04', '2024-12-06 00:40:04'),
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
('179411', 'Xander Aleck Gwynnz', NULL, 'Deloso', 'xagdeloso02@gmail.com', '$2y$12$9Xv83N59bzRSzFY5fSbzdOpdPUtZGfQNJk9c6hshzaeO.yW064J5q', NULL, 'Female', NULL, '09273915985', 'defaultPFP.png', 'active', '2024-09-29 10:19:58', '2024-10-17 19:57:14'),
('936822', 'Airich Jay', NULL, 'Diawan', 'airichjaydiawan@gmail.com', '$2y$12$gMBTcbHP/8gwJ95jjXV8X.0RbkqVUOhM2QPPZ.D31n79laSdcMjdC', NULL, 'Male', NULL, '09677644695', 'defaultPFP.png', 'active', '2024-08-20 11:01:53', '2025-03-14 07:00:07');

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
  ADD KEY `appointments_pet_foreign` (`pet`),
  ADD KEY `appointments_service_foreign` (`service`);

--
-- Indexes for table `appointment_assigned_items`
--
ALTER TABLE `appointment_assigned_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_assigned_items_appointment_foreign` (`appointment`),
  ADD KEY `appointment_assigned_items_item_foreign` (`item`);

--
-- Indexes for table `appointment_assigned_staffs`
--
ALTER TABLE `appointment_assigned_staffs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_assigned_staffs_appointment_foreign` (`appointment`),
  ADD KEY `appointment_assigned_staffs_staff_foreign` (`staff`);

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
-- Indexes for table `cat_breeds`
--
ALTER TABLE `cat_breeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clinic_services`
--
ALTER TABLE `clinic_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_otps`
--
ALTER TABLE `email_otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_otps_client_foreign` (`client`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedbacks_client_foreign` (`client`),
  ADD KEY `feedbacks_appointment_foreign` (`appointment`);

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
-- Indexes for table `inventory_histories`
--
ALTER TABLE `inventory_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_items_inventory_foreign` (`inventory`);

--
-- Indexes for table `inventory_items_useds`
--
ALTER TABLE `inventory_items_useds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_items_useds_inventory_foreign` (`inventory`);

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
-- Indexes for table `pet_medical_history_allergies`
--
ALTER TABLE `pet_medical_history_allergies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_medical_history_allergies_pet_foreign` (`pet`);

--
-- Indexes for table `pet_medical_history_diseases`
--
ALTER TABLE `pet_medical_history_diseases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_medical_history_diseases_pet_foreign` (`pet`);

--
-- Indexes for table `pet_medical_history_medications`
--
ALTER TABLE `pet_medical_history_medications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_medical_history_medications_pet_foreign` (`pet`);

--
-- Indexes for table `pet_medical_history_vaccinations`
--
ALTER TABLE `pet_medical_history_vaccinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_medical_history_vaccinations_pet_foreign` (`pet`);

--
-- Indexes for table `sentiment_analyses`
--
ALTER TABLE `sentiment_analyses`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `appointment_assigned_items`
--
ALTER TABLE `appointment_assigned_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `appointment_assigned_staffs`
--
ALTER TABLE `appointment_assigned_staffs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `cat_breeds`
--
ALTER TABLE `cat_breeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clinic_services`
--
ALTER TABLE `clinic_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `email_otps`
--
ALTER TABLE `email_otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory_categories`
--
ALTER TABLE `inventory_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `inventory_histories`
--
ALTER TABLE `inventory_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `pet_medical_history_allergies`
--
ALTER TABLE `pet_medical_history_allergies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet_medical_history_diseases`
--
ALTER TABLE `pet_medical_history_diseases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet_medical_history_medications`
--
ALTER TABLE `pet_medical_history_medications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet_medical_history_vaccinations`
--
ALTER TABLE `pet_medical_history_vaccinations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sentiment_analyses`
--
ALTER TABLE `sentiment_analyses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `appointments_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_service_foreign` FOREIGN KEY (`service`) REFERENCES `clinic_services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `appointment_assigned_items`
--
ALTER TABLE `appointment_assigned_items`
  ADD CONSTRAINT `appointment_assigned_items_appointment_foreign` FOREIGN KEY (`appointment`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_assigned_items_item_foreign` FOREIGN KEY (`item`) REFERENCES `inventory_items_useds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `appointment_assigned_staffs`
--
ALTER TABLE `appointment_assigned_staffs`
  ADD CONSTRAINT `appointment_assigned_staffs_appointment_foreign` FOREIGN KEY (`appointment`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_assigned_staffs_staff_foreign` FOREIGN KEY (`staff`) REFERENCES `user_admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `email_otps`
--
ALTER TABLE `email_otps`
  ADD CONSTRAINT `email_otps_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_appointment_foreign` FOREIGN KEY (`appointment`) REFERENCES `appointments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `feedbacks_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `inventories_category_foreign` FOREIGN KEY (`category`) REFERENCES `inventory_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD CONSTRAINT `inventory_items_inventory_foreign` FOREIGN KEY (`inventory`) REFERENCES `inventories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventory_items_useds`
--
ALTER TABLE `inventory_items_useds`
  ADD CONSTRAINT `inventory_items_useds_inventory_foreign` FOREIGN KEY (`inventory`) REFERENCES `inventories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pet_medical_history_allergies`
--
ALTER TABLE `pet_medical_history_allergies`
  ADD CONSTRAINT `pet_medical_history_allergies_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pet_medical_history_diseases`
--
ALTER TABLE `pet_medical_history_diseases`
  ADD CONSTRAINT `pet_medical_history_diseases_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pet_medical_history_medications`
--
ALTER TABLE `pet_medical_history_medications`
  ADD CONSTRAINT `pet_medical_history_medications_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pet_medical_history_vaccinations`
--
ALTER TABLE `pet_medical_history_vaccinations`
  ADD CONSTRAINT `pet_medical_history_vaccinations_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_admins`
--
ALTER TABLE `user_admins`
  ADD CONSTRAINT `user_admins_role_foreign` FOREIGN KEY (`role`) REFERENCES `admin_roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
