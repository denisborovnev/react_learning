declare type DeepPartial<T> = {
    [K in keyof T]?: T[K];
}