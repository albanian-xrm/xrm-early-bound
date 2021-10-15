/// <reference types="xrm" />
// Minimum TypeScript Version: 4.2

declare namespace Xrm {
    namespace EarlyBound {
        /**
         * List of known early bound entities. Use Type Augmentation to declare your entities.
         *
         * @example
         * // Early-Bound Account
         * declare namespace Models {
         *     interface Account {
         *         CreditOnHold: Xrm.Page.BooleanAttribute;
         *         CustomerTypeCode: Xrm.Page.OptionSetAttribute;
         *         ModifiedBy: Xrm.Page.LookupAttribute;
         *         ModifiedOn: Xrm.Page.DateAttribute;
         *         Name: Xrm.Page.StringAttribute;
         *         NumberOfEmployees: Xrm.Page.NumberAttribute;
         *     }
         * }
         *
         * declare namespace Xrm.EarlyBound {
         *     interface Entities {
         *         Account: Models.Account;
         *     }
         * }
         */
        interface Entities {}

        /**
         * @template T Early-Bound entity for the {@link Page.EventContext}
         */
        interface EventContext<T extends Entities[keyof Entities]> extends Page.EventContext {
            getFormContext(): FormContext<T>;
        }

        /**
         * @template T Early-Bound entity for the context
         */
        interface FormContext<T extends Entities[keyof Entities]> extends Page {
            getAttribute(): Page.Attribute[];

            /**
             * Gets an attribute matching attributeName.
             * @template Y Name of the attribute in {@link T}.
             * @param attributeName Name of the attribute {@link Y}.
             * @returns The attribute.
             */
            getAttribute<Y extends keyof LowercaseKeys<T>>(attributeName: Y): LowercaseKeys<T>[Y];

            getAttribute<T extends Page.Attribute>(attributeName: string): T;
            getAttribute(attributeName: string): Page.Attribute;
            getAttribute(index: number): Page.Attribute;
            getAttribute(delegateFunction: Collection.MatchingDelegate<Page.Attribute>): Page.Attribute[];

            getControl(): Page.Control[];

            /**
             * Gets a control matching controlName.
             * @template Y name of the control in {@link T}.
             * @param controlName Name of the control {@link Y}.
             * @returns The control.
             */
            getControl<Y extends keyof LowercaseKeys<T>>(controlName: Y): Control<LowercaseKeys<T>, Y>;

            getControl(controlName: string): Page.Control;
            getControl<T extends Page.Control>(index: number): T;
            getControl(index: number): Page.Control;
            getControl(delegateFunction: Collection.MatchingDelegate<Page.Control>): Page.Control[];
        }

        type Control<T, Y extends keyof T> = T[Y] extends Page.StringAttribute
            ? Page.StringControl
            : T[Y] extends Page.BooleanAttribute
            ? Page.OptionSetControl
            : T[Y] extends Page.OptionSetAttribute
            ? Page.OptionSetControl
            : T[Y] extends Page.EnumAttribute
            ? Page.OptionSetControl
            : T[Y] extends Page.NumberAttribute
            ? Page.NumberControl
            : T[Y] extends Page.LookupAttribute
            ? Page.LookupControl
            : T[Y] extends Page.DateAttribute
            ? Page.DateControl
            : Page.Control;

        type ODataEntity<T extends Entities[keyof Entities]> = {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.StringAttribute>>>]?: string;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.LookupAttribute>>> as `_${P &
                string}_value`]?: string;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.LookupAttribute>>> as `_${P &
                string}_value@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.LookupAttribute>>> as `_${P &
                string}_value@Microsoft.Dynamics.CRM.lookuplogicalname`]?: string;
        } & {
            [P in keyof LowercaseKeys<
                Pick<
                    T,
                    AllowedNames<
                        T,
                        Page.OptionSetAttribute | Page.BooleanAttribute | Page.DateAttribute | Page.NumberAttribute
                    >
                >
            > as `${P & string}@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof LowercaseKeys<
                Pick<T, AllowedNames<T, Page.OptionSetAttribute | Page.NumberAttribute>>
            >]?: number;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.BooleanAttribute>>>]?: boolean;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.NumberAttribute>>>]?: number;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Page.DateAttribute>>>]?: string;
        };

        type LowercaseKeys<Base> = {
            [Key in keyof Base as Lowercase<Key & string>]: Base[Key];
        };

        type FilterFlags<Base, Condition> = {
            [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
        };

        type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
    }
}
