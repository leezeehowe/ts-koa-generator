import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeRemove } from "typeorm";

/**
 * 表默认字段实体类
 */
export abstract class BaseEntity {

    /**
    * 主键
    */
    @PrimaryGeneratedColumn(
        {
            type: "bigint",
            unsigned: true
        }
    )
    id: number;


    /**
     * 记录生成时间
     */
    @CreateDateColumn()
    createTime: Date;

    /**
     * 记录更新时间
     */
    @UpdateDateColumn()
    updateTime: Date;

    /**
     * 是否删除
     */
    @Column(
        {
            type: "tinyint",
            unsigned: true,
            default: 0,
            comment: "逻辑删除，0-否，1-是"
        }
    )
    isRemoved: number;

    @BeforeRemove()
    beforeRemmove() {
        this.isRemoved = 1;
    }

}