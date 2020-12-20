import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectSupplierPage } from './select-supplier.page';

describe('SelectSupplierPage', () => {
  let component: SelectSupplierPage;
  let fixture: ComponentFixture<SelectSupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSupplierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
