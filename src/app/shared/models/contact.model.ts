export class Contact {
    bill: string;
    lastName: string;
    companyName: string;
    mailAddress: string;
    password: string;
    confirmPassword: string;
    checked: boolean;

    constructor() {
        this.bill = '';
        this.lastName = '';
        this.companyName = '';
        this.mailAddress = '';
        this.password = '';
        this.confirmPassword = '';
        this.checked = false;
    }
}
