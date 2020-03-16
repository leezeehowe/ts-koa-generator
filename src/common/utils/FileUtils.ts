export function changeSuffix(source: string, target_suffix_without_point: string): string{
    const index = source.lastIndexOf(".");
    return source.slice(0, index) + "." + target_suffix_without_point;
}