import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Movie } from './movieModel';
import { Genre } from './genreModel';

@Table
export class User extends Model {
    @Column
    name!: string;

    @Column
    email!: string;

    @Column
    password!: string;

    @HasMany(() => Movie)
    movies!: Movie[];

    @HasMany(() => Genre)
    genres!: Genre[];
}
