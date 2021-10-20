/// <reference types="xrm" />
// Minimum TypeScript Version: 4.2

declare namespace Xrm {
    type BoundData<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
        attributes: Collection.FormAttributesCollection<T>
    } & Data;

    /**
     * @template T Early-Bound entity for the context
     */
    type BoundFormContext<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
        data: BoundData<T>;
        ui: BoundUi<T>;

        /**
         * Gets an attribute matching attributeName.
         * @template Y Name of the attribute in {@link T}.
         * @param attributeName Name of the attribute {@link Y}.
         * @returns The attribute.
         */
        getAttribute<Y extends keyof EarlyBound.Types.FormAttributes<T>>(
            attributeName: Y,
        ): EarlyBound.Types.FormAttributes<T>[Y];

        /**
         * Gets a control matching controlName.
         * @template Y name of the control in {@link T}.
         * @param controlName Name of the control {@link Y}.
         * @returns The control.
         */
        getControl<Y extends keyof EarlyBound.Types.FormControls<T>>(
            controlName: Y,
        ): EarlyBound.Types.FormControls<T>[Y];
    } & FormContext;

    type BoundUi<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
        controls: Collection.FormControlsCollection<T>;
        tabs: Collection.TabCollection<T>;
    } & Ui;

    namespace Collection {
        type FormAttributesCollection<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
              /**
             *
             * @param itemName attribute Name
             */
               get<Y extends keyof EarlyBound.Types.FormAttributes<T>>(itemName: Y): EarlyBound.Types.FormAttributes<T>[Y];
        } &  ItemCollection<Attributes.Attribute>;

        type FormControlsCollection<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
            /**
             *
             * @param itemName control Name
             */
            get<Y extends keyof EarlyBound.Types.FormControls<T>>(itemName: Y): EarlyBound.Types.FormControls<T>[Y];
        } & ItemCollection<Controls.Control>;

        type TabCollection<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
            /**
             *
             * @param itemName tab Name
             */
            get<Tab extends keyof EarlyBound.Types.TabsOf<T>>(itemName: Tab): Controls.BoundTab<T, Tab>;
        } & ItemCollection<Controls.Tab>;

        type SectionCollection<
            T extends EarlyBound.Form<keyof EarlyBound.Entities>,
            Tab extends keyof EarlyBound.Types.TabsOf<T>,
        > = {
            /**
             *
             * @param itemName section Name
             */
            get<Section extends keyof EarlyBound.Types.TabsOf<T>[Tab]>(
                itemName: Section,
            ): Controls.BoundSection<T, Tab, Section>;
        } & ItemCollection<Controls.Section>;

        type SectionControlsCollection<
            T extends EarlyBound.Form<keyof EarlyBound.Entities>,
            Tab extends keyof EarlyBound.Types.TabsOf<T>,
            Section extends keyof EarlyBound.Types.TabsOf<T>[Tab],
        > = {
            /**
             *
             * @param itemName control Name
             */
            get<Y extends keyof EarlyBound.Types.SectionControls<T, Tab, Section>>(
                itemName: Y,
            ): EarlyBound.Types.SectionControls<T, Tab, Section>[Y];
        } & ItemCollection<Controls.Control>;
    }

    namespace Controls {
        type BoundTab<
            T extends EarlyBound.Form<keyof EarlyBound.Entities>,
            Tab extends keyof EarlyBound.Types.TabsOf<T>,
        > = {
            sections: Collection.SectionCollection<T, Tab>;
        } & Tab;

        type BoundSection<
            T extends EarlyBound.Form<keyof EarlyBound.Entities>,
            Tab extends keyof EarlyBound.Types.TabsOf<T>,
            Section extends keyof EarlyBound.Types.TabsOf<T>[Tab],
        > = {
            controls: Collection.SectionControlsCollection<T, Tab, Section>;
        } & Section;
    }

    namespace Events {
        /**
         * @template T Early-Bound entity for the {@link Xrm.Events.EventContext}
         */
        type BoundEventContext<T extends EarlyBound.Form<keyof EarlyBound.Entities>> = {
            getFormContext(): BoundFormContext<T>;
        } & EventContext;
    }

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

        type ODataEntity<T extends Entities[keyof Entities]> = {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Attributes.StringAttribute>>>]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Attributes.LookupAttribute>>> as `_${P &
                string}_value`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Attributes.LookupAttribute>>> as `_${P &
                string}_value@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Attributes.LookupAttribute>>> as `_${P &
                string}_value@Microsoft.Dynamics.CRM.lookuplogicalname`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<
                Pick<
                    T,
                    Types.AllowedNames<
                        T,
                        | Attributes.OptionSetAttribute
                        | Attributes.BooleanAttribute
                        | Attributes.DateAttribute
                        | Attributes.NumberAttribute
                    >
                >
            > as `${P & string}@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<
                Pick<T, Types.AllowedNames<T, Attributes.OptionSetAttribute | Attributes.NumberAttribute>>
            >]?: number;
        } & {
            [P in keyof Types.LowercaseKeys<Types.OfType<T, Attributes.BooleanAttribute>>]?: boolean;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Attributes.NumberAttribute>>>]?: number;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Attributes.DateAttribute>>>]?: string;
        };

        type GetFormType<T extends Form<keyof Entities>> = T extends Form<infer TResult> ? TResult : keyof Entities;

        type SpecificFormAttributes<T extends Form<keyof Entities>> = {
            [P in keyof Types.OfType<T, string> as `${Types.OfType<T, string>[P] & string}`]: Types.OfType<
                T,
                string
            >[P] extends keyof Entities[GetFormType<T>]
                ? Entities[GetFormType<T>][Types.OfType<T, string>[P]]
                : unknown;
        };

        namespace Types {
            type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

            type FilterFlags<Base, Condition> = {
                [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
            };

            type Flatten<T> = UnionToIntersection<T[keyof T]>;

            type FormAttributes<T extends Form<keyof Entities>> = LowercaseKeys<
                keyof T extends never
                    ? { [P in keyof Entities[GetFormType<T>]]: Entities[GetFormType<T>][P] }
                    : {
                          [P in keyof OfType<T, string> as `${P & string}`]: T[P &
                              keyof T] extends keyof Entities[GetFormType<T>]
                              ? Entities[GetFormType<T>][T[P & keyof T]]
                              : unknown;
                      }
            >;

            type FormControls<T extends Form<keyof Entities>> = keyof T extends never
                ? {
                      [P in keyof Entities[GetFormType<T>] as Lowercase<P & string>]: ToControl<
                          Entities[GetFormType<T>][P]
                      >;
                  }
                : {
                      [P in keyof OfType<T, string> as `${P & string}`]: T[P &
                          keyof T] extends keyof Entities[GetFormType<T>]
                          ? ToControl<Entities[GetFormType<T>][T[P & keyof T]]>
                          : never;
                  } & {
                      [P in keyof OfType<T, Controls.Control> as `${P & string}`]: T[P &
                          keyof T] extends Controls.Control
                          ? T[P & keyof T]
                          : never;
                  };

            type LowercaseKeys<Base> = {
                [Key in keyof Base as Lowercase<Key & string>]: Base[Key];
            };

            type OfType<Base, Condition> = Pick2<Base, AllowedNames<Base, Condition>>;

            type Pick2<T, K extends keyof T> = T extends unknown ? Pick<T, K> : never;

            type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

            type SectionControls<
                T extends Form<keyof Entities>,
                Tab extends keyof TabsOf<T>,
                Section extends keyof TabsOf<T>[Tab],
            > = {
                [P in TabsOf<T>[Tab][Section] as `${P & string}`]: P extends keyof T
                    ? T[P] extends string
                        ? ToControl<Entities[GetFormType<T>][T[P] & keyof Entities[GetFormType<T>]]>
                        : T[P] extends Controls.Control
                        ? T[P]
                        : never
                    : never;
            };

            type TabsOf<T extends Form<keyof Entities>> = ".Tabs" extends keyof T ? T[".Tabs"] : {};

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

            type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
                ? I
                : never;
        }
    }
}
