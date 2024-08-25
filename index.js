import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const PORT = process.env.PORT || "5000";

//GET request to return error code

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

//function to check if a char is alphabet using regex

const isAlphabet = (char) => /^[a-zA-Z]$/.test(char);

//function to check number

const isNumber = (value) => !isNaN(value);

//POST request

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate the request body
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' should be an array.",
      });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = "";

    for (let item of data) {
      if (isNumber(item)) {
        numbers.push(item);
      } else if (isAlphabet(item)) {
        alphabets.push(item);
        if (
          /[a-z]/.test(item) &&
          (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)
        ) {
          highestLowercaseAlphabet = item;
        }
      } else {
        return res.status(400).json({
          is_success: false,
          error: `Invalid item in array: ${item}. Only numbers and single-character alphabets are allowed.`,
        });
      }
    }

    // Construct the response
    const response = {
      is_success: true,
      user_id: "swetabh_shreyam_27022003",
      email: "swetabh.shreyam2021@vitstudent.ac.in",
      roll_number: "21BIT0278",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    };

    // Send the successful response
    res.status(200).json(response);
  } catch (error) {
    // General error handling
    console.error("An error occurred:", error);
    res.status(500).json({ is_success: false, error: "Internal Server Error" });
  }
});

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
