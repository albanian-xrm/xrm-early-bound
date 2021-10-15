declare namespace Models {
    interface Account {
        CreditOnHold: Xrm.Attributes.BooleanAttribute;
        CustomerTypeCode: Xrm.Attributes.OptionSetAttribute;
        ModifiedBy: Xrm.Attributes.LookupAttribute;
        ModifiedOn: Xrm.Attributes.DateAttribute;
        Name: Xrm.Attributes.StringAttribute;
        NumberOfEmployees: Xrm.Attributes.NumberAttribute;
    }
}

declare namespace Xrm.EarlyBound {
    interface Entities {
        Account: Models.Account;
    }
}
