const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Insert user data into Supabase
        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, password }]);

        if (error) throw error;

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};
