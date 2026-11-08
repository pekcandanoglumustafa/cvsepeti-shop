import enP from "@/data/i18n/en/products.json";
import deP from "@/data/i18n/de/products.json";
import frP from "@/data/i18n/fr/products.json";
import enC from "@/data/i18n/en/categories.json";
import deC from "@/data/i18n/de/categories.json";
import frC from "@/data/i18n/fr/categories.json";
import enU from "@/data/i18n/en/ui.json";
import deU from "@/data/i18n/de/ui.json";
import frU from "@/data/i18n/fr/ui.json";
import enB from "@/data/i18n/en/blogs.json";
import deB from "@/data/i18n/de/blogs.json";
import frB from "@/data/i18n/fr/blogs.json";
export const LOCALES = ["en","de","fr"] as const;
export type Locale = (typeof LOCALES)[number];
export type Ui = Record<keyof typeof enU,string>;
export type ProductTranslation = { name:string; description:string };
export type BlogTranslation = { title:string;summary:string;body:string;published:string };
type Dict={products:Record<string,ProductTranslation>; categories:Record<string,string>; ui:Ui; blogs:Record<string,BlogTranslation>};
const dictionaries:Record<Locale,Dict>={
 en:{products:enP,categories:enC,ui:enU,blogs:enB},
 de:{products:deP,categories:deC,ui:deU,blogs:deB},
 fr:{products:frP,categories:frC,ui:frU,blogs:frB},
};
export const localesData=(l:Locale):Dict=>dictionaries[l];
