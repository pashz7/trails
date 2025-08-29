type UUID = string;
type ISODateString = string;

export type TaskAttributes = {
    id: UUID;
    title: string;
    description: any; // или более конкретный тип, если известна структура
    boardId: UUID;
    boardTitle: string;
    order: number;
    status: number;
    priority: number;
    startDate: any; // или более конкретный тип
    deadline: any; // или более конкретный тип
    addedAt: ISODateString;
    updatedAt: string; // можно заменить на ISODateString если всегда в формате ISO
    attachments: string[]; // массив строк (вероятно UUID или URLs)
};

export type Task = {
    id: UUID;
    type: "tasks";
    attributes: TaskAttributes;
};

export type Meta = {
    page: number;
    pageSize: number;
    totalCount: number;
    pagesCount: number;
};

export type TasksResponse = {
    data: Task[];
    meta: Meta;
};

// Для ответа с одним таском
export type TaskResponse = {
    data: Task;
};