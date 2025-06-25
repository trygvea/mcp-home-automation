import {getLamps, Lamp, setDimmer} from "../api/homeAutomationAPI.js"

export function getLampStatus(room: string): Lamp[] {
    // Call the home automation API to get the status of lamps in the specified room
    return getLamps(room);
}

export function dimUp(room: string, increment: number): void {
    // Dim up all dimmable lamps in room
    getLamps(room)
        .filter(lamp => lamp.type === "dimmer")
        .forEach(lamp => {
            setDimmer(room, lamp.name, Math.min(lamp.status + increment, 100));
    });
}