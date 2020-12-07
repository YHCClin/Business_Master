import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { confirmValidator } from './confirm.directive';

@Directive({
  selector: '[lyhConfirmPhone]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPhoneDirective,
      multi: true
    }
  ]
})
export class ConfirmPhoneDirective {
  @Input('lyhConfirmPhone') confirm: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    return this.confirm ? confirmPhoneValidator(this.confirm)(control) : null;
    // throw new Error('Method not implemented.');
  }
}

export function confirmPhoneValidator(confirm: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => { // 传入绑定表单的formControl
    if ( !control.value ) { // 如果绑定未输入值，则返回 required错误
     return {required: {value: true} };
    }
  　// 如果输入不符合手机号规则，返回值错误
    const reg = /^1[3|4|5|7|8][0-9]{9}/;
    const res = reg.test(control.value);
    console.log(res);
    return !res ? {confirmPhone: {value: true}} : null;
   };
}
