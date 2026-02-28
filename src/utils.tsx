export const calculateCourseCode = (index: number): number => {
    return parseInt(`${Math.ceil((index + 2) / 10)}0${(index+1) % 10}`);
}