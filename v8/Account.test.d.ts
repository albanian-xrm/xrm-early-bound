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
            myWebResource: Xrm.Page.IframeControl;
            ChildAccounts: Xrm.Page.GridControl;
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
