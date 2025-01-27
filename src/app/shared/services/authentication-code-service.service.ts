import { Injectable } from '@angular/core';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeServiceService {
  config: Config;
  // 用于保存验证码
  private code: string;
  // 存放验证码的过期时间
  private deadline: number;
  constructor() {
    this.code = '';
  }
  // 生成指定长度的随机数字
  createCode(count: number): string{
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + 10 * 60 * 1000;
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 10);
      this.code += num.toString();
    }
    return this.code;
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): boolean {
    const now = Date.now();
    return value == this.code && now <= this.deadline;
  }
}
