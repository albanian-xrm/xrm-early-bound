const tests = {
    "should infer types for Specific Form Models.Account.Forms.Account": (
        context: Xrm.Events.BoundEventContext<Models.Account.Forms.Account>,
    ) => {
        // $ExpectType BoundFormContext<Account>
        const form = context.getFormContext();
        // $ExpectType DateControl
        const modifiedon = form.getControl("modifiedon");
        // $ExpectType DateAttribute
        const modifiedonAttribute = modifiedon.getAttribute();
        // $ExpectType Date | null
        modifiedonAttribute.getValue();
        // $ExpectType void
        modifiedonAttribute.setValue(new Date());
        // $ExpectType LookupAttribute
        const modifiedByAttribute = form.getAttribute("modifiedby");
        // $ExpectType LookupValue[] | null
        modifiedByAttribute.getValue();
        // $ExpectType LookupControl
        const modifiedby = form.getControl("header_ModifiedBy");
        // $ExpectType IframeControl
        const myWebResource = form.getControl("myWebResource");

        // $ExpectType StringControl
        form.ui.controls.get("name");

        // $ExpectType BoundTab<Account, "SUMMARY_TAB">
        const SUMMARY_TAB = form.ui.tabs.get("SUMMARY_TAB");
        // $ExpectType BoundSection<Account, "SUMMARY_TAB", "ACCOUNT_INFORMATION">
        const ACCOUNT_INFORMATION = SUMMARY_TAB.sections.get("ACCOUNT_INFORMATION");
        // $ExpectType StringControl
        ACCOUNT_INFORMATION.controls.get("name");
    },
    "should infer types for Specific Generic Models.Account Form": (
        context: Xrm.Events.BoundEventContext<Xrm.EarlyBound.Form<"Account">>,
    ) => {
        // $ExpectType BoundFormContext<Form<"Account">>
        const form = context.getFormContext();
        // $ExpectType DateControl
        const modifiedon = form.getControl("modifiedon");
        // $ExpectType DateAttribute
        const modifiedonAttribute = modifiedon.getAttribute();
        // $ExpectType Date | null
        modifiedonAttribute.getValue();
        // $ExpectType void
        modifiedonAttribute.setValue(new Date());
        // $ExpectType LookupAttribute
        const modifiedByAttribute = form.getAttribute("modifiedby");
        // $ExpectType LookupValue[] | null
        modifiedByAttribute.getValue();

        // $ExpectType LookupControl
        const modifiedby = form.getControl("modifiedby");
    },
    "should infer types for ODataEntity<Entity>": (odata: Xrm.EarlyBound.ODataEntity<Models.Account>) => {
        // $ExpectType string | undefined
        odata._modifiedby_value;
        // $ExpectType string | undefined
        odata["_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
        // $ExpectType string | undefined
        odata["_modifiedby_value@OData.Community.Display.V1.FormattedValue"];
        // $ExpectType number | undefined
        odata.numberofemployees;
        // $ExpectType string | undefined
        odata["numberofemployees@OData.Community.Display.V1.FormattedValue"];
        // $ExpectType string | undefined
        odata.modifiedon;
        // $ExpectType string | undefined
        odata["modifiedon@OData.Community.Display.V1.FormattedValue"];
        // $ExpectType string | undefined
        odata.name;
    },
    "should extract spefic type from Xrm.EarlyBound.Form<keyof Xrm.EarlyBound.Entities>": (
        testFormType: (
            form: Xrm.EarlyBound.Form<keyof Xrm.EarlyBound.Entities>,
        ) => Xrm.EarlyBound.GetFormType<Xrm.EarlyBound.Form<keyof Xrm.EarlyBound.Entities>>,
        mainForm: Models.Account.Forms.Account,
    ) => {
        // $ExpectType "Account"
        testFormType(mainForm);
    },
    "should infer tab controls": (
        tabControls: Xrm.EarlyBound.Types.SectionControls<
            Models.Account.Forms.Account,
            "SUMMARY_TAB",
            "ACCOUNT_INFORMATION"
        >,
    ) => {
        // $ExpectType StringControl
        tabControls.name;
    },
    "should bind context.data": (context: Xrm.Events.BoundEventContext<Models.Account.Forms.Account>) => {
        // $ExpectType BoundFormContext<Account>
        const form = context.getFormContext();
        // $ExpectType StringAttribute
        form.data.attributes.get("name");
    },
};
