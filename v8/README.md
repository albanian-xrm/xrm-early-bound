# AlbanianXrm Early-Bound
Early Bound Type Augmentation for @types/xrm@8 

First you install the package using one of the following commands:
```
yarn add -D @albanian-xrm/early-bound@8
```
or
```
npm install --save-dev @albanian-xrm/early-bound@8
```

The simplest way to add the typing augmentation is to use a [triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).
For example you can create a global.d.ts in your src folder which contains the following:

```typescript
/* src/global.d.ts */
/// <reference path="../node_modules/@albanian-xrm/early-bound/index.d.ts" />
```

The you just define your Early-Bound Model. For example `Account.d.ts` can be described as follows:
```typescript
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
        }
    }
}

declare namespace Xrm.EarlyBound {
    interface Entities {
        Account: Models.Account;
    }
}
```