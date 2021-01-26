import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentPage } from './current.page';

describe('CurrentPage', () => {
  let component: CurrentPage;
  let fixture: ComponentFixture<CurrentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
