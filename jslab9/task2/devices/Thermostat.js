import { Device } from "./Device.js";

export class Thermostat extends Device {
    constructor(name, room) {
        super(name, "thermostat");
        this.room = room;
    }

    getDefaultState() {
        return {
            power: true,
            temperature: 22,
            mode: "auto",
        };
    }

    setTemperature(value) {
        this.updateState({ temperature: value });
        console.log(`[Thermostat] ${this.name} temperature set to ${value}°C`);
    }

    setMode(mode) {
        this.updateState({ mode });
        console.log(`[Thermostat] ${this.name} mode set to ${mode}`);
    }

    turnOn() {
        this.updateState({ power: true });
        console.log(`[Thermostat] ${this.name} turned ON`);
    }

    turnOff() {
        this.updateState({ power: false });
        console.log(`[Thermostat] ${this.name} turned OFF`);
    }
}