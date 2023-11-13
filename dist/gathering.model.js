// TODO: add participant profile
const gatherings = [];
const callbacks = [];
export function createGathering(gathering) {
    // there is a potential bug in here! what is it?
    gatherings.push({
        ...gathering,
        id: crypto.randomUUID(),
        attendants: []
    });
    emitUpdate();
    return gatherings.at(-1).id;
}
export function getGatherings() {
    return gatherings.slice();
}
export function attend(gatheringId, attendant) {
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
export function onUpdate(callback) {
    callbacks.push(callback);
}
function emitUpdate() {
    callbacks.forEach((callback) => callback());
}
