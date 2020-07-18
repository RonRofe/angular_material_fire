import { Exercise } from "../models/exercise.model";
import { Subject, Observable } from 'rxjs';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    ];
    private runningExercise: Exercise;
    private exerciseChanged$: Subject<Exercise> = new Subject<Exercise>();

    public getAvailableExercises(): Exercise[] {
        return [ ...this.availableExercises ];
    }

    public start(id: string): void {
        this.runningExercise = this.availableExercises.find((ex: Exercise) => ex.id === id);
        this.exerciseChanged$.next({ ...this.runningExercise });
    }

    public getExerciseListener(): Observable<Exercise> {
        return this.exerciseChanged$.asObservable();
    }

    public getRunningExercise(): Exercise {
        return { ...this.runningExercise };
    }
}