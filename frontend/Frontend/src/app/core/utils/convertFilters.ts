import { ITaskFilters } from "../interfaces/ITaskFilters";

export function convertFilters(filters: ITaskFilters): Record<string, any> {
    const params: Record<string, any> = {};

    if (filters.statuses && filters.statuses.length > 0) {
        params['statuses'] = filters.statuses;
    }

    if (filters.priorities && filters.priorities.length > 0) {
        params['priorities'] = filters.priorities;
    }

    if (filters.types && filters.types.length > 0) {
        params['types'] = filters.types;
    }
    if (filters.assignedUserId) {
        params['assignedUserId'] = filters.assignedUserId;
    }
    if (filters.search) {
        params['search'] = filters.search;
    }

    return params;
}

