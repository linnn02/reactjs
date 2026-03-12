import eventBus from "../pubsub/EventBus.js";

export class HomeMediator {
    constructor(outputCallback = null) {
        this.devices = new Map();
        this.automationRules = [];
        this.outputCallback = outputCallback;
    }

    registerDevice(device) {
        this.devices.set(device.name, device);
        device.setMediator(this);
        this.log(`[Mediator] Registered: ${device.name} (${device.type})`);
    }

    unregisterDevice(deviceName) {
        const device = this.devices.get(deviceName);

        if (device) {
            device.setMediator(null);
            this.devices.delete(deviceName);
            this.log(`[Mediator] Unregistered: ${deviceName}`);
        }
    }

    notify(sender, changedProperty) {
        this.log(`[Mediator] ${sender.name} changed: ${JSON.stringify(changedProperty)}`);

        eventBus.publish("device:change", {
            device: sender.name,
            type: sender.type,
            state: changedProperty,
        });

        this.checkAutomationRules(sender, changedProperty);
    }

    getDevice(name) {
        return this.devices.get(name);
    }

    getAllDevices() {
        return Array.from(this.devices.values());
    }

    addRule(condition, action) {
        this.automationRules.push({ condition, action });
        this.log("[Mediator] Automation rule added");
    }

    checkAutomationRules(device, state) {
        this.automationRules.forEach((rule) => {
            if (rule.condition(device, state)) {
                rule.action(device, state);
            }
        });
    }

    log(message) {
        console.log(message);
        if (this.outputCallback) {
            this.outputCallback(message);
        }
    }
}