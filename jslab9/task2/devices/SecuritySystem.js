import { Device } from "./Device.js";

export class SecuritySystem extends Device {
    constructor(name) {
        super(name, "security");
    }

    getDefaultState() {
        return {
            power: true,
            armed: false,
            alert: false,
        };
    }

    arm() {
        this.updateState({ armed: true, alert: false });
        console.log(`[Security] ${this.name} armed`);
    }

    disarm() {
        this.updateState({ armed: false, alert: false });
        console.log(`[Security] ${this.name} disarmed`);
    }

    triggerAlert() {
        this.updateState({ alert: true });
        console.log(`[Security] ${this.name} ALERT triggered`);
    }
}