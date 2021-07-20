import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoolingHvacSelectionPage } from './cooling-hvac-selection.page';

describe('CoolingHvacSelectionPage', () => {
  let component: CoolingHvacSelectionPage;
  let fixture: ComponentFixture<CoolingHvacSelectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolingHvacSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoolingHvacSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
