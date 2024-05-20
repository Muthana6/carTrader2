
export const useUtilities = () => {
    function convertToUpperCase(str) {
        return str.toUpperCase();
    }
    return {
        convertToUpperCase
    }
}