const express = require('express');
const app = express();

app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input format. 'data' should be an array."
            });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
            ? [lowercaseAlphabets.sort().reverse()[0]]
            : [];

        res.json({
            is_success: true,
            user_id: "hari_nath_8124",
            email: "harinath.r2021@vit.ac.in",
            roll_number: "21BIT0738",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "An unexpected error occurred."
        });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL Challenge API!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
