-- CreateTable
CREATE TABLE `professional_application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `serviceCategory` VARCHAR(100) NOT NULL,
    `experienceYears` INTEGER NOT NULL,
    `serviceArea` VARCHAR(255) NOT NULL,
    `skills` TEXT NOT NULL,
    `availability` VARCHAR(30) NOT NULL,
    `description` TEXT NOT NULL,
    `identityDocumentPath` VARCHAR(500) NOT NULL,
    `addressProofPath` VARCHAR(500) NOT NULL,
    `certificatePath` VARCHAR(500) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    `reviewNotes` TEXT NULL,
    `reviewedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `professional_application_status_idx`(`status`),
    INDEX `professional_application_email_idx`(`email`),
    INDEX `professional_application_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professional` ADD CONSTRAINT `professional_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `professional`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `address` RENAME INDEX `Address_userId_idx` TO `address_userId_idx`;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_addressId_idx` TO `booking_addressId_idx`;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_bookingDate_idx` TO `booking_bookingDate_idx`;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_professionalId_idx` TO `booking_professionalId_idx`;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_serviceId_idx` TO `booking_serviceId_idx`;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_status_idx` TO `booking_status_idx`;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_userId_idx` TO `booking_userId_idx`;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_name_key` TO `category_name_key`;

-- RenameIndex
ALTER TABLE `professional` RENAME INDEX `Professional_userId_idx` TO `professional_userId_idx`;

-- RenameIndex
ALTER TABLE `professional` RENAME INDEX `Professional_userId_key` TO `professional_userId_key`;

-- RenameIndex
ALTER TABLE `service` RENAME INDEX `Service_categoryId_idx` TO `service_categoryId_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_phone_key` TO `user_phone_key`;
