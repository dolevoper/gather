import * as Gathering from "./gathering.model.js";
export function onSubmitAttendance(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const attendant = formData.get("attendant")?.toString();
    if (!attendant) {
        return;
    }
    Gathering.attend(e.target.getAttribute("data-gathering-id"), attendant);
}
