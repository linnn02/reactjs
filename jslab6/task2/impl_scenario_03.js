'use strict';

// SCENARIO_03: Observer (UI Notification System)
class HomeworkReminder {
    constructor() {
        // Subscribers list (observers)
        this._subscribers = [];
    }

    // Subscribe: attach an observer
    subscribe(subscriber) {
        this._subscribers.push(subscriber);
    }

    // Unsubscribe: detach an observer
    unsubscribe(subscriber) {
        this._subscribers = this._subscribers.filter(s => s !== subscriber);
    }

    // Notify: call update on each observer
    _notifyAll(homework) {
        this._subscribers.forEach(s => s.update(homework));
    }

    submit(homework) {
        console.log(`[SCENARIO_03] Homework submitted: "${homework.title}"`);
        // Observer: notify all subscribers about the event/data
        this._notifyAll(homework);
    }
}

class GradeBook {
    update(homework) {
        console.log(`[SCENARIO_03][GradeBook] Recorded grade entry for "${homework.title}"`);
    }
}

class Calendar {
    update(homework) {
        console.log(`[SCENARIO_03][Calendar] Cleared deadline for "${homework.title}"`);
    }
}

// Demo
const reminder = new HomeworkReminder();
const gradeBook = new GradeBook();
const calendar = new Calendar();

reminder.subscribe(gradeBook);
reminder.subscribe(calendar);

reminder.submit({ title: 'Week 6 Lab', student: 'Asel' });

reminder.unsubscribe(calendar);
reminder.submit({ title: 'Week 7 Lab', student: 'Asel' }); 