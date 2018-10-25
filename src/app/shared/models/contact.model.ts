export class Contact {
    firstname: string;
    lastname: string;
    companyName: string;
    mailAddress: string;
    password: string;
    confirmPassword: string;
    checked: boolean;

    constructor() {
        this.firstname = '';
        this.lastname = '';
        this.companyName = '';
        this.mailAddress = '';
        this.password = '';
        this.confirmPassword = '';
        this.checked = false;
    }
}
