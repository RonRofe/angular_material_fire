import { Exercise } from "../models/exercise.model";
import { Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './traning.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private exerciseChanged$: Subject<Exercise> = new Subject<Exercise>();
    private exercisesChanged$: Subject<Exercise[]> = new Subject<Exercise[]>();
    private finishedExsChanged$: Subject<Exercise[]> = new Subject<Exercise[]>();
    private subscriptions: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>,
    ) { }

    public fetchAvailableExercises(): void {
        this.store.dispatch(new UI.StartLoading());

        this.subscriptions.push(
            this.db.collection('available_exercises').snapshotChanges().pipe(
                map((docArray: any[]) => docArray.map((document: any) => {
                    return {
                        id: document.payload.doc.id,
                        ...document.payload.doc.data(),
                    };
                })),
            ).subscribe(
                (exs: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableTrainings(exs));
                },
                () => {
                    this.uiService.showSnackBar('Fetching exercises failed, please try again later', null, 3000);
                    this.store.dispatch(new UI.StopLoading());
                },
            ),
        );
    }

    public start(id: string): void {
        
        this.store.dispatch(new Training.StartTraining(id));
    }

    public complete(): void {
        this.addDataToDb({ ...this.runningExercise, date: new Date(), state: 'Completed' });
        this.store.dispatch(new Training.StopTraining());
    }

    public cancel(progress: number): void {
        this.addDataToDb({
            ...this.runningExercise,
            date: new Date(),
            state: 'Canceled',
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
        });
        this.store.dispatch(new Training.StopTraining());
    }

    public getExerciseListener(): Observable<Exercise> {
        return this.exerciseChanged$.asObservable();
    }

    public getRunningExercise(): Exercise {
        return { ...this.runningExercise };
    }

    public fetchPastExercises(): void {
        this.subscriptions.push(
            this.db.collection('finished_exercises').valueChanges().subscribe(
                (exs: Exercise[]) => this.store.dispatch(new Training.SetFinishedTrainings(exs)),
            ),
        );
    }

    public getExercisesChangedListener(): Observable<Exercise[]> {
        return this.exercisesChanged$.asObservable();
    }

    public getFinishedExsListener(): Observable<Exercise[]> {
        return this.finishedExsChanged$.asObservable();
    }

    public cancelSubscriptions(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    private addDataToDb(exercise: Exercise): void {
        this.db.collection('finished_exercises').add(exercise);
    }
}