import { expectType } from "tsd";
import ".";
import "./types/Account";
import "./types/Contact";
import "./types/Account/main/Account";

const tests = {
    "should infer Account entity for generic form": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        expectType<Models.Account>(formEntity);
    },
    "should infer Contact entity for generic form": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Contact>>,
    ) => {
        expectType<Models.Contact>(formEntity);
    },
    "should infer Account entity for specific form": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Models.Account.Forms.Account>,
    ) => {
        expectType<Models.Account>(formEntity);
    },
    "should not allow form of generic entity": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Xrm.EarlyBound.Entity>>,
    ) => {
        expectType<never>(formEntity);
    },
    "should infer form controls for specific form": (
        formControls: Xrm.EarlyBound.Types.FormControls<Models.Account.Forms.Account>,
    ) => {
        expectType<Xrm.Page.IframeControl>(formControls.myWebResource);
        expectType<Xrm.Page.StringControl>(formControls.name);
    },
    "should infer form controls for generic form": (
        formControls: Xrm.EarlyBound.Types.FormControls<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        expectType<Xrm.Page.StringControl>(formControls.name);
    },
    "should infer types for Specific Form Models.Account.Forms.Account": (
        context: Xrm.Page.BoundEventContext<Models.Account.Forms.Account>,
    ) => {
        const form = context.getFormContext();
        const modifiedon = form.getControl("modifiedon");
        const modifiedonAttribute = modifiedon.getAttribute();
        const modifiedByAttribute = form.getAttribute("modifiedby");
        const SUMMARY_TAB = form.ui.tabs.get("SUMMARY_TAB");
        const ACCOUNT_INFORMATION = SUMMARY_TAB.sections.get("ACCOUNT_INFORMATION");

        expectType<Xrm.BoundFormContext<Models.Account.Forms.Account>>(form);
        expectType<Xrm.Page.DateControl>(modifiedon);
        expectType<Xrm.Page.DateAttribute>(modifiedonAttribute);
        expectType<Date>(modifiedonAttribute.getValue());
        expectType<(value: Date) => void>(modifiedonAttribute.setValue);
        expectType<Xrm.Page.LookupAttribute>(modifiedByAttribute);
        expectType<Xrm.Page.LookupValue[]>(modifiedByAttribute.getValue());
        expectType<Xrm.Page.LookupControl>(form.getControl("header_ModifiedBy"));
        expectType<Xrm.Page.IframeControl>(form.getControl("myWebResource"));
        expectType<Xrm.Page.StringControl>(form.ui.controls.get("name"));
        expectType<Xrm.Page.BoundTab<Models.Account.Forms.Account, "SUMMARY_TAB">>(SUMMARY_TAB);
        expectType<Xrm.Page.BoundSection<Models.Account.Forms.Account, "SUMMARY_TAB", "ACCOUNT_INFORMATION">>(
            ACCOUNT_INFORMATION,
        );
        expectType<Xrm.Page.StringControl>(ACCOUNT_INFORMATION.controls.get("name"));
        expectType<Xrm.Page.StringAttribute>(form.data.entity.attributes.get("name"));
    },
    "should infer types for Specific Generic Models.Account Form": (
        context: Xrm.Page.BoundEventContext<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        const form = context.getFormContext();
        const modifiedon = form.getControl("modifiedon");
        const modifiedonAttribute = modifiedon.getAttribute();
        const modifiedByAttribute = form.getAttribute("modifiedby");

        expectType<Xrm.BoundFormContext<Xrm.EarlyBound.Form<Models.Account>>>(form);
        expectType<Xrm.Page.DateControl>(modifiedon);
        expectType<Xrm.Page.DateAttribute>(modifiedonAttribute);
        expectType<Date>(modifiedonAttribute.getValue());
        expectType<(value: Date) => void>(modifiedonAttribute.setValue);
        expectType<Xrm.Page.LookupAttribute>(modifiedByAttribute);
        expectType<Xrm.Page.LookupValue[]>(modifiedByAttribute.getValue());
        expectType<Xrm.Page.LookupControl>(form.getControl("modifiedby"));
    },
    "should infer types for ODataEntity<Entity>": (odata: Xrm.EarlyBound.ODataEntity<Models.Account>) => {
        expectType<string | undefined>(odata._modifiedby_value);
        expectType<string | undefined>(odata["_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname"]);
        expectType<string | undefined>(odata["_modifiedby_value@OData.Community.Display.V1.FormattedValue"]);
        expectType<number | undefined>(odata.numberofemployees);
        expectType<string | undefined>(odata["numberofemployees@OData.Community.Display.V1.FormattedValue"]);
        expectType<string | undefined>(odata.modifiedon);
        expectType<string | undefined>(odata["modifiedon@OData.Community.Display.V1.FormattedValue"]);
        expectType<string | undefined>(odata.name);
    },
    "should extract spefic type from Xrm.EarlyBound.Form<keyof Xrm.EarlyBound.Entities>": (
        testFormType: (
            form: Xrm.EarlyBound.Form<Models.Account>,
        ) => Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
        mainForm: Models.Account.Forms.Account,
    ) => {
        expectType<Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>>(testFormType(mainForm));
        const x: keyof Xrm.EarlyBound.Types.OfType<
            Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
            Xrm.Page.Attribute
        > = "CreditOnHold";
        expectType<"CreditOnHold">(x);
    },
    "should infer tab controls": (
        tabControls: Xrm.EarlyBound.Types.SectionControls<
            Models.Account.Forms.Account,
            "SUMMARY_TAB",
            "ACCOUNT_INFORMATION"
        >,
    ) => {
        expectType<Xrm.Page.StringControl>(tabControls.name);
    },
    "should bind context.data": (context: Xrm.Page.BoundEventContext<Models.Account.Forms.Account>) => {
        const form = context.getFormContext();
        expectType<Xrm.BoundFormContext<Models.Account.Forms.Account>>(form);
        expectType<Xrm.Page.StringAttribute>(form.data.attributes.get("name"));
    },
};
