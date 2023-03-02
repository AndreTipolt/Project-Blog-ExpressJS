import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";


@Entity('post')
export class Post{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'datetime' })
    date: Date

    @Column({ type: 'text' })
    content: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
}