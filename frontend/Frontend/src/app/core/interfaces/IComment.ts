export interface IComment {
    id: number;
    taskItemId: number;
    userId: string;
    content: string;
    createAt: Date;
    userName: string;
    email: string;
    image: string;
}
