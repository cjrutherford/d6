import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import UserEntity from './user.entity';

@Entity()
export default class UserProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => UserEntity, user => user.profile )
    @JoinColumn({ name: 'userId' })
    user: UserEntity; // Reference to the UserEntity

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    profilePictureUrl?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
}

@ApiTags('user-profiles')
export class CreateUserProfileDto {
    @ApiProperty()
    userId: string;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    bio?: string;

    @ApiProperty({ required: false })
    profilePictureUrl?: string;
}

@ApiTags('user-profiles')
export class UpdateUserProfileDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    bio?: string;

    @ApiProperty({ required: false })
    profilePictureUrl?: string;
}

@ApiTags('user-profiles')
export class UserProfileDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    bio?: string;

    @ApiProperty({ required: false })
    profilePictureUrl?: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ required: false })
    updatedAt?: Date;
}