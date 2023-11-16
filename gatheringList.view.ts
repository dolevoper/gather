import { Gathering, Gatherings } from "./gathering.model.js";
import { onSubmitAttendance } from "./gatheringList.controller.js";

export function renderGatheringList(gatherings: Gatherings, container: HTMLElement) {
    container.innerHTML =
        `<ul>
    ${gatherings.map(renderGathering).join("\n")}
    </ul>`;

    container.querySelectorAll("form").forEach(
        // how come we don't need to wrap renderGathering in a function?
        (form) => form.addEventListener("submit", onSubmitAttendance)
        // function (form) {
        //     form.addEventListener("submit", function (e) {
        //         onSubmitAttendance(e);
        //     });
        // }
    );
}

function renderGathering(gathering: Gathering) {
    return `<li>
        <p><span>Title:</span> ${gathering.title}</p>
        <p>Attendants (${gathering.attendants.length})</p>
        <form data-gathering-id="${gathering.id}">
            <label for="${gathering.id}-attend-input">Name</label>
            <input
                id="${gathering.id}-attend-input"
                name="attendant"
                required />
            <button>Attend</button>
        </form>
        <ul>
            ${gathering.attendants.map((attendant) => `<li>${attendant}</li>`).join("\n")}
        </ul>
    </li>`;
}

