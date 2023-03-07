import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";


@Entity('user')
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]

    @OneToMany(() => Post, post => post.user)
    posts: Post

    @Column({ type: 'text' })
    lastName: string

    @Column({ type: 'datetime' })
    birthDate: Date

    @Column({ type: 'text' })
    gender: string
    
}