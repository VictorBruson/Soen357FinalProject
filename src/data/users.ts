import { type User } from '../types/user';

export const USERS_DATA: User[] = [{
    id: "user-8829",
    username: "AlexDev94",
    email: "alex.thorne@example.edu",
    readingProgress: [
        {
            isbn: "bk-101",
            progressPercent: 45,
            currentChapterId: "ch-1",
            lastReadAt: "2026-04-10T14:30:00Z"
        },
        {
            isbn: "bk-404",
            progressPercent: 12,
            currentChapterId: "rust-ch-1",
            lastReadAt: "2026-04-05T09:15:00Z"
        },
        {
            isbn: "bk-606",
            progressPercent: 100,
            currentChapterId: "math-ch-3",
            lastReadAt: "2026-03-20T18:45:00Z"
        },
        {
            isbn: "bk-707",
            progressPercent: 85,
            currentChapterId: "fiction-ch-1",
            lastReadAt: "2026-04-01T02:00:00Z"
        },
        {
            isbn: "bk-505",
            progressPercent: 5,
            currentChapterId: "psych-ch-1",
            lastReadAt: "2026-04-03T21:10:00Z"
        }
    ]
}];