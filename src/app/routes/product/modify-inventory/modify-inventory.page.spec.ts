import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyInventoryPage } from './modify-inventory.page';

describe('ModifyInventoryPage', () => {
  let component: ModifyInventoryPage;
  let fixture: ComponentFixture<ModifyInventoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyInventoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
