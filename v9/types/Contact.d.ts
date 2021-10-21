declare namespace Models {
    interface Contact extends Xrm.EarlyBound.Entity {
        CreditOnHold: Xrm.Attributes.BooleanAttribute;
        CustomerTypeCode: Xrm.Attributes.OptionSetAttribute;
        ModifiedBy: Xrm.Attributes.LookupAttribute;
        ModifiedOn: Xrm.Attributes.DateAttribute;
        Name: Xrm.Attributes.StringAttribute;
        NumberOfEmployees: Xrm.Attributes.NumberAttribute;
    }
}
