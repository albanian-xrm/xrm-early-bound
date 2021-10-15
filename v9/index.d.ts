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
         *         CreditOnHold: Xrm.Attributes.BooleanAttribute;
         *         CustomerTypeCode: Xrm.Attributes.OptionSetAttribute;
         *         ModifiedBy: Xrm.Attributes.LookupAttribute;
         *         ModifiedOn: Xrm.Attributes.DateAttribute;
         *         Name: Xrm.Attributes.StringAttribute;
         *         NumberOfEmployees: Xrm.Attributes.NumberAttribute;
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

        namespace Events {
            /**
             * @template T Early-Bound entity for the {@link Xrm.Events.EventContext}
             */
            interface EventContext<T extends Entities[keyof Entities]> extends Xrm.Events.EventContext {
                getFormContext(): FormContext<T>;
            }
        }

        /**
         * @template T Early-Bound entity for the context
         */
        interface FormContext<T extends Entities[keyof Entities]> extends Xrm.FormContext {
            getAttribute(): Attributes.Attribute[];

            /**
             * Gets an attribute matching attributeName.
             * @template Y Name of the attribute in {@link T}.
             * @param attributeName Name of the attribute {@link Y}.
             * @returns The attribute.
             */
            getAttribute<Y extends keyof LowercaseKeys<T>>(attributeName: Y): LowercaseKeys<T>[Y];

            getAttribute<T extends Attributes.Attribute>(attributeName: string): T;
            getAttribute(attributeName: string): Attributes.Attribute;
            getAttribute(index: number): Attributes.Attribute;
            getAttribute(delegateFunction: Collection.MatchingDelegate<Attributes.Attribute>): Attributes.Attribute[];

            getControl(): Controls.Control[];

            /**
             * Gets a control matching controlName.
             * @template Y name of the control in {@link T}.
             * @param controlName Name of the control {@link Y}.
             * @returns The control.
             */
            getControl<Y extends keyof LowercaseKeys<T>>(controlName: Y): Control<LowercaseKeys<T>, Y>;

            getControl(controlName: string): Controls.Control;
            getControl<T extends Controls.Control>(index: number): T;
            getControl(index: number): Controls.Control;
            getControl(delegateFunction: Collection.MatchingDelegate<Controls.Control>): Controls.Control[];
        }

        type Control<T, Y extends keyof T> = T[Y] extends Attributes.StringAttribute
            ? Controls.StringControl
            : T[Y] extends Attributes.BooleanAttribute
            ? Controls.OptionSetControl
            : T[Y] extends Attributes.OptionSetAttribute
            ? Controls.OptionSetControl
            : T[Y] extends Attributes.EnumAttribute<number | boolean>
            ? Controls.OptionSetControl
            : T[Y] extends Attributes.NumberAttribute
            ? Controls.NumberControl
            : T[Y] extends Attributes.LookupAttribute
            ? Controls.LookupControl
            : T[Y] extends Attributes.DateAttribute
            ? Controls.DateControl
            : Controls.Control;

        type ODataEntity<T extends Entities[keyof Entities]> = {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.StringAttribute>>>]?: string;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.LookupAttribute>>> as `_${P &
                string}_value`]?: string;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.LookupAttribute>>> as `_${P &
                string}_value@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.LookupAttribute>>> as `_${P &
                string}_value@Microsoft.Dynamics.CRM.lookuplogicalname`]?: string;
        } & {
            [P in keyof LowercaseKeys<
                Pick<
                    T,
                    AllowedNames<
                        T,
                        | Attributes.OptionSetAttribute
                        | Attributes.BooleanAttribute
                        | Attributes.DateAttribute
                        | Attributes.NumberAttribute
                    >
                >
            > as `${P & string}@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof LowercaseKeys<
                Pick<T, AllowedNames<T, Attributes.OptionSetAttribute | Attributes.NumberAttribute>>
            >]?: number;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.BooleanAttribute>>>]?: boolean;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.NumberAttribute>>>]?: number;
        } & {
            [P in keyof LowercaseKeys<Pick<T, AllowedNames<T, Attributes.DateAttribute>>>]?: string;
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
