import { Action } from '@ngrx/store';
import { Exercise } from '../models/exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Auth] Set Finished Tranings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
    public readonly type = SET_AVAILABLE_TRAININGS;

    constructor(
        public payload: Exercise[],
    ) {}
}

export class SetFinishedTrainings implements Action {
    public readonly type = SET_FINISHED_TRAININGS;

    constructor(
        public payload: Exercise[],
    ) {}
}

export class StartTraining implements Action {
    public readonly type = START_TRAINING;

    constructor(
        public payload: Exercise,
    ) {}
}

export class StopTraining implements Action {
    public readonly type = STOP_TRAINING;
}

export type TrainingActions = 
    SetAvailableTrainings |
    SetFinishedTrainings |
    StartTraining |
    StopTraining;