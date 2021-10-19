declare namespace Models {
    interface Account {
        CreditOnHold: Xrm.Attributes.BooleanAttribute;
        CustomerTypeCode: Xrm.Attributes.OptionSetAttribute;
        ModifiedBy: Xrm.Attributes.LookupAttribute;
        ModifiedOn: Xrm.Attributes.DateAttribute;
        Name: Xrm.Attributes.StringAttribute;
        NumberOfEmployees: Xrm.Attributes.NumberAttribute;
    }

    namespace Account.Forms {
        interface Account extends Xrm.EarlyBound.Form<"Account"> {
            name: "Name";
            header_ModifiedBy: "ModifiedBy";
            ModifiedBy: "ModifiedBy";
            modifiedon: "ModifiedOn";
            myWebResource: Xrm.Controls.IframeControl;
            ChildAccounts: Xrm.Controls.GridControl;
            ".Tabs": {
                SUMMARY_TAB: {
                    ACCOUNT_INFORMATION: "name";
                    TEST: "header_ModifiedBy" | "modifiedon";
                };
                ChildAccounts: {
                    ChildAccounts: "ChildAccounts";
                };
                Test_TAB: {
                    Test_Section: "name" | "header_ModifiedBy" | "ModifiedBy" | "modifiedon" | "myWebResource";
                };
            };
        }
    }
}

declare namespace Xrm.EarlyBound {
    interface Entities {
        Account: Models.Account;
    }
}
