declare namespace Models.Account.Forms {
    interface Account extends Xrm.EarlyBound.Form<Models.Account> {
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
