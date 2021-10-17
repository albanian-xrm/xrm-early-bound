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

        /**
         * List of known Early-Bound Forms. Use Type Augmentation to declare your forms.
         */
        interface Forms {}

        interface Form<T extends keyof Entities> {}

        namespace Events {
            /**
             * @template T Early-Bound entity for the {@link Xrm.Events.EventContext}
             */
            interface EventContext<T extends Form<keyof Entities>> extends Xrm.Events.EventContext {
                getFormContext(): FormContext<T>;
            }
        }

        /**
         * @template T Early-Bound entity for the context
         */
        interface FormContext<T extends Form<keyof Entities>> extends Xrm.FormContext {
            getAttribute(): Attributes.Attribute[];

            /**
             * Gets an attribute matching attributeName.
             * @template Y Name of the attribute in {@link T}.
             * @param attributeName Name of the attribute {@link Y}.
             * @returns The attribute.
             */
            getAttribute<Y extends keyof FormAttributes<T>>(attributeName: Y): FormAttributes<T>[Y];

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
            getControl<Y extends keyof FormControls<T>>(controlName: Y): FormControls<T>[Y];

            getControl(controlName: string): Controls.Control;
            getControl<T extends Controls.Control>(index: number): T;
            getControl(index: number): Controls.Control;
            getControl(delegateFunction: Collection.MatchingDelegate<Controls.Control>): Controls.Control[];
        }

        type ToControl<T> = T extends Attributes.StringAttribute
            ? Controls.StringControl
            : T extends Attributes.BooleanAttribute
            ? Controls.OptionSetControl
            : T extends Attributes.OptionSetAttribute
            ? Controls.OptionSetControl
            : T extends Attributes.EnumAttribute<number | boolean>
            ? Controls.OptionSetControl
            : T extends Attributes.NumberAttribute
            ? Controls.NumberControl
            : T extends Attributes.LookupAttribute
            ? Controls.LookupControl
            : T extends Attributes.DateAttribute
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
            [P in keyof LowercaseKeys<OfType<T, Attributes.BooleanAttribute>>]?: boolean;
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

        type OfType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

        type GetFormType<T extends Form<keyof Entities>> = T extends Form<infer TResult> ? TResult : keyof Entities;

        type SpecificFormAttributes<T extends Form<keyof Entities>> = {
            [P in keyof OfType<T, string> as `${OfType<T, string>[P] &
                string}`]: T[P] extends keyof Entities[GetFormType<T>] ? Entities[GetFormType<T>][T[P]] : unknown;
        };

        type SpecificFormControls<T extends Form<keyof Entities>> = {
            [P in keyof OfType<T, string> as `${P & string}`]: T[P] extends keyof Entities[GetFormType<T>]
                ? ToControl<Entities[GetFormType<T>][T[P]]>
                : unknown;
        };

        type FormAttributes<T extends Form<keyof Entities>> = LowercaseKeys<
            keyof T extends never
                ? { [P in keyof Entities[GetFormType<T>]]: Entities[GetFormType<T>][P] }
                : SpecificFormAttributes<T>
        >;

        type FormControls<T extends Form<keyof Entities>> = keyof T extends never
            ? { [P in keyof Entities[GetFormType<T>] as Lowercase<P & string>]: ToControl<Entities[GetFormType<T>][P]> }
            : SpecificFormControls<T>;
    }
}
