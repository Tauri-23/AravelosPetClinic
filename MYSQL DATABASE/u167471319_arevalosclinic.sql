-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2025 at 11:41 AM
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
-- Database: `u167471319_arevalosclinic`
--

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
(3, 'Veterinary Assistant', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(4, 'Secretary', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(5, 'Kennel Assistant', '2024-10-18 04:10:18', '2024-10-18 04:10:18'),
(6, 'Groomer', '2024-10-18 04:10:18', '2024-10-18 04:10:18');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` varchar(12) NOT NULL,
  `client` varchar(6) DEFAULT NULL,
  `pet` varchar(6) DEFAULT NULL,
  `otc_client` varchar(255) DEFAULT NULL,
  `otc_pet_name` varchar(255) DEFAULT NULL,
  `otc_pet_type` bigint(20) UNSIGNED DEFAULT NULL,
  `otc_pet_breed` bigint(20) UNSIGNED DEFAULT NULL,
  `service` bigint(20) UNSIGNED DEFAULT NULL,
  `service_type` bigint(20) UNSIGNED DEFAULT NULL,
  `date_time` datetime NOT NULL,
  `approved_at` datetime DEFAULT NULL,
  `rejected_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `note` longtext DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `type` enum('Online','OTC') NOT NULL,
  `medical_history` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `client`, `pet`, `otc_client`, `otc_pet_name`, `otc_pet_type`, `otc_pet_breed`, `service`, `service_type`, `date_time`, `approved_at`, `rejected_at`, `cancelled_at`, `reason`, `note`, `status`, `type`, `medical_history`, `created_at`, `updated_at`) VALUES
('368789676272', '936822', '387381', NULL, NULL, NULL, NULL, 1, NULL, '2025-04-21 00:00:00', '2025-04-20 02:11:22', NULL, '2025-04-20 02:16:15', 'asd', NULL, 'Cancelled', 'Online', NULL, '2025-04-19 10:09:45', '2025-04-19 10:16:15'),
('406749347508', '936822', '387381', NULL, NULL, NULL, NULL, 1, NULL, '2025-04-17 00:00:00', '2025-04-17 02:13:39', NULL, NULL, NULL, NULL, 'Approved', 'Online', NULL, '2025-04-16 10:13:19', '2025-04-16 10:13:39'),
('475250716001', '18533', '962448', NULL, NULL, NULL, NULL, 1, NULL, '2025-04-01 00:00:00', '2025-04-15 06:32:11', NULL, NULL, NULL, NULL, 'Completed', 'Online', 4, '2025-04-14 22:31:02', '2025-04-14 22:35:05'),
('543515611591', '178427', '179293', NULL, NULL, NULL, NULL, 5, 11, '2025-04-18 00:00:00', NULL, NULL, '2025-04-11 10:13:05', 'No reason provided.', NULL, 'Cancelled', 'Online', NULL, '2025-04-11 01:59:58', '2025-04-11 02:13:05'),
('659180142206', '936822', '387381', NULL, NULL, NULL, NULL, 1, NULL, '2025-04-17 00:00:00', '2025-04-16 16:17:51', NULL, NULL, NULL, 'asd', 'Completed', 'Online', 5, '2025-04-16 00:17:12', '2025-04-16 00:18:33'),
('970899663568', '637862', '361654', NULL, NULL, NULL, NULL, 3, 4, '2025-04-01 00:00:00', '2025-04-17 02:18:28', NULL, NULL, NULL, NULL, 'Approved', 'Online', NULL, '2025-04-13 07:13:56', '2025-04-16 10:18:28');

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

--
-- Dumping data for table `appointment_assigned_items`
--

INSERT INTO `appointment_assigned_items` (`id`, `appointment`, `item`, `created_at`, `updated_at`) VALUES
(5, '475250716001', '968964529180', '2025-04-15 06:32:11', '2025-04-15 06:32:11'),
(6, '659180142206', '342655569460', '2025-04-16 08:17:45', '2025-04-16 08:17:45'),
(7, '659180142206', '59887421571', '2025-04-16 08:17:51', '2025-04-16 08:17:51'),
(8, '406749347508', '982701118590', '2025-04-16 18:13:39', '2025-04-16 18:13:39'),
(9, '970899663568', '904123355985', '2025-04-16 18:18:28', '2025-04-16 18:18:28');

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

--
-- Dumping data for table `appointment_assigned_staffs`
--

INSERT INTO `appointment_assigned_staffs` (`id`, `appointment`, `staff`, `created_at`, `updated_at`) VALUES
(6, '475250716001', '186775', '2025-04-15 06:32:11', '2025-04-15 06:32:11'),
(7, '659180142206', '643205', '2025-04-16 08:17:45', '2025-04-16 08:17:45'),
(8, '659180142206', '643205', '2025-04-16 08:17:51', '2025-04-16 08:17:51'),
(9, '406749347508', '643205', '2025-04-16 18:13:39', '2025-04-16 18:13:39'),
(10, '970899663568', '643205', '2025-04-16 18:18:28', '2025-04-16 18:18:28'),
(13, '368789676272', '643205', '2025-04-19 18:11:22', '2025-04-19 18:11:22');

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
  `no_types` tinyint(1) NOT NULL DEFAULT 0,
  `custom_types` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clinic_services`
--

INSERT INTO `clinic_services` (`id`, `service`, `no_types`, `custom_types`, `created_at`, `updated_at`) VALUES
(1, 'Check-up', 1, 0, '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(3, 'Grooming', 0, 0, '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(5, 'Vaccination', 0, 0, '2025-03-18 09:50:03', '2025-03-18 09:50:03'),
(12, 'Wellness Program', 0, 0, '2025-04-05 15:05:01', '2025-04-05 15:05:01');

-- --------------------------------------------------------

--
-- Table structure for table `clinic_service_types`
--

CREATE TABLE `clinic_service_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service` bigint(20) UNSIGNED DEFAULT NULL,
  `service_type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clinic_service_types`
--

INSERT INTO `clinic_service_types` (`id`, `service`, `service_type`, `created_at`, `updated_at`) VALUES
(1, 3, 'Anal Sac Draining', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(2, 3, 'Anal Trimming', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(3, 3, 'Ear Cleaning', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(4, 3, 'Full Groom', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(5, 3, 'Nail Cutting', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(6, 3, 'Face Trimming', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(7, 3, 'Pad Trimming', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(8, 3, 'Paw Trimming', '2025-04-05 14:57:55', '2025-04-05 14:57:55'),
(9, 5, '5 in 1 Vaccine', '2025-04-05 15:02:07', '2025-04-05 15:02:07'),
(10, 5, 'Cat Vaccines', '2025-04-05 15:02:07', '2025-04-05 15:02:07'),
(11, 5, 'Anti Rabies Vaccine', '2025-04-05 15:02:07', '2025-04-05 15:02:07'),
(12, 5, 'Deworming', '2025-04-05 15:02:07', '2025-04-05 15:02:07'),
(13, 5, 'Kennel Cough Vaccine', '2025-04-05 15:02:07', '2025-04-05 15:02:07'),
(14, 5, 'Antifungal Vaccine', '2025-04-05 15:02:07', '2025-04-05 15:02:07'),
(15, 12, 'Antiparasitics - Deworming', '2025-04-05 15:06:09', '2025-04-05 15:06:09'),
(16, 12, 'Antiparasitics - Antiectoparasites', '2025-04-05 15:06:09', '2025-04-05 15:06:09');

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
(32, '801863', 'forgot password', '936822', 'Expired', '2025-03-19 16:20:29', '2025-03-22 23:40:53'),
(33, '735363', 'forgot password', '936822', 'Active', '2025-03-22 23:40:53', '2025-03-22 23:40:53');

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
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `client`, `appointment`, `content`, `status`, `created_at`, `updated_at`) VALUES
(6, '936822', NULL, 'very clean and excellent service', 'processed', '2025-04-07 06:11:28', '2025-04-16 07:35:57'),
(2772, '936822', '659180142206', 'Clinic is very clean and the staffs are accomodating', 'not-processed', '2025-04-16 08:27:27', '2025-04-16 16:58:49');

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
(1, 3, 'Nexgard Chewable Tablets Dogs>10-25kg', 8, 'lorem ipsum dolor sit amet', 'x4f7QjENwZwD9Xr9B0RY7GWW.webp', 68, 'mg', 2067, '2024-12-17 13:44:06', '2025-04-19 18:16:15'),
(2, 3, 'Nexgard Chewable Tablets Dogs>4-10kg', 7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae lorem a eros lacinia dapibus et vitae mi. Donec vulputate felis diam. Nulla feugiat nisl vitae viverra scelerisque. Aenean ultricies ultrices pharetra. Cras felis diam, tristique quis enim sit amet, vulputate egestas nulla. Nulla facilisi. Aenean rhoncus porttitor leo venenatis aliquet.', 'K8ozaxWlCHC3vhccnZ4O5TFf.webp', 28, 'mg', 1947, '2024-12-17 14:00:04', '2025-04-06 19:07:05'),
(3, 3, 'Saint Roche Premium Happiness Scent Dog Shampoo', 8, 'Shampoo', 'BvQacQZEYQ8oBRFgyD1SBHZY.webp', 250, 'ml', 179, '2024-12-20 11:59:19', '2025-04-16 18:18:29'),
(4, 3, 'The Fur Life Anti Mange 3-in-1 Pet Shampoo, Conditioner and Treatment', 4, 'Shampoo', 'gGrx6SyMFUNEklyKyV47YP49.webp', 250, 'ml', 169, '2024-12-20 20:21:37', '2025-04-15 06:32:11'),
(5, 12, 'Remote', 2, 'TEst 1', 'fCuS0MDMrxLM3ZMzV1rICrJE.png', NULL, NULL, 100, '2025-04-11 02:31:08', '2025-04-11 02:35:05');

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
(3, 'Supplies', '2024-09-29 22:16:23', '2024-09-29 22:16:23'),
(12, 'test1', '2025-04-11 02:29:01', '2025-04-11 02:29:18');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_histories`
--

CREATE TABLE `inventory_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `operator` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `purpose` enum('Patient Care','Cancelled Patient Care','Dispensed to Client','Internal Use','Disposed','Damaged/Lost','Inventory Added') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_histories`
--

INSERT INTO `inventory_histories` (`id`, `item_name`, `operator`, `qty`, `purpose`, `created_at`, `updated_at`) VALUES
(1, 'Saint Roche Premium Happiness Scent Dog Shampoo', '+', '10', 'Inventory Added', '2025-02-23 23:10:12', '2025-02-23 23:10:12'),
(2, 'Saint Roche Premium Happiness Scent Dog Shampoo', '-', '1', 'Patient Care', '2025-02-24 00:40:48', '2025-02-24 00:40:48'),
(3, 'Nexgard Chewable Tablets Dogs>4-10kg', '+', '1', 'Inventory Added', '2025-04-06 10:49:17', '2025-04-06 10:49:17'),
(4, 'Nexgard Chewable Tablets Dogs>4-10kg', '+', '1', 'Inventory Added', '2025-04-06 10:49:18', '2025-04-06 10:49:18'),
(5, 'Remote', '+', '1', 'Inventory Added', '2025-04-10 18:34:47', '2025-04-10 18:34:47'),
(6, 'Remote', '+', '1', 'Inventory Added', '2025-04-10 18:34:47', '2025-04-10 18:34:47'),
(7, 'Remote', '+', '1', 'Inventory Added', '2025-04-10 18:34:52', '2025-04-10 18:34:52'),
(8, 'Remote', '-', '1', 'Patient Care', '2025-04-10 18:35:05', '2025-04-10 18:35:05'),
(9, 'Saint Roche Premium Happiness Scent Dog Shampoo', '-', '1', 'Patient Care', '2025-04-11 02:19:58', '2025-04-11 02:19:58'),
(10, 'Nexgard Chewable Tablets Dogs>10-25kg', '-', '1', 'Patient Care', '2025-04-19 08:39:00', '2025-04-19 08:39:00'),
(11, 'Nexgard Chewable Tablets Dogs>10-25kg', '+', '1', 'Inventory Added', '2025-04-19 08:39:18', '2025-04-19 08:39:18'),
(12, 'Nexgard Chewable Tablets Dogs>10-25kg', '-', '1', 'Disposed', '2025-04-19 18:05:28', '2025-04-19 18:05:28'),
(13, 'Nexgard Chewable Tablets Dogs>10-25kg', '-', '2', 'Patient Care', '2025-04-19 18:11:22', '2025-04-19 18:11:22'),
(14, 'Nexgard Chewable Tablets Dogs>10-25kg', '-', '1', 'Dispensed to Client', '2025-04-19 18:14:55', '2025-04-19 18:14:55'),
(15, 'Nexgard Chewable Tablets Dogs>10-25kg', '+', '1', 'Cancelled Patient Care', '2025-04-19 18:16:15', '2025-04-19 18:16:15'),
(16, 'Nexgard Chewable Tablets Dogs>10-25kg', '+', '1', 'Cancelled Patient Care', '2025-04-19 18:16:15', '2025-04-19 18:16:15');

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
('240941811915', 2, '2026-12-31', '2024-12-20 21:53:38', '2024-12-20 21:53:38'),
('250891225906', 4, '2026-12-31', '2024-12-20 21:54:37', '2024-12-20 21:54:37'),
('25341451089', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('281408698509', 2, '2026-12-31', '2024-12-20 21:53:40', '2024-12-20 21:53:40'),
('322547463794', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('354967159326', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('357199370169', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('421273744680', 5, '2025-04-18', '2025-04-11 02:34:47', '2025-04-11 02:34:47'),
('42281796751', 1, '2025-12-31', '2024-12-20 21:52:10', '2024-12-20 21:52:10'),
('454421751998', 4, '2025-12-31', '2024-12-20 21:54:31', '2024-12-20 21:54:31'),
('487180666684', 2, '2026-12-31', '2024-12-20 21:53:38', '2024-12-20 21:53:38'),
('543744880033', 4, '2026-12-31', '2024-12-20 21:54:38', '2024-12-20 21:54:38'),
('554904300848', 2, '2026-12-31', '2024-12-20 21:53:39', '2024-12-20 21:53:39'),
('556817306149', 1, '2026-12-31', '2024-12-20 21:52:20', '2024-12-20 21:52:20'),
('581453351989', 1, '2026-12-31', '2024-12-20 21:52:20', '2024-12-20 21:52:20'),
('595771343232', 4, '2026-12-31', '2024-12-20 21:54:39', '2024-12-20 21:54:39'),
('611696303123', 5, '2025-04-18', '2025-04-11 02:34:47', '2025-04-11 02:34:47'),
('64784382656', 2, '2028-04-26', '2025-04-06 18:49:18', '2025-04-06 18:49:18'),
('651003557110', 1, '2026-12-31', '2024-12-20 21:52:19', '2024-12-20 21:52:19'),
('663262095586', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('666732046741', 1, '2025-12-31', '2024-12-20 21:52:09', '2024-12-20 21:52:09'),
('676079167723', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('746597337659', 1, '2026-12-31', '2024-12-20 21:52:23', '2024-12-20 21:52:23'),
('800940192048', 1, '2026-12-31', '2024-12-20 21:52:19', '2024-12-20 21:52:19'),
('858845533378', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('870605163274', 1, '2026-12-31', '2024-12-20 21:52:21', '2024-12-20 21:52:21'),
('943458228005', 2, '2028-04-26', '2025-04-06 18:49:17', '2025-04-06 18:49:17');

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
('210304032098', 2, '2026-12-31', '2024-12-20 21:53:40', '2024-12-20 21:53:40'),
('260949422998', 3, '2026-12-31', '2024-12-20 21:54:08', '2024-12-20 21:54:08'),
('34233874557', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('342655569460', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('566985344266', 2, '2025-12-31', '2024-12-20 21:53:31', '2024-12-20 21:53:31'),
('582628968335', 2, '2025-12-31', '2024-12-20 21:53:32', '2024-12-20 21:53:32'),
('59887421571', 3, '2027-03-31', '2025-02-23 20:44:49', '2025-02-23 20:44:49'),
('672162452845', 3, '2025-12-31', '2024-12-20 21:54:00', '2024-12-20 21:54:00'),
('746061886740', 2, '2025-12-31', '2024-12-20 21:53:32', '2024-12-20 21:53:32'),
('798831105944', 2, '2025-12-31', '2024-12-20 21:53:33', '2024-12-20 21:53:33'),
('850421904496', 3, '2026-12-31', '2024-12-20 21:54:13', '2024-12-20 21:54:13'),
('904123355985', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12'),
('968964529180', 4, '2025-12-31', '2024-12-20 21:54:31', '2024-12-20 21:54:31'),
('982701118590', 3, '2028-04-05', '2025-02-24 07:10:12', '2025-02-24 07:10:12');

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
-- Table structure for table `medical_histories`
--

CREATE TABLE `medical_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `weight` double NOT NULL,
  `pulse` varchar(255) NOT NULL,
  `respiratory_rate` varchar(255) NOT NULL,
  `temperature` double NOT NULL,
  `diet` varchar(255) DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `previous_surgery` varchar(255) DEFAULT NULL,
  `complaints_or_requests` varchar(255) DEFAULT NULL,
  `medication_by_owner` text DEFAULT NULL,
  `medication_by_other_vets` text DEFAULT NULL,
  `procedure_done` text DEFAULT NULL,
  `next_appointment_date` date DEFAULT NULL,
  `note` text DEFAULT NULL,
  `physical_exams` bigint(20) UNSIGNED DEFAULT NULL,
  `laboratory_exams` bigint(20) UNSIGNED DEFAULT NULL,
  `diagnosis` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medical_histories`
--

INSERT INTO `medical_histories` (`id`, `weight`, `pulse`, `respiratory_rate`, `temperature`, `diet`, `allergies`, `previous_surgery`, `complaints_or_requests`, `medication_by_owner`, `medication_by_other_vets`, `procedure_done`, `next_appointment_date`, `note`, `physical_exams`, `laboratory_exams`, `diagnosis`, `created_at`, `updated_at`) VALUES
(1, 10, '60', '30', 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Sample note', 4, 4, 4, '2025-04-06 20:32:44', '2025-04-06 20:32:44'),
(2, 5, '70', '30', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sample', 5, 5, 5, '2025-04-07 07:26:30', '2025-04-07 07:26:30'),
(3, 10, '70', '30', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Yes', 6, 6, 6, '2025-04-07 07:27:21', '2025-04-07 07:27:21'),
(4, 123, '123', '2132', 23, '123', '213', 'ee', 'ad', '123qeqw', 'ads', 'asd123', NULL, 'asd', 7, 7, 7, '2025-04-15 06:35:05', '2025-04-15 06:35:05'),
(5, 10, '40', '30', 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, 8, 8, '2025-04-16 08:18:33', '2025-04-16 08:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `medical_history_diagnoses`
--

CREATE TABLE `medical_history_diagnoses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tentative_diagnosis` text DEFAULT NULL,
  `final_diagnosis` text DEFAULT NULL,
  `prognosis` enum('Favorable','Unfavorable','Guarded') DEFAULT NULL,
  `vaccine_given` varchar(255) DEFAULT NULL,
  `prescribed_medication` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medical_history_diagnoses`
--

INSERT INTO `medical_history_diagnoses` (`id`, `tentative_diagnosis`, `final_diagnosis`, `prognosis`, `vaccine_given`, `prescribed_medication`, `created_at`, `updated_at`) VALUES
(4, 'asd', 'asd', 'Guarded', 'asd', 'asd', '2025-04-06 20:32:44', '2025-04-06 20:32:44'),
(5, 'asd', 'asd', 'Guarded', 'asd', 'asd', '2025-04-07 07:26:30', '2025-04-07 07:26:30'),
(6, 'asd', 'asd', 'Guarded', 'asd', 'asd', '2025-04-07 07:27:21', '2025-04-07 07:27:21'),
(7, 'test', 'test1', 'Favorable', 'test12', 'test223', '2025-04-15 06:35:05', '2025-04-15 06:35:05'),
(8, 'asd', 'asd', 'Guarded', 'asd', 'asd', '2025-04-16 08:18:33', '2025-04-16 08:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `medical_history_laboratory_exams`
--

CREATE TABLE `medical_history_laboratory_exams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blood_exam` tinyint(1) NOT NULL DEFAULT 0,
  `blood_exam_result` varchar(255) DEFAULT NULL,
  `distemper_test` tinyint(1) NOT NULL DEFAULT 0,
  `distemper_test_result` varchar(255) DEFAULT NULL,
  `ear_swabbing` tinyint(1) NOT NULL DEFAULT 0,
  `ear_swabbing_result` varchar(255) DEFAULT NULL,
  `ehrlichia_test` tinyint(1) NOT NULL DEFAULT 0,
  `ehrlichia_test_result` varchar(255) DEFAULT NULL,
  `heartworm_test` tinyint(1) NOT NULL DEFAULT 0,
  `heartworm_test_result` varchar(255) DEFAULT NULL,
  `parvo_test` tinyint(1) NOT NULL DEFAULT 0,
  `parvo_test_result` varchar(255) DEFAULT NULL,
  `skin_scraping` tinyint(1) NOT NULL DEFAULT 0,
  `skin_scraping_result` varchar(255) DEFAULT NULL,
  `stool_exam` tinyint(1) NOT NULL DEFAULT 0,
  `stool_exam_result` varchar(255) DEFAULT NULL,
  `ultrasound` tinyint(1) NOT NULL DEFAULT 0,
  `ultrasound_result` varchar(255) DEFAULT NULL,
  `urine_exam` tinyint(1) NOT NULL DEFAULT 0,
  `urine_exam_result` varchar(255) DEFAULT NULL,
  `vaginal_smear` tinyint(1) NOT NULL DEFAULT 0,
  `vaginal_smear_result` varchar(255) DEFAULT NULL,
  `xray` tinyint(1) NOT NULL DEFAULT 0,
  `xray_result` varchar(255) DEFAULT NULL,
  `eye_strain` tinyint(1) NOT NULL DEFAULT 0,
  `eye_strain_result` varchar(250) DEFAULT NULL,
  `other_test` varchar(255) DEFAULT NULL,
  `other_test_result` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medical_history_laboratory_exams`
--

INSERT INTO `medical_history_laboratory_exams` (`id`, `blood_exam`, `blood_exam_result`, `distemper_test`, `distemper_test_result`, `ear_swabbing`, `ear_swabbing_result`, `ehrlichia_test`, `ehrlichia_test_result`, `heartworm_test`, `heartworm_test_result`, `parvo_test`, `parvo_test_result`, `skin_scraping`, `skin_scraping_result`, `stool_exam`, `stool_exam_result`, `ultrasound`, `ultrasound_result`, `urine_exam`, `urine_exam_result`, `vaginal_smear`, `vaginal_smear_result`, `xray`, `xray_result`, `eye_strain`, `eye_strain_result`, `other_test`, `other_test_result`, `created_at`, `updated_at`) VALUES
(4, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 1, 'Negative', 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, NULL, NULL, '2025-04-06 20:32:44', '2025-04-06 20:32:44'),
(5, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 1, 'sample', NULL, NULL, '2025-04-07 07:26:30', '2025-04-07 07:26:30'),
(6, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, NULL, NULL, '2025-04-07 07:27:21', '2025-04-07 07:27:21'),
(7, 0, NULL, 1, 'Negative', 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, NULL, NULL, '2025-04-15 06:35:05', '2025-04-15 06:35:05'),
(8, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 0, NULL, NULL, NULL, '2025-04-16 08:18:33', '2025-04-16 08:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `medical_history_physical_exams`
--

CREATE TABLE `medical_history_physical_exams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `general_condition` enum('N','AB','NE') NOT NULL,
  `general_attitude` enum('N','AB','NE') NOT NULL,
  `hydration` enum('N','AB','NE') NOT NULL,
  `mucous_membrane` enum('N','AB','NE') NOT NULL,
  `head_neck` enum('N','AB','NE') NOT NULL,
  `eyes` enum('N','AB','NE') NOT NULL,
  `ears` enum('N','AB','NE') NOT NULL,
  `gastrointestinal` enum('N','AB','NE') NOT NULL,
  `urogenitals` enum('N','AB','NE') NOT NULL,
  `respiratory` enum('N','AB','NE') NOT NULL,
  `circulatory` enum('N','AB','NE') NOT NULL,
  `musculoskeleton` enum('N','AB','NE') NOT NULL,
  `lymph_nodes` enum('N','AB','NE') NOT NULL,
  `venous_return` enum('N','AB','NE') NOT NULL,
  `integumentary_skin` enum('N','AB','NE') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medical_history_physical_exams`
--

INSERT INTO `medical_history_physical_exams` (`id`, `general_condition`, `general_attitude`, `hydration`, `mucous_membrane`, `head_neck`, `eyes`, `ears`, `gastrointestinal`, `urogenitals`, `respiratory`, `circulatory`, `musculoskeleton`, `lymph_nodes`, `venous_return`, `integumentary_skin`, `created_at`, `updated_at`) VALUES
(4, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2025-04-06 20:32:44', '2025-04-06 20:32:44'),
(5, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2025-04-07 07:26:30', '2025-04-07 07:26:30'),
(6, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2025-04-07 07:27:21', '2025-04-07 07:27:21'),
(7, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2025-04-15 06:35:05', '2025-04-15 06:35:05'),
(8, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '2025-04-16 08:18:33', '2025-04-16 08:18:33');

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
(22, '2024_10_18_040010_create_admin_roles_table', 13),
(23, '2024_10_07_145653_create_user_admins_table', 14),
(27, '2024_12_06_105705_create_appointment_assigned_staffs_table', 18),
(33, '2024_09_29_140328_create_inventories_table', 21),
(34, '2024_12_21_052647_create_inventory_items_useds_table', 22),
(36, '2024_12_14_141656_create_appointment_assigned_items_table', 24),
(37, '2024_12_14_151231_create_inventory_items_table', 25),
(38, '2025_01_07_043223_create_sentiment_analyses_table', 26),
(42, '2025_01_09_125629_create_feedbacks_table', 28),
(43, '2025_02_17_194346_create_cat_breeds_table', 29),
(46, '2025_03_13_144754_create_email_otps_table', 31),
(47, '2025_03_18_091220_create_clinic_services_table', 32),
(53, '2024_08_21_050816_create_user_clients_table', 35),
(54, '2025_03_23_062355_create_sms_otps_table', 36),
(56, '2025_03_28_100224_create_medical_history_physical_exams_table', 37),
(57, '2025_03_28_100940_create_medical_history_laboratory_exams_table', 37),
(58, '2025_03_28_102522_create_medical_history_diagnoses_table', 37),
(62, '2025_04_05_144905_create_clinic_service_types_table', 40),
(64, '2025_03_28_103210_create_medical_histories_table', 42),
(65, '2025_04_11_050656_create_pet_types_table', 43),
(66, '2025_03_23_143405_create_pet_breeds_table', 44),
(68, '2024_10_01_032309_create_pets_table', 45),
(69, '2025_02_24_140148_create_inventory_histories_table', 46),
(70, '2024_09_30_090820_create_appointments_table', 47);

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
(111, 'App\\Models\\user_clients', 555538, 'main', 'd62862a975db73a87ef5fb5d618bf17433e0283a48db0631713ce5b66ad52609', '[\"*\"]', '2025-04-10 00:51:55', NULL, '2025-04-08 14:38:02', '2025-04-10 00:51:55'),
(118, 'App\\Models\\user_clients', 923394, 'main', 'c882718e08d8a0f2603f6c68cafeacf981b5aacb5477c1abc1353b04ccfbad2c', '[\"*\"]', '2025-04-11 02:57:33', NULL, '2025-04-11 02:57:28', '2025-04-11 02:57:33'),
(120, 'App\\Models\\user_clients', 179411, 'main', '2fc0d919a59b2270beaf08c44f8c3a2a4b252c789a7ed599988eb1fc3867004b', '[\"*\"]', '2025-04-11 03:10:28', NULL, '2025-04-11 03:10:28', '2025-04-11 03:10:28'),
(124, 'App\\Models\\user_clients', 640452, 'main', '1f986b01b179daaa8ea96dbcf419af293bb16359da6b4beba34529e96704946d', '[\"*\"]', '2025-04-11 03:26:37', NULL, '2025-04-11 03:26:33', '2025-04-11 03:26:37'),
(125, 'App\\Models\\user_clients', 337715, 'main', 'd10639a5f0f5a1bcd586195e29c1666daf69eb36ada66d4afa5373600de98e50', '[\"*\"]', '2025-04-11 03:30:04', NULL, '2025-04-11 03:28:36', '2025-04-11 03:30:04'),
(129, 'App\\Models\\user_clients', 179411, 'main', '77560570a3d3a33952fe17047c86486521c60a085bc5eff578ceda6c7e464311', '[\"*\"]', '2025-04-11 07:52:52', NULL, '2025-04-11 07:47:44', '2025-04-11 07:52:52'),
(146, 'App\\Models\\user_clients', 18533, 'main', '5f48423ad610b2706f1d5ab02b3d56ecb897dbd58ee5ddfbf892bfb3ada0183d', '[\"*\"]', '2025-04-15 06:35:12', NULL, '2025-04-15 06:35:12', '2025-04-15 06:35:12'),
(147, 'App\\Models\\user_clients', 887421, 'main', 'b4b202cc0d02f89d28372ec46dd0e1dfd0dcbda17ffaf227285107e941732af9', '[\"*\"]', '2025-04-15 15:48:13', NULL, '2025-04-15 15:02:29', '2025-04-15 15:48:13'),
(164, 'App\\Models\\user_admins', 111111, 'main', 'dc3da55a57bc0748c65707d33dfe7b726c0df0628895864e01eedd405ecdf75b', '[\"*\"]', '2025-04-20 01:38:56', NULL, '2025-04-20 01:07:15', '2025-04-20 01:38:56');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` varchar(6) NOT NULL,
  `client` varchar(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` bigint(20) UNSIGNED DEFAULT NULL,
  `breed` bigint(20) UNSIGNED DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `dob` date DEFAULT NULL,
  `picture` longtext NOT NULL DEFAULT 'defaultPetPic.jpg',
  `label` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `client`, `name`, `type`, `breed`, `gender`, `status`, `dob`, `picture`, `label`, `created_at`, `updated_at`) VALUES
('179293', '178427', 'bella', 2, 342, 'Female', 'active', '2025-02-20', '1FjHjnlaCrQa85ckyLy0k0Yg.png', NULL, '2025-04-11 09:59:08', '2025-04-11 09:59:08'),
('348884', '887421', 'Yuki', 2, 305, 'Female', 'active', '2023-06-20', 'rMubj68tIxbe8JoPswvL2ECs.jpg', NULL, '2025-04-15 15:05:11', '2025-04-15 15:05:11'),
('359635', '887421', 'Yuki', 2, 316, 'Female', 'active', '2024-06-20', '1ZlhgCNKkeeyLK3FgscDseLN.jpg', NULL, '2025-04-15 15:45:42', '2025-04-15 15:45:42'),
('361654', '637862', 'Buck', 1, 101, 'Male', 'active', '2025-04-13', 'Rs4vepZy3KXXxSFNJJ0nD3Hp.png', NULL, '2025-04-13 15:13:34', '2025-04-13 15:13:34'),
('379017', '936822', 'Heart', 1, 172, 'Female', 'active', '2022-12-10', 'defaultPetPic.jpg', NULL, '2025-04-10 23:00:21', '2025-04-10 23:00:21'),
('387381', '936822', 'Lucky', 1, 247, 'Male', 'active', '2021-12-09', 'defaultPetPic.jpg', NULL, '2025-04-10 22:44:58', '2025-04-10 23:07:35'),
('477569', '936822', 'Chuchay', 2, 247, 'Female', 'active', '2002-09-29', 'qiMjuOOlVyOQnQ3aVUC95X08.jpg', NULL, '2025-04-11 07:54:13', '2025-04-16 18:12:08'),
('583385', '18533', '', 1, 6, 'Male', 'active', '2025-04-15', 'defaultPetPic.jpg', NULL, '2025-04-15 06:25:58', '2025-04-15 06:25:58'),
('848559', '936822', 'asdasdad', 1, 1, 'Male', 'active', '2020-04-17', 'defaultPetPic.jpg', NULL, '2025-04-16 18:12:52', '2025-04-16 18:12:52'),
('962448', '18533', 'Tester', 1, 83, '', 'active', '2025-04-02', 'defaultPetPic.jpg', NULL, '2025-04-15 06:26:46', '2025-04-15 06:26:46');

-- --------------------------------------------------------

--
-- Table structure for table `pet_breeds`
--

CREATE TABLE `pet_breeds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `breed` varchar(255) NOT NULL,
  `pet_type` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pet_breeds`
--

INSERT INTO `pet_breeds` (`id`, `breed`, `pet_type`, `created_at`, `updated_at`) VALUES
(1, 'Affenpinscher', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(2, 'Afghan Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(3, 'Airedale Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(4, 'Akita', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(5, 'Alaskan Klee Kai', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(6, 'Alaskan Malamute', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(7, 'American Bulldog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(8, 'American English Coonhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(9, 'American Eskino Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(10, 'American Foxhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(11, 'American Hairless Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(12, 'American Leopard Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(13, 'American Staffordshire Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(14, 'American Water Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(15, 'Anatolian Shepherd Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(16, 'Appenzeller Sennenhund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(17, 'Aspin', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(18, 'Australian Cattle Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(19, 'Australian Kelpie', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(20, 'Australian Shepherd', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(21, 'Australian Stumpy Tail Cattle Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(22, 'Australian Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(23, 'Azawakh', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(24, 'Barbado da Terceira', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(25, 'Barbet', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(26, 'Basenji', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(27, 'Basset Fauve de Bretagne', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(28, 'Basset Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(29, 'Bavarian Mountain Scent Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(30, 'Beagle', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(31, 'Bearded Collie', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(32, 'Beauceron', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(33, 'Bedlington Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(34, 'Belgian Laekenois', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(35, 'Belgian Malinois', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(36, 'Belgian Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(37, 'Belgian Tervuren', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(38, 'Bergamasco Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(39, 'Berger Picard', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(40, 'Bernese Mountain Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(41, 'Bichon Frise', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(42, 'Biewer Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(43, 'Black and Tan Coonhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(44, 'Black Russian Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(45, 'Bloodhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(46, 'Blue Picardy Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(47, 'Bluetick Coonhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(48, 'Boerbel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(49, 'Bohemian Shepherd', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(50, 'Bolognese', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(51, 'Border Collie', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(52, 'Border Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(53, 'Borzoi', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(54, 'Boston Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(55, 'Bouvier des Ardennes', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(56, 'Bouvier des Flandres', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(57, 'Boxer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(58, 'Boykin Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(59, 'Bracco Italiano', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(60, 'Braque du Bourbonnais', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(61, 'Braque Francais Pyrenean', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(62, 'Braque Saint Germain', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(63, 'Brazillian Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(64, 'Briard', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(65, 'Brittany', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(66, 'Broholmer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(67, 'Brussels Griffon', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(68, 'Bull Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(69, 'Bulldog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(70, 'Bullmastiff', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(71, 'Cain Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(72, 'Canaan Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(73, 'Canadian Eskimo Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(74, 'Cane Corso', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(75, 'Cardian Welsh Corgi', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(76, 'Carolina Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(77, 'Catahoula Leopard Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(78, 'Caucasian Shepherd Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(79, 'Cavalier King Charles Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(80, 'Central Asian Shepherd Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(81, 'Cesky Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(82, 'Chesapeake Bay Retriever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(83, 'Chihuahua', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(84, 'Chinese Crested', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(85, 'Chinese Sharpei', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(86, 'Chinook', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(87, 'Chow Chow', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(88, 'Cirneco dell`Etna', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(89, 'Clumber Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(90, 'Cocker Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(91, 'Collie', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(92, 'Coton de Tulear', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(93, 'Croatian Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(94, 'Curly-Coated Retriever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(95, 'Czechoslovakian Vlciak', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(96, 'Dachshund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(97, 'Dalmatian', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(98, 'Dandie Dinmont Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(99, 'Danish-Swedish Farmdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(100, 'Deutscher Wachtelhund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(101, 'Doberman Pinscher', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(102, 'Dogo Argentino', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(103, 'Dogue de Bordeaux', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(104, 'Drentsche Patrijshond', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(105, 'Drever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(106, 'Dutch Shepherd', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(107, 'English Cocker Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(108, 'English Foxhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(109, 'English Setter', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(110, 'English Sprinver Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(111, 'English Toy Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(112, 'Entlebucher Mountain Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(113, 'Estrela Mountain Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(114, 'Eurasier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(115, 'Field Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(116, 'Finnish Lapphund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(117, 'Boxer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(118, 'Finnish Spitz', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(119, 'Flat-Coated Retriever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(120, 'French Bulldog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(121, 'French Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(122, 'German Longhaired Pointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(123, 'German Pinscher', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(124, 'German Sheep Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(125, 'German Shorthaired Pointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(126, 'German Spitz', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(127, 'German Wirehaired Pointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(128, 'Giant Schnauzer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(129, 'Glen of Imaal Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(130, 'Golden Retriever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(131, 'Gordon Setter', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(132, 'Grand Basset Griffon Venden', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(133, 'Great Dane', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(134, 'Great Pyrenees', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(135, 'Greater Swiss Mountain Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(136, 'Greyhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(137, 'Hamiltonstovare', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(138, 'Hanoverian Scenthound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(139, 'Harrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(140, 'Havanese', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(141, 'Hokkaido', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(142, 'Hovawart', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(143, 'Ibizan Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(144, 'Icelandic Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(145, 'Irish Red and White Setter', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(146, 'Irish Setter', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(147, 'Irish Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(148, 'Irish Water Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(149, 'Irish Wolfhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(150, 'Italian Greyhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(151, 'Jagdterrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(152, 'Japanese Akitainu', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(153, 'Japanese Chin', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(154, 'Japanese Spitz', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(155, 'Japanese Terriers', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(156, 'Kai Ken', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(157, 'Karelian Bear Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(158, 'Keeshond', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(159, 'Kerry Blue Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(160, 'Kishu Ken', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(161, 'Komondor', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(162, 'Korean Jindo Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(163, 'Kromfohrlander', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(164, 'Kuvasz', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(165, 'Labrador Retriever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(166, 'Lagotton Romagnolo', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(167, 'Lakeland Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(168, 'Lancashire Heeler', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(169, 'Lapponian Herder', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(170, 'Large Munsterlander', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(171, 'Leonberger', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(172, 'Lhasa Apso', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(173, 'Lwchen', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(174, 'Maltese', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(175, 'Manchester Terrier (Standard)', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(176, 'Manchester Terrier (Toy)', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(177, 'Mastiff', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(178, 'Miniature American Shepherd', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(179, 'Miniature Bull Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(180, 'Miniature Pinscher', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(181, 'Miniature Schnauzer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(182, 'Mountain Cur', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(183, 'Mudi', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(184, 'Mutt (Mixed Breed)', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(185, 'Neapolitan Mastiff', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(186, 'Nederlandse Kooikerhondje', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(187, 'Newfoundland', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(188, 'Norfolk Terriers', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(189, 'Norrbottenspets', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(190, 'Norwegian Buhund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(191, 'Norwegian Elkhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(192, 'Norwegian Lundehund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(193, 'Norwich Terriers', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(194, 'Nova Scotia Duck Tolling Retriever', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(195, 'Old English Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(196, 'Other', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(197, 'Otterhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(198, 'Papillon', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(199, 'Parson Russell Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(200, 'Pekingese', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(201, 'Pembroke Welsh Corgi', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(202, 'Peruvian Inca Orchid', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(203, 'Petit Basset Griffon Venden', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(204, 'Pharaoh Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(205, 'Plott Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(206, 'Pointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(207, 'Polish Lowland Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(208, 'Pomeranian', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(209, 'Pont-Audemer Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(210, 'Poodle (Miniature)', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(211, 'Poodle (Standard)', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(212, 'Poodle (Toy)', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(213, 'Porcelaine', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(214, 'Portuguese Podengo', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(215, 'Portuguese Podengo Pequeno', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(216, 'Portuguese Pointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(217, 'Portuguese Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(218, 'Portuguese Water Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(219, 'Presa Canario', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(220, 'Pudelpointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(221, 'Pug', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(222, 'Puli', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(223, 'Pumi', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(224, 'Pyrenean Mastiff', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(225, 'Pyrenean Shepherd', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(226, 'Rafeiro do Alentejo', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(227, 'Rat Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(228, 'Redbone Coonhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(229, 'Rhodesian Ridgeback', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(230, 'Romanian Carpathian Shepherd', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(231, 'Romanian Mioritic Shepherd Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(232, 'Rottweiler', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(233, 'Russell Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(234, 'Russian Toy', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(235, 'Russkaya Tsvetnaya Bolonka', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(236, 'Saint Bernard', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(237, 'Saluki', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(238, 'Samoyed', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(239, 'Schapendoes', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(240, 'Schipperke', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(241, 'Scottish Deerhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(242, 'Scottish Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(243, 'Sealyham Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(244, 'Segugio Italiano', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(245, 'Shetland Sheepdog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(246, 'Shiba Inu', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(247, 'Shih Tzu', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(248, 'Shikoku', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(249, 'Siberian Husky', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(250, 'Silky Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(251, 'Skye Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(252, 'Sloughi', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(253, 'Slovakian Wirehaired Pointer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(254, 'Slovensky Cuvac', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(255, 'Slovensky Kopov', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(256, 'Small Munsterlander', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(257, 'Smooth Fox Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(258, 'Soft Coated Wheaten Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(259, 'Spanish Mastiff', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(260, 'Spanish Water Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(261, 'Spinone Italiano', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(262, 'Stabyhoun', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(263, 'Staffordshire Bull Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(264, 'Standard Schnauzer', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(265, 'Sussex Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(266, 'Swedish Lapphund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(267, 'Swedish Vallhund', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(268, 'Taiwan Dog', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(269, 'Teddy Roosevelt Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(270, 'Thai Bangkaew', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(271, 'Thai Ridgeback', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(272, 'Tibetan Mastiff', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(273, 'Tibetan Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(274, 'Tibetan Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(275, 'Tornjak', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(276, 'Tosa', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(277, 'Toy Fox Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(278, 'Transylvanian Hound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(279, 'Treeing Tennessee Brindle', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(280, 'Treeing Walker Coonhound', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(281, 'Vizsla', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(282, 'Volpino Italiano', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(283, 'Weimaraner', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(284, 'Weksh Springer Spaniel', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(285, 'Welsh Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(286, 'West Highland White Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(287, 'Wetterhoun', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(288, 'Whippet', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(289, 'Wire Fox Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(290, 'Wirehaired Pointing Griffon', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(291, 'Wirehaired Vizsla', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(292, 'Working Kelpie', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(293, 'Xoloitzcuintli', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(294, 'Yakutian Laikas', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(295, 'Yorkshire Terrier', 1, '2025-04-10 21:25:00', '2025-04-10 21:25:00'),
(296, 'Abyssinian', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(297, 'American Bobtail', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(298, 'American Curl', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(299, 'American Shorthair', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(300, 'American Wirehair', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(301, 'Balinese', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(302, 'Bengal', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(303, 'Birman', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(304, 'Bombay', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(305, 'British Shorthair', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(306, 'Burmese', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(307, 'Burmilla', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(308, 'Chartreux', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(309, 'Colorpoint Shorthair', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(310, 'Cornish Rex', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(311, 'Devon Rex', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(312, 'Egyptian Mau', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(313, 'European Burmese', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(314, 'Exotic', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(315, 'Havana Brown', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(316, 'Japanese Bobtail', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(317, 'Khao Manee', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(318, 'Korat', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(319, 'LaPerm', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(320, 'Lykoi', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(321, 'Maine Coon Cat', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(322, 'Manx', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(323, 'Moggy (Mixed Breed)', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(324, 'Norwegian Forest Cat', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(325, 'Ocicat', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(326, 'Oriental', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(327, 'Other', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(328, 'Persian', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(329, 'Puspin', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(330, 'RagaMuffin', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(331, 'Ragdoll', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(332, 'Russian Blue', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(333, 'Scottish Fold', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(334, 'Selkirk Rex', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(335, 'Siamese', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(336, 'Siberian', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(337, 'Singapura', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(338, 'Somali', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(339, 'Sphynx', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(340, 'Tonkinese', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(341, 'Toybob', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(342, 'Turkish Angora', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48'),
(343, 'Turkish Van', 2, '2025-04-10 21:26:48', '2025-04-10 21:26:48');

-- --------------------------------------------------------

--
-- Table structure for table `pet_types`
--

CREATE TABLE `pet_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pet_types`
--

INSERT INTO `pet_types` (`id`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Dog', '2025-04-11 05:11:47', '2025-04-11 05:11:47'),
(2, 'Cat', '2025-04-11 05:11:47', '2025-04-11 05:11:48');

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
(1, 'Pricing', 33.33, 20.59, 46.08, 68, 42, 94, '[\"mabilis lang ang pila kaya nakakatuwa\",\"ang tauhan ay palaging mabilis sumagot\",\"the service is high level\",\"the prices is so budget friendly\",\"i would recommend this clinic since they are so budget friendly\",\"sobrang abot kaya ang kanilang mga presyo\",\"their service is high quality\",\"the provided care is high quality\",\"i had the seamless transaction on their system\",\"i experienced really smooth transaction on their system\",\"i am happy because of how smooth the transaction is on their system\",\"everyone was extra ordinary\",\"napakamura ng presyo kaya balik ako nang balik dito\",\"the doctor is extra ordinary\",\"ang mga tauhan ay mabilis sumagot sa mga katanungan kaya mabilis ang proseso\",\"the pricing is really affordable\",\"i love how affordable their services\",\"this clinic provides high quality care\",\"their group provides high quality service\",\"very high quality service\",\"their pricing is really affordable\",\"the prices of their services were extremely affordable\",\"the prices are competitive\",\"napaka gaan sa bulsa ng presyo\",\"the services available are really affordable\",\"i am happy with how affordable the prices are\",\"mararamdaman mong mahal din ng mga tauhan ang iyong alaga\",\"the transaction through their booking system was very smooth and fast\",\"their services were very affordable yet of high quality\",\"their prices were fair and they do a great job at caring for your animals\",\"lahat sa staff nila ay mabait at matulungin mabilis nilang natugunan ang mga problema namin\",\"very affordable and accessible\",\"budget friendly prices for their services\",\"mabilis at maayos sila gumawa\",\"i love how fair and justifiable their prices are\",\"the treatment plan was well explained and affordable\",\"kahit maraming pasyente sa klinika mabilis at dekalidad parin ang kanilang serbisyo\",\"their fees are perfect for pet owners on a budget\",\"its rare to find such fair fees for high quality veterinary services\",\"the clinic is always clean and smells fresh even in high traffic areas\",\"their prices are very budget friendly\",\"ang kanilang tauhan ay laging malugod sa pagtanggap ng mga kliyente\",\"mabilis at tapat ang kanilang serbisyong inaalok\",\"napakaayos mabilis at husay ng kanilang sistema\",\"everyone here is very friendly and they always go the extra mile\",\"their prices are competitive\",\"their prices are so budget friendly\",\"low cost clinic which is really great\",\"their pricing is really fair\",\"their prices are really economical\",\"economical prices\",\"napaka patas ng kanilang mga presyo\",\"extremely affordable prices\",\"ang kanilang pagpresyo ay mura\",\"very affordable prices\",\"so affordable prices\",\"their pricing is very fair\",\"very budget friendly prices\",\"so value for money pricing\",\"very economical pricing\",\"very cost effective pricing\",\"very low cost prices\",\"i am on a fixed budget so this was financially challenging\",\"the service is terrific and very competitive\",\"very competitive staffs\",\"their services is really so affordable\",\"their services is affordable\",\"extremely affordable services\"]', '[\"may mga nakatalagang presyo sa mga gamot\",\"may mga nakalistang presyo sa mga gamot\",\"their pricing could benefit from a multi-pet discount plan\",\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",\"ipinaliwanag ng doktor sa akin ang lahat ng gastos bago gumawa ng anuman\",\"ang mga presyo ay katulad ng iba\",\"ang singil ay ayon sa kanilang itinakdang presyo\",\"mayroon silang listahan ng mga presyo\",\"there is a need to allot an extra time when waiting\",\"the pricing is on the higher side and offering a multi-pet discount plan could be beneficial\",\"i have a speedy transaction on their booking system\",\"the amount charged was different from the price listed on their website\",\"medyo mataas ang presyo\",\"medyo mataas ang presyo\",\"gagamitin ko sila bilang aking regular na beterinaryo\",\"the cost of services here is higher compared to others\",\"the pricing is fair\",\"mas mataas ang presyo ng serbisyo kumpara sa iba\",\"reasonable ang presyo\",\"ang presyo para sa mga bakuna ay mas mataas kumpara sa iba\",\"makatarungang presyo\",\"ang presyo ng kanilang serbisyo ay medyo mataas\",\"mataas ang kanilang presyo\",\"i wish the prices were more affordable\",\"kahit madaling procedure mataas pa rin ang presyo\",\"ang aking alaga ay gumaling nang mabilis\",\"medyo mataas ang presyo\",\"laging may dagdag na bayad na napakamahal\",\"you get the value for the price\",\"what cost me 2400 for 2 tabs there i got 30 tabs at Costco for 1000\",\"may kataasan ang presyo\",\"this was a $66 office charge which was followed by an additional $65 for NexGard\",\"fair pricing\",\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",\"tila kulang sa kaalaman ang doktor\",\"medyo mataas ang presyo\",\"medyo may kataasan ang presyo\",\"may kataasan ang presyo\",\"halos lahat ng ginagawa nila may dagdag bayad\",\"nakahanap kami ng ibang option na mas mura\",\"ang presyo ay ayon sa pamantayan\",\"the cost of their services aligns with market standards\"]', '[\"parang sobrang mahal kumpara sa ibang clinic\",\"hindi makatuwiran ng presyo ng serbisyo nila nakakadismaya\",\"i was charged extra fees without any explanation which is unacceptable\",\"sobrang mahal kahit maliit lang ang problema ng alaga mo\",\"nagulat kami sa presyo ng euthanization dahil ang mahal\",\"they charge for every little thing which made it overpriced\",\"we found a smaller vet that is much less expensive\",\"they upsell unnecessary treatments to inflate the bill so overpriced\",\"hindi praktical ang presyo\",\"nakahanap kami ng iba na mas mura dahil sobrang mahal dito\",\"ang daming problema sa serbisyo pero ang mahal\",\"nagulat kami sa presyo ng euthanization dahil ang ibang clinic ay hindi nagpapabayad sa euthanization\",\"hindi sulit ang presyo\",\"prices are ridiculously high for some services\",\"their fees for emergency services are outrageously high\",\"their pricing is outrageously expensive\",\"i did not like having to pay a premium for emergency service\",\"they charge for consultations which is unacceptable\",\"nakakabahala ang taas ng presyo\",\"pet care is very expensive\",\"the medications they sell are double the price of regular pharmacies\",\"grabe ang taas ng presyo\",\"napakamahal ng presyo kumpara sa iba\",\"it is really expensive than usual\",\"they are charging me extra costs for a follow up consultation is unacceptable\",\"hindi justified ang presyo\",\"hindi sulit ang bayad sa kanila\",\"it is so expensive\",\"even basic pet supplies at their clinic are way overpriced\",\"their regular cost is too high\",\"hindi sulit ang binayad ko ang mahal\",\"ang taas nila maningil\",\"hindi sulit ang presyo ng packages\",\"hindi sulit ang presyo ng kanilang serbisyo\",\"their prices are too expensive for the quality of their work\",\"the clinic charges a premium so we can call it overpriced\",\"sa sobrang mahal mas marami ka mahahanap na ibang mura\",\"they charge for re checks which is ridiculous\",\"hindi tumutugma ang presyo sa aking inaasahan\",\"expensive stuff\",\"ang mahal ng presyo\",\"their spaying and neutering services are overpriced compared to other clinics\",\"parang mapepera lang ang makakapasok dito madalas sa sobrang mahal\",\"napaka taas ng presyo kahit wala namang special na serbisyo\",\"hindi tugma ang presyo at serbisyo\",\"it is ridiculously expensive\",\"hindi abot kaya ang presyo nila\",\"the consultation fees are unreasonably high compared to other clinics in the area\",\"sobrang mahal at bagal ng serbisyo nila\",\"hindi sulit ang presyo sa kalidad ng serbisyo na binibigay nila\",\"sobrang gaan sa bulsa ng presyo\",\"costs are very high for some services\",\"sobrang mahal ng serbisyo\",\"the services they provide are very expensive\",\"hindi makatwiran ang presyo\",\"i have never seen a clinic charge this much for basic services so unacceptable\",\"i feel like they are taking advantage of pet owners with these sky high prices\",\"it is so overpriced it felt like a scam\",\"their services are extremely expensive\",\"laging mas mahal ang bill kaysa sa estimate\",\"we found a smaller vet that is much less expensive\",\"hindi abot kaya ang presyo para sa lahat\",\"we were surprised about the cost of euthanization as most vets does not charge for euthanization\",\"their medication is way overpriced\",\"the overall cost is so much expensive than the other clinics\",\"we were surprised about the cost of euthanization as most vets does not charge for euthanization\",\"it is super expensive\",\"hindi makatarungan ang pag ka mahal ng presyo\",\"the prices for pet grooming here are insanely high\",\"i had to pay a consultation fee just to get a prescription which is ridiculous\",\"the pricing for cleanings is way above average and not justified so expensive\",\"the prices are unbelievably high\",\"this center was not equipped to deal with emergency situations which is not good\",\"the medication costs 124 which is expensive\",\"napaka baba ng kalidad ng serbisyo pero sobrang mahal\",\"hindi sulit sa bulsa ang mahal para sa binigay nilang serbisyo\",\"parang may hidden charges sa taas ng singil\",\"the pricing for diagnostic tests is absurdly expensive\",\"this center was not equipped to deal with emergency situations which looks bad\",\"hindi vina value ng clinic ang iyong oras\",\"this clinic is very expensive\",\"ang taas ng singil kahit hindi sulit\",\"hindi worth it ang presyo dahil sobrang mahal\",\"the prices are very high\",\"hindi kayang abutin ang presyo para gawing buwan buwan sa sobrang mahal\",\"sobrang mahal kala mo ginto ang binebenta\",\"i did not like having to pay a premium for emergency service\",\"they refused to provide a detailed breakdown of the overpriced cost\",\"hindi customer friendly ang presyo nila sa sobrang mahal\",\"i paid a huge amount but did not feel like I got value for my money which is disappointing\",\"quite expensive\",\"mahal ng lahat ang kanilang trabaho\",\"parang ginagatasan lang kami sa sobrang mahal\",\"the cost of boarding my pet was so high I could not afford it\"]', '2025-04-16 01:46:28', '2025-04-16 01:46:28');
INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(2, 'Vet Care', 63.81, 23.2, 12.99, 737, 268, 150, '[\"tinulungan nila ang aso ko para gumanda ang kalusugan\",\"the staff and physicians excellent very caring and professional\",\"staff provided loving care which is heartwarming\",\"i am so grateful to the professional and knowledgeable staff\",\"the doctor is the best\",\"very professional staff\",\"the doctor is very reliable\",\"the staff was super nice professional and caring\",\"great friendly and very professional staff\",\"everyone at the facility was super nice professional and caring\",\"everyone was friendly caring and very professional they answered all my questions and good took care of my two kittens\",\"ang mga doktor ay napakapropesyunal\",\"i am so grateful the to professional and greatly knowledgeable staff\",\"the doctor is so sincere\",\"the doctor is an excellent veterinarian\",\"the doctor is great since he is caring and compassionate\",\"this clinic is awesome\",\"ang tauhan ay taospusong nagmamalasakit sa lahat ng ating mga hayop\",\"excellent service\",\"everyone at the facility was super nice professional and caring\",\"the staff and physicians are excellent as they are very a caring professional\",\"the staffs are excellent as they are very caring and professional\",\"everyone was caring and very professional they answered all my questions\",\"the level of information and care is fantastic\",\"ang doktor ay mahabagin at pinanatag niya ang aming loob\",\"napakamatulungin ng mga doktor\",\"i like how they provide a very prompt service\",\"doctor is the very caring and compassionate\",\"they are very professional\",\"all of the staff took great care of our puppy\",\"the staff is very professional\",\"the doctors are excellent very caring professional\",\"i love how caring the doctor is\",\"my cats been better compared to my other vet of 4 years\",\"the doctor is very understanding\",\"i love how everyone took good care of my two kittens\",\"ang mga tauhan ay napaka galing\",\"the doctors are very professional\",\"the staff is very professional yet friendly and caring\",\"napakamatulungin at mabait ng doctor\",\"the staffs are very supportive\",\"the staff are really a great support\",\"the doctor is very knowledgeable\",\"the service is terrific and the staff are very professional\",\"the doctor is very friendly\",\"sobrang maasahan ang mga doktor dito\",\"the staffs are very professional\",\"i am grateful to the professional and knowledgeable staff\",\"everyone was caring and very professional they answered all my questions\",\"the service is terrific\",\"the doctor is very knowledgeable\",\"the doctor is really dependable\",\"the doctor is very meticulous which is really good\",\"the doctor is extremely sincere\",\"the doctor is so respectful\",\"the doctor is very skilled\",\"the doctor is extremely compassionate\",\"everyone was really professional\",\"the doctor is highly skilled\",\"the doctor is very considerate\",\"the doctor is very confident\",\"the doctor is very detailed when explaining\",\"the doctor is an excellent veterinarian\",\"the doctor is really great\",\"the doctor is really passionate\",\"this clinic is really awesome\",\"this clinic is really competetive when it comes to service\",\"the doctor is really dependable\",\"the doctor in this clinic is talented\",\"dr danowitz is an excellent veterinarian\",\"ang mga doktor dito ay sobrang matalino\",\"the doctor is so professional\",\"the doctor is really dependable\",\"the doctor is very adept on his field\",\"mapagkakatiwalaan ang doktor sa taglay niyang talino\",\"i love how procedural the doctor when diagnosing\",\"the doctor is caring and compassionate\",\"everyone was very professional\",\"very professional staff\",\"the service is really excellent\",\"the staff was really professional and the facility are welcoming\",\"so far so good everyone was professional\",\"the doctor is excellent\",\"they really took their time examing my pet which is commendable\",\"the staff is very sweet with my pet\",\"i am really happy with their service\",\"the doctor is the greatest man\",\"ako ay masaya dahil pinakinggan ako ng doktor\",\"the doctor is knowledgeable and caring\",\"the doctor very caring and professional\",\"the doctor greatly helped us\",\"the doctor is very perceptive\",\"the doctor is really passionate\",\"the doctor embraces challenges which is a good thing\",\"the staffs are friendly and very professional\",\"this clinic is really transparent with everything\",\"courteous and professional staff\",\"the doctor is careless\",\"the service is impressive\",\"napaka ayos ng serbisyo dito\",\"the doctor really took great care of my 2 kittens\",\"the doctor is extremely knowledgeable\",\"doctor is genuine\",\"extremely supportive staff\",\"great service\",\"the staffs are really professional\",\"everyone was very supportive\",\"the doctor is very goal oriented\",\"the doctor caring and compassionate\",\"i am so grateful to these professional staff\",\"everyone answered all my questions and took good care of my two kittens\",\"excellent service\",\"ang tauhan ay nagmamalasakit sa lahat ng ating mga hayop\",\"the doctor is an excellent veterinarian he is knowledgeable and caring\",\"the staff and physicians are very caring and professional\",\"i am so grateful to the professional doctors\",\"the service is extremely good\",\"i would highly recommend this clinic\",\"very supportive staffs\",\"the service is high level\",\"the service is terrific\",\"ang tauhan ay nagmamalasakit sa lahat ng ating mga hayop\",\"i am so grateful so to the professional and greatly knowledgeable staff\",\"the doctor is compassionate\",\"very friendly and professional staffs\",\"the doctor is really articulate\",\"the doctor explains everything so well\",\"the clinic is really business driven\",\"the doctor is caring\",\"the staffs provide excellent service\",\"this clinic is so customer focused\",\"the clinic is really strategic so there are no backlogs\",\"the doctor is really resourceful\",\"i would recommend this clinic since they are so budget friendly\",\"the doctor really analayzes things so well\",\"the doctor is skilled\",\"this clinic is so productive\",\"their service is high quality\",\"the provided care is high quality\",\"this clinic is results driven\",\"the doctor is very nice to my pet\",\"this clinic is really consistent\",\"you really can depend on this clinic\",\"this clinic is trustworthy\",\"exceptional service\",\"the doctor is exceptional\",\"i am happy with the doctor\",\"wonderful service\",\"everyone was eager to treat your pet\",\"this clinic is eager to help\",\"sa lahat ng napuntahan kong clinic ito ang pinakamaganda\",\"very negligent doctor\",\"very innovative clinic\",\"the service is fantastic\",\"everyone at the facility was super professional and caring\",\"outstanding service\",\"so far so good everyone was friendly and professional\",\"the staff are excellent very caring and professional\",\"the doctor is knowledgeable\",\"the equipment in this clinic is so clean\",\"the doctor is outstanding\",\"i am happy with the provided care\",\"the doctor is very trustworthy\",\"everyone at the facility was nice super professional and trustworthy\",\"the staffs are dedicated on providing good service\",\"marvelous service\",\"the doctor is so gentle\",\"the staff is very professional\",\"doctor is very great\",\"the service is outstanding\",\"so far so good everyone was gentle and professional\",\"napakamatulungin at mabait ng doctor\",\"very professional staff\",\"the doctor is an excellent veterinarian\",\"the staffs are very friendly and professional\",\"dr danowitz is an excellent veterinarian\",\"the doctor truly cares\",\"the doctor is really commendable\",\"the service is great\",\"they answered all my questions and take good care of my two kittens\",\"the doctor is the greatest\",\"i am so grateful to the professional and greatly knowledgeable staff\",\"the staff is very professional and caring\",\"the doctor is knowledgeable\",\"the staff is very very professional\",\"this clinic is so results driven which is why they are good\",\"their service is admirable\",\"the staff is very professional and accommodating\",\"this clinic is top notch\",\"the service is superb\",\"this clinic is so remarkable\",\"the service is impeccable\",\"the service is awesome\",\"ang tauhan ay palaging mabait taospusong nakikiramay nakikiramay at nagmamalasakit sa lahat ng ating mga hayop\",\"the doctor is compassionate\",\"their service is exemplary\",\"extremely flawless service\",\"the doctor is proficient\",\"napaka galing ng mga doktor\",\"the doctor is an outstanding vet\",\"i highly recommend this top notch clinic\",\"the doctor is exemplary\",\"the doctor is so gentle and professional\",\"doctors and staff are always very supportive\",\"the doctor is perfect\",\"they are extremely skilled at providing care\",\"the doctor is the greatest caring and compassionate\",\"their knowledge on giving care is top notch\",\"i love how skilled the staffs are at providing care\",\"the doctor are so skilled\",\"the doctor is so skilled i admire him\",\"very friendly and knowledgeable doctor\",\"ang tauhan ay palaging handang magbigay tulong\",\"the service is top tier\",\"the service is the best out there\",\"very accommodating clinic\",\"very professional staff\",\"the doctor is caring and compassionate\",\"everyone at the facility was super professional nice and caring\",\"masasabi kong sila ang pinaka magaling na doktor sa lahat\",\"the doctor is incredible at providing care\",\"the doctor is exceptional at providing care\",\"this clinic is exceptional\",\"prompt service and great staff\",\"their staff is great at providing care\",\"they are extremely supportive\",\"their service is so consistent\",\"the service is great\",\"the service is the best\",\"the staffs provide phenomenal service\",\"the doctors provide amazing care\",\"the staffs are amazing in terms of customer service\",\"the doctor is gentle\",\"the doctor is supportive\",\"the doctor is patient focused\",\"the doctor is superior in terms of providing great care\",\"ang doktor ay gagawin ang lahat para intindihin ka\",\"everyone was very patient centered\",\"the doctor is mindful\",\"the service is perfect\",\"perfect service\",\"they provide heartfelt care\",\"they provide perfect service\",\"the staffs provide well polished service\",\"pinabayaan ng doktor ang aking alaga\",\"the doctor is really admirable\",\"the staff is really skilled and professional\",\"masaya ako sa binigay nilang serbisyo\",\"their service is seamless\",\"the service is seamless and perfect\",\"the doctor are very knowledgeable\",\"the service here is special\",\"they provide a detailed oriented service\",\"the doctor is very diligent\",\"they are very supportive\",\"ang doktor ay nagbibigay ng napakagandang payo kung paano ang dapat gawin\",\"the doctor is very competent\",\"the staff provides top notch service\",\"the staff and doctors provide top not service\",\"ang kaalaman ng doktor ay pinakamataas\",\"the doctor is extra ordinary\",\"they provide top notch care\",\"the grooming for my dog went well\",\"the grooming for my pet went great\",\"i love the results of the service provided\",\"the doctor is literally a genius\",\"extremely reliable clinic\",\"ocvh was so thoughtful and professional\",\"their group is very consistent at provide good quality service\",\"extremely good customer service\",\"i love how affordable their services\",\"the staff is very prompt at providing service\",\"the doctor has an impressive knowledge about what care should be provided\",\"the staff is outstanding at providing care\",\"the staff provides refined service\",\"extremely refined customer service\",\"the doctor is so cooperative\",\"the doctor is so respectful\",\"their group really provides specialized care\",\"everyone provides heartfelt service\",\"so far so good as the service is top notch\",\"extremely clean clinic\",\"this clinic provides high quality care\",\"their group provides high quality service\",\"the service is remarkable\",\"doctors and staff always provide remarkable care\",\"outstanding clinic\",\"the clinic ratings should be 10 out of 10\",\"this clinic should be highly rated\",\"this clinic should be first class\",\"ang mga tauhan ay nagbibigay ng mabisang serbisyo\",\"the staff handled my pet very warm and tender\",\"the service is terrific and the facility are welcoming and helpful\",\"very accommodating and professional staff\",\"the service is terrific and the doctor is thoughtful\",\"i had an outstanding experience on this clinic\",\"the service is heartwarming\",\"they are very careful at handling pets\",\"the clinic is efficient and has a welcoming atmosphere\",\"the vet is skilled\",\"the staff is very careful and tender at handling pets\",\"everyone provided humane service\",\"everyone at the facility was super professional and sincere\",\"the staffs are so supportive\",\"supportive and proactive staff\",\"the doctor is accommodating and compassionate\",\"dr danowitz is an excellent veterinarian he is accommodating and caring\",\"the doctor is the best at providing care\",\"very caring and professional doctor\",\"everyone took great care of my two kittens\",\"i highly rated this clinic\",\"very accountable doctor\",\"very considerate doctor\",\"the service is magnificent\",\"doctor is caring and thorough\",\"ang doctor ay sobrang talino\",\"the service is so reliable\",\"napakaganda ng binibigay na serbisyo\",\"i highly recommend this clinic\",\"the doctor is highly rated\",\"the staff and doctor were great with my dog keaton\",\"the doctor is skillful\",\"excellent and professional staff\",\"the doctor are excellent and professional\",\"very high quality service\",\"very professional staff\",\"they provide the best care\",\"extremely efficient service\",\"very thorough clinic\",\"this clinic is very trustworthy\",\"their services were speedy\",\"extremely efficient clinic\",\"the staff provided efficient service\",\"the service is wonderful\",\"the service was very efficient\",\"i love how meticulous the doctor was when treating my pet\",\"the service was seamless and exceeded our expectations in every way\",\"the doctor was very thorough and considerate\",\"the staff were extremely considerate of my pets\",\"the doctor was one of the best doctors i have met\",\"they are really understanding of my pets needs\",\"the prices of their services were extremely affordable\",\"so far so good the service is worthwhile\",\"the services available are really affordable\",\"terrific service\",\"the care provided in this clinic was excellent\",\"the people of this clinic were competent at providing care\",\"the doctor present was very competent\",\"the doctor was nice and thorough\",\"the doctor did his job excellently\",\"everyone at the clinic is competent in doing their work\",\"the service they provided was efficient\",\"the clinic staff were very accommodating and meticulous\",\"the clinic staff are accommodating and well equipped\",\"so far so good everyone was friendly helpful efficient and professional\",\"the staff of this clinic was very thoughtful and accommodating\",\"everyone at this was so kind and supportive\",\"the services offered here are exemplary\",\"the staff is very accommodating and always willing to assist with any needs\",\"this clinic is full of skilled people\",\"the service they provided was very efficient\",\"ocvh provides efficient service\",\"the service they provided is perfect\",\"dr danowitz is a perfect veterinarian\",\"they perfected every service provided\",\"perpekto ang mga serbisyo nila\",\"ako ay namangha sa kanilang kagalingan sa pagbibigay ng serbisyo\",\"they are very skilled in terms of pet care\",\"napaka husay at talino ng doktor\",\"the staff of the clinic is all friendly and warm\",\"dr danowitz is a one of a kind vet as he is a genius\",\"they provide outstanding services\",\"napaka palakaibigan ng doktor sa alaga mo\",\"the clinic staff is very friendly and responsive\",\"the services provided are all fantastic\",\"the service was exceptional and exceeded my expectations\",\"the service was speedy and thorough\",\"everyone really provided great help in treating my pet\",\"everyone greatly helped in treating my pet\",\"they are all extremely skilled staff and i wouldnt think of my taking pets anywhere else\",\"the staff and physicians are all affectionate towards your pets\",\"the clinic staff is diligent and thorough\",\"everyone was very thorough in providing the service i wanted\",\"the clinic staff is extremely diligent\",\"the service provided was personalized which is amazing\",\"dr danowitz is an amazing veterinarian he is knowledgeable and caring\",\"the staff and physicians are amazing as they are very caring and professional\",\"the doctor and staff provided amazing service\",\"the staff and physicians consistently provide great care\",\"the clinic is truly outstanding\",\"the services of this clinic are reasonably priced\",\"the doctor is top tier in terms of knowledge\",\"dr danowitz consistently provides us with excellent service\",\"their staff is pleasant and professional\",\"the service is consistently great\",\"the doctor is far ahead of any other doctor i have seen\",\"dr danowitz shows great consideration for my pets well being\",\"their services are top tier\",\"nangunguna sila sa pagbibigay ng pinakamagandang serbisyo\",\"their team is number one when it comes to the quality of service\",\"this clinic offers top tier services\",\"the clinic staff are cheerful and friendly\",\"the process of their services is one of the best\",\"napakamatulungin ng doktor\",\"everyone in this clinic is very cheerful and warm\",\"cheerful and supportive staff\",\"the service is consistently on top\",\"the doctor is also very cheerful\",\"nagustuhan ko ang serbisyo na binigay nila\",\"the doctor is a dependable veterinarian\",\"the doctor is dependable and supportive\",\"napaka maasahan ang kanilang doktor\",\"the service is amazing since everyone was working hard\",\"you can depend on this clinic\",\"the service is really smooth\",\"doctors and staff are working hard to give the best service\",\"everyone was very friendly caring and professional they answered all my questions and and took good care of my two kittens\",\"the doctor is the greatest they are caring and compassionate\",\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my pets anywhere else\",\"the service service is terrific and professional the staff and the facility are welcoming and helpful\",\"everyone at the facility was nice super professional and caring\",\"the people here know what they are doing and are providing their clients with excellent service\",\"everyone was very pleasant i had a wonderful experience with this clinic\",\"you will always feel like they give you their best efforts in treating your pets\",\"the staff at the front was very courteous and the doctor was very skilled amazing facility\",\"dr danowitz is an excellent veterinarian he is knowledgeable\",\"they care for you your pets and their staff wonderful work from them\",\"the staff have a very professional attitude while maintaining a friendly and caring demeanor with their clients\",\"this clinic treated me and my babies amazingly everyone does their best from the staff to the doctors\",\"extremely friendly compassionate caring skilled and sincere staff wouldnt think of taking my pets anywhere else\",\"their clinic is awesome they are caring and knowledgeable\",\"everyone at the clinic was super nice professional and caring\",\"the doctors were very knowledgeable and knew right away how to treat my pets illness thankful for their service\",\"you can tell that the staff are very dedicated to their work and providing quality animal healthcare\",\"dr danowitz is an excellent excellent veterinarian he is knowledgeable caring\",\"they catered us in a timely and professional manner the doctors were very skilled and were thorough in the assessment\",\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my pets anywhere else\",\"their clinic was very organized and had a fresh smell as opposed to most clinics\",\"their services were very affordable yet of high quality\",\"i knew that they were a reputable clinic from the recommendations of others but they exceeded my expectations\",\"dr danowitz is an excellent veterinarian he is dedicated and attentive\",\"the staff and physicians are excellent very caring and and professional\",\"so far they gave amazing results from their services and they were patient focused\",\"everyone at the facility was super nice professional and caring\",\"so far so good everyone was friendly helpful efficient professional\",\"their group is awesome they are skilled and professional\",\"so far so good good everyone friendly was helpful efficient and professional\",\"everyone was skilled compassionate and very professional they answered all my questions and took care of my two kittens\",\"dr danowitz is an excellent veterinarian he is attentive and compassionate\",\"so far so good everyone friendly was friendly helpful efficient professional\",\"the doctor was very attentive to details and his explanations were very prompt so it was easy to understand\",\"napakamatulungin at masipag ng lahat nagpapasalamat ako sa serbisyo\",\"everyone was understanding helpful and compassionate they answered all my questions and took good care of my two kittens\",\"the staff is very supportive and the veterinarians are gentle and compassionate\",\"everyone was attentive responsive and knowledgeable they answered all my questions and took good care of my kittens\",\"skilled professional and very efficient staff\",\"everyone was friendly caring and very professional answered all my questions and took good care of my two kittens\",\"the clinic was fresh and spotless\",\"extremely clean pleasant and orderly place wouldnt think of taking my pets anywhere else\",\"doctors were thorough with my pets examination and were proactive in preventing problems\",\"i am so grateful to the staff of this clinic they were professional and understanding\",\"extremely fast quick and efficient staff wouldnt think of taking my pets anywhere else\",\"ang tauhan ay palaging mapag unawa at mapagmalasakit taospusong nakikiramay sa lahat ng ating mga hayop\",\"the doctor was understanding attentive and empathetic\",\"the doctor was the greatest weve ever consulted with\",\"their group is amazing they they are so skilled and professional\",\"they were so gentle with handling my easily frightened dog the doctors and staff are so professional\",\"their work is commendable everyone was skilled and the doctor was very dedicated\",\"everyone was understanding and knowledgeable they answered all my questions and took good of care my two kittens\",\"the staff is professional friendly and caring\",\"the clinic is always clean and pristine i feel comfortable bringing my pets here\",\"everything is neat and spotless ensuring the best environment for the recovery of our pets\",\"everyone at the facility was super reliable supportive and proactive\",\"dr danowitz is an excellent veterinarian he is dedicated and respectful\",\"the staff and doctors are very reliable and responsive to my pets needs\",\"the doctors thorough examination gave me confidence in my pets care\",\"their care for our pets is very gentle yet they are very efficient and thorough\",\"my dog is better now thanks to their reliable and compassionate service\",\"the doctors are very professional and always dedicated to pet wellness\",\"i always feel welcomed and respected by their professional team of staff\",\"the service is amazing the staff and the facility are welcoming and pleasant\",\"the staff at the facility was supportive and compassionate\",\"i can see why they are held as a reputable clinic all the doctors are skilled and trustworthy\",\"the staff are so gentle and compassionate truly amazing service\",\"i am so grateful to the professional and greatly skilled veterinarians\",\"the clinic is impeccably clean which shows their commitement to hygiene\",\"ang mga tauhan at doktor rito ay napakagaling at maasikaso\",\"their service is always timely despite how packed their schedules are\",\"their vets passionate approach to treatment is truly commendable\",\"humahanga ako sa mga doktor rito sapagkat napakagaling at husay nila\",\"the staffs gentle and compassionate nature makes a big difference during treatments\",\"my pet feels the safest in with the doctors here shows how skilled they are\",\"tapat at propesyunal ang doktor\",\"their dedicated service keeps me coming back\",\"the doctors skilled hands made the procedure so smooth for my pet\",\"the treatment plan was well explained and affordable\",\"kahit maraming pasyente sa klinika mabilis at dekalidad parin ang kanilang serbisyo\",\"i trust their knowledgeable team to provide the best care for my pet\",\"their attentive and proactive nature reassured me during my pet\'s visit\",\"their fees are perfect for pet owners on a budget\",\"they services are very patient focused\",\"its rare to find such fair fees for high quality veterinary services\",\"their accessible scheduling process is perfect for busy pet owners\",\"they are incredibly trustworthy and always puts my pets needs first\",\"maalaga na beterinaryo\",\"the doctor was kind and explained everything to me\",\"i love how their prices are affordablet but doesnt compromise the quality\",\"my pet easily gets sick but the clinic is very sanitary i feel that my pet is safe here\",\"the clinic is always clean and smells fresh even in high traffic areas\",\"may malasakit sa kalusugan ng alaga ang mga doktor rito\",\"their dedication to providing the best service is evident in every visit\",\"i appreciate how professional and well trained they are\",\"they make sure to be thorough during my pets diagnosis\",\"their dedicated behavior in their work ensures our pets live long happy lives\",\"they explain every treatment in detail always attentive in whether we understood what they say\",\"very professional staff\",\"i really respect the doctor\",\"everyone was friendly caring and very professional they answered all my questions and took good care of my two kittens\",\"very prompt doctor\",\"everyone was prompt at providing service\",\"mapag malasakit sa mga hayop ang doctor\",\"their staff loves my pet\",\"the staff is loving yet professional\",\"professional and skilled staff\",\"their clinic is very awesome\",\"napaka bait ng kanilang doctor\",\"the doctor is willing to help\",\"the service is really the best because everyone knows their job\",\"excellent service since everyone knows what to do\",\"nice and supportive staff\",\"the doctor is great and understanding\",\"i am happy with their care\",\"excellent service since everyone is earger to help\",\"the staff is very professional and skilled\",\"very friendly caring and professional manner\",\"extremely friendly doctor and staff\",\"very knowledge doctor and staff\",\"i so am grateful to the professional and greatly knowledgeable staff\",\"nice and supportive staffs\",\"napaka dali lapitan ng mga doktor\",\"great friendly and very professional staff\",\"nakakatuwa na napakadaling kausapin ng doktor\",\"the doctor the is really mindful\",\"the doctor the is caring and compassionate\",\"the staff was mindful and professional\",\"i am so grateful for the reassuring doctor\",\"the doctor is really humane\",\"excellent doctor\",\"i really had a positive experience on this clinic\",\"the clinic staff was highly communicative and kept me well informed\",\"everyone in this clinic was very professional friendly and caring throughout my visit\",\"their doctor showed great care and compassion\",\"their staff was very friendly caring and highly professional\",\"everyone was so cooperative and considerate in answering all my questions and took good care of my two kittens\",\"their service was excellent\",\"mabait at matiyaga ang doktor\",\"ang kanilang tauhan ay palaging mabait taos pusong nakikiramay at nagmamalasakit lahat ng ating mga hayop\",\"everyone at the clinic especially their doctor is very professional friendly and caring\",\"this clinic has a great friendly and very professional staff\",\"their service is terrific and their staff is professional welcoming and helpful\",\"overall its great everyone was friendly helpful efficient and professional\",\"ang kanilang tauhan ay laging malugod sa pagtanggap ng mga kliyente\",\"i highly recommend this clinic as their staff is always nice caring very friendly and knowledgeable\",\"everyone at this clinic carries themselves in a very friendly caring and professional manner\",\"everyone was friendly caring very professional and considerate of my two kittens\",\"all of them are friendly caring and work in a professional manner\",\"the staff and physicians of this clinic are excellent very caring and professional\",\"i wouldnt think of taking my pets elsewhere since their staff is friendly extremely compassionate sincere and skilled\",\"everyone is very considerate and friendly with my pets\",\"the staff is great as they are very friendly and professional\",\"this clinic has extremely friendly compassionate caring sincere and skilled staff\",\"their physicians are excellent very caring and professional\",\"everyone in this clinic works in a highly professional caring and attentive manner\",\"overall everyone was extremely friendly helpful efficient and professional\",\"i am so grateful to the professional and greatly knowledgeable\",\"everyone was very friendly caring and professional they even answered my questions in a respectful manner\",\"i am very grateful to the professional and greatly knowledgeable staff of this clinic\",\"everyone at the clinic was super nice professional caring and empathetic\",\"i would recommend this clinic as they have highly knowledgeable and caring staff\",\"the doctor that served my pet was very friendly caring knowledgeable\",\"everyone was very friendly and made sure that you and your pet were comfortable throughout the visit\",\"everyone at this clinic is very caring professional and knows what they are doing\",\"everyone was very professional when answering all the questions i asked\",\"this clinic has very caring friendly and knowledgeable staff and doctors\",\"napakapropesyunal at maalam ng kanilang mga doktor sa klinikang ito\",\"they have extremely skilled staff and doctors i wouldnt think of taking my pets anywhere else\",\"the clinic provides exceptional care for pets with a warm environment\",\"the doctor was very patient in explaining everything clearly and thoroughly\",\"the clinic is always clean and welcoming and the staff is fantastic\",\"the staff and doctors are extremely skilled and made my pet feel safe\",\"the doctor was very attentive and made sure all my concerns were addressed\",\"the care provided was outstanding and the staff is always friendly and caring\",\"great team of professionals always ready to help and care for pets\",\"the clinic offers excellent care and the staff is very responsive to needs\",\"palaging maaasahan ang kanilang serbisyo\",\"the staff is very compassionate and dedicated to providing the best care\",\"the doctor took great care in explaining my pets treatment options\",\"i was very impressed by the level of care and attention to detail given by their staff and doctors\",\"the clinic staff is always welcoming and very helpful whenever i visit\",\"i am really grateful everything went smoothly from start to finish and my pet is now feeling better\",\"the doctors and staff were kind patient and very professional throughout my visit\",\"i am very satisfied with the level of service provided by the clinic\",\"the clinic offers fantastic care with skilled staff and a welcoming environment\",\"their team is extremely professional and truly cares for your pets\",\"the doctor and staff are always attentive and ensure the best care for pets\",\"the care at this clinic is outstanding and everyone is so helpful\",\"excellent service from a professional team of doctors and staff\",\"the clinic\\u2019s service is amazing and the staff makes you feel at ease\",\"wonderful staff who are knowledgeable and really care about their clients\",\"i highly recommend this clinic the staff is very accommodating and skilled\",\"great clinic with an amazing team of skilled and caring professionals\",\"the service was fast and efficient with great attention to detail\",\"i feel confident with the care my pet receives at this clinic\",\"their team is very professional and makes sure to treat your pets well\",\"their doctor is very considerate and welcoming\",\"ocvh is really a great clinic\",\"their service is really great\",\"the staff is very professional friendly and caring\",\"napakagaling mag paliwanag ng kanilang doktor\",\"the doctor is very dependable and exceptional\",\"dependable and exeptional doctor\",\"their doctor is exceptional\",\"their doctor is dependable\",\"their doctor is thorough\",\"their doctor is really experienced\",\"the doctor is proactive\",\"the doctor is reliable\",\"low cost clinic which is really great\",\"well priced clinic\",\"their clinic is orderly and germ free\",\"their clinic is germ free\",\"germ free clinic\",\"their clinic really smells good\",\"their clinic looks really fresh\",\"their clinis is in pristine condition\",\"their clinic is really clean\",\"their clinic is very sanitary\",\"very organized clinic\",\"so germ free clinic\",\"very skilled doctor\",\"they provide a very efficient service\",\"they provide a very reliable service\",\"they are very supportive and caring\",\"supportive doctors\",\"laging sumusuporta sayo ang kanilang doktor\",\"mapagmahal na mga doctor sa iyong alaga\",\"attentive doctor\",\"prompt doctor\",\"friendly doctor\",\"courteous doctor\",\"accommodating doctor\",\"reliable doctor\",\"efficient doctor\",\"approachable doctor\",\"proactive doctor\",\"warm doctor\",\"reliable and supportive doctor\",\"tapat na pag-aalaga ng staff\",\"compassionate doctor\",\"gentle doctor\",\"thorough doctor\",\"knowledgeable doctor\",\"empathetic doctor\",\"kind doctor\",\"sobrang bait ng kanilang doktor\",\"trustworthy doctor\",\"dependable doctor\",\"napakapambihira ng kanilang doctor\",\"sanitized clinic\",\"very immaculate clinic\",\"safe clinic\",\"the service is very satisfactory\",\"i love how kind the doctor\",\"i am so grateful to the kind doctor\",\"the staff is very warm on our pets\",\"everyone here was very supportive and understanding\",\"very caring and proactive doctor\",\"excellent service as it is prompt\",\"mapagmalasakit ang kanilang doktor\",\"excellent service was provided to us\",\"the doctor is a very excellent veterinarian\",\"very friendly and approachable doctor\",\"the doctor is very professional\",\"their doctor is very attentive to what is happening\",\"everyone at the facility was super professional and thorough\",\"very professional doctors\",\"everyone at the clinic was excellent\",\"i was contented with the vet who took care of my lovebird\",\"the doctor is very honest\",\"the doctor is really genius\",\"the doctor is really honest and caring\",\"the doctor is very helpful and compassionate\",\"the clinic smells so fresh\",\"napaka bango sa kanilang clinic\",\"their clinic smells so good\",\"everyone at this clinic is trustworthy\",\"everyone provided good care to my two kittens\",\"i love the service here\",\"the service is terrific as they are organized\",\"maganda ang serbisyo dahil may malasakit ang tauhan\",\"the knowledge of the doctor is very timely\",\"their service is excellent\",\"the service is terrific and very competitive\",\"the doctor is very nice\",\"the doctor is so helpful\",\"napaka marespeto ng kanilang doktor\",\"the clinic is very spotless\",\"their service is really good\",\"the staff are very patient focused\",\"they are the greatest pet care organization\",\"the doctor is very caring\",\"mapag alaga ang kanilang doktor\",\"everyone at the facility was super professional\",\"everyone there was very professional\",\"i love how they provide service to their client\",\"doctors and staff are always supportive\",\"they provided a perfect care to my pet\",\"the grooming was done perfectly on my pet\",\"they are so nice to my pet\",\"they handled my pet nicely\",\"everyone at the facility was so gentle on my pet\",\"the service is terrific as they are very welcoming\",\"i love the smell of their clinic\",\"the grooming went well\",\"their services is really so affordable\",\"their services is affordable\",\"extremely affordable services\",\"the doctor is so compassionate\",\"napaka maagap ng kanilang doktor\",\"i love the insights of the doctor\",\"they groomed my pet properly which made me happy\",\"the clinic has a great time management which is why there is little to no wait time\",\"everyone was really cleaning their place which is good\",\"very clean and excellent service\",\"Clinic is very clean and the staffs are accomodating\",\"Clinic is very clean and the staffs are accomodating\",\"Clinic is very clean and the staffs are accomodating\"]', '[\"may mga nakatalagang presyo sa mga gamot\",\"may mga nakalistang presyo sa mga gamot\",\"nakikitungo ang mga tauhan sa iyong hayop\",\"ang serbisyo ng staff ay ayos lang\",\"nagbibigay ng pangangalaga ang kanilang mga doktor\",\"mula sa mga doktor hanggang sa mga tauhan nakakatanggap ka ng pangangalaga\",\"the staff provide care for my pet\",\"justice underwent surgery at the clinic\",\"their pricing could benefit from a multi-pet discount plan\",\"ito ang unang beses ko at naranasan ko ang mga serbisyo nila\",\"nagbigay ng serbisyo ang staff at doktor\",\"ocvh provides care for pets\",\"the service was provided as expected\",\"the doctor let us know what procedure will be done before doing it\",\"ang doktor ay may sapat na kakayahan\",\"their group has experience and provides assistance\",\"dr danowitz ay isang beterinaryo na may sapat na kaalaman\",\"there was no follow up after the procedure\",\"i called earlier in the day and meds were ready when i arrived to pick them up\",\"they provide adequate quality service\",\"ang doktor ay nagbibigay ng nararapat na atensyon\",\"they deliver the service as required\",\"olivers surgeries were explained and he received care during the procedures\",\"the staff provide assistance and support\",\"the doctors and staff provided care for my two pets\",\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",\"ang mga tauhan ay nagbigay ng tulong at suporta\",\"sila ay nagbibigay ng tulong at suporta\",\"staff in lakewood and toms river care for both my dogs\",\"the service was adequate\",\"ipinaliwanag ng doktor sa akin ang lahat ng gastos bago gumawa ng anuman\",\"everyone took care of my chloe\",\"they were able to provide assistance\",\"ang staff at doktor ay nagbigay ng pangangalaga sa aking aso na si Keaton\",\"naibibigay sila ng tulong\",\"the doctor knew right away and prescribed something\",\"the doctors provide care for all animals\",\"the doctors provided support\",\"ang serbisyo ay naaayon sa mga kinakailangan\",\"the ocean county veterinarian clinic addresses your animals health needs\",\"ang vet ay nagsagawa ng mga kinakailangang hakbang\",\"everyone attended to my pet as needed\",\"the service meets expectations\",\"dr briggs provided care for my dog maya\",\"si dr briggs ay nagbigay ng tulong sa aking aso na si maya\",\"the doctor provides the necessary care\",\"the staffs provided assistance\",\"the doctor provided care for my pet\",\"they provided the needed care\",\"ang mga doktor at staff ay nagbibigay ng kinakailangang pangangalaga\",\"the doctor took her time to answer all my questions\",\"the staff provided the necessary care and attention\",\"the doctors provided care for our pet as expected\",\"doctors and nurses provided the needed assistance\",\"ang doktor ay nagbibigay ng mga kasagutan sa mga tanong\",\"they assist animals in recovering\",\"ginagamot nila ang iyong alaga\",\"ang mga doktor ay hindi maasahan\",\"nakapag-punta na ako sa vet na ito ng maraming beses\",\"si nala at ako ay nagkaroon ng karanasan sa inyong veterinary hospital\",\"there was a distinct scent in the clinic\",\"the doctor is caring and professional\",\"ang doktor ay nagbibigay ng sapat ng alaga\",\"adequate service\",\"ang mga tauhan ay nagbibigay ng tulong\",\"ang doktor ay nagpapakita ng tamang asal\",\"ang beterinaryo ay inalagaan ang aking alaga\",\"ang serbisyo ay tumugon sa mga kinakailangan\",\"the doctor makes decisions for my dogd\",\"ang mga doktor ay nagsasagawa ng kanilang mga tungkulin\",\"service could be improved with quicker response times\",\"the customer service is just okay\",\"the vet and office staff responds to your queries\",\"prompt service\",\"nadidismaya ako sa treatment na nakuha ko\",\"the doctor addresses concerns appropriately\",\"sila ay nagbibigay ng kinakailangang tulong\",\"the visit to the clinic took longer than expected\",\"i had more problems with my pet after visiting\",\"the place is organized and in working condition\",\"they have provided good care for my pets\",\"sila ay nag aalok ng tulong kapag kinakailangan\",\"the pricing is on the higher side and offering a multi-pet discount plan could be beneficial\",\"the doctor handled my two guinea pigs\",\"the prices aligned with the treatment provided\",\"ang customer service ay maaaring mapabuti\",\"lahat sila ay nagbibigay ng kinakailangang tulong\",\"ang doktor ay may sapat na kaalaman\",\"appreciate the service provided\",\"there was a situation regarding the handling of my pets medical records\",\"adequate care was provided for my golden\",\"tumawag ako kanina at ang mga gamot ay handa na nang dumating ako upang kunin ang mga ito\",\"the doctor provides care for my dog\",\"i have been bringing my pets here and the doctors provide care\",\"ang doktor ay may kasanayan sa pag-aalaga ng mga hayop\",\"ang serbisyo na natanggap ay naayon sa inaasahan\",\"nailigtas nila ang buhay ng ilan sa aking mga alagang hayop\",\"the prices are comparable to other vet\",\"trixie needed her teeth cleaned and the procedure was completed\",\"ang doktor ay magaling sa pagaalaga at maunawain\",\"the staff are approachable and provide adequate care\",\"from the doctors to the staff you receive proper care\",\"they provided care for my lovebird\",\"the doctor provided care\",\"gagamitin ko sila bilang aking regular na beterinaryo\",\"the doctor is attentive\",\"the doctor is polite and patient with us\",\"ang mga doktor ay mapagsamantala\",\"my pet rabbit passed away during the operation\",\"si nala at ako ay nagkaroon ng maayos na karanasan sa inyong veterinary hospital\",\"ang pusa ko ay nagkaroon ng magandang resulta sa kanila kumpara sa ibang beterinaryo\",\"mukhang bago pa lamang ang doktor\",\"you are greeted at your appointment time and efforts are made to ensure your pet is at ease\",\"the team takes care of your pet with attention and effort\",\"staff provided good service\",\"napansin ko na ang mga doktor dito ay maayos at propesyonal\",\"the provided care is specialized\",\"the cost of services here is higher compared to others\",\"salamat sa staff para sa kanilang serbisyo\",\"mas mataas ang presyo ng serbisyo kumpara sa iba\",\"the clinic provides attention to your pets health\",\"mula sa reception area hanggang sa mga tech at doktor mahusay ang serbisyo para sa aming aso at pusa\",\"this clinic has a clear vision and mission\",\"ang doktor ay may kaalaman at magaling sa paggawa ng mga desisyon para sa aking aso\",\"sila ay naglalaan ng atensyon sa mga hayop\",\"the doctors are a competent group who care for animals\",\"the doctor handled my anxious dog well\",\"she treated him with care and professionalism\",\"the doctor provides necessary care\",\"the staff is professional and attentive to my pets\",\"i had an experience at this veterinary clinic\",\"ang mga doktor ay may kaalaman sa kanilang trabaho\",\"the staff is polite and professional\",\"professional staff\",\"good care\",\"maayos at katanggap-tanggap ang serbisyo\",\"good service\",\"maalaga sila sa kalusugan ng iyong mga alagang hayop\",\"they try to provide service\",\"they seem to care about the animals\",\"the doctor is involved and observant\",\"the doctor handled our cat mitten in a calm manner\",\"the staff takes care of our 5 animals\",\"the doctor discusses our dogs needs\",\"doktor na may sapat na kaalaman\",\"the doctor provided the care needed\",\"everyone at ocean county veterinary hospital provided the care needed for my bunnies\",\"ang doktor ay tunay na nagmamalasakit sa iyong alaga\",\"the staff provided the necessary assistance when needed\",\"the staff is competent and provides the necessary service\",\"ang mga doktor ay may kaalaman at nagbibigay ng mga impormasyon na kailangan\",\"ang mga doktor ay propesyunal at magalang\",\"the doctor is incomparable to others\",\"the entire staff is confident to take any pet here\",\"nilaro ng doktor ang aso ko hanggang sa maging komportable siya\",\"the clinic is a clean facility\",\"maganda ang serbisyo at mairerrekomenda ko sa aking lugar\",\"they provide the necessary care\",\"the clinic is also open during sunday\",\"meron silang grupo ng mga doktor na may kasanayan at handang tumulong\",\"the prices keep on increasing every visit without any improvements in quality\",\"the doctor was polite and answered all my questions\",\"the service was okay\",\"ang mga pagsusuri at mga test ay palaging tinitingnan nang maayos\",\"ang doktor ay maalam at nakatulong sa pag aalaga ng limang pusa ko\",\"tinitingnan nila nang maigi ang kapakanan at kalusugan ng aming alaga\",\"i brought my pets to this veterinary hospital and took the vets opinion into consideration\",\"i acknowledge the support provided by the entire staff\",\"laging alam ng mga doctor kung ano dapat gawin\",\"ang dami kong problema sa serbisyo nila\",\"ang presyo ng kanilang serbisyo ay medyo mataas\",\"they provide care for them\",\"the doctor and staff are okay\",\"tinatrato ng doktor nang maayos ang alaga ko\",\"maayos ang serbisyo\",\"maayos na serbisyo\",\"budget friendly prices for their services\",\"the service is dependable\",\"maayos na vet\",\"ang mga doktor at nurse ay magalang at nakakatulong\",\"the vets here are caring and professional\",\"tama lang ang kaalaman ng doktor\",\"ayoko na umulit sa clinic na ito\",\"the staff was polite and professional\",\"ang mga doktor at support staff ay mahusay\",\"masinop sila sa paggamot sa aming mga alaga\",\"they prioritize keeping my pet comfortable throughout the treatment\",\"their skilled team ensures every treatment is done with precision\",\"ang staff ay epektibo at si megan ay mahusay sa pag-aalaga kay momma\",\"the vet was good\",\"ang clinic ay mahusay\",\"bukal sa loob ng mga tauhan ang pag tulong\",\"ang doktor ay matiyaga sa aking alagang pagong\",\"salamat ocean county veterinary hospital\",\"ang kanilang grupo ay mahusay sa pag-aalaga at may magandang kaalaman\",\"i was content with the treatment i received\",\"kahit madaling procedure mataas pa rin ang presyo\",\"the doctor treated my kittens with care\",\"lahat ay magiliw at ang serbisyo ay laging maayos\",\"the clinic appears to be overbooking their schedule\",\"thanks to the staff for their supportive care\",\"magaling na doktor at matulungin na staff\",\"the doctor was knowledgeable about guinea pigs\",\"they took good care of my puppy\",\"ang mga doktor ay nagbibigay ng impormasyon at maingat na pangangalaga anuman ang yugto ng buhay ng hayop\",\"its impressive to see a tiny scar rather than a huge incision same day surgery\",\"professional at maaalaga\",\"ako ay kontento sa mga tauhan at mga doktor\",\"nala and I had a good experience at your veterinary hospital\",\"ako ay kontento sa pagaalaga ng doktor sa aking ibon\",\"ako ay laging kontento sa mga doktor\",\"ang ocean county veterinary clinic ay nagsisigurado na ang mga hayop mo ay malusog\",\"everyone was polite and professional\",\"my dog is comfortable with your care\",\"the procedure and medication were reasonably priced\",\"the vet is professional and answers questions clearly and directly\",\"they took good care of our furbaby\",\"the staff made sure to answer all my questions with respect and care\",\"they always prioritize the health of our pet\",\"the doctors and support staff are competent\",\"ang doktor ay nagkamali sa pag diagnose sa aking alaga\",\"maayos ang mga beterinaryo\",\"the care that Peanut received met expectations\",\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",\"there is a clear focus on the health of the pet\",\"tila kulang sa kaalaman ang doktor\",\"satisfactory service\",\"the doctor spent time with my dog\",\"i would consider recommending this clinic\",\"apatnapung taon na akong umaasa sa kanila dahil ang kanilang serbisyo\",\"medyo pinagaan ng doktor ang kalagayan ng aking aso\",\"patient staff\",\"the quality of care is good\",\"my pet recovered\",\"the doctor is professional and attentive\",\"the doctors were professional and considerate\",\"the staff assist customers as needed\",\"maayos ang serbisyo\",\"maayos ang serbisyo\",\"the doctor did a thorough job in reviewing the findings\",\"the staff and doctor take good care with my dog\",\"the vet had a good report with my dogs and took his time examining them\",\"the doctors give attention to your pet\",\"the clinic could improve its scheduling system\",\"ang mga tauhan ay nagbibigay ng serbisyo\",\"the staff provides care as necessary\",\"they provided care to my pet\",\"the vet provided care for my lovebird\",\"ang mga doktor at kawani ay may kaalaman\",\"there was a noticeable odor in the clinic\",\"they provide care for my dog\",\"they care for animals\",\"my kittens condition changed after the visit\",\"the staff provides care\",\"ang mga doktor ay may kakayahan\",\"i will be using them as my veterinary\",\"the doctor addressed all my questions\",\"i bring my cat here for care\",\"ang doktor ay kalmado lamang\",\"gumaling ang aking alaga nang sinunod ko ang mga payo ng doktor\",\"ang doktor ay nagsisimula pa lamang sa kanyang karera\",\"the cost of their services aligns with market standards\",\"their services are priced reasonably\",\"magaling sa kanyang larangan ang doktor\",\"care was provided during the interaction\",\"the staff provide support to customers\",\"ang beterinaryo ay nagbibigay oras sa iyong alaga\",\"they groomed my pet according to procedure\"]', '[\"hindi magaling ang mga doktor\",\"hindi pulido ang pag gamot sa iyong alaga\",\"parang sobrang mahal kumpara sa ibang clinic\",\"hindi makatuwiran ng presyo ng serbisyo nila nakakadismaya\",\"parang hindi naglilinis nang maayos ang veterinaryo\",\"my pet rabbit died on their operation\",\"hindi komportable sa beterinaryong ito dahil parang hindi maalam ang doktor\",\"the doctor absolutely sucks on diagnosing\",\"we found a smaller vet that is much less expensive\",\"they upsell unnecessary treatments to inflate the bill so overpriced\",\"the staff did not follow up after the procedure which is unprofessional\",\"the staff are terrible at providing customer service\",\"hindi ko nagustuhan ang karasanasan ko sa clinic na ito\",\"ang daming problema sa serbisyo pero ang mahal\",\"nagulat kami sa presyo ng euthanization dahil ang ibang clinic ay hindi nagpapabayad sa euthanization\",\"the pet scales is definitely not cleaned every use as it were dirty and covered in fur\",\"hindi maayos ang pag gamot sa aking alaga\",\"prices are ridiculously high for some services\",\"their fees for emergency services are outrageously high\",\"i did not like having to pay a premium for emergency service\",\"my pet does not show signs of stress during visits to this vet\",\"the staff rushed during my consultation which made me disappointed\",\"masyadong mataas maningil kahit simple lang ang procedure\",\"sobrang sama ng loob ko sa care na natanggap ni peanut\",\"the staff was rude and did not seem to care about my concerns\",\"parang hindi nagiisip ang mga doktor\",\"pet care is very expensive\",\"the medications they sell are double the price of regular pharmacies\",\"the doctor does not have any knowledge on my pet\",\"they have hidden fees that are not mentioned until after the service is done which is so unfair\",\"nakakabahala ang diagnosis dahil parang hindi accurate\",\"incredibly long wait before we could see the vet\",\"they are charging me extra costs for a follow up consultation is unacceptable\",\"no sense of urgency in this clinic\",\"the service is worst\",\"sobrang mali ng diagnosis\",\"worst customer service\",\"i was late to my job because the clinic didnt honor my appointment schedule\",\"the staff is not good at handling pets\",\"even basic pet supplies at their clinic are way overpriced\",\"the vet barely spent any time examining my pet and seemed in a hurry which felt rude\",\"i dont think the clinic checks their online booking system as they never respond to my requests\",\"the doctor is inconsiderate with my turtle\",\"hindi sulit ang presyo ng kanilang serbisyo\",\"their prices are too expensive for the quality of their work\",\"the clinic charges a premium so we can call it overpriced\",\"the vet is such an unpleasant person\",\"my dog almost died with the wrong diagnosis\",\"walang passion ang vet\",\"ang pangit ng serbisyo\",\"hindi nalinisan nang maayos ang mga gamit\",\"their spaying and neutering services are overpriced compared to other clinics\",\"no one picked up the phone when I called multiple times for assistance which is unacceptable\",\"laging hindi available ang vet\",\"hindi naka focus ang doktor\",\"hindi ko nagustuhan na kailangan magbayad para sa emergency na serbisyo\",\"if this werent the only clinic near us then we wouldnt be going here the wait is ridiculous\",\"ang doktor ay hindi nakikinig sayo\",\"napaka taas ng presyo kahit wala namang special na serbisyo\",\"hindi marunong ang doktor\",\"the staff failed to update me on my pets progress during a long procedure\",\"hindi tugma ang presyo at serbisyo\",\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",\"the service is the worst\",\"she is the worst doctor i have ever met\",\"walang pakialam sa mga hayop\",\"the consultation fees are unreasonably high compared to other clinics in the area\",\"sobrang mahal at bagal ng serbisyo nila\",\"hindi sulit ang presyo sa kalidad ng serbisyo na binibigay nila\",\"costs are very high for some services\",\"sobrang mahal ng serbisyo\",\"they do not care about your pet\",\"the services they provide are very expensive\",\"parang walang malasakit ang doctor\",\"hindi maayos magbigay ng payo ang doktor\",\"they tend to their patients too slowly and we ended up leaving without seeing the doctor\",\"the doctor makes you feel uncomfortable due to their behavior\",\"ang doktor ay hindi nakakapagbigay ng sapat na atensyon\",\"its frustrating that i cant book multiple pets in one appointment\",\"i have never seen a clinic charge this much for basic services so unacceptable\",\"the doctor does not care abuot my pet\",\"i feel like they are taking advantage of pet owners with these sky high prices\",\"i did not like the results after they groomed my pet\",\"sobrang daming buhok ng hayop sa sahig\",\"their services are extremely expensive\",\"i was shocked at how much they charged me for a simple procedure\",\"ang doctor ay hindi mahusay\",\"the doctor does not understand me at all\",\"i did not like this clinic\",\"we found a smaller vet that is much less expensive\",\"i had a awful experience in this clinic\",\"hindi maingat sa pagbibigay ng gamot\",\"the doctor is not friendly and does not care about my pet\",\"ang mga doktor ay hindi mahusay\",\"worst vet clinic i have ever know\",\"ako ay nabahala dahil parang walang interes ang doktor sa aking alaga\",\"their medication is way overpriced\",\"the doctor is not trustworthy\",\"hindi ko nagustuhan na kailan magbayad para sa emergency na serbisyo\",\"the doctors are not knowledgeable and does not care about the health of their patients\",\"walang confidence ang doktor\",\"the clinic staff acted annoyed when I asked for clarification which is rude\",\"shouldnt a clinic not smell like mold its so musty in here its concerning\",\"hindi makatarungan ang pag ka mahal ng presyo\",\"the prices for pet grooming here are insanely high\",\"i do not recommend going to this clinic as my pet died here\",\"absolutely awful i came to check on the grooming process and the area was freezing my poor girl was shaking\",\"the doctor is impatient\",\"i had to pay a consultation fee just to get a prescription which is ridiculous\",\"i am not happy at all my bunny didnt even get blood test done\",\"hindi maayos mag alaga ang vet dito\",\"the medication costs 124 which is expensive\",\"the doctor is arrogant\",\"napaka baba ng kalidad ng serbisyo pero sobrang mahal\",\"nakakabahala ang kaalaman ng doktor\",\"the staff did not handle my pet gently which made the experience stressful\",\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",\"the staff were not empathetic when I expressed concerns about my pets health\",\"hindi sulit sa bulsa ang mahal para sa binigay nilang serbisyo\",\"the doctor seems uninterested about my pets health\",\"napakasama ng ugali ng doctor\",\"i feel like the doctors dont even try harder to heal my pet\",\"the examination table was not cleaned after the previous pet which is unhygienic\",\"i feel like the clinic is very inefficient as the waiting time is too long\",\"worst customer service i had ever received in my life\",\"there were flies buzzing around the clinic which is unsanitary\",\"parang walang alam ang doktor\",\"the staff did not sanitize the tools before using them on my pet and that is so unhygienic\",\"i do not want that doctor to be the doctor of my pet\",\"the water bowl provided for pets was dirty and had algae buildup\",\"the clinic staff seemed unorganized and lost my appointment booking\",\"it is ridiculous as the clinic does not honor its advertised discounts or promotions\",\"hindi vina value ng clinic ang iyong oras\",\"this clinic is very expensive\",\"hindi ko nagustuhan ang customer service dahil nakakainis ang mga tauhan\",\"waiting for hours to see the vet is not reasonable please fix this\",\"hindi masusi ang pagtingin ng doktor sa aking alaga\",\"the knowledge of the doctor is disappointing\",\"the doctor is not confident on their work which is stressful\",\"i did not like having to pay a premium for emergency service\",\"hindi hands on ang vet\",\"madalas wala ang doctor at hindi ito maganda\",\"the clinic smelled like rotten food which is nauseating\",\"parang hindi updated ang vet sa treatment kaya magulo\",\"they are the worst clinic\",\"napakapangit ng serbisyo\",\"i am not happy at all my bunny didnt even get blood test done which led to her death\",\"sobrang tagal ng service\",\"the cost of boarding my pet was so high I could not afford it\",\"this clinic has very poor time management we waited for almost an hour\"]', '2025-04-16 01:46:28', '2025-04-16 08:45:31');
INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(3, 'Customer Service', 83.93, 11.94, 4.13, 956, 136, 47, '[\"the staff and physicians excellent very caring and professional\",\"napakamatulungin at mabait ng mga tauhan\",\"the staff is very friendly\",\"i am so grateful to the professional and knowledgeable staff\",\"the staff is very efficient\",\"ang tauhan ay palaging mabait\",\"very professional staff\",\"the staff is so efficient\",\"the doctor is very reliable\",\"ang mga tauhan ay matulungin\",\"the staff is very friendly and caring\",\"the vets are so kind and caring\",\"the staff was super nice professional and caring\",\"great friendly and very professional staff\",\"helpful caring knowledgeable\",\"everyone at the facility was super nice professional and caring\",\"everyone was friendly caring and very professional they answered all my questions and good took care of my two kittens\",\"i am so grateful the to professional and greatly knowledgeable staff\",\"staff are always very helpful\",\"the doctor is great since he is caring and compassionate\",\"the staffs are knowledgeable\",\"excellent service\",\"napakamatulungin at mabait ng mga tauhan\",\"ang staff ay napaka magiliw at matulungin\",\"everyone at the facility was super nice professional and caring\",\"friendly staff that truly cares about my dog\",\"the staff and physicians are excellent as they are very a caring professional\",\"the staffs are greatly knowledgeable\",\"the staffs are excellent as they are very caring and professional\",\"the staff is very helpful\",\"everyone was caring and very professional they answered all my questions\",\"mabilis lang ang pila kaya nakakatuwa\",\"everyone was very friendly and took their with with each animal\",\"i like how they provide a very prompt service\",\"doctor is the very caring and compassionate\",\"the staff are always very helpful and courteous\",\"they are very professional\",\"the staff is very professional\",\"very friendly and caring staffs\",\"the doctors are excellent very caring professional\",\"napaka maasikaso ng mga tauhan\",\"i love how caring the doctor is\",\"the doctor is very understanding\",\"everyone is so friendly  and caring\",\"the staff is very compassionate\",\"the staff are always very helpful and caring keep up the good work\",\"the doctors are very professional\",\"the staff is very professional yet friendly and caring\",\"napakamatulungin at mabait ng doctor\",\"the staffs are very supportive\",\"the staff are really a great support\",\"very nice and caring staff\",\"the doctor is very knowledgeable\",\"everyone was very helpful and efficient\",\"the staff is very caring\",\"i am so greatful to the nice staff and proactive doctors\",\"the service is terrific and the staff are very professional\",\"the doctors are very dedicated\",\"i am so grateful to the knowledgeable staff\",\"lahat ng staff ay napaka matulungin\",\"the doctor is very friendly\",\"the staff are welcoming\",\"the staffs are very professional\",\"the staffs are very dedicated\",\"the staff are always very helpful\",\"the staff are very attentive\",\"the staffs are extremely friendly\",\"ang tauhan ay palaging mabait\",\"doctors and staff are very helpful\",\"ang mga tauhan ay palaging magalang at kompetente\",\"i am grateful to the professional and knowledgeable staff\",\"everyone is very dedicated on their work\",\"everyone was caring and very professional they answered all my questions\",\"the staff are very dedicated\",\"i am so grateful to the competetive staffs\",\"very caring and very friendly staff\",\"the staff are really welcoming\",\"the staff is very compassionate\",\"the service is terrific\",\"the doctor is very knowledgeable\",\"the doctor is really dependable\",\"the staffs are very efficient\",\"the doctor is so respectful\",\"the doctor is extremely compassionate\",\"ang tauhan ay talagang may malasakit\",\"everyone was really professional\",\"the doctors are very helpful\",\"i am so grateful to the reliable staffs\",\"the doctors are very dependable\",\"the doctor is very considerate\",\"the staff is considerate\",\"the staffs are very caring\",\"the doctos was so understanding and helpful answered all my questions\",\"they are very understanding\",\"this clinic is really competetive when it comes to service\",\"the doctor is really dependable\",\"doctors and staff are always very helpful\",\"ang mga doktor dito ay sobrang matalino\",\"ocvh was so understanding and helpful they answered all my questions\",\"the staffs was super nice and caring\",\"the doctor is so professional\",\"the doctor is really dependable\",\"their group is awesome they are caring and knowledgeable\",\"the doctor is caring and compassionate\",\"the doctors and staff are very caring\",\"everyone was very friendly\",\"the staff was extremely compassionate\",\"they are very friendly\",\"ocvh was so understanding and helpful\",\"the staff was so helpful\",\"he is very knowledgeable\",\"the doctors and staff are always caring\",\"they are caring and knowledgeable\",\"everyone was very professional\",\"the staffs are so efficient\",\"they are very knowledgeable\",\"everyone at the facility was super caring\",\"doctors and staff are very skillful\",\"the staff was extremely compassionate\",\"very professional staff\",\"the service is really excellent\",\"the staff was really courteous\",\"the staff was really professional and the facility are welcoming\",\"the staff was really friendly\",\"so far good everyone was friendly and helpful\",\"the staff was working really efficient\",\"so far so good everyone was professional\",\"ocvh is so understanding\",\"the staffs are very caring\",\"the staffs are knowledgeable and compassionate\",\"they are very knowledgeable\",\"they are knowledgeable\",\"i am really happy with their service\",\"ako ay masaya dahil pinakinggan ako ng doktor\",\"the doctor is knowledgeable and caring\",\"the doctor very caring and professional\",\"the staff is very caring\",\"the staffs are really understanding\",\"everyone was really proactive\",\"the staffs are friendly and very professional\",\"they are really caring\",\"everyone was so knowledgeable\",\"the staffs are really considerate\",\"i am so grateful to the hard working staffs\",\"courteous and professional staff\",\"very caring staff\",\"the staff is really efficient\",\"they are really attentive\",\"the service is impressive\",\"napaka ayos ng serbisyo dito\",\"everyone was really respectful\",\"the doctor is extremely knowledgeable\",\"doctor is genuine\",\"everyone was very caring\",\"the staff are really reliable\",\"they are really welcoming\",\"extremely supportive staff\",\"napaka matulungin ng mga tauhan\",\"the staff is very caring\",\"great service\",\"the staff are really helpful\",\"their group is so knowledgeable\",\"very compassionate staff\",\"compassionate staff\",\"very courteous staff\",\"everyone was really courteous\",\"the staffs are really professional\",\"napaka matulungin ng mga tauhan\",\"everyone was very supportive\",\"they are really efficient\",\"they are very helpful\",\"doctors and staff are enthusiastic\",\"the staff is very very helpful\",\"ang tauhan ay palaging mabait\",\"he is knowledgeable and caring\",\"extremely reliable staff\",\"sila ay napaka maalaga\",\"the doctor caring and compassionate\",\"i am so grateful to these professional staff\",\"ang tauhan ay palaging mabilis sumagot\",\"they are caring\",\"the staff is very helpful and compassionate\",\"the staff is very helpful and knowledgeable\",\"excellent service\",\"the doctor is an excellent veterinarian he is knowledgeable and caring\",\"their group is awesome they are orderly and reliable\",\"very pleasant staff\",\"the staff and physicians are very caring and professional\",\"the staff and the facility are welcoming\",\"the staff is very helpful\",\"everyone was friendly\",\"they are very helpful and knowledgeable\",\"everyone was very knowledgeable\",\"everyone at the facility was super nice and caring\",\"i am so grateful to the professional doctors\",\"the service is extremely good\",\"their group is really proactive\",\"napakamatulungin at mabait ng mga tauhan\",\"extremely helpful staff\",\"ang tauhan ay talagang matulungin\",\"they are so welcoming and helpful\",\"very supportive staffs\",\"everyone was so considerate\",\"the service is high level\",\"the service is terrific\",\"i am so grateful so to the professional and greatly knowledgeable staff\",\"the doctor is compassionate\",\"everyone was caring\",\"the staff is knowledgeable\",\"very friendly and professional staffs\",\"doctors and staff are caring\",\"everyone was friendly\",\"the staff is very friendly and caring\",\"the staff is extremely friendly\",\"the doctor is caring\",\"the staffs provide excellent service\",\"the staff is very approachable\",\"they are very helpful\",\"the prices is so budget friendly\",\"i would recommend this clinic since they are so budget friendly\",\"they are so approachable\",\"so far so good as every is really approachable\",\"they are so enthusiastic\",\"the staff are so understanding\",\"the staff is very dedicated\",\"their service is high quality\",\"this clinic is trustworthy\",\"exceptional service\",\"wonderful service\",\"the staffs are so enthusiastic\",\"enthusiastic staffs\",\"this clinic is eager to help\",\"they are very proactive and goal oriented\",\"everyone was really proactive\",\"they are extremely proactive\",\"the service is fantastic\",\"the doctors and staff are trustworthy\",\"sa ngayon maayos naman lahat ay matulungin at propesyonal\",\"the doctor is caring and professional\",\"extremely kind doctors\",\"knowledgeable staff\",\"the staff is very helpful and the veterinarians are knowledgeable and compassionate\",\"nice and caring staff\",\"everyone is very caring and knowledgeable\",\"everyone at the facility was super professional and caring\",\"ocvh was so understanding and helpful\",\"outstanding service\",\"so far so good everyone was friendly and professional\",\"ocvh was so understanding and courteous\",\"the staff are excellent very caring and professional\",\"the staff is very dependable\",\"the doctor is knowledgeable\",\"ocvh was helpful they answered all my questions so respectful\",\"the doctor is very trustworthy\",\"everyone at the facility was nice super professional and trustworthy\",\"the staffs are trustworthy\",\"extremely dedicated staffs\",\"the staffs are dedicated on providing good service\",\"marvelous service\",\"doctors and staff are always very helpful and caring\",\"the staff is very professional\",\"the service is outstanding\",\"so far so good everyone was gentle and professional\",\"the staff is knowledgeable and compassionate\",\"napakamatulungin at mabait ng doctor\",\"very professional staff\",\"the staffs are welcoming and helpful\",\"the staffs are very friendly and professional\",\"the service is great\",\"napakamatulungin at mabait ng mga tauhan\",\"i am so grateful to the professional and greatly knowledgeable staff\",\"nice and caring staff\",\"the veterinarians are knowledgeable and compassionate\",\"the staff is very professional and caring\",\"the staff is greatly knowledgeable\",\"the staff is very friendly\",\"the doctor is knowledgeable\",\"i am so grateful to the professionals\",\"the staff is very very professional\",\"the staff is caring\",\"ang tauhan ay sobrang mahusay at propesyonal\",\"the staffs are very friendly and knowledgeable\",\"doctors and staff are always very helpful and welcoming\",\"their service is admirable\",\"everyone was very genuine\",\"the staffs was so accommodating\",\"the staff is very professional and accommodating\",\"the staff is very attentive\",\"everyone was very accommodating\",\"the staff is very attentive to our needs\",\"the service is superb\",\"they are knowledgeable\",\"the staff is so respectful\",\"the staff is extremely attentive\",\"the service is impeccable\",\"everyone at the facility was super welcoming\",\"the service is awesome\",\"the staff is very friendly\",\"the staff is considerate\",\"i am so grateful to the welcoming and greatly knowledgeable staff\",\"ang tauhan ay palaging mabait taospusong nakikiramay nakikiramay at nagmamalasakit sa lahat ng ating mga hayop\",\"ocvh was so welcoming and helpful they answered all my questions so respectful\",\"the staff is very helpful and the veterinarians knowledgeable and compassionate\",\"the doctor is compassionate\",\"the staff is very compassionate\",\"their group is awesome they are swift and efficient\",\"the facility are welcoming and helpful\",\"everyone was caring\",\"their service is exemplary\",\"extremely flawless service\",\"everyone at the facility was super nice and considerate\",\"everyone was proficient and knowledgeable\",\"the doctor is so gentle and professional\",\"doctors and staff are always very supportive\",\"everyone was very considerate\",\"their professionalism is exemplary\",\"the doctor is the greatest caring and compassionate\",\"the staffs are so friendly\",\"was ocvh so understanding and helpful they answered all my questions so respectful\",\"they are very friendly\",\"the staff is very compassionate\",\"very friendly and knowledgeable doctor\",\"the service is top tier\",\"the service is the best out there\",\"very accommodating clinic\",\"the staff is knowledgeable\",\"very professional staff\",\"very considerate staffs\",\"the doctor is caring and compassionate\",\"ang mga tauhan ay matulungin\",\"the staff are caring\",\"the physicians are very caring\",\"courteous staff\",\"their group is knowledgeable\",\"doctors and staff are always very helpful and caring\",\"everyone at the facility was super professional nice and caring\",\"prompt service and great staff\",\"very trustworthy staffs\",\"everyone was so friendly and trustworthy\",\"and staff are always very warm and caring\",\"everyone was friendly\",\"nice and welcoming staff\",\"ocvh was so understanding\",\"they are extremely supportive\",\"their service is so consistent\",\"courteous staff\",\"doctors and staff are always kind hearted\",\"the staffs are really kind hearted\",\"the staff is caring\",\"the service is great\",\"the service is the best\",\"the staffs provide phenomenal service\",\"the staffs are amazing in terms of customer service\",\"the staff are trustworthy\",\"the doctor is supportive\",\"the doctor is patient focused\",\"the staff is welcoming and helpful\",\"sobrang magalang ang mga tauhan\",\"everyone was very patient centered\",\"the service is perfect\",\"perfect service\",\"everyone was kind hearted\",\"they provide perfect service\",\"the staffs provide well polished service\",\"very accommodating staffs\",\"very accommodating and considerate staff\",\"very considerate and accommodating staff\",\"the staff is accommodating and considerate\",\"the staff is really skilled and professional\",\"masaya ako sa binigay nilang serbisyo\",\"their service is seamless\",\"the service is seamless and perfect\",\"the staff is approachable and accommodating\",\"everyone at the the facility was super trustworthy\",\"the doctor are very knowledgeable\",\"the service here is special\",\"they provide a detailed oriented service\",\"very diligent and cooperative staff\",\"they are very supportive\",\"the staff provides top notch service\",\"the staff and doctors provide top not service\",\"the staff was accommodating\",\"i love the results of the service provided\",\"extremely reliable clinic\",\"they are so nice and reliable\",\"ocvh was so understanding and reliable\",\"very caring and reliable staff\",\"ang mga tauhan ay mabilis sumagot sa mga katanungan kaya mabilis ang proseso\",\"their group is really accommodating\",\"ocvh was so thoughtful and professional\",\"their group is very consistent at provide good quality service\",\"extremely good customer service\",\"the staff is very prompt at providing service\",\"the staff provides refined service\",\"extremely refined customer service\",\"this clinic has a clear vision and mission\",\"the doctor is so cooperative\",\"everyone was so cooperative so everything went smoothly\",\"nice and caring staff very friendly and knowledgeable i would recommend\",\"the doctor is so respectful\",\"everyone provides heartfelt service\",\"so far so good as the service is top notch\",\"the staff is very genuine\",\"their group provides high quality service\",\"they are so trustworthy\",\"the service is remarkable\",\"ang mga tauhan ay nagbibigay ng mabisang serbisyo\",\"i am grateful to the highly trained staffs\",\"their group is awesome they are are proactive and welcoming\",\"the staff handled my pet very warm and tender\",\"the service is terrific and the facility are welcoming and helpful\",\"ocvh was so welcoming\",\"very accommodating and professional staff\",\"the service is terrific and the doctor is thoughtful\",\"the service is heartwarming\",\"the clinic is efficient and has a welcoming atmosphere\",\"everyone provided humane service\",\"very friendly and accommodating\",\"everyone at the facility was super professional and sincere\",\"helpful and knowledgeable doctors\",\"the staff is very accommodating and the veterinarians are knowledgeable and compassionate\",\"the staff is so accommodating\",\"the staffs are so supportive\",\"supportive and proactive staff\",\"the doctor is accommodating and compassionate\",\"very friendly and accommodating professionals\",\"dr danowitz is an excellent veterinarian he is accommodating and caring\",\"everyone was efficient\",\"napakamatulungin at mabait na angkop sa bawat customer\",\"very caring and professional doctor\",\"so so far so good everyone was accommodating and helpful\",\"the staff is very thoughtful and the veterinarians are thorough and compassionate\",\"very accommodating and committed staff\",\"very considerate doctor\",\"the service is magnificent\",\"doctors and staff are always very helpful and accommodating keep up the good work\",\"caring and reliable staff\",\"doctor is caring and thorough\",\"so far so good everyone was attentive\",\"the service is so reliable\",\"the staff is very reliable and the veterinarians are knowledgeable and compassionate\",\"everyone at the facility was reliable\",\"napakaganda ng binibigay na serbisyo\",\"nice and skillful staff\",\"the doctor is skillful\",\"great and accommodating staff\",\"excellent and professional staff\",\"the doctor are excellent and professional\",\"very high quality service\",\"the staff is very warm\",\"the staff is very helpful the and veterinarians are efficient and compassionate\",\"very professional staff\",\"the facility are accommodating and helpful\",\"helpful and committed staff\",\"extremely efficient service\",\"so far so good was everyone was efficient\",\"they are very efficient\",\"ocvh was so efficient\",\"the staff and physicians are very efficient\",\"this clinic is very trustworthy\",\"extremely efficient clinic\",\"the staff provided efficient service\",\"the service is wonderful\",\"the service was very efficient\",\"the service was seamless and exceeded our expectations in every way\",\"the doctor was very thorough and considerate\",\"i am so grateful to the accommodating staff\",\"the staff were extremely considerate of my pets\",\"they are really understanding of my pets needs\",\"so far so good the service is worthwhile\",\"terrific service\",\"ocvh was so accommodating\",\"everyone was so competent and efficient\",\"the service they provided was efficient\",\"the clinic staff were very accommodating and meticulous\",\"the clinic staff are accommodating and well equipped\",\"so far so good everyone was friendly helpful efficient and professional\",\"the staff of this clinic was very thoughtful and accommodating\",\"everyone at this was so kind and supportive\",\"everyone at the facility was really efficient\",\"the staff were efficient and i am so grateful to them\",\"everyone at the facility was efficient\",\"sobrang maalaga ng mga tauhan\",\"the staff is friendly and accommodating\",\"they have such an accommodating staff\",\"the staff is very accommodating and always willing to assist with any needs\",\"i truly appreciate the helpful and accommodating staff\",\"everyone was really considerate making the experience pleasant and enjoyable\",\"the staff is very skillful\",\"the service they provided was very efficient\",\"ocvh provides efficient service\",\"the service they provided is perfect\",\"they perfected every service provided\",\"perpekto ang mga serbisyo nila\",\"ako ay namangha sa kanilang kagalingan sa pagbibigay ng serbisyo\",\"the staff of the clinic is all friendly and warm\",\"sila ay napaka maalalahanin\",\"dr danowitz is a one of a kind vet as he is a genius\",\"the team here is highly skilled and knowledgeable\",\"the staff are really understanding and listen well to your requests\",\"doctors and staff are always very responsive\",\"the clinic staff is very friendly and responsive\",\"the service was exceptional and exceeded my expectations\",\"the service was speedy and thorough\",\"everyone really provided great help in treating my pet\",\"their group is terrific they are caring and knowledgeable\",\"the staff is very thoughtful and accommodating\",\"everyone was very thorough in providing the service i wanted\",\"the service provided was personalized which is amazing\",\"dr danowitz is an amazing veterinarian he is knowledgeable and caring\",\"their booking system is very intuitive and responsive\",\"the staff and physicians are amazing as they are very caring and professional\",\"the doctor and staff provided amazing service\",\"dr danowitz consistently provides us with excellent service\",\"their staff is pleasant and professional\",\"the service is consistently great\",\"nangunguna sila sa pagbibigay ng pinakamagandang serbisyo\",\"their team is number one when it comes to the quality of service\",\"the clinic staff are cheerful and friendly\",\"maalaga at mabait ang kanilang mga tauhan\",\"their staff is caring and cheerful\",\"everyone in this clinic is very cheerful and warm\",\"i am so grateful to the cheerful and greatly knowledgeable staff\",\"the staff are cheerful and accommodating\",\"cheerful and supportive staff\",\"the service is consistently on top\",\"nagustuhan ko ang serbisyo na binigay nila\",\"everyone was really considerate and dependable\",\"everyone was very knowledgeable so they are dependable\",\"the doctor is a dependable veterinarian\",\"the doctor is dependable and supportive\",\"the staff is very dependable\",\"the service is amazing since everyone was working hard\",\"the staff is working hard and very helpful\",\"the service is really smooth\",\"helpful caring and and knowledgeable\",\"the staff is very hardworking and the veterinarians are knowledgeable and compassionate\",\"doctors and staff are working hard to give the best service\",\"napakamatulungin at bait ng staff rito talagang may malasakit sila sa kanilang kliyente\",\"nice and caring staff very friendly and knowledgeable i would recommend\",\"the staff is very helpful and the veterinarians are knowledgeable and compassionate\",\"everyone was very friendly caring and professional they answered all my questions and and took good care of my two kittens\",\"ocvh was so understanding and helpful they answered all my questions so respectful\",\"the doctor is the greatest they are caring and compassionate\",\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my pets anywhere else\",\"the service service is terrific and professional the staff and the facility are welcoming and helpful\",\"everyone at the facility was nice super professional and caring\",\"the people here know what they are doing and are providing their clients with excellent service\",\"doctors and staff are always very helpful and caring keep up the good work\",\"everyone was very pleasant i had a wonderful experience with this clinic\",\"the staff at the front was very courteous and the doctor was very skilled amazing facility\",\"dr danowitz is an excellent veterinarian he is knowledgeable\",\"everyone was very friendly and took their time in treating each animal\",\"very friendly caring and knowledgeable staff\",\"everyone is very friendly and took their time with each animal very caring and knowledgeable\",\"the staff have a very professional attitude while maintaining a friendly and caring demeanor with their clients\",\"extremely friendly compassionate caring skilled and sincere staff wouldnt think of taking my pets anywhere else\",\"their clinic is awesome they are caring and knowledgeable\",\"everyone at the clinic was super nice professional and caring\",\"the doctors were very knowledgeable and knew right away how to treat my pets illness thankful for their service\",\"you can tell that the staff are very dedicated to their work and providing quality animal healthcare\",\"dr danowitz is an excellent excellent veterinarian he is knowledgeable caring\",\"they catered us in a timely and professional manner the doctors were very skilled and were thorough in the assessment\",\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my pets anywhere else\",\"doctors and staff staff are always very helpful and caring keep up the good work\",\"their prices were fair and they do a great job at caring for your animals\",\"dr danowitz is an excellent veterinarian he is dedicated and attentive\",\"sa ngayon maayos naman lahat ay palakaibigan matulungin mahusay at propesyonal\",\"the staff is very helpful and are the knowledgeable and compassionate\",\"lahat sa staff nila ay mabait at matulungin mabilis nilang natugunan ang mga problema namin\",\"extremely friendly compassionate caring sincere and skilled staff wouldnt think of taking my anywhere else\",\"the staff and physicians are excellent very caring and and professional\",\"so far they gave amazing results from their services and they were patient focused\",\"everyone at the facility was super nice professional and caring\",\"so far so good everyone was friendly helpful efficient professional\",\"doctors and staff are always very helpful and caring keep up the the good work\",\"their group group is awesome they are caring and knowledgeable\",\"the place was neat orderly and pleasant smelling\",\"they were very welcoming and attentive with what i had to say and ask im very satisfied\",\"their group is awesome they are skilled and professional\",\"so far so good good everyone friendly was helpful efficient and professional\",\"staff is very fast yet attentive and efficient\",\"sa ngayon maayos naman lahat ay magaling mabait at maaasahan\",\"everyone was skilled compassionate and very professional they answered all my questions and took care of my two kittens\",\"so far so good everyone was reliable thorough and efficient\",\"dr danowitz is an excellent veterinarian he is attentive and compassionate\",\"so far so good everyone friendly was friendly helpful efficient professional\",\"sa ngayon maayos naman lahat ay matulungin mahusay at propesyonal\",\"the doctor was very attentive to details and his explanations were very prompt so it was easy to understand\",\"excellent friendly and very reliable staff\",\"napakamatulungin at masipag ng lahat nagpapasalamat ako sa serbisyo\",\"the staff and physicians are nice helpful and understanding\",\"very fast efficient and commendable work ethic\",\"everyone was understanding helpful and compassionate they answered all my questions and took good care of my two kittens\",\"the staff is very supportive and the veterinarians are gentle and compassionate\",\"everyone was attentive responsive and knowledgeable they answered all my questions and took good care of my kittens\",\"skilled professional and very efficient staff\",\"everyone was friendly caring and very professional answered all my questions and took good care of my two kittens\",\"the doctors have a proactive approach to treating their patients which is impressive\",\"sa ngayon maayos naman naman lahat ay palakaibigan matulungin mahusay at propesyonal\",\"they are understanding and compassionate\",\"extremely clean pleasant and orderly place wouldnt think of taking my pets anywhere else\",\"i am grateful to the skilled and greatly efficient staff\",\"doctors were thorough with my pets examination and were proactive in preventing problems\",\"i am so grateful to the staff of this clinic they were professional and understanding\",\"their group is awesome they are dedicated and trustworthy\",\"extremely fast quick and efficient staff wouldnt think of taking my pets anywhere else\",\"the staff is very thorough yet fast and efficient\",\"ocvh was so understanding and knowledgeable they answered all my questions so compassionate\",\"i am so grateful to the awesome and greatly skilled staff\",\"reliable swift and thorough\",\"the doctor was understanding attentive and empathetic\",\"the staff is very efficient and the veterinarians are skilled and thorough\",\"napakagaling at mabait ang mga tauhan rito\",\"their group is amazing they they are so skilled and professional\",\"mabilis at maayos sila gumawa\",\"the staff are very responsive and quick to act and the veterinarians are skilled and knowledgeable\",\"they were very responsive and attentive to my concerns\",\"filled with reputable skilled and knowledgeable doctors\",\"they were so gentle with handling my easily frightened dog the doctors and staff are so professional\",\"their work is commendable everyone was skilled and the doctor was very dedicated\",\"the place is spotless tidy and has a pleasant smell\",\"the staff is pleasant and dedicated\",\"their group is skilled and efficient\",\"everyone was understanding and knowledgeable they answered all my questions and took good of care my two kittens\",\"the staff is professional friendly and caring\",\"doctors and staff are always very gentle and caring keep keep up the good work\",\"everyone at the facility was super reliable supportive and proactive\",\"dr danowitz is an excellent veterinarian he is dedicated and respectful\",\"they really are attentive responsive to your concerns\",\"the staff and doctors are very reliable and responsive to my pets needs\",\"i appreaciate how empathetic and understanding the staff is\",\"their care for our pets is very gentle yet they are very efficient and thorough\",\"the booking process is quick and responsive\",\"the doctors were caring and easy to talk to\",\"my dog is better now thanks to their reliable and compassionate service\",\"i trust their knowledgeable and skilled doctors completely\",\"the doctors are very professional and always dedicated to pet wellness\",\"the staff is always respectful and makes you feel at ease during visits\",\"i always feel welcomed and respected by their professional team of staff\",\"the service is amazing the staff and the facility are welcoming and pleasant\",\"the staff at the facility was supportive and compassionate\",\"the staff and physicians are so good at what they do they are very dedicated to their work\",\"i can see why they are held as a reputable clinic all the doctors are skilled and trustworthy\",\"the staff are so gentle and compassionate truly amazing service\",\"i am so grateful to the professional and greatly skilled veterinarians\",\"the staff is very welcoming and reliable\",\"the staff and physicians are excellent very dedicated and skilled\",\"the staff is incredibly understanding and listens to every concern\",\"ang mga tauhan at doktor rito ay napakagaling at maasikaso\",\"ocvh was so understanding and helpful they answered all my questions so reliable\",\"their service is always timely despite how packed their schedules are\",\"the staffs gentle and compassionate nature makes a big difference during treatments\",\"tapat at propesyunal ang doktor\",\"their dedicated service keeps me coming back\",\"the staffs friendly attitude makes every visit a pleasure\",\"madali ang pagkuha ng appointment\",\"kahit maraming pasyente sa klinika mabilis at dekalidad parin ang kanilang serbisyo\",\"i trust their knowledgeable team to provide the best care for my pet\",\"their attentive and proactive nature reassured me during my pet\'s visit\",\"they services are very patient focused\",\"ang staff ay matulungin at magiliw\",\"the staff here is so kind and has a genuine love for animals\",\"they are incredibly trustworthy and always puts my pets needs first\",\"maalaga na beterinaryo\",\"the doctor was kind and explained everything to me\",\"their process is very helpful in finding the best time for appointments\",\"may malasakit sa kalusugan ng alaga ang mga doktor rito\",\"they are not just helpful they are also incredibly empathetic\",\"their dedication to providing the best service is evident in every visit\",\"i appreciate how professional and well trained they are\",\"their dedicated behavior in their work ensures our pets live long happy lives\",\"they explain every treatment in detail always attentive in whether we understood what they say\",\"their prices are very budget friendly\",\"everyone at the facility was very friendly\",\"the staff is very gentle and caring\",\"caring and gentle staff\",\"very professional staff\",\"the staff is so very helpful\",\"i really respect the doctor\",\"he is very knowledgeable caring\",\"everyone was friendly caring and very professional they answered all my questions and took good care of my two kittens\",\"everyone was really friendly and warm\",\"everyone was prompt at providing service\",\"mapag malasakit sa mga hayop ang doctor\",\"very courteous staff\",\"doctors and staff are always respectful\",\"helpful and warm loving staff\",\"loving and caring staff\",\"the staff is loving yet professional\",\"ang mga tauhan ay napaka matulungin\",\"professional and skilled staff\",\"doctors is really willing to help\",\"the staff and physicians are always willing to help\",\"the doctor is willing to help\",\"i am so grateful to the helpful staff\",\"very helpful and willing staff\",\"everyone was willing to help\",\"so far so good was willing to help you\",\"their group are always willing to help\",\"the staff and physicians are always there to help you\",\"everyone was really knowledgeable about every animal\",\"lahat ay mabait at propesyonal\",\"the staff is very proficient and the veterinarians are knowledgeable and compassionate\",\"the service is really the best because everyone knows their job\",\"the doctors and staff are always responsive\",\"excellent service since everyone knows what to do\",\"nice and supportive staff\",\"the doctor is great and understanding\",\"the staff is very dependable and helpful\",\"so far everyone was eager to help\",\"excellent service since everyone is earger to help\",\"the staff is very eager to help\",\"extremely eager to help staffs\",\"the staff is very professional and skilled\",\"skillful and nice staff\",\"very friendly caring and professional manner\",\"i am so grateful to their skilled staff\",\"extremely friendly doctor and staff\",\"i so am grateful to the professional and greatly knowledgeable staff\",\"nice and supportive staffs\",\"so friendly and warm staff\",\"great friendly and very professional staff\",\"ocvh was so understanding and easy to talk to\",\"very friendly and mindful staff\",\"i am so grateful to the mindful staff\",\"the doctor the is caring and compassionate\",\"so far everyone was mindful and efficient\",\"the staff was mindful and professional\",\"i am so grateful for the reassuring doctor\",\"helpful and humane staff\",\"their group is very proactive and diligent\",\"very proactive and diligent staff\",\"the staff is very humane and warm\",\"everyone was communicative\",\"extremely communicative staff\",\"everyone was so communicative\",\"ang mga tauhan ay matulungin\",\"the clinic staff was highly communicative and kept me well informed\",\"everyone in this clinic was very professional friendly and caring throughout my visit\",\"their staff was very friendly caring and highly professional\",\"everyone was so cooperative and considerate in answering all my questions and took good care of my two kittens\",\"their service was excellent\",\"everyone at ocvh was so understanding and helpful in answering all of my questions\",\"mabait at matiyaga ang doktor\",\"ang kanilang tauhan ay palaging mabait taos pusong nakikiramay at nagmamalasakit lahat ng ating mga hayop\",\"everyone at the clinic especially their doctor is very professional friendly and caring\",\"this clinic has a great friendly and very professional staff\",\"napakamatulungin nagmamalasakit at mabait sa amin ang kanilang tauhan\",\"their service is terrific and their staff is professional welcoming and helpful\",\"sa ngayon maayos naman ang lahat ay palakaibigan matulungin mahusay at propesyonal\",\"overall its great everyone was friendly helpful efficient and professional\",\"ang kanilang tauhan ay laging malugod sa pagtanggap ng mga kliyente\",\"their doctors were very friendly caring and knowledgeable\",\"everyone at the facility is always welcoming and helpful\",\"i highly recommend this clinic as their staff is always nice caring very friendly and knowledgeable\",\"the people at ocvh were so understanding and helpful and they answered all my questions in a respectful tone\",\"everyone at this clinic carries themselves in a very friendly caring and professional manner\",\"everyone was friendly caring very professional and considerate of my two kittens\",\"all of them are friendly caring and work in a professional manner\",\"the staff and physicians of this clinic are excellent very caring and professional\",\"i wouldnt think of taking my pets elsewhere since their staff is friendly extremely compassionate sincere and skilled\",\"everyone is very considerate and friendly with my pets\",\"the staff is great as they are very friendly and professional\",\"this clinic has extremely friendly compassionate caring sincere and skilled staff\",\"napakamatulungin at mabait ng mga tao sa klinikang ito\",\"their physicians are excellent very caring and professional\",\"everyone in this clinic works in a highly professional caring and attentive manner\",\"the facility has this neat friendly and welcoming atmosphere\",\"the doctors and staff are always very considerate and caring\",\"overall everyone was extremely friendly helpful efficient and professional\",\"their staff is very helpful and the veterinarians are knowledgeable and compassionate\",\"their staff works professionally and is very friendly and caring\",\"silang lahat naman ay napakapalakaibigan matulungin mahusay at propesyonal\",\"all of them are knowledgeable and very compassionate towards their clients\",\"i am so grateful to the professional and greatly knowledgeable\",\"everyone was very friendly caring and professional they even answered my questions in a respectful manner\",\"i am very grateful to the professional and greatly knowledgeable staff of this clinic\",\"everyone at the clinic was super nice professional caring and empathetic\",\"i would recommend this clinic as they have highly knowledgeable and caring staff\",\"the doctor that served my pet was very friendly caring knowledgeable\",\"everyone was very friendly and made sure that you and your pet were comfortable throughout the visit\",\"ang kanilang tauhan ay palaging palakaibigan masayahin at malasakit\",\"everyone at this clinic is very caring professional and knows what they are doing\",\"everyone was very professional when answering all the questions i asked\",\"their doctors were very helpful and knowledgeable\",\"every staff member was very friendly playful and you could really tell they were happy to serve you\",\"their doctors and staff are always very considerate and respectful\",\"lahat ay palakaibigan matulungin mahusay maalaga maalam at propesyonal\",\"this clinic has very caring friendly and knowledgeable staff and doctors\",\"dr danowitz is one of the best veterinarians i know he is highly knowledgeable and caring\",\"the clinic provides exceptional care for pets with a warm environment\",\"i was very impressed with the professionalism and efficiency of the staff\",\"the doctor was very patient in explaining everything clearly and thoroughly\",\"the clinic is always clean and welcoming and the staff is fantastic\",\"everyone was friendly and made me feel at ease throughout the visit\",\"the doctor was very attentive and made sure all my concerns were addressed\",\"the care provided was outstanding and the staff is always friendly and caring\",\"great team of professionals always ready to help and care for pets\",\"the clinic offers excellent care and the staff is very responsive to needs\",\"palaging maaasahan ang kanilang serbisyo\",\"the staff is very compassionate and dedicated to providing the best care\",\"the clinic staff is always welcoming and very helpful whenever i visit\",\"i am really grateful everything went smoothly from start to finish and my pet is now feeling better\",\"mabilis at tapat ang kanilang serbisyong inaalok\",\"the entire staff is friendly knowledgeable and genuinely loves animals\",\"the doctors and staff were kind patient and very professional throughout my visit\",\"i am very satisfied with the level of service provided by the clinic\",\"the clinic offers fantastic care with skilled staff and a welcoming environment\",\"their team is extremely professional and truly cares for your pets\",\"the doctor and staff are always attentive and ensure the best care for pets\",\"the care at this clinic is outstanding and everyone is so helpful\",\"excellent service from a professional team of doctors and staff\",\"their staff is so kind and truly cares about the well being of animals\",\"the clinic\\u2019s service is amazing and the staff makes you feel at ease\",\"wonderful staff who are knowledgeable and really care about their clients\",\"napakaayos mabilis at husay ng kanilang sistema\",\"i highly recommend this clinic the staff is very accommodating and skilled\",\"great clinic with an amazing team of skilled and caring professionals\",\"the doctors are highly skilled and caring towards every animal\",\"the service was fast and efficient with great attention to detail\",\"the facility is clean and well organized with a welcoming atmosphere\",\"everyone here is very friendly and they always go the extra mile\",\"their team is very professional and makes sure to treat your pets well\",\"their doctor is very considerate and welcoming\",\"their service is really great\",\"i am grateful to the skilled and attentive staffs\",\"friendly and very skilled staff\",\"everyone at the facility was super nice and caring\",\"the staff is very professional friendly and caring\",\"the staff is very detailed and kind\",\"the doctor is very dependable and exceptional\",\"dependable and exeptional doctor\",\"their doctor is dependable\",\"their staff is very dependable\",\"the doctor is proactive\",\"the doctor is reliable\",\"the staff and physicians are accommodating and caring\",\"their prices are so budget friendly\",\"they provide a very efficient service\",\"they provide a very reliable service\",\"reliable staff\",\"they are very supportive and caring\",\"supportive doctors\",\"caring doctors\",\"warm and loving doctors\",\"attentive doctor\",\"friendly doctor\",\"courteous doctor\",\"accommodating doctor\",\"reliable doctor\",\"efficient doctor\",\"approachable doctor\",\"proactive doctor\",\"warm doctor\",\"reliable and supportive doctor\",\"tapat na pag-aalaga ng staff\",\"very budget friendly prices\",\"compassionate doctor\",\"knowledgeable doctor\",\"kind doctor\",\"trustworthy doctor\",\"dependable doctor\",\"the staff is very courteous and kind\",\"everyone was very kind\",\"so far so good everyone was very kind\",\"the service is very satisfactory\",\"everyone was very caring\",\"very kind and knowledgeable person\",\"i love how kind the doctor\",\"i am so grateful to the kind doctor\",\"the staff is very warm on our pets\",\"everyone here was very supportive and understanding\",\"very caring and proactive doctor\",\"everyone here felt our pain and was very understanding which i loved\",\"excellent service as it is prompt\",\"very nice and knowledgeable staff\",\"very caring and efficient staff\",\"excellent service was provided to us\",\"helpful and very reliable doctors\",\"very caring doctors\",\"very knowledgeable doctors\",\"ocvh was very understanding\",\"very friendly doctors\",\"lahat sila ay napaka matulungin\",\"very friendly and approachable doctor\",\"he is very knowledgeable and approachable\",\"doctors and staff are always very helpful to us\",\"the doctor is very professional\",\"ocvh was so reliable\",\"everyone at the facility was super reliable\",\"the staff is very thorough and knowledgeable\",\"the doctors and staff are always kind\",\"their doctor is very attentive to what is happening\",\"very attentive staffs\",\"extremely attentive and thorough staff\",\"everyone at the facility was super professional and thorough\",\"the staff and physicians are very caring and welcoming\",\"very caring and kind\",\"very professional doctors\",\"i have found them to be reliable and honest\",\"the staff was very nice and knowledgeable\",\"the doctor is really honest and caring\",\"the staff is very compassionate and helpful\",\"the doctor is very helpful and compassionate\",\"the staff is very kind\",\"very kind and knowledge people\",\"very warm and welcoming people\",\"very caring people\",\"i love how caring the staffs\",\"everyone at the facility was very kind and welcoming\",\"everyone at this clinic is trustworthy\",\"the staff was very knowledgeable and thorough\",\"i love the service here\",\"the staff was very understanding\",\"the staff are respectful\",\"the service is terrific as they are organized\",\"everyone was really efficient since they are knowledgeable\",\"they are so friendly\",\"the staff are very proactive which i really like\",\"maganda ang serbisyo dahil may malasakit ang tauhan\",\"the staff is very responsive to my questions\",\"the staff are extremely reliable\",\"their service is excellent\",\"their staffs are so friendly\",\"the service is terrific and very competitive\",\"the staff are very efficient\",\"the doctor is so helpful\",\"ocvh was so respectful\",\"everyone at the facility was so caring\",\"they are so respectful\",\"i am grateful to the kind doctors\",\"very helpful and knowledgeable people\",\"they really respect their customer\",\"the staff are very welcoming\",\"very kind and welcoming people\",\"their service is really good\",\"the staff is very knowledgeable\",\"the staff are very patient focused\",\"the doctors are welcoming\",\"everyone was very efficient\",\"the doctor is very caring\",\"everyone at the facility was super professional\",\"everyone there was very professional\",\"i love how they provide service to their client\",\"their people are very knowledgeable\",\"doctors and staff are always supportive\",\"very warm and welcoming staff\",\"i am so grateful to all of them\",\"their staffs are so kind\",\"their doctors are so kind\",\"the service is terrific as they are very welcoming\",\"they are extremely welcoming to their customers\",\"the doctor is so compassionate\",\"i love how compassionate their doctors\",\"very clean and excellent service\"]', '[\"ang serbisyo ng staff ay ayos lang\",\"ito ang unang beses ko at naranasan ko ang mga serbisyo nila\",\"nagbigay ng serbisyo ang staff at doktor\",\"the service was provided as expected\",\"their group has experience and provides assistance\",\"they provide adequate quality service\",\"they deliver the service as required\",\"the staff provide assistance and support\",\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",\"everyone was approachable\",\"the service was adequate\",\"they were able to provide assistance\",\"the doctors provided support\",\"ang serbisyo ay naaayon sa mga kinakailangan\",\"the service meets expectations\",\"the staffs provided assistance\",\"doctors and nurses provided the needed assistance\",\"the staff is helpful with things\",\"adequate service\",\"ang serbisyo ay tumugon sa mga kinakailangan\",\"service could be improved with quicker response times\",\"the customer service is just okay\",\"the staff was friendly\",\"prompt service\",\"ang customer service ay maaaring mapabuti\",\"the process for making an appointment was clear\",\"appreciate the service provided\",\"ang doktor ay may kasanayan sa pag-aalaga ng mga hayop\",\"the people in the office were available to help\",\"ang serbisyo na natanggap ay naayon sa inaasahan\",\"the staff is attentive and considerate to all our animals\",\"the staff are approachable and provide adequate care\",\"ang tagatanggap ay hindi masyadong magiliw\",\"the doctor is attentive\",\"the doctor is polite and patient with us\",\"we appreciated their professionalism and attention\",\"the appointment scheduling was efficient\",\"staff provided good service\",\"madali ang paggawa ng appointment\",\"salamat sa staff para sa kanilang serbisyo\",\"the vets and staff were helpful\",\"mas mataas ang presyo ng serbisyo kumpara sa iba\",\"mula sa reception area hanggang sa mga tech at doktor mahusay ang serbisyo para sa aming aso at pusa\",\"mahusay ang mga tauhan rito\",\"she treated him with care and professionalism\",\"ang mga tao ay magalang at dedikado sa kanilang trabaho\",\"the staff is professional and attentive to my pets\",\"the staff is polite and professional\",\"tumawag ako at sila ay magalang\",\"ocvh was understanding and they are helpful\",\"professional staff\",\"lahat ay magalang at propesyonal sa kanilang trabaho\",\"lahat ng staff ay magalang at mahusay sa kanilang trabaho\",\"the staff were kind and gentle with bugsy\",\"everyone was helpful and worked well together as a team\",\"maayos at katanggap-tanggap ang serbisyo\",\"good service\",\"maalaga sila sa kalusugan ng iyong mga alagang hayop\",\"ang mga tauhan ay magiliw at maayos makitungo sa aking aso\",\"they try to provide service\",\"the staff is kind\",\"the staff is approachable\",\"the staff provided the necessary assistance when needed\",\"the staff is competent and provides the necessary service\",\"ang mga doktor ay propesyunal at magalang\",\"maganda ang serbisyo at mairerrekomenda ko sa aking lugar\",\"the staff were friendly\",\"the doctor was polite and answered all my questions\",\"the service was okay\",\"their staff is attentive and approachable\",\"the staff was cooperative and polite\",\"i acknowledge the support provided by the entire staff\",\"ang babait at gagaling ng staff masaya ako sa naging karanasan ko rito\",\"ang presyo ng kanilang serbisyo ay medyo mataas\",\"the staff is approachable\",\"everyone was approachable\",\"maayos ang serbisyo\",\"magiliw na mga tauhan\",\"maayos na serbisyo\",\"siya ay magalang at mahinahong sinagot ang lahat ng tanong ko\",\"budget friendly prices for their services\",\"the service is dependable\",\"ang mga doktor at nurse ay magalang at nakakatulong\",\"the vets here are caring and professional\",\"they were kind and helpful\",\"magalang ang front office staff\",\"the staff was polite and professional\",\"ang mga staff ay magalang at propesyonal\",\"ang mga doktor at support staff ay mahusay\",\"ang staff ay epektibo at si megan ay mahusay sa pag-aalaga kay momma\",\"ang mga tao ay magiliw\",\"ang clinic ay mahusay\",\"the people are kind\",\"ang staff ay magiliw at tapat\",\"ang kanilang grupo ay mahusay sa pag-aalaga at may magandang kaalaman\",\"ang antas ng impormasyon at pangangalaga ay mahusay\",\"lahat ay magiliw at ang serbisyo ay laging maayos\",\"ang aking alaga ay gumaling nang mabilis\",\"everyone has been kind\",\"thanks to the staff for their supportive care\",\"magiliw na staff\",\"all staff members are kind\",\"magaling na doktor at matulungin na staff\",\"the doctor was knowledgeable about guinea pigs\",\"magalang at propesyonal na staff\",\"lahat ay magiliw\",\"professional at maaalaga\",\"the staff is consistently helpful\",\"mahusay na pag aalaga at pagmamalasakit para sa aking golden\",\"everyone was polite and professional\",\"they are caring and attentive with all their patients\",\"the vet is professional and answers questions clearly and directly\",\"friendly and helpful staff\",\"a caring and friendly office\",\"the staff made sure to answer all my questions with respect and care\",\"the doctors and support staff are competent\",\"hindi madali makuha ang confirmation ng appointment kapag nag book online\",\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",\"thank you to the kind people\",\"there is a clear focus on the health of the pet\",\"magiliw na staff\",\"satisfactory service\",\"apatnapung taon na akong umaasa sa kanila dahil ang kanilang serbisyo\",\"attentive staffs\",\"patient staff\",\"the doctor is professional and attentive\",\"the doctors were professional and considerate\",\"maayos ang serbisyo\",\"maayos ang serbisyo\",\"everyone at ocvh in lakewood is friendly and helpful\",\"they are helpful and take the time to address our questions\",\"ang mga tauhan ay nagbibigay ng serbisyo\",\"the staff are available to help customers\",\"the booking system lacks clear instructions\",\"the staff is friendly\",\"the staff provide support to customers\"]', '[\"hindi makatuwiran ng presyo ng serbisyo nila nakakadismaya\",\"lahat ng tao sa pasilidad ay walang malasakit\",\"i have found that the doctors in this practice are not knowledgeable\",\"unacceptable wait times its showing us that you dont respect our time\",\"ang staff ay palaging malungkot at hindi magiliw\",\"the staff are terrible at providing customer service\",\"ang daming problema sa serbisyo pero ang mahal\",\"i did not like having to pay a premium for emergency service\",\"the staffs are not knowledgeable\",\"they have hidden fees that are not mentioned until after the service is done which is so unfair\",\"the service is worst\",\"worst customer service\",\"hindi efficient ang pag book online\",\"hindi sulit ang presyo ng kanilang serbisyo\",\"ang pangit ng serbisyo\",\"no one picked up the phone when I called multiple times for assistance which is unacceptable\",\"hindi ko nagustuhan na kailangan magbayad para sa emergency na serbisyo\",\"napaka taas ng presyo kahit wala namang special na serbisyo\",\"hindi tugma ang presyo at serbisyo\",\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",\"the service is the worst\",\"sobrang mahal at bagal ng serbisyo nila\",\"hindi sulit ang presyo sa kalidad ng serbisyo na binibigay nila\",\"sobrang mahal ng serbisyo\",\"parang walang malasakit ang doctor\",\"hindi kami masaya sa pagaalaga nila\",\"ang dami kong problema sa serbisyo nila\",\"walang malasakit ang tauhan\",\"ang doctor ay hindi mahusay\",\"the doctor is not friendly and does not care about my pet\",\"ang mga doktor ay hindi mahusay\",\"the doctor is not trustworthy\",\"hindi ko nagustuhan na kailan magbayad para sa emergency na serbisyo\",\"the doctors are not knowledgeable and does not care about the health of their patients\",\"napaka baba ng kalidad ng serbisyo pero sobrang mahal\",\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",\"hindi sulit sa bulsa ang mahal para sa binigay nilang serbisyo\",\"the receptionist was on their phone instead of helping customers which is rude\",\"worst customer service i had ever received in my life\",\"hindi ko nagustuhan ang customer service dahil nakakainis ang mga tauhan\",\"hindi matulungin ang mga tauhan sa pag book\",\"i did not like having to pay a premium for emergency service\",\"hindi user friendly ang pag book online at nakakaasar lang\",\"hindi customer friendly ang presyo nila sa sobrang mahal\",\"napakapangit ng serbisyo\",\"the staffs are not friendly\",\"sobrang tagal ng service\"]', '2025-04-16 01:46:28', '2025-04-16 07:35:57');
INSERT INTO `sentiment_analyses` (`id`, `aspect`, `positive_percent`, `neutral_percent`, `negative_percent`, `positive_count`, `neutral_count`, `negative_count`, `positive_comments`, `neutral_comments`, `negative_comments`, `created_at`, `updated_at`) VALUES
(4, 'hygiene', 35.75, 36.87, 27.37, 64, 66, 49, '[\"the doctors and staff are very organized\",\"they are extremely organized\",\"the environment is spotless\",\"the staff is very organized\",\"everyone was very organized\",\"sa ngayon maayos naman lahat ay matulungin at propesyonal\",\"the equipment in this clinic is so clean\",\"the place is really clean\",\"doctors and staff are always very organized\",\"maayos naman lahat kaya nakakatuwa\",\"the grooming for my dog went well\",\"the grooming for my pet went great\",\"extremely clean clinic\",\"everyone was organized and thorough ensuring everything was done properly and efficiently\",\"their clinic was very organized and had a fresh smell as opposed to most clinics\",\"sa ngayon maayos naman lahat ay palakaibigan matulungin mahusay at propesyonal\",\"the place was neat orderly and pleasant smelling\",\"sa ngayon maayos naman lahat ay magaling mabait at maaasahan\",\"sa ngayon maayos naman lahat ay matulungin mahusay at propesyonal\",\"the clinic was fresh and spotless\",\"sa ngayon maayos naman naman lahat ay palakaibigan matulungin mahusay at propesyonal\",\"extremely clean pleasant and orderly place wouldnt think of taking my pets anywhere else\",\"very organized clean and neat\",\"mabilis at maayos sila gumawa\",\"the place is spotless tidy and has a pleasant smell\",\"the clinic is always clean and pristine i feel comfortable bringing my pets here\",\"everything is neat and spotless ensuring the best environment for the recovery of our pets\",\"malinis ang klinika at laging maayos at kaaya aya ang amoy\",\"the clinic is impeccably clean which shows their commitement to hygiene\",\"my pet easily gets sick but the clinic is very sanitary i feel that my pet is safe here\",\"the clinic is always clean and smells fresh even in high traffic areas\",\"sa ngayon maayos naman ang lahat ay palakaibigan matulungin mahusay at propesyonal\",\"the facility has this neat friendly and welcoming atmosphere\",\"their facilities are all extremely neat and smell good\",\"the clinic is always clean and welcoming and the staff is fantastic\",\"laging malinis at kaaya aya sa mata ang kanilang mga pasilidad\",\"the facility is clean and well organized with a welcoming atmosphere\",\"their place is really hygienic and tidy\",\"their clinic looks really fresh\",\"their clinic is really clean\",\"very clean environment\",\"napaka malinis at napaka maayos ng kanilang lugar\",\"their clinic is very sanitary\",\"lagi nilang nililinis ang kanilang kagamitan kaya masasabing malinis talaga\",\"very sterile and tidy equipments\",\"very organized clinic\",\"they are very sanitary\",\"pinapanatili nilang malinis ang kanilang kapaligiran\",\"spotless environment\",\"very tidy environment\",\"extremely sterile environment\",\"i love how tidy the environment\",\"the clinic smells so fresh\",\"the service is terrific as they are organized\",\"the clinic is very spotless\",\"their environment is really clean\",\"the grooming was done perfectly on my pet\",\"i love how they regularly clean their environment\",\"the grooming went well\",\"everyone was really cleaning their place which is good\",\"very clean and excellent service\",\"Clinic is very clean and the staffs are accomodating\",\"Clinic is very clean and the staffs are accomodating\",\"Clinic is very clean and the staffs are accomodating\"]', '[\"may mga nakatalagang presyo sa mga gamot\",\"may mga nakalistang presyo sa mga gamot\",\"the walls and windows had a noticeable layer\",\"sakto lang ang amoy sa loob\",\"the air conditioning vents had visible dust\",\"nakipag-ugnayan ako sa Lakewood office tungkol sa aking karanasan sa mga kuto sa aking indoor na pusa\",\"maayos ang aking pagbisita\",\"there are aspects related to cleanliness that could be improved\",\"the waiting area has a noticeable odor\",\"maaring maayos pa ang kanilang lugar\",\"the staff and physicians are organized\",\"there was a distinct scent in the clinic\",\"tile shards were visible on the floor\",\"there were visible spots on the floor\",\"the place is organized and in working condition\",\"tumawag ako kanina at ang mga gamot ay handa na nang dumating ako upang kunin ang mga ito\",\"ako ay pumunta para ipagupit at magpashampoo ng aso ko at maayos ang kanilang trabaho\",\"ang kanilang pag aalaga ay maayos\",\"si nala at ako ay nagkaroon ng maayos na karanasan sa inyong veterinary hospital\",\"maayos ang staff\",\"napansin ko na ang mga doktor dito ay maayos at propesyonal\",\"sasalubungin ka nang maayos ng mga tauhan\",\"maayos ang aking karanasan mula sa unang tawag para sa impormasyon\",\"maayos ang lugar\",\"maayos at malinis ang lugar\",\"sila ay nagtrabaho nang maayos\",\"maayos at katanggap-tanggap ang serbisyo\",\"ang mga tauhan ay magiliw at maayos makitungo sa aking aso\",\"ang kagamitan ay maaaring mapabuti ang kalinisan\",\"kinailangan ni trixie na ayusin ang kanyang mga ngipin at pagkatapos ng bisita naging mas maayos ang mga ito\",\"the clinic is a clean facility\",\"ang mga pagsusuri at mga test ay palaging tinitingnan nang maayos\",\"ang kalidad ng pag aalaga ay maayos\",\"gumaling nang maayos ang aking alaga\",\"tinatrato ng doktor nang maayos ang alaga ko\",\"maayos ang serbisyo\",\"maayos na serbisyo\",\"maayos na vet\",\"naramdaman ko na makakatanggap si justice ng maayos na pangangalaga\",\"the facility is clean\",\"their cages were clean and well maintained\",\"may alikabok sa mga sulok\",\"ang mga kulungan ay malinis\",\"maayos ang pasilidad\",\"lahat ay magiliw at ang serbisyo ay laging maayos\",\"the floor was wet which made it slippery\",\"maayos ang karanasan\",\"maayos na pagaalaga\",\"malinis at propesyonal ang lugar\",\"maayos ang mga beterinaryo\",\"ang mga tauhan ay maayos at maingat sa pagbibigay ng pangangalaga\",\"pinapahalagahan ko ang staff para sa kanilang maayos na pag aalaga\",\"clean environment\",\"maayos ang staff\",\"maayos ang serbisyo\",\"trinato ang aso ko na parang basura at pinabayaan lang\",\"maayos ang serbisyo\",\"the place was clean\",\"sila ay maayos at maingat sa pag aalaga ng aking aso\",\"there was a noticeable odor in the clinic\",\"ang kapaligiran ay maayos\",\"maayos ang pasilidad\",\"clean equipment\",\"ito ay isang maayos na pasilidad\",\"maayos ang kanilang pasilidad\",\"they always sanitize their equipments after use\"]', '[\"hindi pulido ang pag gamot sa iyong alaga\",\"parang hindi naglilinis nang maayos ang veterinaryo\",\"hindi sila maayos kausap tungkol sa kalagayan ng aso ko\",\"the pet scales is definitely not cleaned every use as it were dirty and covered in fur\",\"hindi maayos ang pag gamot sa aking alaga\",\"nakakadiri ang amoy sa loob\",\"this place sucks there are stains all over the place\",\"hindi maayos ang system pag dating sa pagbook\",\"parang hindi inaasikaso ang paligid\",\"the facility is so dirty\",\"the place is dirty\",\"the booking system is trash\",\"hindi maayos at hindi malinis ang lugar\",\"hindi maayos kausap ang mga tauhan sa loob\",\"hindi nalinisan nang maayos ang mga gamit\",\"the reception area had cobwebs in the corners which makes it looks dirty\",\"there were stains on the furniture that looked like they had been there for ages which made it look awful\",\"the rugs in the waiting area were dirty and smelled awful\",\"hindi nagamot nang maayos ang aking alaga\",\"hindi kaaya aya ang amoy\",\"the floors looked so old and dirty there were so many stains\",\"hindi maayos magbigay ng payo ang doktor\",\"parang hindi nalilinis ang lamesa\",\"laging marumi ang sahig\",\"hindi naipaliwanag nang maayos ang operasyon sa aking alaga\",\"parang hindi binibigyan pansin ang kalinisan sa lugar\",\"unacceptable hygiene standards\",\"the trash bins were overflowing and smelled awful\",\"i noticed dried blood on the examination tools so unhygienic\",\"hindi maingat sa pagbibigay ng gamot\",\"shouldnt a clinic not smell like mold its so musty in here its concerning\",\"the prices for pet grooming here are insanely high\",\"hindi maayos ang sistema sa pagpila kaya ang tagal\",\"absolutely awful i came to check on the grooming process and the area was freezing my poor girl was shaking\",\"hindi maayos mag alaga ang vet dito\",\"hindi nalilinisan ang kulungan at sobrang dumi\",\"maraming alikabok sa kapaligiran\",\"the examination table was not cleaned after the previous pet which is unhygienic\",\"the windows were filthy\",\"there were flies buzzing around the clinic which is unsanitary\",\"napakabaho ang amoy sa loob\",\"hindi napapanatili ang kalinisan sobrang kalat\",\"the bathroom was filthy and smelled terrible\",\"the staff did not sanitize the tools before using them on my pet and that is so unhygienic\",\"the water bowl provided for pets was dirty and had algae buildup\",\"sobrang dumi ng kulungan\",\"very unclean environment\",\"hindi maayos ang check up kaya nakakagalit\",\"there were water stains and mold on the ceiling which is disgusting\"]', '2025-04-16 01:46:28', '2025-04-16 08:45:31'),
(5, 'Waiting Time', 48.3, 28.13, 23.58, 170, 99, 83, '[\"excellent service\",\"mabilis lang ang pila kaya nakakatuwa\",\"i like how they provide a very prompt service\",\"the service is terrific and the staff are very professional\",\"i love how everyone took their time with each animal\",\"the service is terrific\",\"this clinic is really competetive when it comes to service\",\"the service is really excellent\",\"they really took their time examing my pet which is commendable\",\"i am really happy with their service\",\"the service is impressive\",\"napaka ayos ng serbisyo dito\",\"great service\",\"ang tauhan ay palaging mabilis sumagot\",\"excellent service\",\"the service is extremely good\",\"the service is terrific\",\"the staffs provide excellent service\",\"their service is high quality\",\"exceptional service\",\"wonderful service\",\"the service is fantastic\",\"outstanding service\",\"the staffs are dedicated on providing good service\",\"marvelous service\",\"the service is outstanding\",\"the service is great\",\"their service is admirable\",\"the service is superb\",\"the service is impeccable\",\"the service is awesome\",\"their service is exemplary\",\"extremely flawless service\",\"the service is top tier\",\"the service is the best out there\",\"prompt service and great staff\",\"their service is so consistent\",\"the service is great\",\"the service is the best\",\"the staffs provide phenomenal service\",\"the staffs are amazing in terms of customer service\",\"the doctor is patient focused\",\"everyone was very patient centered\",\"the service is perfect\",\"perfect service\",\"they provide perfect service\",\"the staffs provide well polished service\",\"masaya ako sa binigay nilang serbisyo\",\"their service is seamless\",\"the service is seamless and perfect\",\"the service here is special\",\"they provide a detailed oriented service\",\"the staff provides top notch service\",\"the staff and doctors provide top not service\",\"i love the results of the service provided\",\"ang mga tauhan ay mabilis sumagot sa mga katanungan kaya mabilis ang proseso\",\"their group is very consistent at provide good quality service\",\"extremely good customer service\",\"the staff is very prompt at providing service\",\"the staff provides refined service\",\"extremely refined customer service\",\"everyone provides heartfelt service\",\"so far so good as the service is top notch\",\"their group provides high quality service\",\"the service is remarkable\",\"ang mga tauhan ay nagbibigay ng mabisang serbisyo\",\"the service is terrific and the facility are welcoming and helpful\",\"the service is terrific and the doctor is thoughtful\",\"the service is heartwarming\",\"everyone provided humane service\",\"the service is magnificent\",\"the service is so reliable\",\"napakaganda ng binibigay na serbisyo\",\"very high quality service\",\"extremely efficient service\",\"the staff provided efficient service\",\"the service is wonderful\",\"the service was very efficient\",\"the service was seamless and exceeded our expectations in every way\",\"so far so good the service is worthwhile\",\"terrific service\",\"the service they provided was efficient\",\"the service they provided was very efficient\",\"ocvh provides efficient service\",\"the service they provided is perfect\",\"they perfected every service provided\",\"perpekto ang mga serbisyo nila\",\"ako ay namangha sa kanilang kagalingan sa pagbibigay ng serbisyo\",\"ipaparamdam sayo ng mga tauhan na may kasama ka\",\"the service was exceptional and exceeded my expectations\",\"the service was speedy and thorough\",\"everyone was very thorough in providing the service i wanted\",\"the service provided was personalized which is amazing\",\"the transaction through their booking system was very smooth and fast\",\"the doctor and staff provided amazing service\",\"dr danowitz consistently provides us with excellent service\",\"the service is consistently great\",\"nangunguna sila sa pagbibigay ng pinakamagandang serbisyo\",\"their team is number one when it comes to the quality of service\",\"the service is consistently on top\",\"nagustuhan ko ang serbisyo na binigay nila\",\"the service is amazing since everyone was working hard\",\"the service is really smooth\",\"doctors and staff are working hard to give the best service\",\"the service service is terrific and professional the staff and the facility are welcoming and helpful\",\"the people here know what they are doing and are providing their clients with excellent service\",\"everyone was very friendly and took their time in treating each animal\",\"everyone is very friendly and took their time with each animal very caring and knowledgeable\",\"the doctors were very knowledgeable and knew right away how to treat my pets illness thankful for their service\",\"lahat sa staff nila ay mabait at matulungin mabilis nilang natugunan ang mga problema namin\",\"so far they gave amazing results from their services and they were patient focused\",\"staff is very fast yet attentive and efficient\",\"napakamatulungin at masipag ng lahat nagpapasalamat ako sa serbisyo\",\"very fast efficient and commendable work ethic\",\"extremely fast quick and efficient staff wouldnt think of taking my pets anywhere else\",\"the staff is very thorough yet fast and efficient\",\"very short waiting time\",\"mabilis at maayos sila gumawa\",\"the staff are very responsive and quick to act and the veterinarians are skilled and knowledgeable\",\"the appointments here are very timely and swift no long waiting time\",\"i had no trouble booking an appointment everything was timely\",\"the booking process is quick and responsive\",\"my dog is better now thanks to their reliable and compassionate service\",\"the service is amazing the staff and the facility are welcoming and pleasant\",\"the staff are so gentle and compassionate truly amazing service\",\"their service is always timely despite how packed their schedules are\",\"scheduling an appointment is always quick and easy\",\"despite the number of patients they always keep waiting times minimal\",\"their dedicated service keeps me coming back\",\"madali ang pagkuha ng appointment\",\"kahit maraming pasyente sa klinika mabilis at dekalidad parin ang kanilang serbisyo\",\"they services are very patient focused\",\"their process is very helpful in finding the best time for appointments\",\"their dedication to providing the best service is evident in every visit\",\"their dedicated behavior in their work ensures our pets live long happy lives\",\"everyone was prompt at providing service\",\"the service is really the best because everyone knows their job\",\"excellent service since everyone knows what to do\",\"excellent service since everyone is earger to help\",\"their service was excellent\",\"their service is terrific and their staff is professional welcoming and helpful\",\"i was very impressed with the professionalism and efficiency of the staff\",\"the doctor was very patient in explaining everything clearly and thoroughly\",\"i love how they take the time to explain everything thoroughly with patience\",\"palaging maaasahan ang kanilang serbisyo\",\"mabilis at tapat ang kanilang serbisyong inaalok\",\"the doctors and staff were kind patient and very professional throughout my visit\",\"i am very satisfied with the level of service provided by the clinic\",\"excellent service from a professional team of doctors and staff\",\"the clinic\\u2019s service is amazing and the staff makes you feel at ease\",\"napakaayos mabilis at husay ng kanilang sistema\",\"the service was fast and efficient with great attention to detail\",\"their service is really great\",\"they provide a very efficient service\",\"they provide a very reliable service\",\"the service is very satisfactory\",\"excellent service as it is prompt\",\"excellent service was provided to us\",\"i love the service here\",\"the service is terrific as they are organized\",\"maganda ang serbisyo dahil may malasakit ang tauhan\",\"their service is excellent\",\"the service is terrific and very competitive\",\"their service is really good\",\"the staff are very patient focused\",\"i love how they provide service to their client\",\"the service is terrific as they are very welcoming\",\"the clinic has a great time management which is why there is little to no wait time\",\"i love how they manage their time\",\"very clean and excellent service\"]', '[\"the process of getting an appointment is neither difficult nor easy\",\"karaniwang karanasan at mayroong oras tuwing linggo\",\"ang serbisyo ng staff ay ayos lang\",\"everyone took their time with each animal\",\"ito ang unang beses ko at naranasan ko ang mga serbisyo nila\",\"nagbigay ng serbisyo ang staff at doktor\",\"the service was provided as expected\",\"everyone took their time with each animal\",\"they provide adequate quality service\",\"they deliver the service as required\",\"ang presyo ng serbisyo ay ayon sa nakatakdang halaga\",\"ang kanilang system ay may mga aspeto na nangangailangan ng oras upang matutunan\",\"minsan may pagkaantala sa oras\",\"the service was adequate\",\"there is a timer for booking and the process needs to be restarted each time\",\"the time slots are limited\",\"ang serbisyo ay naaayon sa mga kinakailangan\",\"kinakailangan ng oras pag nagbbook\",\"the service meets expectations\",\"the service is high level\",\"the wait time was within the expected range\",\"the waiting area has a noticeable odor\",\"the doctor took her time to answer all my questions\",\"nakakuha ako ng appointment para sa aking pusa\",\"kailangan maglaan ng oras sa paghihintay\",\"nakakuha ako ng appointment\",\"adequate service\",\"ang serbisyo ay tumugon sa mga kinakailangan\",\"the staff here take their time\",\"there are delays that may impact customers schedule\",\"service could be improved with quicker response times\",\"the customer service is just okay\",\"prompt service\",\"there is a need to allot an extra time when waiting\",\"binabati ka sa oras ng iyong appointment\",\"ang mga nakaiskedyul na appointment ay sumusunod sa itinakdang oras\",\"ang customer service ay maaaring mapabuti\",\"the process for making an appointment was clear\",\"available ang appointment sa parehong araw\",\"appreciate the service provided\",\"ang serbisyo na natanggap ay naayon sa inaasahan\",\"the doctor is polite and patient with us\",\"medyo matagal bago ako natawag\",\"you are greeted at your appointment time and efforts are made to ensure your pet is at ease\",\"the appointment scheduling was efficient\",\"staff provided good service\",\"madali ang paggawa ng appointment\",\"salamat sa staff para sa kanilang serbisyo\",\"mas mataas ang presyo ng serbisyo kumpara sa iba\",\"mula sa reception area hanggang sa mga tech at doktor mahusay ang serbisyo para sa aming aso at pusa\",\"naghintay kami nang matagal\",\"may mga pagkakataong may pagkaantala sa mga appointment\",\"maayos at katanggap-tanggap ang serbisyo\",\"good service\",\"they try to provide service\",\"nakatanggap ako ng agarang appointment\",\"the staff is competent and provides the necessary service\",\"maikling oras lang ang paghihintay\",\"maganda ang serbisyo at mairerrekomenda ko sa aking lugar\",\"ang oras ay madalas na naaantala\",\"madalas kaming makakuha ng appointment\",\"the service was okay\",\"ang mga pagsusuri at mga test ay palaging tinitingnan nang maayos\",\"ang presyo ng kanilang serbisyo ay medyo mataas\",\"maayos ang serbisyo\",\"maayos na serbisyo\",\"the service is dependable\",\"we waited longer than the scheduled time\",\"i appreciate their short waiting time for getting appointments\",\"they are always able to schedule an appointment for us\",\"i wasnt informed that my booked appointment was approved\",\"lahat ay magiliw at ang serbisyo ay laging maayos\",\"ang aking alaga ay gumaling nang mabilis\",\"the clinic appears to be overbooking their schedule\",\"medyo may katagalan ang paghihintay\",\"the staff could benefit from more focus as they were chatting behind the counter while i was waiting to be served\",\"ang hirap kumuha ng appointment\",\"hindi madali makuha ang confirmation ng appointment kapag nag book online\",\"the website experienced issues while I was trying to book an appointment\",\"the scheduled appointments are usually on time\",\"maaaring mataas ang gastos ngunit ang mga serbisyo ng pangangalaga ay naaayon sa halaga\",\"satisfactory service\",\"the system does not allow modifications to an appointment after it has been scheduled\",\"my kitten was better 24 hours after the visit.\",\"the doctor spent time with my dog\",\"i had to wait for hours for our turn\",\"apatnapung taon na akong umaasa sa kanila dahil ang kanilang serbisyo\",\"patient staff\",\"maayos ang serbisyo\",\"I received a prompt appointment\",\"the booking process lacks some features such as the ability to cancel appointment requests\",\"maayos ang serbisyo\",\"they are helpful and take the time to address our questions\",\"the vet had a good report with my dogs and took his time examining them\",\"ang mga tauhan ay nagbibigay ng serbisyo\",\"i spent some time waiting\",\"matagal ang aking paghihintay\",\"short waiting time\",\"ang beterinaryo ay nagbibigay oras sa iyong alaga\"]', '[\"hindi worth it ang oras sa pagpila\",\"hindi makatuwiran ng presyo ng serbisyo nila nakakadismaya\",\"unacceptable wait times its showing us that you dont respect our time\",\"nakakainip sobra ang paghihintay\",\"all my requests for an appointment are being ignored\",\"the staff are terrible at providing customer service\",\"even if you book an appointment you are not prioritized\",\"ang daming problema sa serbisyo pero ang mahal\",\"laging puno ang schedule kaya hindi makabook\",\"they ignored me at the front desk and made me wait for ages\",\"it took to too long for them to approve my appointment request\",\"i did not like having to pay a premium for emergency service\",\"i had a very long wait because of the long line\",\"they have hidden fees that are not mentioned until after the service is done which is so unfair\",\"i have to wait for a very long time despite having an appoinment\",\"the booking form is too long and asks for unnecessary details\",\"nakakaubos ng pasensya sa sobrang tagal ng paghihintay\",\"my dog started to get restless at how long we have been waiting in the lobby\",\"incredibly long wait before we could see the vet\",\"the staff are so rude as no one apologized when they made me wait for over an hour\",\"the wait was very long\",\"the service is worst\",\"matagal magreply sa booking request\",\"nakakaubos ng oras ang waiting time sa sobrang bagal\",\"laging hindi nasusunod ang binigay na oras\",\"worst customer service\",\"i was late to my job because the clinic didnt honor my appointment schedule\",\"the vet barely spent any time examining my pet and seemed in a hurry which felt rude\",\"i couldnt book an appointment on my because the ui was not optimized\",\"hindi sulit ang presyo ng kanilang serbisyo\",\"they rush everything which is ridiculous\",\"hindi flexible ang oras sa pagrereschedule kaya ang hirap magbook ulit\",\"ang pangit ng serbisyo\",\"it feels like they are just winging their scheduling system with how slow and inefficient\",\"hindi ko nagustuhan na kailangan magbayad para sa emergency na serbisyo\",\"if this werent the only clinic near us then we wouldnt be going here the wait is ridiculous\",\"napaka taas ng presyo kahit wala namang special na serbisyo\",\"poor time management\",\"the staff failed to update me on my pets progress during a long procedure\",\"hindi tugma ang presyo at serbisyo\",\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",\"the rugs in the waiting area were dirty and smelled awful\",\"the service is the worst\",\"walang respeto sa oras ng mga customer\",\"hindi kami binibigyan ng oras\",\"sobrang mahal at bagal ng serbisyo nila\",\"hindi sulit ang presyo sa kalidad ng serbisyo na binibigay nila\",\"sobrang mahal ng serbisyo\",\"they are very slow in tending to their clients\",\"hindi nasusunod ang tamang oras ng appoinment\",\"its frustrating that i cant book multiple pets in one appointment\",\"out of the many times we have gone here not once did we get to have our appointment on time\",\"ang dami kong problema sa serbisyo nila\",\"i dont understand why it takes so long for them to finish an appointment\",\"hindi ko nagustuhan na kailan magbayad para sa emergency na serbisyo\",\"mahirap magbook online at nauubos ang oras\",\"the line was barely moving i had to wait for so long even though i came here early\",\"too many people too much waiting\",\"the loading time for the booking page was too long i ended up not booking\",\"napaka baba ng kalidad ng serbisyo pero sobrang mahal\",\"we are often unable to book a schedule here\",\"i waited for a very long time\",\"pinakamasamang serbisyo sa kustomer na natanggap ko sa buong buhay ko\",\"hindi sulit sa bulsa ang mahal para sa binigay nilang serbisyo\",\"walang konsiderasyon sa oras ng customer\",\"sobrang hassle ng paghihintay sa pila\",\"i feel like the clinic is very inefficient as the waiting time is too long\",\"worst customer service i had ever received in my life\",\"nakakainis ang sobrang haba na paghihintay\",\"the clinic staff seemed unorganized and lost my appointment booking\",\"you have to wait for a long time despite having a schedule\",\"hindi vina value ng clinic ang iyong oras\",\"hindi ko nagustuhan ang customer service dahil nakakainis ang mga tauhan\",\"waiting for hours to see the vet is not reasonable please fix this\",\"our appointment got delayed and we had to wait forever which is ridiculous\",\"i did not like having to pay a premium for emergency service\",\"i have to wait for a very long time which is not good\",\"im very disappointed with how long they made me wait for my babys checkup\",\"napakapangit ng serbisyo\",\"the staff are slow\",\"sobrang tagal ng service\",\"we waited for so long before we could get into the doctors room\",\"this clinic has very poor time management we waited for almost an hour\"]', '2025-04-16 01:46:28', '2025-04-16 07:35:57'),
(6, 'Booking Experience', 13.19, 51.65, 35.16, 12, 47, 32, '[\"ang mga tauhan ay mabilis sumagot sa mga katanungan kaya mabilis ang proseso\",\"napakabilis ng proseso sa kanilang system\",\"napakaayos ng kanilang website\",\"the process of their services is one of the best\",\"i had no trouble booking an appointment everything was timely\",\"the booking process is quick and responsive\",\"scheduling an appointment is always quick and easy\",\"madali ang pagkuha ng appointment\",\"their accessible scheduling process is perfect for busy pet owners\",\"the examination process conducted by their vets are always thorough yet manageable\",\"their process is very helpful in finding the best time for appointments\",\"mabagal ang proseso kaya tumatagal\"]', '[\"the process of getting an appointment is neither difficult nor easy\",\"the process went as expected\",\"there is a timer for booking and the process needs to be restarted each time\",\"nakakuha ako ng appointment para sa aking pusa\",\"canceling or rescheduling online requires several steps\",\"nakakuha ako ng appointment\",\"there are delays that may impact customers schedule\",\"sila ay tumawag pagkatapos ng ilang araw para magtanong sa kalagayan ng aking alaga\",\"binabati ka sa oras ng iyong appointment\",\"minsan ay may error sa online booking\",\"ang mga nakaiskedyul na appointment ay sumusunod sa itinakdang oras\",\"the process for making an appointment was clear\",\"available ang appointment sa parehong araw\",\"tumawag ako kanina at ang mga gamot ay handa na nang dumating ako upang kunin ang mga ito\",\"the amount charged was different from the price listed on their website\",\"the mobile view of the website needs improvement\",\"you are greeted at your appointment time and efforts are made to ensure your pet is at ease\",\"may mga pagkakataong nagkakaroon ng issue sa system kaya nahihirapan mag book\",\"the appointment scheduling was efficient\",\"madali ang paggawa ng appointment\",\"maayos ang aking karanasan mula sa unang tawag para sa impormasyon\",\"appointments are available on the same day as the call\",\"may mga aspeto ng booking process na pwedeng mas gawing malinaw\",\"tumawag ako at sila ay magalang\",\"may mga pagkakataong may pagkaantala sa mga appointment\",\"pinili ko ang pasilidad na ito online at nagdesisyon na subukan\",\"nakatanggap ako ng agarang appointment\",\"i recently moved to the area and chose this facility based on online information\",\"i needed to call multiple times when booking\",\"nakakalito ang proseso ng kanilang online na pag book\",\"madalas kaming makakuha ng appointment\",\"may ilang hamon sa pagtatakda ng iskedyul\",\"the booking process needs improvement\",\"they are always able to schedule an appointment for us\",\"ang hirap makakuha ng slot sa pag book\",\"i wasnt informed that my booked appointment was approved\",\"the clinic appears to be overbooking their schedule\",\"an okay experience from my first phone call for basic information\",\"when I had to book I had to call them 34 times\",\"lagi kang makakakuha ng iskedyul\",\"ang hirap kumuha ng appointment\",\"hindi madali makuha ang confirmation ng appointment kapag nag book online\",\"the website experienced issues while I was trying to book an appointment\",\"the system does not allow modifications to an appointment after it has been scheduled\",\"I received a prompt appointment\",\"the booking process lacks some features such as the ability to cancel appointment requests\",\"maraming problema sa pag book\"]', '[\"napakahirap tumawag para mag book\",\"the booking process was too complicated which is frustrating\",\"all my requests for an appointment are being ignored\",\"even if you book an appointment you are not prioritized\",\"laging walang available na slot sa pag book online\",\"laging puno ang schedule kaya hindi makabook\",\"the online booking system was not working totally useless\",\"it took to too long for them to approve my appointment request\",\"the system is always malfunctioning so i was not able to book properly\",\"masyadong mataas maningil kahit simple lang ang procedure\",\"i have never received the confirmation for my appoinment so im not sure if it worked\",\"i was late to my job because the clinic didnt honor my appointment schedule\",\"i dont think the clinic checks their online booking system as they never respond to my requests\",\"i couldnt book an appointment on my because the ui was not optimized\",\"hindi efficient ang pag book online\",\"the clinic charges a premium so we can call it overpriced\",\"no one picked up the phone when I called multiple times for assistance which is unacceptable\",\"its frustrating that i cant book multiple pets in one appointment\",\"out of the many times we have gone here not once did we get to have our appointment on time\",\"i was shocked at how much they charged me for a simple procedure\",\"i dont understand why it takes so long for them to finish an appointment\",\"mahirap magbook online at nauubos ang oras\",\"absolutely awful i came to check on the grooming process and the area was freezing my poor girl was shaking\",\"we are often unable to book a schedule here\",\"the receptionist was on their phone instead of helping customers which is rude\",\"the clinic staff seemed unorganized and lost my appointment booking\",\"you have to wait for a long time despite having a schedule\",\"hindi matulungin ang mga tauhan sa pag book\",\"i couldnt leave a note during the booking process which is not good\",\"our appointment got delayed and we had to wait forever which is ridiculous\",\"sobrang bagal ng booking process kaya hindi katanggap tanggap\",\"hindi user friendly ang pag book online at nakakaasar lang\"]', '2025-04-16 01:46:28', '2025-04-16 01:46:28');

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
('5cK7yEklNiOi668pfyyT57BID6cq3h5tUa2HIuEE', NULL, '2a02:4780:6:c0de::10', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzdmcFFmSnBGTE9Yd3lsNU5yNGZjN1V5Mk9SSlRleGx4anp0elRkTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744084398),
('5xK1lim9r9lYmJ1CAspt5NPtAvPltpGbls5EKfRH', NULL, '2001:bc8:1201:1c:ba2a:72ff:fee1:1432', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicTE2aTV1NWpJcklDb3lMWVpFN082S1M2RXUxR096N2xsR1cxdzgxMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744111700),
('A77ftPOCzr41A7Kiw8mWt1hVtJ1OC0zgNtt60krc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGVhdnRaTUgxcXpPWlhWMklFNDJsVDdoQ29rQXhkbmZnUG1HSHBoQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736252890),
('dislSNlMkqmU4l56sF9RpW0uPunImrUXw4Cad0IY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTDZtSnJYSkpncU9pbVRPSktJT0VzTTN2Zzc1Yzc2Q3pmcEljZGtQbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736315371),
('Ebg7MYXavNkoOBRAZSiQBijfUu4rOAv4Li7Mtuy9', NULL, '2001:bc8:1da0:16:ba2a:72ff:fed2:d9b4', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVXZhTTgwZkpiMTF3aXFVUW9mRWZGSlFpeG9jYzFsem1SREFwR0NMNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744303817),
('I1BmUlvv79kfFRumDQiYZd3zHvFVO1HsiazsBndn', NULL, '2a02:4780:6:c0de::10', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieFRhTk5DSGJxMVZ5SE9Eb2M3cENSNWRsYWJMNEZuOVVEbTJDM014ZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744159038),
('kTpgI9axhTeZlIjbiE91dxptxcRllnfglqROgwYW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid1UxZVpvalk3bzZ3ZVM5cGN6WUZMeE5hcUFHcDBWUDBvTnRxZHRwayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736260221),
('LmLxNCFaz1dU5z963bTFqiVBQDNPf2wufBi6jbEG', NULL, '54.246.47.192', 'Mozilla/5.0 (compatible; NetcraftSurveyAgent/1.0; +info@netcraft.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0pmbHB3aXJpM1RkcWppZk5SR0dTVUxEUldYZzJhTnh5ZVdGQ3djYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744130671),
('M6K4Zjc64ft8OvozEnWp4bWpY0q1WoYhyxY3B7bD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibDBhSTBxSU52dEE2Tm02SWZpMU5vMFZxaklZT2dSd3o5YlppUzQzdCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736493715),
('mw9g0zVcu4Ojqly1CyBy8frDop9LukuTszvUNMJK', NULL, '122.52.177.37', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU1o0eXFZbmQ4cnljT292d1hzWHhXanJwVTdtN3c5c0k0WjFXUWFweSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744357532),
('nexGXCAPsRnJnwpSwfbhkAEWpzIycCC1BZJPtaNz', NULL, '2a02:4780:6:c0de::10', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibkdZUGUyUk04WUZ6eXd2bTlPS05VaEFNdVhmaVBjUlVjYnBHVTF6WCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744338486),
('NvMLbhsPDEwc8wNxApSTfxk5FwjNv9CjQR1adSNd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieU10U2YxSnd0VVZqTVJOdFFJNTlQdUFUUzV1eFhBZWFyNXVZaDhBUSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1736697294),
('okW38QHxwykvttNPz05cXOhXGNwuq2VHirB3FPmO', NULL, '34.222.174.85', 'Mozilla/5.0 (compatible; wpbot/1.3; +https://forms.gle/ajBaxygz9jSR8p8G9)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVWNvSjVoSVJtQktJTG1OZGxnOWRJQTFrRmxSMTl6NlRsSGxoRTh2TCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744160793),
('pnMc9dcuSY3j5lUAilv5KF59yYXbDtzN0A9cfAw1', NULL, '2a02:4780:6:c0de::10', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidk5BNlNtYkRhWEZ5eHhxdWN3dnVtbHJ3ZnRZMm5meWxFVTl3QVV0VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744675835),
('rsH3i8xymvnOMZTk9tHf7YLLGxDKJrZMdtqbunAn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXhRZlNidXFhZjJBbVVORjA0Q1BRRkZNelljM1liVGQyM0taeHNyOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1736235918),
('UuqJy631S000F6f1mayp7geKrTS5A1wdPfM7VTSe', NULL, '49.144.10.80', 'WhatsApp/3.0.0.0 A', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNDRidWd6UVFVTUJEY25YNmpSVVpmZmhpOXhvazFxcnV1UERuYXF0SCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744601828),
('Wl0dQ7egIsuYD9BEXbi84YSonpTSYcORVoPGVvU0', NULL, '2a02:4780:6:c0de::10', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaU1wZzV0bEVueDQwczBjYnkzdWE1aU1UbzY3UFE1VUFvd2RycFc3dyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744248679),
('wm8sEgNgFlmhPs7SfkadWedEirbO3yHtyjj2F5Pl', NULL, '2001:bc8:701:1c:ba2a:72ff:feda:18c2', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidDg5NGlDRUo2a0dsTURVa3d2R0l4ZWlPazQybVUydUdpUnUwZGh6UiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744716555),
('XsVQz6KY1dbQ8bixphUPAPEG31EEoFMhVbUV3Igu', NULL, '153.92.14.44', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMUd0YWlJUENHbTFUVVNQUmFkNzAybXl6cnBoSmNTc3NhODJFQlV1UCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745116191),
('yRwoCr4hJTafLuTTFd0v6yCiuEaOtrc35jBXjZLQ', NULL, '2a02:4780:6:c0de::10', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHJmemRoZEhxVFlhVEpqT01IaXQybzZtcVBvanNlaFlmUEZ2UWMweSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744594519),
('ZXWA2rMqNTBLoEXQIVxsiIT2iP9uQ4jk3OcBdvKb', NULL, '13.40.71.224', 'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRXRCNnc0WXBmalJaSGlsWnZhWXpJbEdvQUZiSGpQSWkxTE5ndmJneSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vYXBpLmFyZXZhbG9zYW5pbWFsY2xpbmljLm9ubGluZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744157221);

-- --------------------------------------------------------

--
-- Table structure for table `sms_otps`
--

CREATE TABLE `sms_otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `otp` varchar(6) NOT NULL,
  `for` varchar(255) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sms_otps`
--

INSERT INTO `sms_otps` (`id`, `otp`, `for`, `client`, `status`, `created_at`, `updated_at`) VALUES
(1, '063006', 'phone verification', '936822', 'Expired', '2025-03-22 22:47:03', '2025-03-22 22:47:30'),
(2, '079589', 'phone verification', '936822', 'Expired', '2025-03-22 22:47:30', '2025-03-22 22:51:37'),
(3, '484955', 'phone verification', '936822', 'Expired', '2025-03-22 22:51:37', '2025-03-22 23:25:06'),
(4, '424366', 'phone verification', '936822', 'Expired', '2025-03-22 23:25:06', '2025-03-22 23:28:10'),
(5, '257893', 'phone verification', '936822', 'Expired', '2025-03-22 23:28:10', '2025-03-22 23:28:36'),
(6, '078306', 'phone verification', '936822', 'Expired', '2025-03-22 23:28:36', '2025-03-22 23:30:07'),
(7, '520175', 'phone verification', '936822', 'Active', '2025-03-22 23:30:07', '2025-03-22 23:30:07'),
(8, '362393', 'phone verification', '26477', 'Active', '2025-04-11 02:53:14', '2025-04-11 02:53:14'),
(9, '590349', 'phone verification', '337715', 'Active', '2025-04-11 03:31:17', '2025-04-11 03:31:17'),
(10, '962939', 'phone verification', '637862', 'Expired', '2025-04-13 15:11:48', '2025-04-13 15:11:50'),
(11, '232339', 'phone verification', '637862', 'Active', '2025-04-13 15:11:50', '2025-04-13 15:11:50');

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

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2025-04-04 07:05:57', '$2y$12$k3ZmQSAjpRgz4KDy18lpWuhGrqQzl87ASiHekOYnTbJikY9fdzHfq', '1idsVUFI23', '2025-04-04 07:05:57', '2025-04-04 07:05:57');

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
('111111', 'John', NULL, 'Tho', 'jtho@gmail.com', '$2y$12$LfSkQuijk7g/MFeMcOfa8ueXKVfyQUCLKdLFolrAiB0835arTb7Re', '2000-10-22', 'Male', 'Makati City', '09297463623', 1, 'active', NULL, '2024-10-07 06:59:04', '2024-10-07 06:59:04'),
('186775', 'Josephine', NULL, 'Balagtas', 'josephineBalagtas@gmail.com', '$2y$12$j5bD5fyUCxlYK3djTZUhKOAtPcyp9gApNUOyTNB0d.W/N.Lo5df3W', '2000-08-06', 'Female', 'Makati City', '09273421232', 2, 'active', 'hemkoCYUhqfCGZ5tG8E9gRzi.jpg', '2024-12-06 00:33:37', '2024-12-06 00:33:37'),
('643205', 'Juan', NULL, 'Digo', 'juandigo@gmail.com', '$2y$12$PGpMjWuWdNfLor62qQP2MukdH4VKpY3qVnTXt3iLg9Z4V/vTiHbPS', '1998-11-10', 'Male', 'Makati City', '09299348536', 3, 'active', 'fggGa9P4kajXJzqGypqU80qG.jpg', '2025-03-29 06:56:04', '2025-03-29 06:56:04'),
('907459', 'Sofia', NULL, 'Santos', 'sofiaSantos@gmail.com', '$2y$12$wJMY4R.QzHtxtv4W.9252.XxaulAAhnFy7i0Sqog.h1W4twKbD4pu', '1999-01-10', 'Female', 'Makati City', '09275439284', 6, 'active', 'Jt04YkHIhh9NicHDMzgjKJXR.jpg', '2024-12-06 00:40:04', '2024-12-06 00:40:04'),
('983628', 'William', NULL, 'Smith', 'williamSmith@gmail.com', '$2y$12$eTdAcSbseE0dnw0RAUESD.80WB0nh85sHZ8PnBwm9IL54B9b8sMIO', '1998-10-16', 'Male', 'Makati City', '09398372632', 4, 'deleted', 'Jt04YkHIhh9NicHDMzgjKJXR.jpg', '2024-10-17 21:16:42', '2024-10-17 21:36:28');

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
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `phone_verified` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `label` varchar(250) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_clients`
--

INSERT INTO `user_clients` (`id`, `fname`, `mname`, `lname`, `email`, `password`, `bday`, `gender`, `address`, `phone`, `picture`, `email_verified`, `phone_verified`, `status`, `label`, `created_at`, `updated_at`) VALUES
('178427', 'Ruth Denise', 'Yalung', 'Baladad', 'mark@gmail.com', '$2y$12$24MrC3bz0DpWFiEtCn/hDOY9/BCfCYojPa08IhDz6zzUzPtWW7dz.', NULL, NULL, NULL, '09723782671', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-11 09:58:27', '2025-04-11 09:58:27'),
('179411', 'Xander Aleck Gwynnz', NULL, 'Deloso', 'xagdeloso02@gmail.com', '$2y$12$9Xv83N59bzRSzFY5fSbzdOpdPUtZGfQNJk9c6hshzaeO.yW064J5q', NULL, 'Female', NULL, '09273915985', 'defaultPFP.png', 0, 0, 'active', NULL, '2024-09-29 02:19:58', '2025-03-29 20:19:45'),
('18533', 'Emman', NULL, 'Test', 'tester.emman@gmail.com', '$2y$12$D.WFxZc7hX5YfnRrzGatTuXJPvUXEhEITwZ3WjlkkgFuEjgd5FeC.', NULL, NULL, NULL, '09000000000', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-15 05:59:15', '2025-04-15 05:59:15'),
('26477', 'clar', 'Mid', 'Last', 'c.robrigado@aadsmasa.com', '$2y$12$KxNHPgTEQCQlqzJlSsZnQ.syPvSyUGKImKR6tLtL4cXrffzW70fSC', NULL, NULL, NULL, '09392340274', 'defaultPFP.png', 0, 0, 'suspended', NULL, '2025-04-11 02:52:42', '2025-04-11 03:02:21'),
('337715', 'MICHAEL CEDRICK BOBBY', 'ALONTE', 'ENRIQUEZ', 'm.enriquez@asianavis.com', '$2y$12$MKWSQdZ0Logil00iDEXxT.rw0uHXNuOJllzwAxksZpwLtQt1uR5D.', NULL, NULL, NULL, '09270256631', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-11 03:28:36', '2025-04-11 03:28:36'),
('365562', 'Miriam', NULL, 'Pidul', 'miriampidul@gmail.com', '$2y$12$C2jmlC2/cv9Ek3FPV5a83uKHI30qUMTcm0OcPzUMcv9COYZUKvFxi', NULL, NULL, NULL, '09954739844', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-10 02:17:58', '2025-04-10 02:17:58'),
('3929', 'Marc', NULL, 'Erna', 'marc.erna16@gmail.com', '$2y$12$wTXoiZdvj5M3vTJ.1E.Zd.XKGZjDBm56bP6t5wBb8QOteKlQ8jWNu', NULL, NULL, NULL, '09512735624', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-09 12:46:37', '2025-04-09 12:46:37'),
('555538', 'Marie', NULL, 'Garcia', 'garciamarieangela21@gmail.com', '$2y$12$BYDd2BdLV6qWtJqyw/FFsO/QGxLQjUSzqERRl8HoyYjy.UOGkMatK', NULL, NULL, NULL, '09772133361', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-08 14:38:02', '2025-04-08 14:38:02'),
('637862', 'James', 'Costa', 'Alfonso', 'jamesalfonso212@gmail.com', '$2y$12$/KjS7yUG4PSp6MCk6w/Z0OKdnY5VUXpeX4g973xMZYDhowkEjjd06', NULL, NULL, NULL, '09239874334', '3z4JNi7qXx6npIUETidjtSFv.png', 0, 0, 'active', NULL, '2025-04-13 15:10:48', '2025-04-13 15:11:35'),
('640452', 'ced', 'alonte', 'enriquez', 'imichaelcedrick@gmail.com', '$2y$12$fIJsIRfOVOtuo252X5QOEusylIrBaZ6L6fGHdrW7VcoWZ6K7gyRrG', NULL, NULL, NULL, '09270256638', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-11 03:26:33', '2025-04-11 03:26:33'),
('743583', 'ruth denise', 'Yalung', 'Baladad', 'bruthdenise@gmail.com', '$2y$12$tEG/DOmkFxJ./QTur0odfO64iQ7aaAyiZtAxgfZ68muIff4p2sZxC', NULL, NULL, NULL, '09772389363', 'defaultPFP.png', 0, 0, 'deleted', NULL, '2025-04-11 03:15:19', '2025-04-11 03:19:13'),
('887421', 'Francis', NULL, 'Evangelista', 'francis.evangelista.81@gmail.com', '$2y$12$X4kzmbcDgjEMSr/NOHlgdOoejWz1iK96bHiu8eUZ3Z4iyoE6iTNk6', NULL, NULL, NULL, '09932718917', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-15 15:02:29', '2025-04-15 15:02:29'),
('923394', 'Richard', 'Balud', 'Regala', 'r.regala@asianavis.com', '$2y$12$WJI1pvd/LUpDbV8vC.AiiudZig0omOVR1QtYnYGnAtZA30xltcFEO', NULL, NULL, NULL, '09176210390', 'defaultPFP.png', 0, 0, 'active', NULL, '2025-04-11 02:57:28', '2025-04-11 02:57:28'),
('936822', 'Airich Jay', NULL, 'Diawan', 'airichjaydiawan@gmail.com', '$2y$12$5ZfDrsmZSjhwmPIfPQfcuOyRqVS.iWWO11xMNQldKnTxqj2vnHrQ2', NULL, 'Male', NULL, '09677644695', '52Mg1ky0hDpkWK7V0lMwpuQf.jpg', 0, 1, 'active', 'Mabait at Guapu ☺️', '2024-08-20 03:01:53', '2025-04-07 06:57:22'),
('964696', 'Raihanna', 'Yalung', 'Baladad', 'r8denise@gmail.com', '$2y$12$0YdZnaz3sPAGOO3roO/cduUcAKe4Hx7wNKVEyUffk8wTlnrLTbFBK', NULL, NULL, NULL, '09619102580', 'defaultPFP.png', 0, 0, 'deleted', NULL, '2025-04-11 03:10:50', '2025-04-11 03:19:17');

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
  ADD KEY `appointments_service_foreign` (`service`),
  ADD KEY `appointments_medical_history_foreign` (`medical_history`),
  ADD KEY `appointments_service_type_foreign` (`service_type`),
  ADD KEY `appointments_otc_pet_type_foreign` (`otc_pet_type`),
  ADD KEY `appointments_otc_pet_breed_foreign` (`otc_pet_breed`);

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
-- Indexes for table `clinic_service_types`
--
ALTER TABLE `clinic_service_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clinic_service_types_service_foreign` (`service`);

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
-- Indexes for table `medical_histories`
--
ALTER TABLE `medical_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medical_histories_physical_exams_foreign` (`physical_exams`),
  ADD KEY `medical_histories_laboratory_exams_foreign` (`laboratory_exams`),
  ADD KEY `medical_histories_diagnosis_foreign` (`diagnosis`);

--
-- Indexes for table `medical_history_diagnoses`
--
ALTER TABLE `medical_history_diagnoses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical_history_laboratory_exams`
--
ALTER TABLE `medical_history_laboratory_exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical_history_physical_exams`
--
ALTER TABLE `medical_history_physical_exams`
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
  ADD KEY `pets_client_foreign` (`client`),
  ADD KEY `pets_type_foreign` (`type`),
  ADD KEY `pets_breed_foreign` (`breed`);

--
-- Indexes for table `pet_breeds`
--
ALTER TABLE `pet_breeds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_breeds_pet_type_foreign` (`pet_type`);

--
-- Indexes for table `pet_types`
--
ALTER TABLE `pet_types`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `sms_otps`
--
ALTER TABLE `sms_otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sms_otps_client_foreign` (`client`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `appointment_assigned_staffs`
--
ALTER TABLE `appointment_assigned_staffs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cat_breeds`
--
ALTER TABLE `cat_breeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clinic_services`
--
ALTER TABLE `clinic_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `clinic_service_types`
--
ALTER TABLE `clinic_service_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `email_otps`
--
ALTER TABLE `email_otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2773;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inventory_categories`
--
ALTER TABLE `inventory_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `inventory_histories`
--
ALTER TABLE `inventory_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `medical_histories`
--
ALTER TABLE `medical_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medical_history_diagnoses`
--
ALTER TABLE `medical_history_diagnoses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medical_history_laboratory_exams`
--
ALTER TABLE `medical_history_laboratory_exams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medical_history_physical_exams`
--
ALTER TABLE `medical_history_physical_exams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `pet_breeds`
--
ALTER TABLE `pet_breeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=344;

--
-- AUTO_INCREMENT for table `pet_types`
--
ALTER TABLE `pet_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sentiment_analyses`
--
ALTER TABLE `sentiment_analyses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sms_otps`
--
ALTER TABLE `sms_otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_medical_history_foreign` FOREIGN KEY (`medical_history`) REFERENCES `medical_histories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_otc_pet_breed_foreign` FOREIGN KEY (`otc_pet_breed`) REFERENCES `pet_breeds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_otc_pet_type_foreign` FOREIGN KEY (`otc_pet_type`) REFERENCES `pet_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_pet_foreign` FOREIGN KEY (`pet`) REFERENCES `pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_service_foreign` FOREIGN KEY (`service`) REFERENCES `clinic_services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_service_type_foreign` FOREIGN KEY (`service_type`) REFERENCES `clinic_service_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
-- Constraints for table `clinic_service_types`
--
ALTER TABLE `clinic_service_types`
  ADD CONSTRAINT `clinic_service_types_service_foreign` FOREIGN KEY (`service`) REFERENCES `clinic_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `medical_histories`
--
ALTER TABLE `medical_histories`
  ADD CONSTRAINT `medical_histories_diagnosis_foreign` FOREIGN KEY (`diagnosis`) REFERENCES `medical_history_diagnoses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `medical_histories_laboratory_exams_foreign` FOREIGN KEY (`laboratory_exams`) REFERENCES `medical_history_laboratory_exams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `medical_histories_physical_exams_foreign` FOREIGN KEY (`physical_exams`) REFERENCES `medical_history_physical_exams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_breed_foreign` FOREIGN KEY (`breed`) REFERENCES `pet_breeds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_type_foreign` FOREIGN KEY (`type`) REFERENCES `pet_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pet_breeds`
--
ALTER TABLE `pet_breeds`
  ADD CONSTRAINT `pet_breeds_pet_type_foreign` FOREIGN KEY (`pet_type`) REFERENCES `pet_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sms_otps`
--
ALTER TABLE `sms_otps`
  ADD CONSTRAINT `sms_otps_client_foreign` FOREIGN KEY (`client`) REFERENCES `user_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_admins`
--
ALTER TABLE `user_admins`
  ADD CONSTRAINT `user_admins_role_foreign` FOREIGN KEY (`role`) REFERENCES `admin_roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
