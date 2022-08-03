/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : assessment

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 03/08/2022 23:08:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects`  (
  `subjectid` int NOT NULL AUTO_INCREMENT,
  `subjectname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  PRIMARY KEY (`subjectid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subjects
-- ----------------------------
INSERT INTO `subjects` VALUES (1, 'English', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (2, 'Maths', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (3, 'Digital Technology', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (4, 'Robotics', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (5, 'Accounting', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (6, 'Hospitality', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (7, 'Fabrics', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (8, 'Chemistry', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (9, 'Physics', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (10, 'Business Studies', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (11, 'Science', '2023-01-01', '2023-12-31');
INSERT INTO `subjects` VALUES (12, 'Biology', '2023-01-01', '2023-12-31');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'jacirving@student.pakuranga.school.nz', '$pbkdf2-sha256$29000$BECo9V4rhXAuZax1DmEM4Q$aPU6CKDCAidDi3VtH.E2YYtRLtNhVRT.ipX1iOhRAJ0', 'Jacob', 'Irving', 'user');
INSERT INTO `users` VALUES (2, 'frachiplin@student.pakuranga.school.nz', '$pbkdf2-sha256$29000$771XKiWEUGoNgTBGqFXKGQ$L9pZcVbu2yU//AdcaQi85CSvYrvns4RbYfNMc/pY5Yw', 'Frank', 'Chiplin', 'user');
INSERT INTO `users` VALUES (3, 'finbremner@student.pakuranga.school.nz', '$pbkdf2-sha256$29000$DOGcc85Zq3VuTUmJMWYsZQ$7OjrBWfZxRE0IXZUlyx6dtmJkUoXGFA6JckjInWbi4E', 'Finley', 'Bremner', 'user');
INSERT INTO `users` VALUES (4, 'jacobirving@admin.pakuranga.school.nz', '$pbkdf2-sha256$29000$zRkDoLSWkjLmfG8N4XzvPQ$zjxngR6dB3wqoUA4o7eTACK17bWivTsvQFxEsoUMvo4', 'Jacob', 'Irving', 'admin');

-- ----------------------------
-- Table structure for usersubjects
-- ----------------------------
DROP TABLE IF EXISTS `usersubjects`;
CREATE TABLE `usersubjects`  (
  `userid` int NOT NULL,
  `subjectid` int NOT NULL,
  PRIMARY KEY (`userid`, `subjectid`) USING BTREE,
  INDEX `subjectid`(`subjectid` ASC) USING BTREE,
  CONSTRAINT `usersubjects_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `usersubjects_ibfk_2` FOREIGN KEY (`subjectid`) REFERENCES `subjects` (`subjectid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usersubjects
-- ----------------------------
INSERT INTO `usersubjects` VALUES (1, 1);
INSERT INTO `usersubjects` VALUES (1, 2);
INSERT INTO `usersubjects` VALUES (2, 11);
INSERT INTO `usersubjects` VALUES (3, 11);
INSERT INTO `usersubjects` VALUES (3, 12);

SET FOREIGN_KEY_CHECKS = 1;
