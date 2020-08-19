import { Exercise } from "../models/exercise.model";
import { Subject, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
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
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise: Exercise) => {
            this.addDataToDb({ ...exercise, date: new Date(), state: 'Completed' });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    public cancel(progress: number): void {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise: Exercise) => {
            this.addDataToDb({
                ...exercise,
                date: new Date(),
                state: 'Canceled',
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    public fetchPastExercises(): void {
        this.subscriptions.push(
            this.db.collection('finished_exercises').valueChanges().subscribe(
                (exs: Exercise[]) => this.store.dispatch(new Training.SetFinishedTrainings(exs)),
            ),
        );
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