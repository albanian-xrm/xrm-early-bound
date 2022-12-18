declare namespace Models.Account.Forms.main {
    interface Account extends Xrm.EarlyBound.Form<Models.Account> {
        albx_Choices: "albx_Choices";
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
