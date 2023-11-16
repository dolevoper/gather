// TODO: add participant profile

export type Gathering = {
    id: string,
    location: string;
    startTime: Date;
    durationInHours: number;
    participantLimit: number;
    title: string;
    description?: string;
    organizer: string;
    attendants: string[];
};

export type Gatherings = Gathering[];

const gatherings = [] as Gatherings;
const callbacks = [] as Function[];

export function createGathering(gathering: Omit<Gathering, "attendants" | "id">) {
    // there is a potential bug in here! what is it?
    gatherings.push({
        ...gathering,
        id: crypto.randomUUID(),
        attendants: []
    });

    emitUpdate();

    return gatherings.at(-1)!.id;
}

export function getGatherings() {
    return gatherings.slice();
}

export function attend(gatheringId: string, attendant: string) {
    const gathering = gatherings.find((gathering) => gathering.id === gatheringId);

    if (!gathering) {
        throw new Error(`No gathering with gathering ID ${gatheringId}`);
    }

    // validate participants limit
    if (gathering.attendants.length >= gathering.participantLimit) {
        throw new Error(`Gathering ${gatheringId} has reached the participant limit`);
    }

    // push to attedants
    gathering.attendants.push(attendant);

    emitUpdate();
}

export function onUpdate(callback: Function) {
    callbacks.push(callback);
}

function emitUpdate() {
    setTimeout(() => callbacks.forEach((callback) => callback()));
}
