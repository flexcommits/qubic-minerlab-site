import { RefreshButtonProps } from "@refinedev/mui";
import { Column } from "@tanstack/react-table";

export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

export interface ISolutionsView {
    id: string;
    version: string;
    miner: string;
    solution: number;
    lastActive: string;
    its: number;
    identity: string;
    isActive: boolean;
}

export interface ColumnButtonProps {
    column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
    value: any; // eslint-disable-line
    onChange: (value: any) => void; // eslint-disable-line
}


export interface CRefreshButtonProps extends RefreshButtonProps {
    isLoading: boolean;
}