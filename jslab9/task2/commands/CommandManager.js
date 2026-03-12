export class CommandManager {
    constructor(outputCallback = null) {
        this.history = [];
        this.redoStack = [];
        this.maxHistory = 50;
        this.outputCallback = outputCallback;
    }

    execute(command) {
        command.execute();
        this.history.push(command);
        this.redoStack = [];

        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        this.log(`[CommandManager] Executed ${command.constructor.name}`);
    }

    undo() {
        const command = this.history.pop();

        if (command) {
            command.undo();
            this.redoStack.push(command);
            this.log("[CommandManager] Undo performed");
        } else {
            this.log("[CommandManager] Nothing to undo");
        }
    }

    redo() {
        const command = this.redoStack.pop();

        if (command) {
            command.execute();
            this.history.push(command);
            this.log("[CommandManager] Redo performed");
        } else {
            this.log("[CommandManager] Nothing to redo");
        }
    }

    getHistory() {
        return this.history.map((cmd, index) => `${index + 1}. ${cmd.constructor.name}`);
    }

    canUndo() {
        return this.history.length > 0;
    }

    canRedo() {
        return this.redoStack.length > 0;
    }

    log(message) {
        console.log(message);
        if (this.outputCallback) {
            this.outputCallback(message);
        }
    }
}