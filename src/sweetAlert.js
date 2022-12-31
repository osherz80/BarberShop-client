import swal from "sweetalert";

export const swalError = (msgText, callBack) => {
    swal({
        title: "!שגיאה",
        text: msgText,
        icon: "error",
        button: "אוקיי",
    });
    callBack ? callBack() : '';
}

export const swalSuccess = (msgText, callBack) => {
    swal({
        title: "!הידד",
        text: msgText,
        icon: "success",
        button: "אוקיי",
    });
    callBack ? callBack() : '';
}