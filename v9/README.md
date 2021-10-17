# AlbanianXrm Early-Bound
Early Bound Type Augmentation for @types/xrm@9 

First you install the package using one of the following commands:
```
yarn add -D @albanian-xrm/early-bound@9
```
or
```
npm install --save-dev @albanian-xrm/early-bound@9
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
        CreditOnHold: Xrm.Attributes.BooleanAttribute;
        CustomerTypeCode: Xrm.Attributes.OptionSetAttribute;
        ModifiedBy: Xrm.Attributes.LookupAttribute;
        ModifiedOn: Xrm.Attributes.DateAttribute;
        Name: Xrm.Attributes.StringAttribute;
        NumberOfEmployees: Xrm.Attributes.NumberAttribute;
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