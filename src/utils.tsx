export const calculateCourseCode = (index: number): number => {
    return parseInt(`${Math.floor(index / 10) + 1}0${(index+1) % 10}`);
}