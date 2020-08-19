import { StoreModule } from '@ngrx/store';

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TrainingRoutingModule } from './training-routing.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

import { trainingReducer } from './traning.reducer';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent,
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('training', trainingReducer),

        TrainingRoutingModule,
    ],
    exports: [],
    entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}