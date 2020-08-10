import { Exercise } from "../models/exercise.model";
import { Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

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
    ) { }

    public fetchAvailableExercises(): void {
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
                    this.availableExercises = exs;
                    this.exercisesChanged$.next([ ...exs ]);
                },
                () => {},
            ),
        );
    }

    public start(id: string): void {
        // this.db.doc('available_exercises/' + id).update({ lastSelected: new Date() });
        this.runningExercise = this.availableExercises.find((ex: Exercise) => ex.id === id);
        this.exerciseChanged$.next({ ...this.runningExercise });
    }

    public complete(): void {
        this.addDataToDb({ ...this.runningExercise, date: new Date(), state: 'Completed' });
        this.runningExercise = null;
        this.exerciseChanged$.next(null);
    }

    public cancel(progress: number): void {
        this.addDataToDb({
            ...this.runningExercise,
            date: new Date(),
            state: 'Canceled',
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
        });
        this.runningExercise = null;
        this.exerciseChanged$.next(null);
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
                (exs: Exercise[]) => this.finishedExsChanged$.next(exs),
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