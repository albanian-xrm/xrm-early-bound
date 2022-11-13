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
        formEntity: Xrm.EarlyBound.Types.FormEntity<Models.Account.Forms.main.Account>,
    ) => {
        expectType<Models.Account>(formEntity);
    },
    "should not allow form of generic entity": (
        formEntity: Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Xrm.EarlyBound.Entity>>,
    ) => {
        expectType<never>(formEntity);
    },
    "should infer form controls for specific form": (
        formControls: Xrm.EarlyBound.Types.FormControls<Models.Account.Forms.main.Account>,
    ) => {
        expectType<Xrm.Controls.IframeControl>(formControls.myWebResource);
        expectType<Xrm.Controls.StringControl>(formControls.name);
    },
    "should infer form controls for generic form": (
        formControls: Xrm.EarlyBound.Types.FormControls<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        expectType<Xrm.Controls.StringControl>(formControls.name);
    },
    "should infer types for Specific Form Models.Account.Forms.Account": (
        context: Xrm.Events.BoundEventContext<Models.Account.Forms.main.Account>,
    ) => {
        const form = context.getFormContext();
        const modifiedon = form.getControl("modifiedon");
        const modifiedonAttribute = modifiedon.getAttribute();
        const modifiedByAttribute = form.getAttribute("modifiedby");
        const SUMMARY_TAB = form.ui.tabs.get("SUMMARY_TAB");
        const ACCOUNT_INFORMATION = SUMMARY_TAB.sections.get("ACCOUNT_INFORMATION");

        expectType<Xrm.BoundFormContext<Models.Account.Forms.main.Account>>(form);
        expectType<Xrm.Controls.DateControl>(modifiedon);
        expectType<Xrm.Attributes.DateAttribute>(modifiedonAttribute);
        expectType<Date | null>(modifiedonAttribute.getValue());
        expectType<(value: Date | null) => void>(modifiedonAttribute.setValue);
        expectType<Xrm.Attributes.LookupAttribute>(modifiedByAttribute);
        expectType<Xrm.LookupValue[] | null>(modifiedByAttribute.getValue());
        expectType<Xrm.Controls.LookupControl>(form.getControl("header_ModifiedBy"));
        expectType<Xrm.Controls.IframeControl>(form.getControl("myWebResource"));
        expectType<Xrm.Controls.StringControl>(form.ui.controls.get("name"));
        expectType<Xrm.Controls.BoundTab<Models.Account.Forms.main.Account, "SUMMARY_TAB">>(SUMMARY_TAB);
        expectType<Xrm.Controls.BoundSection<Models.Account.Forms.main.Account, "SUMMARY_TAB", "ACCOUNT_INFORMATION">>(
            ACCOUNT_INFORMATION,
        );
        expectType<Xrm.Controls.StringControl>(ACCOUNT_INFORMATION.controls.get("name"));
        expectType<Xrm.Attributes.StringAttribute>(form.data.entity.attributes.get("name"));
    },
    "should infer types for Specific Generic Models.Account Form": (
        context: Xrm.Events.BoundEventContext<Xrm.EarlyBound.Form<Models.Account>>,
    ) => {
        const form = context.getFormContext();
        const modifiedon = form.getControl("modifiedon");
        const modifiedonAttribute = modifiedon.getAttribute();
        const modifiedByAttribute = form.getAttribute("modifiedby");

        expectType<Xrm.BoundFormContext<Xrm.EarlyBound.Form<Models.Account>>>(form);
        expectType<Xrm.Controls.DateControl>(modifiedon);
        expectType<Xrm.Attributes.DateAttribute>(modifiedonAttribute);
        expectType<Date | null>(modifiedonAttribute.getValue());
        expectType<(value: Date | null) => void>(modifiedonAttribute.setValue);
        expectType<Xrm.Attributes.LookupAttribute>(modifiedByAttribute);
        expectType<Xrm.LookupValue[] | null>(modifiedByAttribute.getValue());
        expectType<Xrm.Controls.LookupControl>(form.getControl("modifiedby"));
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
        mainForm: Models.Account.Forms.main.Account,
    ) => {
        expectType<Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>>(testFormType(mainForm));
        const x: keyof Xrm.EarlyBound.Types.OfType<
            Xrm.EarlyBound.Types.FormEntity<Xrm.EarlyBound.Form<Models.Account>>,
            Xrm.Attributes.Attribute
        > = "CreditOnHold";
        expectType<"CreditOnHold">(x);
    },
    "should infer tab controls": (
        tabControls: Xrm.EarlyBound.Types.SectionControls<
            Models.Account.Forms.main.Account,
            "SUMMARY_TAB",
            "ACCOUNT_INFORMATION"
        >,
    ) => {
        expectType<Xrm.Controls.StringControl>(tabControls.name);
    },
    "should bind context.data": (context: Xrm.Events.BoundEventContext<Models.Account.Forms.main.Account>) => {
        const form = context.getFormContext();
        expectType<Xrm.BoundFormContext<Models.Account.Forms.main.Account>>(form);
        expectType<Xrm.Attributes.StringAttribute>(form.data.attributes.get("name"));
    },
};
