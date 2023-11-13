import * as Gathering from "./gathering.model.js";

export function onSubmitAttendance(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const attendant = formData.get("attendant")?.toString();

    if (!attendant) {
        return;
    }

    Gathering.attend(
        (e.target as HTMLFormElement).getAttribute("data-gathering-id")!,
        attendant
    );
}
