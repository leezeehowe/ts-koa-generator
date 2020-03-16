"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
/**
 * 表默认字段实体类
 */
var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
    }
    BaseEntity.prototype.beforeRemmove = function () {
        this.isRemoved = 1;
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "bigint",
            unsigned: true
        })
    ], BaseEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn()
    ], BaseEntity.prototype, "createTime", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], BaseEntity.prototype, "updateTime", void 0);
    __decorate([
        typeorm_1.Column({
            type: "tinyint",
            unsigned: true,
            default: 0,
            comment: "逻辑删除，0-否，1-是"
        })
    ], BaseEntity.prototype, "isRemoved", void 0);
    __decorate([
        typeorm_1.BeforeRemove()
    ], BaseEntity.prototype, "beforeRemmove", null);
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map