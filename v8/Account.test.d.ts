declare namespace Models {
    interface Account {
        CreditOnHold: Xrm.Page.BooleanAttribute;
        CustomerTypeCode: Xrm.Page.OptionSetAttribute;
        ModifiedBy: Xrm.Page.LookupAttribute;
        ModifiedOn: Xrm.Page.DateAttribute;
        Name: Xrm.Page.StringAttribute;
        NumberOfEmployees: Xrm.Page.NumberAttribute;
    }

    namespace Account.Forms {
        interface Account extends Xrm.EarlyBound.Form<"Account"> {
            name: "Name";
            header_ModifiedBy: "ModifiedBy";
            ModifiedBy: "ModifiedBy";
            modifiedon: "ModifiedOn";
        }
    }
}

declare namespace Xrm.EarlyBound {
    interface Entities {
        Account: Models.Account;
    }
}
