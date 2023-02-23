export interface FormItem {
  label?: string;
  name: string;
  value: string;
}

export interface ColumnsItem {
  label?: string;
  prop?: string;
  width?:string;
  defaultSlot?: (value: { row }) => any;
}

export type PickerType =
  | "year"
  | "month"
  | "date"
  | "dates"
  | "week"
  | "datetime"
  | "datetimerange"
  | "daterange"
  | "monthrange";

interface InputProps extends FormItem {
  tag: "input";
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}
interface PickerProps extends FormItem {
  tag: "dateTimePicker";
  value: string;
  type: PickerType;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export type OptionsType = {
  label: string;
  value: string;
};
export interface SelectProps extends FormItem {
  tag: "select";
  placeholder?: string;
  value: string | string[];
  multiple?: boolean;
  options?: OptionsType[];
  onChange?: (value: string) => void;
}

interface RateValue extends FormItem {
  tag: "rate";
}

export type TableFormA = {
  tag: "a";
  text: string;
  link: string;
  onClick?: () => void;
  // eslint-disable-next-line no-undef
  style?: string | JSXInternal.CSSProperties;
  className?: string;
};
export type TableFormText = {
  tag: "text";
  text: string;
  onClick?: () => void;
  // eslint-disable-next-line no-undef
  style?: string | JSXInternal.CSSProperties;
  className?: string;
};

export type TableFormSpan = {
  tag: "span";
  text: string;
  onClick?: () => void;
  // eslint-disable-next-line no-undef
  style?: string | JSXInternal.CSSProperties;
  className?: string;
};

type Hr = {
  tag: "hr";
};
type FormTabs =
  | RateValue
  | Hr
  | TableFormA
  | InputProps
  | SelectProps
  | TableFormText
  | PickerProps
  | TableFormSpan;

type Tabs = {
  tag: "tabs";
  name: string;
  childs: FormTabs[];
};

type Button = {
  tag: "button";
  text: string;
  disabled: boolean;
  icon: string | any;
  type: primary | success | warning | danger | info | text;
  onClick: () => void;
  style?: string | JSXInternal.CSSProperties;
};

// function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
//   return names.map(n => o[n]);
// }

export type TableType = {
  tag: "table";
  name: string;
  expand?: boolean;
  isSelection?: boolean;
  expandColumns?: ColumnsItem[];
  columns: ColumnsItem[];
  data: any[];
  value?: any[];
  onChange?: (value: any[]) => void;
};

export type FormOption = FormTabs | Tabs | TableType | Button;

export type TableValues = {
  [key: string]: FormTabs | Tabs;
}[];
export type PublicPropsType<T = any> = {
  value: T;
} & FormItem;
