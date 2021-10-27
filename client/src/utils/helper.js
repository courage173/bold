export const randomNumberGenerator = length => {
    if (length > 10) {
        length = 10;
    }
    const arr = [];
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * 9) + 1;
        if (arr.includes(rand)) {
            return randomNumberGenerator(length);
        } else {
            arr.push(rand);
        }
    }
    return arr;
};
export const generateId = () => {
    return Math.floor(Math.random() * 9) + 10;
};

export const getCredibilityColor = percentage => {
    let color;
    switch (percentage) {
        case percentage >= 50 && percentage < 70:
            color = 'rgb(142 171 255)';
            break;
        case percentage >= 70:
            color = 'rgb(47 217 179)';
            break;
        case percentage >= 30 && percentage < 50:
            color = 'rgb(236 177 45)';
            break;
        default:
            color = 'rgb(236 45 116)';
    }
    return color;
};
