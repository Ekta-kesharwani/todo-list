export interface  Details{
    list_id?:   string;
    list_items: ListItem[];
    user_id?:        string;
    title?:     string;
    isEditable?:boolean;
    error?:string;
}

export default interface ListItem {
    item_id?: string;
    checked?: boolean;
    item?:    string;
}