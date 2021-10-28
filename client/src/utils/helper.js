export const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 101);
};
export const generateId = () => {
    return Math.floor(Math.random() * 9) + 10;
};

export const getCredibilityColor = percentage => {
    if (percentage >= 50 && percentage < 70) {
        return 'rgb(142 171 255)';
    } else if (percentage >= 70) {
        return 'rgb(47 217 179)';
    } else if (percentage >= 30 && percentage < 50) {
        return 'rgb(236 177 45)';
    } else {
        return 'rgb(236 45 116)';
    }
};
