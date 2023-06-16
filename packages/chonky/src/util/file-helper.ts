import { Nullable } from 'tsdef';

import { FileData } from '../types/file.types';
import { Logger } from './logger';

export class FileHelper {
    public static isDirectory(file: Nullable<FileData>): boolean {
        // Not a directory by default
        return !!file && file.isDir === true;
    }

    public static isHidden(file: Nullable<FileData>): boolean {
        // Not hidden by default
        return !!file && file.isHidden === true;
    }

    public static isSymlink(file: Nullable<FileData>): boolean {
        // Not a symlink by default
        return !!file && file.isSymlink === true;
    }

    public static isEncrypted(file: Nullable<FileData>): boolean {
        // Not encrypted by default
        return !!file && file.isEncrypted === true;
    }

    public static isClickable(file: Nullable<FileData>): boolean {
        // Clickable by default
        return !!file;
    }

    public static isOpenable(file: Nullable<FileData>): boolean {
        // Openable by default
        return !!file && file.openable !== false;
    }

    public static isSelectable(file: Nullable<FileData>): boolean {
        // Selectable by default
        return !!file && file.selectable !== false;
    }

    public static isDraggable(file: Nullable<FileData>): boolean {
        // File & folders are draggable by default, `null` is not
        return !!file && file.draggable !== false;
    }

    public static isDroppable(file: Nullable<FileData>): boolean {
        // Folders are droppable by default, files are not
        if (!file) return false;
        if (file.isDir && file.droppable !== false) return true;
        return file.droppable === true;
    }

    public static isDndOpenable(file: Nullable<FileData>): boolean {
        // Folders are DnD openable by default, files are not
        if (!file) return false;
        if (!FileHelper.isOpenable(file)) return false;
        if (file.isDir && file.dndOpenable !== false) return true;
        return file.dndOpenable === true;
    }

    public static getModDate(file: Nullable<FileData>): Nullable<Date> {
        if (!file || file.modDate === null || file.modDate === undefined) return null;
        return FileHelper.parseDate(file.modDate);
    }

    public static parseDate(maybeDate: Date | string | any): Nullable<Date> {
        if (typeof maybeDate === 'string' || typeof maybeDate === 'number') {
            // We allow users to provide string and numerical representations of dates.
            try {
                return new Date(maybeDate);
            } catch (error) {
                Logger.error(
                    `Could not convert provided string/number into a date: ${(error as any)?.message} `,
                    'Invalid value:',
                    maybeDate
                );
            }
        }
        if (maybeDate instanceof Date && !isNaN(maybeDate.getTime())) {
            // We only allow valid dates objects
            return maybeDate;
        }

        // If we have an invalid date representation, we just return null.
        Logger.warn('Unsupported date representation:', maybeDate);
        return null;
    }

    public static getChildrenCount(file: Nullable<FileData>): Nullable<number> {
        if (!file || typeof file.childrenCount !== 'number') return null;

        return file.childrenCount;
    }
}
