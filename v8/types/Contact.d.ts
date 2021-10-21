declare namespace Models {
    interface Contact extends Xrm.EarlyBound.Entity {
        CreditOnHold: Xrm.Page.BooleanAttribute;
        CustomerTypeCode: Xrm.Page.OptionSetAttribute;
        ModifiedBy: Xrm.Page.LookupAttribute;
        ModifiedOn: Xrm.Page.DateAttribute;
        Name: Xrm.Page.StringAttribute;
        NumberOfEmployees: Xrm.Page.NumberAttribute;
    }
}
