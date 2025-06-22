export interface IMenuItem {
    label: string;
    icon?: string;
    items?: IMenuItem[];
    isOpen?: boolean;
}