const tests = {
    "should infer Account entity for generic form": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        // $ExpectType Account
        formEntity;
    },
    "should infer Contact entity for generic form": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Contact>>,
    ) => {
        // $ExpectType Contact
        formEntity;
    },
    "should infer Account entity for specific form": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Models.Account.Forms.main.Account>,
    ) => {
        // $ExpectType Account
        formEntity;
    },
    "should not allow form of generic entity": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Xrm.EarlyBound.Entity>>,
    ) => {
        // $ExpectType never
        formEntity;
    },
    "should infer form controls for specific form": (formControls: Xrm.EarlyBound.Types.FormControls<Models.Account.Forms.main.Account>) => {
        // $ExpectType IframeControl
        formControls.myWebResource;
        // $ExpectType StringControl
        formControls.name;
    },
    "should infer form controls for generic form": (formControls: Xrm.EarlyBound.Types.FormControls<Xrm.EarlyBound.Form<Models.Account>>) => {
        // $ExpectType StringControl
        formControls.name;
    },
    "should infer types for Specific Form Models.Account.Forms.Account": (
        context: Xrm.Events.BoundEventContext<Models.Account.Forms.main.Account>,
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
        // $ExpectType StringAttribute
        form.data.entity.attributes.get("name");
    },
    "should infer types for Specific Generic Models.Account Form": (
        context: Xrm.Events.BoundEventContext<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        // $ExpectType BoundFormContext<Form<Account>>
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
            form: Xrm.EarlyBound.Form<Models.Account>,
        ) => Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
        mainForm: Models.Account.Forms.main.Account,
    ) => {
        // $ExpectType Account
        testFormType(mainForm);
        // $ExpectType "CreditOnHold"
        const x: keyof Xrm.EarlyBound.Types.OfType<
            Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
            Xrm.Attributes.Attribute
        > = "CreditOnHold";
    },
    "should infer tab controls": (
        tabControls: Xrm.EarlyBound.Types.SectionControls<
            Models.Account.Forms.main.Account,
            "SUMMARY_TAB",
            "ACCOUNT_INFORMATION"
        >,
    ) => {
        // $ExpectType StringControl
        tabControls.name;
    },
    "should bind context.data": (context: Xrm.Events.BoundEventContext<Models.Account.Forms.main.Account>) => {
        // $ExpectType BoundFormContext<Account>
        const form = context.getFormContext();
        // $ExpectType StringAttribute
        form.data.attributes.get("name");
    },
};
