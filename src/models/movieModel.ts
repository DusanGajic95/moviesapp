import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './userModel';

@Table
export class Movie extends Model {
    @Column
    title!: string;

    @Column
    releaseDate!: Date;

    @Column
    userScore!: number;

    @Column
    description?: string;

    @Column
    image?: string;

    @Column
    trailer?: string;

    @Column
    director?: string;

    @Column
    duration?: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}
