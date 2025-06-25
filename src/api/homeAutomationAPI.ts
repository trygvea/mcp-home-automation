type DimmerLamp = {
    type: "dimmer";
    status: number; // Dimmer value from 0 to 100
}
type OnOffLamp = {
    type: "onoff";
    status: "on" | "off"; // On or Off status
}
export type Lamp = {
    name: string;
} & (DimmerLamp | OnOffLamp);

export const getLamps = (room: string): Lamp[] => {
    // Just return some fake data for now
    return [{
        name: "Ceiling Lamp",
        type: "dimmer",
        status: 50,
    }]
}

export const setDimmer = (room: string, lamp: string, dimmer: number) => {
    // Set the dimmer value for a specific lamp in a room
    console.error(`Setting dimmer for ${lamp} in ${room} to ${dimmer}`);
}