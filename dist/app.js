// 1. Show more details about the gathering (organizer, start time, duration, etc...)
// 2. When adding an attendant fails, show appropriate message (alert)
// 2++. Show message in the DOM
// 3. Persist data to local storage
// 4. Add option to remove an attendance
// 5. Filter gatherings by name (add a search input on top)
// 6. Create "host a gathering" form
// 7. Implement users (model, link with gatherings, etc...)
import * as Gatherings from "./gathering.model.js";
import * as GatheringListView from "./gatheringList.view.js";
const typescriptMeetupId = Gatherings.createGathering({
    durationInHours: 1,
    location: "Te-Aviv",
    organizer: "Omer",
    participantLimit: 10,
    startTime: new Date(),
    title: "Typescript Meetup"
});
for (let i = 0; i < 10000; i++) {
    try {
        Gatherings.attend(typescriptMeetupId, `attendant #${i + 1}`);
    }
    catch (err) {
        break;
    }
}
Gatherings.createGathering({
    durationInHours: 1.5,
    location: "Ramat-Gan",
    organizer: "Gilad",
    participantLimit: 15,
    startTime: new Date(),
    title: "Fullstack Practice"
});
console.log("reached participant limit");
console.log(Gatherings.getGatherings());
const gatheringListElement = document.getElementById("gathering-list");
renderGatheringList();
Gatherings.onUpdate(renderGatheringList);
function renderGatheringList() {
    if (gatheringListElement) {
        GatheringListView.renderGatheringList(Gatherings.getGatherings(), gatheringListElement);
    }
}
