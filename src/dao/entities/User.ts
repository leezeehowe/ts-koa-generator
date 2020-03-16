import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

/**
 * 用户类
 */
@Entity()
export class User extends BaseEntity{

    @Column({
        type: "varchar",
        length: 50,
        comment: "邮箱地址"
    })
    emailAddress: String;

    @Column({
        type: "varchar",
        length: 25,
        comment: "手机号码"
    })
    phoneNumber: String;

    @Column({
        type: "varchar",
        length: 10,
        comment: "用户昵称，仅支持中文、数字、大小写英文字母、下划线"
    })
    nickName: String;

    @Column({
        type: "varchar",
        length: 200,
        comment: "头像地址"
    })
    avatar: String;

    @Column({
        type: "varchar",
        length: 20,
        comment: "密码"
    })
    password: String;

    @Column({
        type: "text",
        comment: "预留字段，或用来存储第三方系统如github的用户信息"
    })
    reserve: String;
}