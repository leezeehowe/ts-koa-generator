"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
/**
 * 用户类
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 50,
            comment: "邮箱地址"
        })
    ], User.prototype, "emailAddress", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 25,
            comment: "手机号码"
        })
    ], User.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 10,
            comment: "用户昵称，仅支持中文、数字、大小写英文字母、下划线"
        })
    ], User.prototype, "nickName", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 200,
            comment: "头像地址"
        })
    ], User.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 20,
            comment: "密码"
        })
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({
            type: "text",
            comment: "预留字段，或用来存储第三方系统如github的用户信息"
        })
    ], User.prototype, "reserve", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(BaseEntity_1.BaseEntity));
exports.User = User;
//# sourceMappingURL=User.js.map