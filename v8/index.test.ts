const test = (context: Xrm.EarlyBound.EventContext<Models.Account>) => {
  // $ExpectType FormContext<Account>
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
  const odata: Xrm.EarlyBound.ODataEntity<Models.Account> = {};

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
};
