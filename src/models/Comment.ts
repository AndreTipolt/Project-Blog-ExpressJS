import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "./Post"
import { User } from "./User"

@Entity('comment')
export class Comment{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'datetime' })
    date: Date

    @Column({ type: 'text' })
    content: string

    @ManyToOne(() => User , user => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: Post
}