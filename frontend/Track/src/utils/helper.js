import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeperator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;

}

export const prepareExpenseBarChartData = (data = []) => {
    if (!Array.isArray(data)) {
        console.error("prepareExpenseBarChartData expected an array, but got:", data);
        return [];
    }

    // Sort by date ascending
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // One bar per transaction, show full date
    return sortedData.map(item => ({
        month: moment(item.date).format('Do MMM'),
        amount: Number(item.amount) || 0,
        category: item?.category
    }));
};

export const prepareIncomeBarChartData = (data = []) => {
    if (!Array.isArray(data)) {
        console.error("prepareIncomeBarChartData expected an array, but got:", data);
        return [];
    }

    // Sort by date ascending
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // One bar per transaction, show full date
    return sortedData.map(item => ({
        month: moment(item.date).format('Do MMM'),
        amount: Number(item.amount) || 0,
        source: item?.source
    }));
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category
    }))

    return chartData;
}

export const fixImageUrl = (imageUrl) => {
    if (!imageUrl) return null;

    // Replace old port 8000 with current port 8001
    if (imageUrl.includes('localhost:8000')) {
        return imageUrl.replace('localhost:8000', 'localhost:8001');
    }

    return imageUrl;
}