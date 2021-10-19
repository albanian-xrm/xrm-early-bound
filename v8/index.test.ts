const tests = {
    "should infer types for Specific Form Models.Account.Forms.Account": (
        context: Xrm.Page.BoundEventContext<Models.Account.Forms.Account>,
    ) => {
        // $ExpectType BoundPage<Account>
        const form = context.getFormContext();
        // $ExpectType DateControl
        const modifiedon = form.getControl("modifiedon");
        // $ExpectType DateAttribute
        const modifiedonAttribute = modifiedon.getAttribute();
        // $ExpectType Date
        modifiedonAttribute.getValue();
        // $ExpectType void
        modifiedonAttribute.setValue(new Date());
        // $ExpectType LookupAttribute
        const modifiedByAttribute = form.getAttribute("modifiedby");
        // $ExpectType LookupValue[]
        modifiedByAttribute.getValue();

        // $ExpectType LookupControl
        const modifiedby = form.getControl("header_ModifiedBy");
    },
    "should infer types for Specific Generic Models.Account Form": (
        context: Xrm.Page.BoundEventContext<Xrm.EarlyBound.Form<"Account">>,
    ) => {
        // $ExpectType BoundPage<Form<"Account">>
        const form = context.getFormContext();
        // $ExpectType DateControl
        const modifiedon = form.getControl("modifiedon");
        // $ExpectType DateAttribute
        const modifiedonAttribute = modifiedon.getAttribute();
        // $ExpectType Date
        modifiedonAttribute.getValue();
        // $ExpectType void
        modifiedonAttribute.setValue(new Date());
        // $ExpectType LookupAttribute
        const modifiedByAttribute = form.getAttribute("modifiedby");
        // $ExpectType LookupValue[]
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
};
