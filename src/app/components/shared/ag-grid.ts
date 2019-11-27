import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';

export const commonAgGridModules: Module[] = [ClientSideRowModelModule];
export type AgGridModules = Module[];
