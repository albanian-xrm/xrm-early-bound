/// <reference types="xrm" />
// Minimum TypeScript Version: 4.2

declare namespace Xrm {
    type BoundData<T extends EarlyBound.Form<EarlyBound.Entity>> = {
        attributes: Collection.FormAttributesCollection<T>;
        entity: Page.BoundEntity<T>
    } & Data;

    type BoundUi<T extends EarlyBound.Form<EarlyBound.Entity>> = {
        controls: Collection.FormControlsCollection<T>;
        tabs: Collection.TabCollection<T>;
    } & Ui;

    namespace Collection {
        type FormAttributesCollection<T extends EarlyBound.Form<EarlyBound.Entity>> = {
            /**
             *
             * @param itemName attribute Name
             */
            get<Y extends keyof EarlyBound.Types.FormAttributes<T>>(itemName: Y): EarlyBound.Types.FormAttributes<T>[Y];
        } & ItemCollection<Page.Attribute>;

        type FormControlsCollection<T extends EarlyBound.Form<EarlyBound.Entity>> = {
            /**
             *
             * @param itemName control Name
             */
            get<Y extends keyof EarlyBound.Types.FormControls<T>>(itemName: Y): EarlyBound.Types.FormControls<T>[Y];
        } & ItemCollection<Page.Control>;

        type TabCollection<T extends EarlyBound.Form<EarlyBound.Entity>> = {
            /**
             *
             * @param itemName tab Name
             */
            get<Tab extends keyof EarlyBound.Types.TabsOf<T>>(itemName: Tab): Controls.BoundTab<T, Tab>;
        } & ItemCollection<Page.Tab>;

        type SectionCollection<
            T extends EarlyBound.Form<EarlyBound.Entity>,
            Tab extends keyof EarlyBound.Types.TabsOf<T>,
        > = {
            /**
             *
             * @param itemName section Name
             */
            get<Section extends keyof EarlyBound.Types.TabsOf<T>[Tab]>(
                itemName: Section,
            ): Controls.BoundSection<T, Tab, Section>;
        } & ItemCollection<Page.Section>;

        type SectionControlsCollection<
            T extends EarlyBound.Form<EarlyBound.Entity>,
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
        } & ItemCollection<Page.Control>;
    }

    namespace Controls {
        type BoundTab<T extends EarlyBound.Form<EarlyBound.Entity>, Tab extends keyof EarlyBound.Types.TabsOf<T>> = {
            sections: Collection.SectionCollection<T, Tab>;
        } & Tab;

        type BoundSection<
            T extends EarlyBound.Form<EarlyBound.Entity>,
            Tab extends keyof EarlyBound.Types.TabsOf<T>,
            Section extends keyof EarlyBound.Types.TabsOf<T>[Tab],
        > = {
            controls: Collection.SectionControlsCollection<T, Tab, Section>;
        } & Section;
    }

    namespace EarlyBound {
        interface Entity {}

        interface Form<T extends Entity> {
            "#Entity": T;
        }

        type ODataEntity<T extends Entity> = {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Page.StringAttribute>>>]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Page.LookupAttribute>>> as `_${P &
                string}_value`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Page.LookupAttribute>>> as `_${P &
                string}_value@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Page.LookupAttribute>>> as `_${P &
                string}_value@Microsoft.Dynamics.CRM.lookuplogicalname`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<
                Pick<
                    T,
                    Types.AllowedNames<
                        T,
                        Page.OptionSetAttribute | Page.BooleanAttribute | Page.DateAttribute | Page.NumberAttribute
                    >
                >
            > as `${P & string}@OData.Community.Display.V1.FormattedValue`]?: string;
        } & {
            [P in keyof Types.LowercaseKeys<
                Pick<T, Types.AllowedNames<T, Page.OptionSetAttribute | Page.NumberAttribute>>
            >]?: number;
        } & {
            [P in keyof Types.LowercaseKeys<Types.OfType<T, Page.BooleanAttribute>>]?: boolean;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Page.NumberAttribute>>>]?: number;
        } & {
            [P in keyof Types.LowercaseKeys<Pick<T, Types.AllowedNames<T, Page.DateAttribute>>>]?: string;
        };

        namespace Types {
            type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

            type FilterFlags<Base, Condition> = {
                [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
            };

            type Flatten<T> = UnionToIntersection<T[keyof T]>;

            type FormAttributes<T extends Form<Entity>> = LowercaseKeys<
                keyof Omit<T, "#Entity"> extends never
                    ? {
                          [P in keyof OfType<FormEntity<T>, Page.Attribute>]: OfType<FormEntity<T>, Page.Attribute>[P];
                      }
                    : {
                          [P in keyof OfType<T, string> as `${OfType<T, string>[P] & string}`]: P extends keyof Omit<
                              T,
                              "#Entity"
                          >
                              ? T[P] extends keyof Omit<FormEntity<T>, "#LogicalName">
                                  ? FormEntity<T>[T[P] & keyof Omit<FormEntity<T>, "#LogicalName">]
                                  : never
                              : never;
                      }
            >;

            type FormControls<T extends Form<Entity>> = keyof Omit<T, "#Entity"> extends never
                ? {
                      [P in keyof FormEntity<T> as Lowercase<P & string>]: ToControl<FormEntity<T>[P]>;
                  }
                : {
                      [P in keyof OfType<T, string> as `${P & string}`]: P extends keyof T
                          ? T[P] extends keyof OfType<FormEntity<T>, Page.Attribute>
                              ? ToControl<
                                    OfType<FormEntity<T>, Page.Attribute>[T[P] &
                                        keyof OfType<FormEntity<T>, Page.Attribute>]
                                >
                              : never
                          : never;
                  } & {
                      [P in keyof OfType<T, Page.Control> as `${P & string}`]: T[P & keyof T] extends Page.Control
                          ? P extends keyof T
                              ? T[P]
                              : never
                          : never;
                  };

            type FormEntity<T extends Form<Entity>> = Entity extends T["#Entity"] ? never : T["#Entity"];

            type LowercaseKeys<Base> = {
                [Key in keyof Base as Lowercase<Key & string>]: Base[Key];
            };

            type OfType<Base, Condition> = Pick2<Base, AllowedNames<Base, Condition>>;

            type Pick2<T, K extends keyof T> = T extends unknown ? Pick<T, K> : never;

            type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

            type SectionControls<
                T extends Form<Entity>,
                Tab extends keyof TabsOf<T>,
                Section extends keyof TabsOf<T>[Tab],
            > = {
                [P in TabsOf<T>[Tab][Section] as `${P & string}`]: P extends keyof T
                    ? T[P] extends string
                        ? ToControl<FormEntity<T>[T[P] & keyof FormEntity<T>]>
                        : T[P] extends Page.Control
                        ? T[P]
                        : never
                    : never;
            };

            type TabsOf<T extends Form<Entity>> = ".Tabs" extends keyof T ? T[".Tabs"] : {};

            type ToControl<T> = T extends Page.StringAttribute
                ? Page.StringControl
                : T extends Page.BooleanAttribute
                ? Page.OptionSetControl
                : T extends Page.OptionSetAttribute
                ? Page.OptionSetControl
                : T extends Page.EnumAttribute
                ? Page.OptionSetControl
                : T extends Page.NumberAttribute
                ? Page.NumberControl
                : T extends Page.LookupAttribute
                ? Page.LookupControl
                : T extends Page.DateAttribute
                ? Page.DateControl
                : Page.Control;

            type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
                ? I
                : never;
        }
    }

    /**
     * @template T Early-Bound entity for the context
     */
    type BoundFormContext<T extends EarlyBound.Form<EarlyBound.Entity>> = {
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
    } & Page;

    namespace Page {
        type BoundEntity<T extends EarlyBound.Form<EarlyBound.Entity>> = {
            attributes: Collection.FormAttributesCollection<T>;
        } & Entity;
    
        /**
         * @template T Early-Bound entity for the {@link Xrm.Events.EventContext}
         */
        type BoundEventContext<T extends EarlyBound.Form<EarlyBound.Entity>> = {
            getFormContext(): BoundFormContext<T>;
        } & EventContext;
    }
}
